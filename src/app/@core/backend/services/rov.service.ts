import {Injectable} from '@angular/core';
import 'assets/roslib'
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {RovData, RovInterface} from '../../interfaces/rov.interface';

@Injectable({
    providedIn: 'root',
})
export class RovService {
    private ros;
    private subscriberConnected: BehaviorSubject<boolean>;
    private rov: RovInterface;

    /**
     * List of subscriber information that is later initialized
     */
    private subscriberInformation = [
        {key: 'horizontalDrive', name: '/rov/cmd_horizontal_vdrive', messageType: 'vector_drive/thrusterPercents'},
        {key: 'test', name: '/test', messageType: 'std_msgs/UInt8'},
    ];

    /**
     * Array of subscribers
     */
    private subscribers = Array<rosSubscriber>();

    constructor() {
        this.ros = new ROSLIB.Ros({
            url: 'ws://master:9090'
        });

        this.subscriberConnected = new BehaviorSubject<boolean>(false);
        this.initializeRosConnection();
        this.initializeRov();
    }x

    initializeRosConnection(): boolean {
        this.ros.on('error', (e) => { console.log(e)});
        this.ros.on('connection', () => {this.subscriberConnected.next(true); console.log('connected')});
        this.ros.on('close', () => {this.subscriberConnected.next(false)});
        const listener = new ROSLIB.Topic({
            ros: this.ros,
            name: '/test',
            messageType: 'std_msgs/UInt8',
        });
        listener.subscribe(msg => {console.log(msg)})
        return true;
    }

    initializeRov(): boolean {
        console.log('Initializing');
        /**
         * Initializes all ROS connections
         */
        // for (let i = 0; i < this.subscriberInformation.length; i++) {
        //     this.subscribers[i] = new rosSubscriber(this.subscriberInformation[i].key, this.subscriberInformation[i].name, this.subscriberInformation[i].messageType, this.ros);
        //     console.log('Initializing subsribers');
        //     this.subscribers[i].initialize();
        // }
        // this.subscribers.find(o => o.key === 'test').data.subscribe(v => console.log(v));
        return true;
    }

}

/**
 * Generic ROS subscriber
 * @param name: string- Topic name
 * @param messageType: string - i.e. 'vector_drive/thrusterPercents'
 * @param ROS - initialized ros object
 */
export class rosSubscriber {

    public key: string;
    private _data: Subject<any>;
    private lastPublishedValue: any;
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
            messageType: this.messageType
        });
        this._data = new Subject<any>();
        console.log('t');

        this.topic.subscribe((message) => {
            // Check that you aren't subscribing to last published value, prevent echo
            console.log(message);
            message !== this.lastPublishedValue ? this._data.next(message) : null;
        })
    }

    publish(data): boolean {
        const message = new ROSLIB.Message({
            data,
        });
        this.lastPublishedValue = data;
        return this.topic.publish(message).then(value => {
            return true;
        }, reason => {
            return false;
        })
    }

    get data(): Observable<any> {
        return this._data.asObservable();
    }
}
