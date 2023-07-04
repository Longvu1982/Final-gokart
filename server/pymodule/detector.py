from turtle import heading
import cv2
from threading import Thread
import time
import queue
import numpy as np
import os
import json

mask_path = os.path.join("server", "pymodule", "mask.jpg")
mask = cv2.imread(mask_path)

ARUCO_DICT = {
    "DICT_4X4_50": cv2.aruco.DICT_4X4_50,
    "DICT_4X4_100": cv2.aruco.DICT_4X4_100,
    "DICT_4X4_250": cv2.aruco.DICT_4X4_250,
    "DICT_4X4_1000": cv2.aruco.DICT_4X4_1000,
    "DICT_5X5_50": cv2.aruco.DICT_5X5_50,
    "DICT_5X5_100": cv2.aruco.DICT_5X5_100,
    "DICT_5X5_250": cv2.aruco.DICT_5X5_250,
    "DICT_5X5_1000": cv2.aruco.DICT_5X5_1000,
    "DICT_6X6_50": cv2.aruco.DICT_6X6_50,
    "DICT_6X6_100": cv2.aruco.DICT_6X6_100,
    "DICT_6X6_250": cv2.aruco.DICT_6X6_250,
    "DICT_6X6_1000": cv2.aruco.DICT_6X6_1000,
    "DICT_7X7_50": cv2.aruco.DICT_7X7_50,
    "DICT_7X7_100": cv2.aruco.DICT_7X7_100,
    "DICT_7X7_250": cv2.aruco.DICT_7X7_250,
    "DICT_7X7_1000": cv2.aruco.DICT_7X7_1000,
    "DICT_ARUCO_ORIGINAL": cv2.aruco.DICT_ARUCO_ORIGINAL,
    "DICT_APRILTAG_16h5": cv2.aruco.DICT_APRILTAG_16h5,
    "DICT_APRILTAG_25h9": cv2.aruco.DICT_APRILTAG_25h9,
    "DICT_APRILTAG_36h10": cv2.aruco.DICT_APRILTAG_36h10,
    "DICT_APRILTAG_36h11": cv2.aruco.DICT_APRILTAG_36h11
}


class Detector:
    def __init__(self, cropTL, arucoDict=cv2.aruco.DICT_4X4_250):
        # For yolo object detection
        weights_path = os.path.join("server",
                                    "pymodule", "common", "yolov4-tiny.weights")
        print(weights_path)
        config_path = os.path.join(
            "server", "pymodule", "common", "yolov4-tiny.cfg")
        self.net = cv2.dnn.readNet(weights_path, config_path)
        self.net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
        self.net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
        # all detection classes
        self.classes = []
        # ouput unconnected detection layers
        self.output_layers = []
        self.initYolo()

        # for sending data
        self.kartObj = {}
        self.shouldClearKartObj = True

        # For aruco detection
        self.arucoDict = cv2.aruco.Dictionary_get(arucoDict)
        self.arucoParams = cv2.aruco.DetectorParameters_create()

        # For calibration
        self.imgAnchor = np.array(
            [[10, 388], [180, 50], [685, 70], [820, 410]]).astype(np.float32)
        self.realAnchor = np.array([[0, 440], [0, 0], [430, 0], [430, 440]]).astype(
            np.float32)  # in centimeter
        self.affineM = cv2.getPerspectiveTransform(
            self.imgAnchor, self.realAnchor)
        self.cropTL = cropTL

        # For threading
        self.stopped = False
        self.frame = None
        self.frameQ = queue.Queue(maxsize=0)
        self.frameTime = time.time_ns()
        self.frameCount = 0
        self.centerPoints = []
        self.mask = mask

        # Constant for algorithm
        self.finishLineY = 420
        self.maxDistance = 80
        self.maxKartID = 20

    def roundZero(self, x):
        if x < 0:
            return 0
        else:
            return x

    def initYolo(self):
        file_path = os.path.join("server", "pymodule", "common", "coco.names")
        with open(file_path, "r") as f:
            # strip equal to trim (remove white spaces)
            self.classes = [line.strip() for line in f.readlines()]
        layer_names = self.net.getLayerNames()
        unconnected_out_layers = list(
            map(int, self.net.getUnconnectedOutLayers()))
        self.output_layers = [layer_names[i - 1]
                              for i in unconnected_out_layers]

    # execute self.process method in a parallel thread
    def start(self):
        Thread(target=self.process, args=()).start()
        # return self for chaining
        # ex: Myclass.start().otherMethod()
        return self

    def update(self, frame):
        self.frame = frame
        self.frameTime = time.time_ns()
        # append (frame, frame_time) to end of queue (FIFO)
        self.frameQ.put((frame, self.frameTime))

    def objectDetection(self, frame, ts):
        self.shouldClearKartObj = True
        frame_height, frame_width, _channels = frame.shape
        # Detecting objects

        # frame
        # normalize scaling factor (1/255)
        # resize to fit to the network
        # none mean subtraction
        # true = convert from BGR to RGB
        # crop after resize = false
        frame = cv2.bitwise_and(frame, self.mask)
        blob = cv2.dnn.blobFromImage(
            frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
        self.net.setInput(blob)
        outs = self.net.forward(self.output_layers)
        # for out in outs:
        for detection in outs[0]:
            #  detection = [x, y, width, height, objectness_score, class1_prob, class2_prob, ..., classN_prob]
            scores = detection[5:]
            # find the index of the max confidence starting from index 5
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            # if it is a motor bike
            if class_id == 3 and confidence >= 0.2:
                self.shouldClearKartObj = False
                center_x = int(detection[0] * frame_width)
                center_y = int(detection[1] * frame_height)
                w = int(detection[2] * frame_width)
                h = int(detection[3] * frame_height)

                # Rectangle coordinates (increase the bounding box a little bit)
                x = self.roundZero(int(center_x - w / 1.8))
                y = self.roundZero(int(center_y - h / 1.8))
                w += 30
                h += 30
                # test draw bounding box
                # cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                # cv2.imwrite("output.jpg", frame)
                # cv2.imshow("fff", frame)
                # cv2.waitKey(1)
                if (w * h) > 5000:  # the region is significant
                    # crop the frame at the bounding box
                    frameq = frame[y:y+w, x:x+w]
                    (corners, ids, _rejected) = cv2.aruco.detectMarkers(
                        frameq, self.arucoDict, parameters=self.arucoParams)  # detect aruco at that area
                    # if detected
                    if len(corners) > 0:
                        for id in ids:
                            first_id = id[0]
                            if first_id < self.maxKartID:
                                # cordinate of center kart + aruco ID
                                self.centerPoints.append(
                                    (int(center_x + self.cropTL[0]), int(center_y + self.cropTL[1]), first_id))
                                transformedPoint = cv2.perspectiveTransform(
                                    np.array([[[center_x, center_y]]]).astype(np.float32), self.affineM)
                                kartObj = {'X': float(transformedPoint[0][0][0]), 'Y': float(
                                    transformedPoint[0][0][1]), 'T': ts, 'id': int(first_id)}  # real world coordinates
                                self.kartObj = kartObj
                # else:
                #     self.kartObj = {}
        if (self.shouldClearKartObj):
            self.kartObj = {}

    def process(self):
        while not self.stopped:
            if not self.frameQ.empty():
                self.frameCount += 1
                frame, ts = self.frameQ.get()
                self.objectDetection(frame, ts)
                if self.frameCount > 100:
                    self.centerPoints = []
                    self.frameCount = 0
            else:
                cv2.waitKey(1)

    def stop(self):
        self.stopped = True
