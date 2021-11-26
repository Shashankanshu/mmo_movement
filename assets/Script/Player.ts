
import { _decorator, Component, Node, Vec3, log, macro, Label, CCObject, Vec2 } from 'cc';
import { Config } from './socket/Config';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    livePos: Vec3 = new Vec3(0, 0);

    positonQueue: Vec3[] = [];
    startPos: Vec3;
    endPos: Vec3;

    // To fetch coordinate from pool
    queueFrameCount = 0;
    maxQueueFrames = 15; //Config.gameFps / Config.dataPerSec;

    // To move the character
    moveTimeFrameCount = 0;
    moveTimeFrames = Config.moveTimeByFrame;

    start() {
        this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
        this.endPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);

        // setInterval(this.updatePositionNew.bind(this), 1000 / Config.gameFps);
        setInterval(this.updatePosition.bind(this), 1000 / Config.gameFps);
    }

    onPositionUpdate(plyr) {
        // data from server
        this.positonQueue.push(new Vec3(plyr.x, plyr.y, plyr.z));
    }

    updatePosition(dt) {

        // RTT Code

        // 60 / 10 =  6

        if (this.queueFrameCount > this.maxQueueFrames) {

            if (this.positonQueue.length == 0) {

                if (this.node.position.x != this.livePos.x &&
                    this.node.position.y != this.livePos.y &&
                    this.node.position.z != this.livePos.z) {

                    this.livePos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
                }
                return;
            }

            this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);

            let diffX = this.endPos.x - this.startPos.x;

            this.endPos = this.positonQueue.shift();

            this.endPos.x -= diffX;  //  16

            this.queueFrameCount = 0;
            this.moveTimeFrameCount = 1;
        }
        ++this.queueFrameCount;

        /// Movement Code
        // 1---20
        if (this.moveTimeFrameCount < this.moveTimeFrames + 1) {
            // let pos = Vec3.lerp(new Vec3(), this.startPos, this.endPos, this.moveTimeFrameCount / this.moveTimeFrames);
            // log(pos.x);
            this.node.position = Vec3.lerp(new Vec3(), this.startPos, this.endPos, this.moveTimeFrameCount / this.moveTimeFrames);
        }
        ++this.moveTimeFrameCount;


    }


    updatePositionNew(dt) {

        if (this.queueFrameCount > this.maxQueueFrames) {

            if (this.positonQueue.length == 0) {
                return;
            }

            this.startPos = this.endPos;
            this.endPos = this.positonQueue.shift();

            this.queueFrameCount = 0;
            this.moveTimeFrameCount = 1;
        }

        this.node.position = Vec3.lerp(new Vec3(), this.startPos, this.endPos, this.queueFrameCount / this.maxQueueFrames);
        ++this.queueFrameCount;

    }

    updateCamera() {
        let target_position = new Vec2(this.node.getPosition().x, this.node.getPosition().z);
        target_position.lerp(target_position, 0.1);
        // this.playerCamera.setPosition(new Vec3(target_position.x, this.node.getPosition().y, target_position.y));
    }

    updateNamePos(){

    }
}