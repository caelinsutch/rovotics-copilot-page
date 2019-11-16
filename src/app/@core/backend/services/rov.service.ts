import {Injectable, OnDestroy} from '@angular/core';
import 'assets/roslib';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

declare const ROSLIB;

@Injectable({
    providedIn: 'root',
})
export class RovService implements OnDestroy {
    private ros;
    public connected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    ngOnDestroy(): void {
        for (let i = 0; i < this.topicInformation.length; i++) {
            this.subscribers[i].unsubscribe();
        }
    }

    /**
     * List of subscriber information that is later initialized
     */
    private topicInformation = [
        {key: 'verticalDrive', name: '/rov/cmd_horizontal_vdrive', messageType: 'vector_drive/thrusterPercents'},
        {key: 'horizontalDrive', name: '/rov/cmd_horizontal_hdrive', messageType: 'vector_drive/thrusterPercents'},
        {key: 'drq1', name: '/rov/drq1250_1', messageType: 'drq1250/DRQ1250'},
        {key: 'drq2', name: '/rov/drq1250_2', messageType: 'drq1250/DRQ1250'},
        {key: 'cameras', name: '/rov/camera_select', messageType: 'std_msgs/UInt8'},
        {key: 'inversion', name: '/rov/inversion', messageType: 'std_msgs/UInt8'},
        {key: 'sensitivity', name: '/rov/sensitivity', messageType: 'rov_control_interface/rov_sensitivity'},
        {key: 'thrusterStatus', name: '/rov/thruster_status', messageType: 'std_msgs/Bool'},
        {key: 'cameraSelect', name: '/rov/camera_select', messageType: 'std_msgs/UInt8'},
        {key: 'tcuPower', name: '/tcu/main_relay', messageType: 'std_msgs/Bool'},
        {key: 'externalTelemetry', name: '/rov/ms5837', messageType: 'ms5837/ms5837_data'},
        {key: 'verticalPidSetPoint', name: '/depth_hold/setpoint', messageType: 'std_msgs/Float64'},
        {key: 'test', name: '/test', messageType: 'std_msgs/UInt8'},
    ];

    /**
     * Array of subscribers
     */
    private subscribers = Array<RosSubscriber>();

    constructor(
    ) {
        this.ros = new ROSLIB.Ros({
            url: 'ws://master:9090',
        });

        this.connected.next(false);
        this.initializeRosConnection();
        this.initializeRov();
    }

    initializeRosConnection(): boolean {
        this.ros.on('error', (e) => {
            // TODO Alert User
        });
        this.ros.on('connection', () => {
            this.connected.next(true);
            // TODO Alert
        });
        this.ros.on('close', () => {this.connected.next(false)});
        return true;
    }

    initializeRov(): boolean {
        /**
         * Initializes all ROS connections
         */
        for (let i = 0; i < this.topicInformation.length; i++) {
            this.subscribers[i] = new RosSubscriber(this.topicInformation[i].key, this.topicInformation[i].name, this.topicInformation[i].messageType, this.ros);
        }
        return true;
    }
    //
    // publishTopic(key, data): void {
    //     this.subscribers.find(o => o.key === key).publish(data);
    // }
    //
    // subscribeTopic(key): Observable<any> {
    //     return this.subscribers.find(key).data;
    // }

    topic(key: string) {
        return this.subscribers.find(o => o.key === key);
    }

    // TOPIC Subscribers
}

/**
 * Generic ROS subscriber
 * @param name: string- Topic name
 * @param messageType: string - i.e. 'vector_drive/thrusterPercents'
 * @param ROS - initialized ros object
 */
export class RosSubscriber {

    public key: string;
    private _data: Subject<any>;
    private lastValue: any;
    private topic: any;

    constructor(
        public _key: string,
        private  name: string,
        private messageType: string,
        private ros: any,
    ) {
        this.key = _key;
        this.initialize();
    }

    /**
     * Initialize the ROS connection using the information passed in
     */
    initialize() {
        this.topic = new ROSLIB.Topic({
            ros: this.ros,
            name: this.name,
            messageType: this.messageType,
        });
        this._data = new Subject<any>();

        this.topic.subscribe((message) => {
            // Check that you aren't subscribing to last published value, prevent echo
            this._data.next(message);
        });
    }

    /**
     * Publish data
     * @param data - Object representing completed ROS message object
     */
    publish(data): boolean {
        // console.log(data);
        if (data !== this.lastValue) {
            const message = new ROSLIB.Message(data);
            this.lastValue = message;
            this.topic.publish(message);
        }
        return true;
    }

    unsubscribe() {
        this.topic.unsubscribe();
    }

    /**
     * Returns Data as observable
     */
    get data(): Observable<any> {
        return this._data.asObservable();
    }
}
