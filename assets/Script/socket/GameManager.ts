
import { _decorator, Prefab, instantiate, Vec3, EventKeyboard, systemEvent, SystemEvent, KeyCode, log, macro, Label } from 'cc';
import { Player } from '../Player';
import { Config } from './Config';
import { SocketConnection } from './SocketConnection';
const { ccclass, property } = _decorator;

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
    speed = 1;

    onLoad() {
        // this.addPlayerToWorld({ x: 0, y: 2, z: 0 }, 'abcdefghij');
        // this.schedule(this.showFps, 1 / 120, macro.REPEAT_FOREVER);
        // setInterval(this.showFps.bind(this), 1000 / 60);

        if (typeof window['gameManager'] !== 'undefined') {
            try {
                window['gameManager'].onGameStart()
            } catch (err) {
                window['gameManager'].onError(err.stack.toString())
            }
        }
    }

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
        /* this.send({
            command: 'PLAYER_POS',
            data: {
                x: player.node.position.x,
                y: player.node.position.y,
                z: player.node.position.z,
            }
        }); */
        this.send({
            command: 'PLAYER_POS',
            data: {
                x: player.livePos.x,
                y: player.livePos.y,
                z: player.livePos.z,
            }
        });

        /* log({
            x: player.livePos.x,
            y: player.livePos.y,
            z: player.livePos.z,
        }); */

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

        log('key press');

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

}