System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Prefab, instantiate, Vec3, systemEvent, SystemEvent, KeyCode, Label, Vec2, Config, SocketConnection, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _crd, ccclass, property, CELL_TIME, GameManager;

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
      Label = _cc.Label;
      Vec2 = _cc.Vec2;
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
      CELL_TIME = 0.016;

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

          _defineProperty(this, "speed", 2);

          _defineProperty(this, "_currentPlayerPosition", Vec3.ZERO);

          _defineProperty(this, "_vector", Vec3.ZERO);

          _defineProperty(this, "_vectorAngle", Vec3.ZERO);

          _defineProperty(this, "_now_time", 0);

          _defineProperty(this, "_charName", "LOL");

          _defineProperty(this, "eatTimeout", null);

          _defineProperty(this, "gameController", null);
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
          this.send({
            command: 'PLAYER_POS',
            data: {
              x: player.livePos.x,
              y: player.livePos.y,
              z: player.livePos.z
            }
          });
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

        touchCallBack(vector, angle) {// this.selfplayer.touchCallBack(vector, angle);
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

        fix_update(dt) {
          this.updateNamePos();

          if (this._currentState == STATE.BUMP) {
            let vec = new Vec3();
            this.node.getComponent(RigidBody).getLinearVelocity(vec);
            let mag = Math.sqrt(vec.x * vec.x + vec.z * vec.z);

            if (mag <= 0.2) {
              this.getComponent(RigidBodyComponent).clearVelocity();
              this.setIdleStateAnimation();
            } else return;
          }

          if (this._vector.lengthSqr() > 0) {
            if (this._currentState == STATE.IDLE) {
              this.setWalkStateAnimation();
            }

            this.node.setPosition(this.node.position.add3f(this._vector.x * this.speed * dt, 0, -this._vector.y * this.speed * dt));
            this._currentPlayerPosition = new Vec3(this._vector.x, 0, this._vector.y);
            this.playerCamera.setPosition(this.playerCamera.position.add3f(this._vector.x * this.speed * dt, 0, 0)); // this.updateNamePos();
          } else {
            if (this._currentState == STATE.WALK) {
              this.setIdleStateAnimation();
            } // this.node.setPosition(this.node.position.add3f(this._currentPlayerPosition.x * this.speed * dt, 0, -this._currentPlayerPosition.z * this.speed * dt));

          }
          /* if (this._vectorAngle.lengthSqr() > 0) {
              this.playerCamera.eulerAngles = this.playerCamera.eulerAngles.add3f(0, -this._vectorAngle.x, 0);
          } */

        }

        updateCamera() {
          let target_position = new Vec2(this.node.getPosition().x, this.node.getPosition().z);
          target_position.lerp(target_position, 0.1);
          this.playerCamera.setPosition(new Vec3(target_position.x, this.node.getPosition().y, target_position.y));
        }

        update(deltaTime) {
          if (!this.isReady) return;
          this._now_time += deltaTime;

          while (this._now_time >= CELL_TIME) {
            this.fix_update(CELL_TIME);
            this.updateCamera();
            this._now_time -= CELL_TIME;
          }
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