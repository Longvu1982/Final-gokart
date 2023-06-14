import cv2
import numpy as np
from PIL import Image
import PIL
import os
import glob
path = 'D:/project/gokartweb/pymodule/savedFrame'
cap = cv2.VideoCapture('rtsp://user:gokart2020@192.168.1.5:554/H264?ch=1&subtype=0')

count = 0
frameCount = 0
while True:
    frameCount = frameCount + 1

    ret, frame = cap.read()

    cv2.imshow("Capturing",frame)
    
    if(frameCount >= 300):
        break
    if(frameCount % 10 == 0):
        count = count + 1
        #save frame to path
        cv2.imwrite(os.path.join(path, 'file' + str(count) + '.png'), frame )
        # cv2.imwrite('file' + str(count) + '.png', frame)
    

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

