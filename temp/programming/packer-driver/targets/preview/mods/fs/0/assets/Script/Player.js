System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Vec3, Vec2, Config, _dec, _class, _temp, _crd, ccclass, property, Player;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Player", Player = (_dec = ccclass('Player'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Player, _Component);

        function Player() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "livePos", new Vec3(0, 0));

          _defineProperty(_assertThisInitialized(_this), "positonQueue", []);

          _defineProperty(_assertThisInitialized(_this), "startPos", void 0);

          _defineProperty(_assertThisInitialized(_this), "endPos", void 0);

          _defineProperty(_assertThisInitialized(_this), "queueFrameCount", 0);

          _defineProperty(_assertThisInitialized(_this), "maxQueueFrames", 15);

          _defineProperty(_assertThisInitialized(_this), "moveTimeFrameCount", 0);

          _defineProperty(_assertThisInitialized(_this), "moveTimeFrames", (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).moveTimeByFrame);

          return _this;
        }

        var _proto = Player.prototype;

        _proto.start = function start() {
          this.startPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);
          this.endPos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z); // setInterval(this.updatePositionNew.bind(this), 1000 / Config.gameFps);

          setInterval(this.updatePosition.bind(this), 1000 / (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).gameFps);
        };

        _proto.onPositionUpdate = function onPositionUpdate(plyr) {
          // data from server
          this.positonQueue.push(new Vec3(plyr.x, plyr.y, plyr.z));
        };

        _proto.updatePosition = function updatePosition(dt) {
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
            var diffX = this.endPos.x - this.startPos.x;
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
        };

        _proto.updatePositionNew = function updatePositionNew(dt) {
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
        };

        _proto.updateCamera = function updateCamera() {
          var target_position = new Vec2(this.node.getPosition().x, this.node.getPosition().z);
          target_position.lerp(target_position, 0.1); // this.playerCamera.setPosition(new Vec3(target_position.x, this.node.getPosition().y, target_position.y));
        };

        _proto.updateNamePos = function updateNamePos() {};

        return Player;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Player.js.map