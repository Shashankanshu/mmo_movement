
import { _decorator, Prefab, instantiate, Vec3, EventKeyboard, systemEvent, SystemEvent, KeyCode, log, macro, Label, Vec2 } from 'cc';
import { Player } from '../Player';
import { Config } from './Config';
import { SocketConnection } from './SocketConnection';
const { ccclass, property } = _decorator;

const CELL_TIME = 0.016;

@ccclass('GameManager')
export class GameManager extends SocketConnection {

    @property({ type: Prefab })
    playerPrefab: Prefab = null;

    @property({ type: Label })
    fpsText: Label = null;

    lastCalledTime = 0;
    delta = 0;
    fps = 0;

    frame = 0;
    maxFrame = 8;

    playerMap: { [key: string]: Player } = {};

    activeKey = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
    };

    selfplayer: Player;

    isReady = false;
    speed = 2;



    private _currentPlayerPosition: Vec3 = Vec3.ZERO;
    private _vector: Vec3 = Vec3.ZERO;
    private _vectorAngle: Vec3 = Vec3.ZERO;
    private _now_time = 0;
    public _charName: string = "LOL";

    public eatTimeout = null;
    public gameController = null;

    start() {
        super.start();

        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.isReady = true;

        // this.schedule(this.updatePosition, 1 / 6, macro.REPEAT_FOREVER);
        setInterval(this.updatePosition.bind(this), 1000 / Config.dataPerSec);

    }

    sendPlayerUpdate() {
        if (!this.isConnected)
            return;

        let player = this.playerMap[this.room.sessionId];
        this.send({
            command: 'PLAYER_POS',
            data: {
                x: player.livePos.x,
                y: player.livePos.y,
                z: player.livePos.z,
            }
        });
    }

    addPlayerToWorld(player, sessionId) {

        let plyr = instantiate(this.playerPrefab);
        plyr.position.set(new Vec3(player.x, player.y, player.z));
        this.node.parent.addChild(plyr);

        this.playerMap[sessionId] = plyr.getComponent('Player') as Player;
        this.playerMap[sessionId].livePos = new Vec3(player.x, player.y, player.z);

        if (this.room.sessionId == sessionId) {
            this.selfplayer = this.playerMap[sessionId];
        }
    }

    onPlayerChange(playerContext) {

        // if (playerContext.sessionId != this.room.sessionId)
        this.playerMap[playerContext.sessionId].onPositionUpdate(playerContext);
    }

    showFps() {
        if (!this.lastCalledTime) {
            this.lastCalledTime = Date.now();
            this.fps = 0;
            return;
        }
        this.delta = (Date.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = Date.now();
        this.fps = 1 / this.delta;

        this.fpsText.string = Math.floor(this.fps) + '';
    }

    touchCallBack(vector: Vec3, angle: number) {
        // this.selfplayer.touchCallBack(vector, angle);
    }

    updatePosition() {

        this.showFps();

        if (!this.selfplayer || !this.isReady)
            return;

        let pos = new Vec3();

        if (this.activeKey.left == 1) {
            // pos = this.selfplayer.node.position.add3f(-this.speed, 0, 0);
            // this.selfplayer.node.position = pos;
            pos = this.selfplayer.livePos.add3f(-this.speed, 0, 0);
            this.selfplayer.livePos = pos;
        }

        if (this.activeKey.right == 1) {
            // pos = this.selfplayer.node.position.add3f(this.speed, 0, 0);
            // this.selfplayer.node.position = pos;
            pos = this.selfplayer.livePos.add3f(this.speed, 0, 0);
            this.selfplayer.livePos = pos;
        }

        if (this.activeKey.up == 1) {
            // pos = this.selfplayer.node.position.add3f(0, 0, -this.speed);
            // this.selfplayer.node.position = pos;
            pos = this.selfplayer.livePos.add3f(0, 0, -this.speed);
            this.selfplayer.livePos = pos;
        }

        if (this.activeKey.down == 1) {
            // pos = this.selfplayer.node.position.add3f(0, 0, this.speed);
            // this.selfplayer.node.position = pos;
            pos = this.selfplayer.livePos.add3f(0, 0, this.speed);
            this.selfplayer.livePos = pos;
        }

        if (this.activeKey.up || this.activeKey.down || this.activeKey.left || this.activeKey.right) {
            this.sendPlayerUpdate();
        }

    }



    fix_update(dt: number) {

        this.updateNamePos();

        if (this._currentState == STATE.BUMP) {
            let vec = new Vec3();
            this.node.getComponent(RigidBody).getLinearVelocity(vec);
            let mag = Math.sqrt(vec.x * vec.x + vec.z * vec.z);

            if (mag <= 0.2) {

                this.getComponent(RigidBodyComponent).clearVelocity();
                this.setIdleStateAnimation();

            } else
                return;

        }

        if (this._vector.lengthSqr() > 0) {
            if (this._currentState == STATE.IDLE) {
                this.setWalkStateAnimation();
            }

            this.node.setPosition(this.node.position.add3f(this._vector.x * this.speed * dt, 0, -this._vector.y * this.speed * dt));

            this._currentPlayerPosition = new Vec3(this._vector.x, 0, this._vector.y);

            this.playerCamera.setPosition(this.playerCamera.position.add3f(this._vector.x * this.speed * dt, 0, 0));

            // this.updateNamePos();
        }
        else {
            if (this._currentState == STATE.WALK) {
                this.setIdleStateAnimation();
            }
            // this.node.setPosition(this.node.position.add3f(this._currentPlayerPosition.x * this.speed * dt, 0, -this._currentPlayerPosition.z * this.speed * dt));

        }

        /* if (this._vectorAngle.lengthSqr() > 0) {
            this.playerCamera.eulerAngles = this.playerCamera.eulerAngles.add3f(0, -this._vectorAngle.x, 0);
        } */
    }

    update(deltaTime: number) {

        if (!this.isReady)
            return;

        this._now_time += deltaTime;

        while (this._now_time >= CELL_TIME) {

            this.fix_update(CELL_TIME);
            this.updateCamera();

            this._now_time -= CELL_TIME;
        }
    }


    onKeyDown(event: EventKeyboard) {

        switch (event.keyCode) {

            case KeyCode.ARROW_LEFT:
                this.activeKey.left = 1;
                break;

            case KeyCode.ARROW_UP:
                this.activeKey.up = 1;
                break;

            case KeyCode.ARROW_RIGHT:
                this.activeKey.right = 1;
                break;

            case KeyCode.ARROW_DOWN:
                this.activeKey.down = 1;
                break;

            default:
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {

            case KeyCode.ARROW_LEFT:
                this.activeKey.left = 0;
                break;

            case KeyCode.ARROW_UP:
                this.activeKey.up = 0;
                break;

            case KeyCode.ARROW_RIGHT:
                this.activeKey.right = 0;
                break;

            case KeyCode.ARROW_DOWN:
                this.activeKey.down = 0;
                break;

            default:
                break;
        }
    }

}