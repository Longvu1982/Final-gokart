from math import sqrt


def calculate_average_speed(objects):
    speeds = {}
    for obj in objects:
        obj_id = obj['id']
        if obj_id not in speeds:
            speeds[obj_id] = {'count': 1, 'total_speed': 0,
                              'last_x': obj['X'], 'last_y': obj['Y'], 'last_t': obj['T']}
        else:
            dx = obj['X'] - speeds[obj_id]['last_x']
            dy = obj['Y'] - speeds[obj_id]['last_y']
            dt = (obj['T'] - speeds[obj_id]['last_t']) / 1e9
            if (dt == 0):
                dt = 1e9
            speed = sqrt(dx**2 + dy**2) / 100 / dt * 3.6
            speeds[obj_id]['count'] += 1
            speeds[obj_id]['total_speed'] += speed
            speeds[obj_id]['last_x'] = obj['X']
            speeds[obj_id]['last_y'] = obj['Y']
            speeds[obj_id]['last_t'] = obj['T']

    for obj_id, data in speeds.items():
        average_speed = data['total_speed'] / data['count']
        speeds[obj_id]['average_speed'] = average_speed
    return speeds
