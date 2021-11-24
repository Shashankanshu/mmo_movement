System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, Constants;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "392b7gsXL9LSaxxkxkfDxSp", "Config", undefined);

      _export("Constants", Constants = {
        "initialiserTimeOut": 10,
        "serverInfo": {
          "resultEndPoint": {
            "dev": "https://mxgamesapi.dev.mxplay.com/v1/game/result",
            "prod": "https://mxgamesapi.mxplay.com/v1/game/result"
          },
          "serverUrlEndPoint": {
            "dev": "wss://zatsvu.colyseus.in/",
            "prod": "wss://iy5aen.colyseus.in/"
          },
          "isProd": false
        },
        "purchases": {
          "powerup": 20,
          "extraLife": 40
        },
        "totalRating": 9,
        "noOfCharacterInMap": 4,
        "autoLoadAdEnabled": true,
        "stickyBannersEnabled": false,
        "ads": {
          "showStartAdOdd": 1,
          "adTimerInSec": 6
        },
        "stickyAds": {
          "adUnit": "/21723553151/Test/Test_MXplayer_Local_Native_Banner2",
          "adHeight": 50,
          "adWidth": 320,
          "adRefreshDuration": 30
        },
        "scoringMultiplayer": {
          "winningPoint": 200,
          "quittingPoint": -50,
          "losingPoint": -20
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Config.js.map