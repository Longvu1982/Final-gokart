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

# Variables
cropTL = (657, 307)
cropBR = (1600, 1000)
colors = [(230, 25, 75), (60, 180, 75), (255, 225, 25), (0, 130, 200), (245, 130, 48), (145, 30, 180), (70, 240, 240), (240, 50, 230), (210, 245, 60), (250, 190, 212), (0, 128, 128),
          (220, 190, 255), (170, 110, 40), (255, 250, 200), (128, 0, 0), (170, 255, 195), (128, 128, 0), (255, 215, 180), (0, 0, 128), (128, 128, 128), (255, 255, 255), (0, 0, 0)]

# init flask backend app
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


# @app.route('/')
# def index():
#     return render_template('index.html')

def process_frames():
    H = None
    W = None
    frame_count = 0
    video_file = os.path.join("server", "pymodule", "t_1_cut.mp4")
    cam = FileVideoStream(video_file).start()
    detector = Detector(cropTL).start()
    kartList = []

    while True:
        if detector.stopped:
            break
        frame = cam.read()
        if (frame is None):
            # socketio.emit('frame', "")
            break
        frame_count += 1
        # crop the frame (ROI)
        dst = frame[cropTL[1]:cropBR[1], cropTL[0]:cropBR[0]]
        if H is None:
            H, W = dst.shape[:2]

        detector.update(dst)  # update function in detector

        # draw circles at center points
        for idx, _cp in enumerate(detector.centerPoints):
            first_id = detector.centerPoints[idx][2]
            frame = cv2.circle(
                frame, (detector.centerPoints[idx][0], detector.centerPoints[idx][1]), 6, colors[first_id], -1)

        if frame_count % 2 == 0:
            frame_d = frame.copy()
            frame_send = imutils.resize(frame, width=int(0.3*frame_d.shape[1]))
            _, frame_data = cv2.imencode('.jpg', frame_send)
            frame_base64 = base64.b64encode(frame_data).decode('utf-8')
            socketio.emit('frame', frame_base64)

            # Emit the frame to the frontend
            if (detector.kartObj):
                kartList.append(detector.kartObj)
                speeds = calculate_average_speed(kartList)
                array_data = []
                for key, value in speeds.items():
                    entry = {"id": key, **value}
                    array_data.append(entry)
                socketio.emit('data', array_data)

            # socketio.sleep(0.033)  # Delay for approximately 30 frames per second

        # frame = imutils.resize(frame, width=int(0.5*W))
        # cv2.imshow("Live", frame)
        # cv2.imshow("mask", frame2)
        # if detector.frame is not None:
        # tmp = imutils.resize(detector.frame, width=int(W))
        # cv2.imshow("detector", tmp)
        key = cv2.waitKey(40) & 0xFF
        # if the `q` key is pressed, break from the loop
        if key == ord("q"):
            break
    # Stop
    detector.stop()


@socketio.on('connect')
def handle_connect():
    print('Client connected')
    # Start the background task to process frames
    socketio.start_background_task(target=process_frames)
    # process_frames()


# Run the Flask-SocketIO server
if __name__ == '__main__':
    socketio.run(app, port=5000, allow_unsafe_werkzeug=True)
