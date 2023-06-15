from math import sqrt

# format
# {
#     "id": number,
#     "lap": number
#     "count": number,
#     "total_speed": number (km/h),
#     "last_x": number (cm),
#     "last_y": number (cm),
#     "last_t": number (ns),
#     "average_speed": number (km/h),
# }


def calculate_average_speed(objects):
    speeds = {}
    finish_min_y = 200
    finish_max_y = 420
    distance_threshold = 80
    for obj in objects:
        obj_id = obj['id']
        if obj_id not in speeds:
            # put init info if id does not exist
            speeds[obj_id] = {'count': 1, 'total_speed': 0, 'last_x': obj['X'],
                              'last_y': obj['Y'], 'last_t': obj['T'], 'current_lap': 0, 'lap_time': [], 'lap_speed': []}
        else:
            # if not hasattr(speeds[obj_id], 'lap_speed'):
            #     speeds[obj_id]['lap_speed'] = []
            # skip the frame if the 'T' is overlap with the previous frame
            dt = (obj['T'] - speeds[obj_id]['last_t']) / 1e9
            if (dt == 0):
                continue
            # first time pass the finish line
            if (obj['Y'] > finish_max_y and speeds[obj_id]['current_lap'] == 0):
                speeds[obj_id]['end_prev_lap'] = obj['T']
                speeds[obj_id]['current_lap'] = 1
            # calculate next time pass the finish line
            elif (speeds[obj_id]['last_y'] > obj['Y'] + distance_threshold and speeds[obj_id]['current_lap'] != 0):
                speeds[obj_id]['lap_time'].append((obj['T'] -
                                                  speeds[obj_id]['end_prev_lap']) / 1e9)
                speeds[obj_id]['current_lap'] += 1
                speeds[obj_id]['end_prev_lap'] = obj['T']
                speeds[obj_id]['count'] = 0
                speeds[obj_id]['total_speed'] = 0
            dx = obj['X'] - speeds[obj_id]['last_x']
            dy = obj['Y'] - speeds[obj_id]['last_y']
            speed = sqrt(dx**2 + dy**2) / 100 / dt * 3.6
            speeds[obj_id]['count'] += 1
            speeds[obj_id]['total_speed'] += speed
            speeds[obj_id]['last_x'] = obj['X']
            speeds[obj_id]['last_y'] = obj['Y']
            speeds[obj_id]['last_t'] = obj['T']

        # calculate speed for each lap
        for obj_id, data in speeds.items():
            average_speed = data['total_speed'] / data['count']
            current_lap = speeds[obj_id]['current_lap']
            n_speed = len(speeds[obj_id]['lap_speed'])
            if current_lap > 1:
                if current_lap > n_speed + 1:
                    speeds[obj_id]['lap_speed'].append(0)
                speeds[obj_id]['lap_speed'][current_lap - 2] = average_speed
    return speeds
