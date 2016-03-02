(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Behavior = function () {
  function Behavior() {
    _classCallCheck(this, Behavior);
  }

  _createClass(Behavior, [{
    key: 'awake',
    value: function awake(o) {
      this.o3d = o;
      this.syncData = this.o3d.userData.syncData;
    }
  }, {
    key: 'send',
    value: function send() {
      // Behavior could be added later
      this.o3d.getBehaviorByType('Object3DSync').enqueueSend();
    }
  }]);

  return Behavior;
}();

exports.default = Behavior;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Behavior2 = require('./Behavior');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChangeColor = function (_Behavior) {
  _inherits(ChangeColor, _Behavior);

  function ChangeColor() {
    _classCallCheck(this, ChangeColor);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ChangeColor).apply(this, arguments));
  }

  _createClass(ChangeColor, [{
    key: 'awake',
    value: function awake(o) {
      var _this2 = this;

      _get(Object.getPrototypeOf(ChangeColor.prototype), 'awake', this).call(this, o);

      this.o3d.addEventListener('cursordown', function () {
        _this2.syncData.color = Math.random() * (255 * 255 * 255);
        _this2.send();
      });
    }
  }, {
    key: 'update',
    value: function update() /* deltaTime */{
      if (this.syncData.color !== this.lastColor) {
        this.lastColor = this.syncData.color;
        this.o3d.material.color = new THREE.Color(this.syncData.color);
        this.o3d.material.needsUpdate = true;
      }
    }
  }]);

  return ChangeColor;
}(_Behavior3.default);

exports.default = ChangeColor;

},{"./Behavior":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ChangeColor = require('../Behavior/ChangeColor');

var _ChangeColor2 = _interopRequireDefault(_ChangeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cube = function (_THREE$Mesh) {
    _inherits(Cube, _THREE$Mesh);

    function Cube() {
        _classCallCheck(this, Cube);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cube).call(this, new THREE.BoxGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ color: '#ffffff' })));

        _this.addBehaviors(altspace.utilities.behaviors.Object3DSync({ syncData: true }), altspace.utilities.behaviors.Spin({ speed: 0.0005 }), new _ChangeColor2.default());
        return _this;
    }

    return Cube;
}(THREE.Mesh);

exports.default = Cube;

},{"../Behavior/ChangeColor":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// location.href = "http://192.168.1.18:8007/index.html";

var MyImage = function (_THREE$Mesh) {
  _inherits(MyImage, _THREE$Mesh);

  function MyImage(url) {
    _classCallCheck(this, MyImage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyImage).call(this, new THREE.BoxGeometry(100, 100, 100), new THREE.MeshBasicMaterial()));

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    loader.load(url, function (loaded) {
      var texture = loaded;

      texture.minFilter = THREE.LinearFilter;
      _this.material.map = texture;
      _this.material.needsUpdate = true;
    });
    return _this;
  }

  return MyImage;
}(THREE.Mesh);

