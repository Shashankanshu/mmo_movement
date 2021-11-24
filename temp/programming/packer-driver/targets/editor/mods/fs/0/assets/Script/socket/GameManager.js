System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Prefab, instantiate, Vec3, systemEvent, SystemEvent, KeyCode, log, Label, Config, SocketConnection, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayer(extras) {
    _reporterNs.report("Player", "../Player", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConfig(extras) {
    _reporterNs.report("Config", "./Config", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSocketConnection(extras) {
    _reporterNs.report("SocketConnection", "./SocketConnection", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      systemEvent = _cc.systemEvent;
      SystemEvent = _cc.SystemEvent;
      KeyCode = _cc.KeyCode;
      log = _cc.log;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      Config = _unresolved_2.Config;
    }, function (_unresolved_3) {
      SocketConnection = _unresolved_3.SocketConnection;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "37737nnzn5AWYq9f2bD2WKU", "GameManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = class GameManager extends (_crd && SocketConnection === void 0 ? (_reportPossibleCrUseOfSocketConnection({
        error: Error()
      }), SocketConnection) : SocketConnection) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerPrefab", _descriptor, this);

          _initializerDefineProperty(this, "fpsText", _descriptor2, this);

          _defineProperty(this, "lastCalledTime", 0);

          _defineProperty(this, "delta", 0);

          _defineProperty(this, "fps", 0);

          _defineProperty(this, "frame", 0);

          _defineProperty(this, "maxFrame", 8);

          _defineProperty(this, "playerMap", {});

          _defineProperty(this, "activeKey", {
            up: 0,
            down: 0,
            left: 0,
            right: 0
          });

          _defineProperty(this, "selfplayer", void 0);

          _defineProperty(this, "isReady", false);

          _defineProperty(this, "speed", 1);
        }

        onLoad() {
          // this.addPlayerToWorld({ x: 0, y: 2, z: 0 }, 'abcdefghij');
          // this.schedule(this.showFps, 1 / 120, macro.REPEAT_FOREVER);
          // setInterval(this.showFps.bind(this), 1000 / 60);
          if (typeof window['gameManager'] !== 'undefined') {
            try {
              window['gameManager'].onGameStart();
            } catch (err) {
              window['gameManager'].onError(err.stack.toString());
            }
          }
        }

        start() {
          super.start();
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          this.isReady = true; // this.schedule(this.updatePosition, 1 / 6, macro.REPEAT_FOREVER);

          setInterval(this.updatePosition.bind(this), 1000 / (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).dataPerSec);
        }

        sendPlayerUpdate() {
          if (!this.isConnected) return;
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
              z: player.livePos.z
            }
          });
          /* log({
              x: player.livePos.x,
              y: player.livePos.y,
              z: player.livePos.z,
          }); */
        }

        onKeyDown(event) {
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

        onKeyUp(event) {
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

          this.selfplayer.clearLoop();
        }

        addPlayerToWorld(player, sessionId) {
          let plyr = instantiate(this.playerPrefab);
          plyr.position.set(new Vec3(player.x, player.y, player.z));
          this.node.parent.addChild(plyr);
          this.playerMap[sessionId] = plyr.getComponent('Player');
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
          if (!this.selfplayer || !this.isReady) return;
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

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fpsText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=GameManager.js.map