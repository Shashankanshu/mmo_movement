System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Vec3, log, Config, _dec, _class, _temp, _crd, ccclass, property, Player;

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
      log = _cc.log;
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

          _defineProperty(this, "positonStack", []);

          _defineProperty(this, "startPos", void 0);

          _defineProperty(this, "endPos", void 0);

          _defineProperty(this, "frames", 0);

          _defineProperty(this, "maxFrames", (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).gameFps / (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).dataPerSec);

          _defineProperty(this, "speed", (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).moveSpeed);

          _defineProperty(this, "livePos", new Vec3(0, 0));
        }

        start() {
          this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
          this.endPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z); // setInterval(this.updateOld.bind(this), 1000 / Config.gameFps);

          setInterval(this.updatePosition.bind(this), 1000 / (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).gameFps);
        }

        onPositionUpdate(plyr) {
          if (this.positonStack.length < 1) this.positonStack.push(new Vec3(plyr.x, plyr.y, plyr.z)); // this.node.position = new Vec3(plyr.x, plyr.y, plyr.z);
        }

        clearLoop() {
          return;
          if (this.positonStack.length) this.livePos = this.positonStack.shift();
          this.positonStack.length = 0;
        }

        updatePosition(dt) {
          if (this.frames > this.maxFrames) {
            if (this.positonStack.length == 0) return; // let diffX = this.endPos.x - this.node.position.x;
            // this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
            // this.endPos = this.positonStack.shift();

            this.positonStack.shift();
            this.startPos = new Vec3(0, 0, 0);
            this.endPos = new Vec3(5, 0, 0); // log('SartPos- ', this.startPos.x);
            // log('EndPos- ', this.endPos.x);
            // this.endPos.x -= diffX;

            this.frames = 0;
          }

          let pos = Vec3.lerp(new Vec3(), this.startPos, this.endPos, this.frames / this.maxFrames);
          log(pos.x);
          this.node.position = pos;
          ++this.frames;
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Player.js.map