System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Vec3, Vec2, Config, _dec, _class, _temp, _crd, ccclass, property, Player;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfConfig(extras) {
    _reporterNs.report("Config", "./socket/Config", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      Config = _unresolved_2.Config;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "353367mNdJIfLLtsBoq0W9j", "Player", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Player", Player = (_dec = ccclass('Player'), _dec(_class = (_temp = class Player extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "livePos", new Vec3(0, 0));

          _defineProperty(this, "positonQueue", []);

          _defineProperty(this, "startPos", void 0);

          _defineProperty(this, "endPos", void 0);

          _defineProperty(this, "queueFrameCount", 0);

          _defineProperty(this, "maxQueueFrames", 15);

          _defineProperty(this, "moveTimeFrameCount", 0);

          _defineProperty(this, "moveTimeFrames", (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).moveTimeByFrame);
        }

        start() {
          this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
          this.endPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z); // setInterval(this.updatePositionNew.bind(this), 1000 / Config.gameFps);

          setInterval(this.updatePosition.bind(this), 1000 / (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).gameFps);
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
              if (this.node.position.x != this.livePos.x && this.node.position.y != this.livePos.y && this.node.position.z != this.livePos.z) {
                this.livePos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
              }

              return;
            }

            this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
            let diffX = this.endPos.x - this.startPos.x;
            this.endPos = this.positonQueue.shift();
            this.endPos.x -= diffX; //  16

            this.queueFrameCount = 0;
            this.moveTimeFrameCount = 1;
          }

          ++this.queueFrameCount; /// Movement Code
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
          target_position.lerp(target_position, 0.1); // this.playerCamera.setPosition(new Vec3(target_position.x, this.node.getPosition().y, target_position.y));
        }

        updateNamePos() {}

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Player.js.map