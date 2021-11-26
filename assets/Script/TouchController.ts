
import { _decorator, Component, Node, Vec2, EventHandler, EventTouch, Vec3, director, macro } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TouchController')
export class TouchController extends Component {

    startLoc: Vec2;

    @property({
        type: [EventHandler],
        tooltip: 'Touch Event Listener'
    })
    touchEventCallBack: EventHandler[] = [];

    start() {
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnded, this);
    }

    touchMove(touch: EventTouch) {
        let loc = touch.getLocation();
        let pos = new Vec3(loc.x - this.startLoc.x, loc.y - this.startLoc.y);

        let mag = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        if (mag > 200) {
            this.startLoc = this.startLoc.lerp(loc, 0.9);
            pos = new Vec3(loc.x - this.startLoc.x, loc.y - this.startLoc.y);
        }

        let angle = this.get_angle(this.startLoc.x, this.startLoc.y, loc.x, loc.y);
        this.touchEventCallBack.forEach(c => c.emit([pos, angle]));
    }

    touchEnded(touch: EventTouch) {
        this.touchEventCallBack.forEach(c => c.emit([new Vec3(0, 0, 0)]));
    }

    touchStart(touch: EventTouch) {
        this.startLoc = touch.getLocation();
        this.touchMove(touch);
    }

    get_angle(cx: number, cy: number, ex: number, ey: number) {
        let dy = ey - cy;
        let dx = ex - cx;
        let theta = Math.atan2(dy, dx);
        // theta *= 180 / Math.PI;
        return theta * macro.DEG;
    }

    restartGame() {
        director.loadScene('GameScene');
    }

}