# Libs
import cv2
import imutils
from imutils.video import FileVideoStream
import base64
import numpy as np
from flask import Flask, render_template
from flask_socketio import SocketIO
import os
from detector import Detector
from speedHandler import calculate_average_speed
from flask_cors import CORS

imgAnchor = np.array(
    [[10, 388], [180, 50], [685, 70], [820, 410]]).astype(np.float32)
pts = imgAnchor.astype(int)
realAnchor = np.array([[0, 440], [0, 0], [430, 0], [430, 440]]).astype(
    np.float32)  # in centimeter
affineM = cv2.getPerspectiveTransform(
    imgAnchor, realAnchor)

cropTL = (610, 307)
cropBR = (1600, 1000)

video_file = os.path.join("server", "pymodule", "t_1_cut.mp4")
cam = FileVideoStream(video_file).start()

while True:
    frame = cam.read()
    dst = frame[cropTL[1]:cropBR[1], cropTL[0]:cropBR[0]]
    height, width = dst.shape[:2]
    if (frame is None):
        break
    cv2.polylines(dst, [pts], isClosed=True, color=(0, 255, 0), thickness=2)
    cv2.imshow("before", dst)
    warp_frame = cv2.warpPerspective(dst, affineM, (width, height))
    cv2.imshow("after", warp_frame)
    cv2.waitKey(1)
