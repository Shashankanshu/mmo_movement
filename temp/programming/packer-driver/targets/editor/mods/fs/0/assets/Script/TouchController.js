System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, EventHandler, Vec3, director, macro, _dec, _dec2, _class, _class2, _descriptor, _temp, _crd, ccclass, property, TouchController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      EventHandler = _cc.EventHandler;
      Vec3 = _cc.Vec3;
      director = _cc.director;
      macro = _cc.macro;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6f3ceUgxq1HaapH8syHM8Ra", "TouchController", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TouchController", TouchController = (_dec = ccclass('TouchController'), _dec2 = property({
        type: [EventHandler],
        tooltip: 'Touch Event Listener'
      }), _dec(_class = (_class2 = (_temp = class TouchController extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "startLoc", void 0);

          _initializerDefineProperty(this, "touchEventCallBack", _descriptor, this);
        }

        start() {
          this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
          this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
          this.node.on(Node.EventType.TOUCH_END, this.touchEnded, this);
        }

        touchMove(touch) {
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

        touchEnded(touch) {
          this.touchEventCallBack.forEach(c => c.emit([new Vec3(0, 0, 0)]));
        }

        touchStart(touch) {
          this.startLoc = touch.getLocation();
          this.touchMove(touch);
        }

        get_angle(cx, cy, ex, ey) {
          let dy = ey - cy;
          let dx = ex - cx;
          let theta = Math.atan2(dy, dx); // theta *= 180 / Math.PI;

          return theta * macro.DEG;
        }

        restartGame() {
          director.loadScene('GameScene');
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "touchEventCallBack", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TouchController.js.map