exports.default = MyImage;

},{}],5:[function(require,module,exports){
'use strict';

var _Cube2 = require('./Entity/Cube');

var _Cube3 = _interopRequireDefault(_Cube2);

var _Image = require('./Entity/Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [entries].map(regeneratorRuntime.mark);

var sim = altspace.utilities.Simulation();
var instanceBase = altspace.utilities.sync.getInstance({
  authorId: 'Bobo'
});

var sceneSync = altspace.utilities.behaviors.SceneSync(instanceBase, {
  instantiators: {
    Cube: function Cube() {
      var cube = new _Cube3.default();
      sim.scene.add(cube);
      return cube;
    }
  },

  ready: function ready(firstInstance) {
    if (firstInstance) {
      // sceneSync.instantiate('Cube');
    }
  }
});

sim.scene.addBehavior(sceneSync);

// JFS
var getParameterByName = function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var tpImages = {
  'pascal': 'Images/pascal-portal.jpg',
  'brent': 'Images/brent-portal.jpg',
  'caiphus': 'Images/caiphus-portal.png',
  'landing': 'Images/landing-portal.png'
};

var statements = {
  'pascal': 'Images/pascal-statement.png',
  'brent': 'Images/brent-statement.png',
  'caiphus': 'Images/caiphus-statement.png'
};

// Assumes InWorldBrowser is set w/
//   position: 0 0 0
//   rotation: 0 0 0
//   scale: 60 60 60
// Also assumes image will have initial scale 1 1 1
var images = {
  'left portal': {
    url: tpImages[getParameterByName('left')],
    pos: new THREE.Vector3(-334.8, 62.8, 103),
    rot: new THREE.Euler(0, Math.PI / 2, 0),
    scale: new THREE.Vector3(0.317, 0.317, 0.02)
  },
  'center portal': {
    url: tpImages[getParameterByName('center')],
    pos: new THREE.Vector3(-334.8, 62.8, 48.1),
    rot: new THREE.Euler(0, Math.PI / 2, 0),
    scale: new THREE.Vector3(0.317, 0.317, 0.02)
  },
  'right portal': {
    url: tpImages[getParameterByName('right')],
    pos: new THREE.Vector3(-334.8, 62.8, -3),
    rot: new THREE.Euler(0, Math.PI / 2, 0),
    scale: new THREE.Vector3(0.317, 0.317, 0.02)
  },
  'artist statement': {
    url: statements[getParameterByName('statement')],
    pos: new THREE.Vector3(-178.4, 70.5, 3.5),
    rot: new THREE.Euler(0, 3 * Math.PI / 2, 0),
    scale: new THREE.Vector3(0.66189, 0.37231, 0.018034)
  }
};

function entries(obj) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

  return regeneratorRuntime.wrap(function entries$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 3;
          _iterator = Object.keys(obj)[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 12;
            break;
          }

          key = _step.value;
          _context.next = 9;
          return [key, obj[key]];

        case 9:
          _iteratorNormalCompletion = true;
          _context.next = 5;
          break;

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context['catch'](3);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 18:
          _context.prev = 18;
          _context.prev = 19;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 21:
          _context.prev = 21;

          if (!_didIteratorError) {
            _context.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return _context.finish(21);

        case 25:
          return _context.finish(18);

        case 26:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[3, 14, 18, 26], [19,, 21, 25]]);
}

var placeholder = 'Images/hk.png';
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = entries(images)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var image = _step2.value;

    var data = image[1];
    var img = new _Image2.default(data.url || placeholder);
    img.position.copy(data.pos);
    img.rotation.copy(data.rot);
    img.scale.copy(data.scale);
    sim.scene.add(img);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

},{"./Entity/Cube":3,"./Entity/Image":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJCZWhhdmlvclxcQmVoYXZpb3IuanMiLCJCZWhhdmlvclxcQ2hhbmdlQ29sb3IuanMiLCJFbnRpdHlcXEN1YmUuanMiLCJFbnRpdHlcXEltYWdlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNOzs7Ozs7OzBCQUNFLEdBQUc7QUFDUCxXQUFLLEdBQUwsR0FBVyxDQUFYLENBRE87QUFFUCxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixRQUFsQixDQUZUOzs7OzJCQUtGOztBQUVMLFdBQUssR0FBTCxDQUFTLGlCQUFULENBQTJCLGNBQTNCLEVBQTJDLFdBQTNDLEdBRks7Ozs7U0FOSDs7O2tCQVlTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDVlQ7Ozs7Ozs7Ozs7OzBCQUNFLEdBQUc7OztBQUNQLGlDQUZFLGtEQUVVLEVBQVosQ0FETzs7QUFHUCxXQUFLLEdBQUwsQ0FBUyxnQkFBVCxDQUEwQixZQUExQixFQUF3QyxZQUFNO0FBQzVDLGVBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsS0FBSyxNQUFMLE1BQWlCLE1BQU0sR0FBTixHQUFZLEdBQVosQ0FBakIsQ0FEc0I7QUFFNUMsZUFBSyxJQUFMLEdBRjRDO09BQU4sQ0FBeEMsQ0FITzs7Ozs0Q0FTZTtBQUN0QixVQUFJLEtBQUssUUFBTCxDQUFjLEtBQWQsS0FBd0IsS0FBSyxTQUFMLEVBQWdCO0FBQzFDLGFBQUssU0FBTCxHQUFpQixLQUFLLFFBQUwsQ0FBYyxLQUFkLENBRHlCO0FBRTFDLGFBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsS0FBbEIsR0FBMEIsSUFBSSxNQUFNLEtBQU4sQ0FBWSxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQTFDLENBRjBDO0FBRzFDLGFBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0Is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R0FBbEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQmVoYXZpb3Ige1xuICBhd2FrZShvKSB7XG4gICAgdGhpcy5vM2QgPSBvO1xuICAgIHRoaXMuc3luY0RhdGEgPSB0aGlzLm8zZC51c2VyRGF0YS5zeW5jRGF0YTtcbiAgfVxuXG4gIHNlbmQoKSB7XG4gICAgLy8gQmVoYXZpb3IgY291bGQgYmUgYWRkZWQgbGF0ZXJcbiAgICB0aGlzLm8zZC5nZXRCZWhhdmlvckJ5VHlwZSgnT2JqZWN0M0RTeW5jJykuZW5xdWV1ZVNlbmQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCZWhhdmlvcjtcbiIsImltcG9ydCBCZWhhdmlvciBmcm9tICcuL0JlaGF2aW9yJztcblxuY2xhc3MgQ2hhbmdlQ29sb3IgZXh0ZW5kcyBCZWhhdmlvciB7XG4gIGF3YWtlKG8pIHtcbiAgICBzdXBlci5hd2FrZShvKTtcblxuICAgIHRoaXMubzNkLmFkZEV2ZW50TGlzdGVuZXIoJ2N1cnNvcmRvd24nLCAoKSA9PiB7XG4gICAgICB0aGlzLnN5bmNEYXRhLmNvbG9yID0gTWF0aC5yYW5kb20oKSAqICgyNTUgKiAyNTUgKiAyNTUpO1xuICAgICAgdGhpcy5zZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoLyogZGVsdGFUaW1lICovKSB7XG4gICAgaWYgKHRoaXMuc3luY0RhdGEuY29sb3IgIT09IHRoaXMubGFzdENvbG9yKSB7XG4gICAgICB0aGlzLmxhc3RDb2xvciA9IHRoaXMuc3luY0RhdGEuY29sb3I7XG4gICAgICB0aGlzLm8zZC5tYXRlcmlhbC5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcih0aGlzLnN5bmNEYXRhLmNvbG9yKTtcbiAgICAgIHRoaXMubzNkLm1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlQ29sb3I7XG4iLCJpbXBvcnQgQ2hhbmdlQ29sb3IgZnJvbSAnLi4vQmVoYXZpb3IvQ2hhbmdlQ29sb3InO1xuXG5jbGFzcyBDdWJlIGV4dGVuZHMgVEhSRUUuTWVzaCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFxuICAgICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNTAsIDUwLCA1MCksXG4gICAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAnI2ZmZmZmZicgfSlcbiAgICApO1xuXG4gICAgdGhpcy5hZGRCZWhhdmlvcnMoXG4gICAgICAgIGFsdHNwYWNlLnV0aWxpdGllcy5iZWhhdmlvcnMuT2JqZWN0M0RTeW5jKHsgc3luY0RhdGE6IHRydWUgfSksXG4gICAgICAgIGFsdHNwYWNlLnV0aWxpdGllcy5iZWhhdmlvcnMuU3Bpbih7IHNwZWVkOiAwLjAwMDUgfSksXG4gICAgICAgIG5ldyBDaGFuZ2VDb2xvcigpXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdWJlO1xuIiwiLy8gbG9jYXRpb24uaHJlZiA9IFwiaHR0cDovLzE5Mi4xNjguMS4xODo4MDA3L2luZGV4Lmh0bWxcIjtcclxuY2xhc3MgTXlJbWFnZSBleHRlbmRzIFRIUkVFLk1lc2gge1xyXG4gIGNvbnN0cnVjdG9yKHVybCkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxMDAsIDEwMCwgMTAwKSxcclxuICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKClcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxuICAgIGxvYWRlci5jcm9zc09yaWdpbiA9ICcnO1xyXG4gICAgbG9hZGVyLmxvYWQodXJsLCAobG9hZGVkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRleHR1cmUgPSBsb2FkZWQ7XHJcblxyXG4gICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcclxuICAgICAgdGhpcy5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xyXG4gICAgICB0aGlzLm1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlJbWFnZTtcclxuIiwiaW1wb3J0IEN1YmUgZnJvbSAnLi9FbnRpdHkvQ3ViZSc7XG5pbXBvcnQgTXlJbWFnZSBmcm9tICcuL0VudGl0eS9JbWFnZSc7XG5cbmNvbnN0IHNpbSA9IGFsdHNwYWNlLnV0aWxpdGllcy5TaW11bGF0aW9uKCk7XG5jb25zdCBpbnN0YW5jZUJhc2UgPSBhbHRzcGFjZS51dGlsaXRpZXMuc3luYy5nZXRJbnN0YW5jZSh7XG4gIGF1dGhvcklkOiAnQm9ibydcbn0pO1xuXG5jb25zdCBzY2VuZVN5bmMgPSBhbHRzcGFjZS51dGlsaXRpZXMuYmVoYXZpb3JzLlNjZW5lU3luYyhpbnN0YW5jZUJhc2UsIHtcbiAgaW5zdGFudGlhdG9yczoge1xuICAgIEN1YmU6ICgpID0+IHtcbiAgICAgIGNvbnN0IGN1YmUgPSBuZXcgQ3ViZSgpO1xuICAgICAgc2ltLnNjZW5lLmFkZChjdWJlKTtcbiAgICAgIHJldHVybiBjdWJlO1xuICAgIH0sXG4gIH0sXG5cbiAgcmVhZHkoZmlyc3RJbnN0YW5jZSkge1xuICAgIGlmIChmaXJzdEluc3RhbmNlKSB7XG4gICAgICAvLyBzY2VuZVN5bmMuaW5zdGFudGlhdGUoJ0N1YmUnKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cbnNpbS5zY2VuZS5hZGRCZWhhdmlvcihzY2VuZVN5bmMpO1xuXG4vLyBKRlNcbmNvbnN0IGdldFBhcmFtZXRlckJ5TmFtZSA9IGZ1bmN0aW9uIGdldFBhcmFtZXRlckJ5TmFtZShuYW1lLCB1cmwpIHtcbiAgICBpZiAoIXVybCkgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcXFxcJCZcIik7XG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpLFxuICAgICAgICByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufTtcblxuY29uc3QgdHBJbWFnZXMgPSB7XG4gICdwYXNjYWwnIDogJ0ltYWdlcy9wYXNjYWwtcG9ydGFsLmpwZycsXG4gICdicmVudCcgOiAnSW1hZ2VzL2JyZW50LXBvcnRhbC5qcGcnLFxuICAnY2FpcGh1cycgOiAnSW1hZ2VzL2NhaXBodXMtcG9ydGFsLnBuZycsXG4gICdsYW5kaW5nJyA6ICdJbWFnZXMvbGFuZGluZy1wb3J0YWwucG5nJ1xufVxuXG5jb25zdCBzdGF0ZW1lbnRzID0ge1xuICAncGFzY2FsJyA6ICdJbWFnZXMvcGFzY2FsLXN0YXRlbWVudC5wbmcnLFxuICAnYnJlbnQnIDogJ0ltYWdlcy9icmVudC1zdGF0ZW1lbnQucG5nJyxcbiAgJ2NhaXBodXMnIDogJ0ltYWdlcy9jYWlwaHVzLXN0YXRlbWVudC5wbmcnXG59XG5cbi8vIEFzc3VtZXMgSW5Xb3JsZEJyb3dzZXIgaXMgc2V0IHcvXG4vLyAgIHBvc2l0aW9uOiAwIDAgMFxuLy8gICByb3RhdGlvbjogMCAwIDBcbi8vICAgc2NhbGU6IDYwIDYwIDYwXG4vLyBBbHNvIGFzc3VtZXMgaW1hZ2Ugd2lsbCBoYXZlIGluaXRpYWwgc2NhbGUgMSAxIDFcbmNvbnN0IGltYWdlcyA9IHtcbiAgJ2xlZnQgcG9ydGFsJyA6IHtcbiAgICB1cmw6IHRwSW1hZ2VzW2dldFBhcmFtZXRlckJ5TmFtZSgnbGVmdCcpXSxcbiAgICBwb3M6IG5ldyBUSFJFRS5WZWN0b3IzKC0zMzQuOCwgNjIuOCwgMTAzKSxcbiAgICByb3Q6IG5ldyBUSFJFRS5FdWxlcigwLCBNYXRoLlBJIC8gMiwgMCksXG4gICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMzE3LCAwLjMxNywgMC4wMilcbiAgfSxcbiAgJ2NlbnRlciBwb3J0YWwnIDoge1xuICAgIHVybDogdHBJbWFnZXNbZ2V0UGFyYW1ldGVyQnlOYW1lKCdjZW50ZXInKV0sXG4gICAgcG9zOiBuZXcgVEhSRUUuVmVjdG9yMygtMzM0LjgsIDYyLjgsIDQ4LjEpLFxuICAgIHJvdDogbmV3IFRIUkVFLkV1bGVyKDAsIE1hdGguUEkgLyAyLCAwKSxcbiAgICBzY2FsZTogbmV3IFRIUkVFLlZlY3RvcjMoMC4zMTcsIDAuMzE3LCAwLjAyKVxuICB9LFxuICAncmlnaHQgcG9ydGFsJyA6IHtcbiAgICB1cmw6IHRwSW1hZ2VzW2dldFBhcmFtZXRlckJ5TmFtZSgncmlnaHQnKV0sXG4gICAgcG9zOiBuZXcgVEhSRUUuVmVjdG9yMygtMzM0LjgsIDYyLjgsIC0zKSxcbiAgICByb3Q6IG5ldyBUSFJFRS5FdWxlcigwLCBNYXRoLlBJIC8gMiwgMCksXG4gICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMzE3LCAwLjMxNywgMC4wMilcbiAgfSxcbiAgJ2FydGlzdCBzdGF0ZW1lbnQnIDoge1xuICAgIHVybDogc3RhdGVtZW50c1tnZXRQYXJhbWV0ZXJCeU5hbWUoJ3N0YXRlbWVudCcpXSxcbiAgICBwb3M6IG5ldyBUSFJFRS5WZWN0b3IzKC0xNzguNCwgNzAuNSwgMy41KSxcbiAgICByb3Q6IG5ldyBUSFJFRS5FdWxlcigwLCAzICogTWF0aC5QSSAvIDIsIDApLFxuICAgIHNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMygwLjY2MTg5LCAwLjM3MjMxLCAwLjAxODAzNCksXG4gIH1cbn1cblxuZnVuY3Rpb24qIGVudHJpZXMob2JqKXtcbiAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpe1xuICAgIHlpZWxkIFtrZXksIG9ialtrZXldXTtcbiAgfVxufVxuXG5jb25zdCBwbGFjZWhvbGRlciA9ICdJbWFnZXMvaGsucG5nJztcbmZvciAobGV0IGltYWdlIG9mIGVudHJpZXMoaW1hZ2VzKSl7XG4gIGNvbnN0IGRhdGEgPSBpbWFnZVsxXTtcbiAgY29uc3QgaW1nID0gbmV3IE15SW1hZ2UoZGF0YS51cmwgfHwgcGxhY2Vob2xkZXIpO1xuICBpbWcucG9zaXRpb24uY29weShkYXRhLnBvcyk7XG4gIGltZy5yb3RhdGlvbi5jb3B5KGRhdGEucm90KTtcbiAgaW1nLnNjYWxlLmNvcHkoZGF0YS5zY2FsZSk7XG4gIHNpbS5zY2VuZS5hZGQoaW1nKTtcbn1cbiJdfQ==
