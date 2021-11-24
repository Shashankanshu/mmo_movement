System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Component, _decorator, Colyseus, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _crd, ccclass, property, SocketConnection;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfColyseus(extras) {
    _reporterNs.report("Colyseus", "db://colyseus-sdk/colyseus.js", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      Component = _cc.Component;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      Colyseus = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "aa55cgJ/ItInrViJDo5FmqX", "SocketConnection", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SocketConnection", SocketConnection = (_dec = ccclass('SocketConnection'), _dec(_class = (_class2 = (_temp = class SocketConnection extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "playerName", void 0);

          _defineProperty(this, "isConnected", void 0);

          _initializerDefineProperty(this, "hostname", _descriptor, this);

          _initializerDefineProperty(this, "port", _descriptor2, this);

          _initializerDefineProperty(this, "useSSL", _descriptor3, this);
        }

        start() {
          // Instantiate Colyseus Client
          // connects into (ws|wss)://hostname[:port]

          /* let domain = window.location.href.split('/')[2];
          let url = "ws://" + domain.split(':')[0] + ':2567'; */
          let url = `${this.useSSL ? "wss" : "ws"}://${this.hostname}${[443, 80].includes(this.port) || this.useSSL ? "" : `:${this.port}`}`;
          this.client = new (_crd && Colyseus === void 0 ? (_reportPossibleCrUseOfColyseus({
            error: Error()
          }), Colyseus) : Colyseus).Client(`${this.useSSL ? "wss" : "ws"}://${this.hostname}${[443, 80].includes(this.port) || this.useSSL ? "" : `:${this.port}`}`);
          console.log(`Connecting server to ${url}`);
          this.connect();
        }

        async connect() {
          try {
            this.room = await this.client.joinOrCreate("SumoRoom");
            console.log("Room joined successfully!");
            console.log("user's sessionId:", this.room.sessionId);
            this.room.onStateChange(state => {
              console.log("onStateChange: ", state);
            });
            this.room.onLeave(code => {
              console.log("onLeave:", code);
            });
          } catch (e) {
            console.error(e);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hostname", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "localhost";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "port", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2567;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "useSSL", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=SocketConnection.js.map