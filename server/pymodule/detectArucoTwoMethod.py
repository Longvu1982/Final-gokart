import cv2
import time
import imutils

# Load the ArUco dictionary and parameters
aruco_dict = cv2.aruco.Dictionary_get(cv2.aruco.DICT_4X4_50)
aruco_params = cv2.aruco.DetectorParameters_create()

# Load the input image
image = cv2.imread(
    r"C:\Users\kris.nguyen\Projects\FinalSchoolProjectGoKart\gokartweb\pymodule\testImage\18.png")
# image = cv2.resize(image, (1280,720))

# Define the coordinates of the boxes
boxes = [
(392, 918, 1049, 1575),
(1939, 854, 2406, 1369),
(407, 185, 1064, 842),
(649, 0, 1929, 1207),
(1283, 1445, 1798, 1960),
(923, 537, 1956, 1570),
]

image = imutils.rotate_bound(image, 30)

# image = cv2.GaussianBlur(image, (15, 15), 3)

# normal detection
def normal_detect():
    corners, ids, rejected = cv2.aruco.detectMarkers(
        image, aruco_dict, parameters=aruco_params)
    if len(corners) > 0:
        cv2.aruco.drawDetectedMarkers(image, corners, ids)
        # return

# use the bounding box (region of interest)


def roi_detect():
    for box in boxes:
        x1, y1, x2, y2 = box
        # Extract the region of interest (ROI) from the image based on the box coordinates
        roi = image[y1:y2, x1:x2]

        # Detect ArUco markers within the ROI
        corners, ids, _ = cv2.aruco.detectMarkers(
            roi, aruco_dict, parameters=aruco_params)

        # Draw the detected markers on the ROI
        if len(corners) > 0:
            cv2.aruco.drawDetectedMarkers(roi, corners, ids)

        # Draw the box on the original image


# Start the timer
start_time = time.time()
# normal_detect()
roi_detect()
# End the timer
end_time = time.time()

# Calculate the detection process time
process_time = end_time - start_time

# Display the image with markers and boxes
cv2.imshow("ArUco Markers", image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# Print the process time
print("ArUco detection process time:", process_time, "seconds")
