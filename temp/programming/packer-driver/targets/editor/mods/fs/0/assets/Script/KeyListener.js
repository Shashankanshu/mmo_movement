System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, systemEvent, SystemEvent, EventHandler, _dec, _class, _temp, _crd, ccclass, property, KeyListener;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      systemEvent = _cc.systemEvent;
      SystemEvent = _cc.SystemEvent;
      EventHandler = _cc.EventHandler;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bc1cfCuMT1FXKdhEYM6GVxX", "KeyListener", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("KeyListener", KeyListener = (_dec = ccclass('KeyListener'), _dec(_class = (_temp = class KeyListener {
        constructor() {
          _defineProperty(this, "keyCode", void 0);

          _defineProperty(this, "eventHandler", []);
        }

        registerEvent(type, callbackFn) {}

        ctor(node) {
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          const clickEventHandler = new EventHandler(); // This node is the node to which your event handler code component belongs

          clickEventHandler.target = node; // This is the script class name

          clickEventHandler.component = 'example';
          clickEventHandler.handler = 'callback';
          clickEventHandler.customEventData = 'foobar';
        }

        onKeyDown(event) {
          switch (event.keyCode) {
            case this.keyCode.left:
              break;

            case this.keyCode.up:
              break;

            case this.keyCode.right:
              break;

            case this.keyCode.down:
              break;

            default:
              break;
          }
        }

        onKeyUp(event) {
          switch (event.keyCode) {
            case this.keyCode.left:
              break;

            case this.keyCode.up:
              break;

            case this.keyCode.right:
              break;

            case this.keyCode.down:
              break;

            default:
              break;
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=KeyListener.js.map