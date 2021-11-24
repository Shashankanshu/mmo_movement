
import { _decorator, Component, Node, Vec3, log, macro, Label, CCObject } from 'cc';
import { Config } from './socket/Config';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    positonStack: Vec3[] = [];
    startPos: Vec3;
    endPos: Vec3;

    frames = 0;
    // To fetch coordinate from pool
    maxFrames = Config.gameFps / Config.dataPerSec;


    speed = Config.moveSpeed;
    livePos: Vec3 = new Vec3(0, 0);

    start() {
        this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
        this.endPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);

        // setInterval(this.updateOld.bind(this), 1000 / Config.gameFps);
        setInterval(this.updatePosition.bind(this), 1000 / Config.gameFps);
    }

    onPositionUpdate(plyr) {
        if (this.positonStack.length < 1)
            this.positonStack.push(new Vec3(plyr.x, plyr.y, plyr.z));
        // this.node.position = new Vec3(plyr.x, plyr.y, plyr.z);
    }

    clearLoop() {
        return;
        if (this.positonStack.length)
            this.livePos = this.positonStack.shift();
        this.positonStack.length = 0;
    }

    updatePosition(dt) {

        if (this.frames > this.maxFrames) {

            if (this.positonStack.length == 0)
                return;

            // let diffX = this.endPos.x - this.node.position.x;

            // this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
            // this.endPos = this.positonStack.shift();

            this.positonStack.shift();

            this.startPos = new Vec3(0, 0, 0);
            this.endPos = new Vec3(5, 0, 0);

            // log('SartPos- ', this.startPos.x);
            // log('EndPos- ', this.endPos.x);

            // this.endPos.x -= diffX;

            this.frames = 0;
        }

        let pos = Vec3.lerp(new Vec3(), this.startPos, this.endPos, this.frames / this.maxFrames);
        log(pos.x);
        this.node.position = pos;
        ++this.frames;
    }
}