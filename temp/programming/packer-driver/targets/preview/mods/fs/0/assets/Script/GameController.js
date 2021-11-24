System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Prefab, instantiate, Vec3, CapsuleCollider, GameConfig, BotController, PowerUpController, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _crd, ccclass, property, GameController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBotController(extras) {
    _reporterNs.report("BotController", "./bot/BotController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayer(extras) {
    _reporterNs.report("Player", "./Player", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPowerUpController(extras) {
    _reporterNs.report("PowerUpController", "./powerUps/PowerUpController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      CapsuleCollider = _cc.CapsuleCollider;
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }, function (_unresolved_3) {
      BotController = _unresolved_3.BotController;
    }, function (_unresolved_4) {
      PowerUpController = _unresolved_4.PowerUpController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "48d51HOjkBIObFppQAdshF3", "GameController", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Prefab
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameController, _Component);

        function GameController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "player", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "bot", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "gummyBear", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "namePrefab", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "playerCamera", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "platform", _descriptor6, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "playerClass", void 0);

          _defineProperty(_assertThisInitialized(_this), "botController", void 0);

          _defineProperty(_assertThisInitialized(_this), "powerupController", void 0);

          _defineProperty(_assertThisInitialized(_this), "world", void 0);

          return _this;
        }

        var _proto = GameController.prototype;

        _proto.start = function start() {
          this.world = this.node.getParent(); // Adding Player

          var player = instantiate(this.player);
          this.addToWorld(player);
          player.setPosition(new Vec3(0, 0.5, 15));
          this.playerClass = player.getComponent('Player');
          this.playerClass.setCamera(this.playerCamera);
          this.playerClass.addName(this.namePrefab, this.world); // Adding bots

          this.botController = new (_crd && BotController === void 0 ? (_reportPossibleCrUseOfBotController({
            error: Error()
          }), BotController) : BotController)(this);
          this.botController.playerCamera = this.playerClass.playerCamera;
          this.botController.addBots(this.bot, this.namePrefab, player); // Adding Eatables

          this.powerupController = new (_crd && PowerUpController === void 0 ? (_reportPossibleCrUseOfPowerUpController({
            error: Error()
          }), PowerUpController) : PowerUpController)(this);
          this.powerupController.setEatables([this.gummyBear]);
          this.powerupController.spawnPowerup(); // Adding Player Collider

          var collider = player.getComponent(CapsuleCollider);
          collider.on('onCollisionEnter', this.onCollision, this);
        };

        _proto.addToWorld = function addToWorld(child) {
          this.world.addChild(child);
        };

        _proto.getWorld = function getWorld() {
          return this.world;
        };

        _proto.onCollision = function onCollision(event) {
          var otherCollider = event.otherCollider;

          if (otherCollider.node.name == 'spaceStation') {
            this.playerClass.moveStationCamera();
            return;
          }

          if (otherCollider.node.name == 'deathPlatform') {
            this.playerClass.resetStationCamera();
            return;
          }

          if (otherCollider.node.name == 'Platform') {
            return;
          }

          if (otherCollider.node.name == 'GummyBear') {
            // if (this.playerClass.lastColliderId != otherCollider.uuid) {
            this.powerupController.removeGummy(otherCollider);
            var gainValue = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).powerup[otherCollider.node.name].gain;
            this.playerClass.resize(gainValue); //     this.playerClass.lastColliderId = otherCollider.uuid;
            // }
          } else if (otherCollider.node.name == 'Bot') {
            this.playerClass._onCollisionEnter(event);
          }
        };

        _proto.touchCallBack = function touchCallBack(vector, angle) {
          this.playerClass.touchCallBack(vector, angle);
        };

        _proto.touchAngleCallBack = function touchAngleCallBack(vector, angle) {
          this.playerClass.touchAngleCallBack(vector, angle);
        };

        return GameController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gummyBear", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "namePrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerCamera", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=GameController.js.map