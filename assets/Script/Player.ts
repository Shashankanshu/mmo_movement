
import { _decorator, Component, Node, Vec3, log, macro, Label, CCObject } from 'cc';
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
    maxQueueFrames = Config.gameFps / Config.dataPerSec;

    // To move the character
    moveTimeFrameCount = 0;
    moveTimeFrames = Config.moveTimeByFrame;

    start() {
        this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
        this.endPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);

        // setInterval(this.updateOld.bind(this), 1000 / Config.gameFps);
        setInterval(this.updatePosition.bind(this), 1000 / Config.gameFps);
    }

    onPositionUpdate(plyr) {
        if (this.positonQueue.length < 1)
            this.positonQueue.push(new Vec3(plyr.x, plyr.y, plyr.z));
        // this.node.position = new Vec3(plyr.x, plyr.y, plyr.z);
    }

    updatePosition(dt) {

        if (this.queueFrameCount > this.maxQueueFrames) {

            if (this.positonQueue.length == 0)
                return;

            // let diffX = this.endPos.x - this.node.position.x;

            // this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
            // this.endPos = this.positonQueue.shift();

            this.positonQueue.shift();

            this.startPos = new Vec3(0, 2, 0);
            this.endPos = new Vec3(5, 2, 0);

            // log('SartPos- ', this.startPos.x);
            // log('EndPos- ', this.endPos.x);

            // this.endPos.x -= diffX;

            this.queueFrameCount = 1;
            this.moveTimeFrameCount = 1;
        }

        if (this.moveTimeFrameCount < this.moveTimeFrames + 1) {

            let pos = Vec3.lerp(new Vec3(), this.startPos, this.endPos, this.moveTimeFrameCount / this.moveTimeFrames);
            log(pos.x);
            this.node.position = pos;

        }

        ++this.moveTimeFrameCount;
        ++this.queueFrameCount;


    }
}