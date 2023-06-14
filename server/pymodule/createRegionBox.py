import cv2
import cv2.aruco as aruco
import numpy as np
import imutils
import time
# Load the image
image_path = r"C:\Users\kris.nguyen\Projects\FinalSchoolProjectGoKart\gokartweb\pymodule\testImage\18.png"
image = cv2.imread(image_path)

# Define the ArUco dictionary
aruco_dict = aruco.Dictionary_get(aruco.DICT_4X4_100)

# Initialize the ArUco parameters
parameters = aruco.DetectorParameters_create()

parameters.minMarkerPerimeterRate = 0.02
parameters.perspectiveRemoveIgnoredMarginPerCell = 0.15
parameters.perspectiveRemovePixelPerCell = 8
parameters.minCornerDistanceRate = 0.05
parameters.cornerRefinementMethod = cv2.aruco.CORNER_REFINE_SUBPIX

image = imutils.rotate_bound(image, 30)

# image = cv2.GaussianBlur(image, (15, 15), 3)



cv2.waitKey(0)

# Detect the markers
corners, ids, rejected = aruco.detectMarkers(image, aruco_dict, parameters=parameters)

image_area = image.shape[0] * image.shape[1]

# Initialize the total box area
total_box_area = 0

# Draw boxes around the detected markers
if ids is not None:
    for i in range(len(corners)):
        # Get the corner points of the marker
        marker_corners = corners[i][0]

        # Calculate the top-left (x1, y1) and bottom-right (x2, y2) coordinates of the box
        x1 = int(marker_corners[:, 0].min()) - int((marker_corners[:, 0].max() - marker_corners[:, 0].min()) * 1.3)
        y1 = int(marker_corners[:, 1].min()) - int((marker_corners[:, 1].max() - marker_corners[:, 1].min()) * 1.3)
        x2 = int(marker_corners[:, 0].max()) + int((marker_corners[:, 0].max() - marker_corners[:, 0].min()) * 1.3)
        y2 = int(marker_corners[:, 1].max()) + int((marker_corners[:, 1].max() - marker_corners[:, 1].min()) * 1.3)

        # Check if the box exceeds the image boundaries
        x1 = max(0, x1)
        y1 = max(0, y1)
        x2 = min(image.shape[1], x2)
        y2 = min(image.shape[0], y2)

         # Calculate the area of the box
        box_area = (x2 - x1) * (y2 - y1)

        # Add the box area to the total box area
        total_box_area += box_area

        # Draw the box around the marker
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Print the coordinates of the box
        print(f"({x1}, {y1}, {x2}, {y2}),")

# Display the image with the detected markers and boxes
percentage = (total_box_area / image_area) * 100
print("percentage", percentage)
cv2.imshow("ArUco Detection", image)
cv2.waitKey(0)
cv2.destroyAllWindows()