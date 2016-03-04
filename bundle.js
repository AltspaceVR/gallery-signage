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
  'caiphus': 'Images/caiphus-portal.jpg',
  'landing': 'Images/landing-portal.jpg',
  'welcome': 'Images/welcome-portal.png'
};

var statements = {
  'pascal': 'Images/pascal-statement.png',
  'brent': 'Images/brent-statement.png',
  'caiphus': 'Images/caiphus-statement.jpg'
};

// Assumes InWorldBrowser is set w/
//   position: 0 0 0
//   rotation: 0 0 0
//   scale: 60 60 60
// Also assumes image will have initial scale 1 1 1
var deg2rad = function deg2rad(deg) {
  return deg * Math.PI / 180;
};

var images = {
  'landing': {
    'left portal': {
      url: tpImages[getParameterByName('left')],
      pos: new THREE.Vector3(119.4, 32, 66.4),
      rot: new THREE.Euler(0, -deg2rad(116.46), 0),
      scale: new THREE.Vector3(0.317, 0.317, 0.02)
    },
    'center portal': {
      url: tpImages[getParameterByName('center')],
      pos: new THREE.Vector3(-26.3, 32, 135.5),
      rot: new THREE.Euler(0, -deg2rad(189.57), 0),
      scale: new THREE.Vector3(0.317, 0.317, 0.02)
    },
    'right portal': {
      url: tpImages[getParameterByName('right')],
      pos: new THREE.Vector3(-136.7, 32, 18.4),
      rot: new THREE.Euler(0, -deg2rad(82.504), 0),
      scale: new THREE.Vector3(0.317, 0.317, 0.02)
    },
    'back portal': {
      url: tpImages[getParameterByName('back')],
      pos: new THREE.Vector3(24.6, 32, -133.9),
      rot: new THREE.Euler(0, -deg2rad(191.48), 0),
      scale: new THREE.Vector3(0.317, 0.317, 0.02)
    }
  },

  'gallery': {
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
      pos: new THREE.Vector3(-178.7, 49.6, 10.5),
      rot: new THREE.Euler(0, 3 * Math.PI / 2, 0),
      scale: new THREE.Vector3(0.66189, 0.37231, 0.018034)
    }
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
var space = getParameterByName('space') || 'gallery';
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = entries(images[space])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJCZWhhdmlvclxcQmVoYXZpb3IuanMiLCJCZWhhdmlvclxcQ2hhbmdlQ29sb3IuanMiLCJFbnRpdHlcXEN1YmUuanMiLCJFbnRpdHlcXEltYWdlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNOzs7Ozs7OzBCQUNFLEdBQUc7QUFDUCxXQUFLLEdBQUwsR0FBVyxDQUFYLENBRE87QUFFUCxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixRQUFsQixDQUZUOzs7OzJCQUtGOztBQUVMLFdBQUssR0FBTCxDQUFTLGlCQUFULENBQTJCLGNBQTNCLEVBQTJDLFdBQTNDLEdBRks7Ozs7U0FOSDs7O2tCQVlTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDVlQ7Ozs7Ozs7Ozs7OzBCQUNFLEdBQUc7OztBQUNQLGlDQUZFLGtEQUVVLEVBQVosQ0FETzs7QUFHUCxXQUFLLEdBQUwsQ0FBUyxnQkFBVCxDQUEwQixZQUExQixFQUF3QyxZQUFNO0FBQzVDLGVBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsS0FBSyxNQUFMLE1BQWlCLE1BQU0sR0FBTixHQUFZLEdBQVosQ0FBakIsQ0FEc0I7QUFFNUMsZUFBSyxJQUFMLEdBRjRDO09BQU4sQ0FBeEMsQ0FITzs7Ozs0Q0FTZTtBQUN0QixVQUFJLEtBQUssUUFBTCxDQUFjLEtBQWQsS0FBd0IsS0FBSyxTQUFMLEVBQWdCO0FBQzFDLGFBQUssU0FBTCxHQUFpQixLQUFLLFFBQUwsQ0FBYyxLQUFkLENBRHlCO0FBRTFDLGFBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsS0FBbEIsR0FBMEIsSUFBSSxNQUFNLEtBQU4sQ0FBWSxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQTFDLENBRjBDO0FBRzFDLGFBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0Is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L0I7Ozs7OztBQUNkLHdCQUFrQixRQUFRLE9BQU8sS0FBUCxDQUFSLDRCQUFsQix3R0FBeUM7UUFBaEMscUJBQWdDOztBQUN2QyxRQUFNLE9BQU8sTUFBTSxDQUFOLENBQVAsQ0FEaUM7QUFFdkMsUUFBTSxNQUFNLG9CQUFZLEtBQUssR0FBTCxJQUFZLFdBQVosQ0FBbEIsQ0FGaUM7QUFHdkMsUUFBSSxRQUFKLENBQWEsSUFBYixDQUFrQixLQUFLLEdBQUwsQ0FBbEIsQ0FIdUM7QUFJdkMsUUFBSSxRQUFKLENBQWEsSUFBYixDQUFrQixLQUFLLEdBQUwsQ0FBbEIsQ0FKdUM7QUFLdkMsUUFBSSxLQUFKLENBQVUsSUFBVixDQUFlLEtBQUssS0FBTCxDQUFmLENBTHVDO0FBTXZDLFFBQUksS0FBSixDQUFVLEdBQVYsQ0FBYyxHQUFkLEVBTnVDO0dBQXpDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIEJlaGF2aW9yIHtcclxuICBhd2FrZShvKSB7XHJcbiAgICB0aGlzLm8zZCA9IG87XHJcbiAgICB0aGlzLnN5bmNEYXRhID0gdGhpcy5vM2QudXNlckRhdGEuc3luY0RhdGE7XHJcbiAgfVxyXG5cclxuICBzZW5kKCkge1xyXG4gICAgLy8gQmVoYXZpb3IgY291bGQgYmUgYWRkZWQgbGF0ZXJcclxuICAgIHRoaXMubzNkLmdldEJlaGF2aW9yQnlUeXBlKCdPYmplY3QzRFN5bmMnKS5lbnF1ZXVlU2VuZCgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVoYXZpb3I7XHJcbiIsImltcG9ydCBCZWhhdmlvciBmcm9tICcuL0JlaGF2aW9yJztcclxuXHJcbmNsYXNzIENoYW5nZUNvbG9yIGV4dGVuZHMgQmVoYXZpb3Ige1xyXG4gIGF3YWtlKG8pIHtcclxuICAgIHN1cGVyLmF3YWtlKG8pO1xyXG5cclxuICAgIHRoaXMubzNkLmFkZEV2ZW50TGlzdGVuZXIoJ2N1cnNvcmRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3luY0RhdGEuY29sb3IgPSBNYXRoLnJhbmRvbSgpICogKDI1NSAqIDI1NSAqIDI1NSk7XHJcbiAgICAgIHRoaXMuc2VuZCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoLyogZGVsdGFUaW1lICovKSB7XHJcbiAgICBpZiAodGhpcy5zeW5jRGF0YS5jb2xvciAhPT0gdGhpcy5sYXN0Q29sb3IpIHtcclxuICAgICAgdGhpcy5sYXN0Q29sb3IgPSB0aGlzLnN5bmNEYXRhLmNvbG9yO1xyXG4gICAgICB0aGlzLm8zZC5tYXRlcmlhbC5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcih0aGlzLnN5bmNEYXRhLmNvbG9yKTtcclxuICAgICAgdGhpcy5vM2QubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlQ29sb3I7XHJcbiIsImltcG9ydCBDaGFuZ2VDb2xvciBmcm9tICcuLi9CZWhhdmlvci9DaGFuZ2VDb2xvcic7XHJcblxyXG5jbGFzcyBDdWJlIGV4dGVuZHMgVEhSRUUuTWVzaCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNTAsIDUwLCA1MCksXHJcbiAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6ICcjZmZmZmZmJyB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmFkZEJlaGF2aW9ycyhcclxuICAgICAgICBhbHRzcGFjZS51dGlsaXRpZXMuYmVoYXZpb3JzLk9iamVjdDNEU3luYyh7IHN5bmNEYXRhOiB0cnVlIH0pLFxyXG4gICAgICAgIGFsdHNwYWNlLnV0aWxpdGllcy5iZWhhdmlvcnMuU3Bpbih7IHNwZWVkOiAwLjAwMDUgfSksXHJcbiAgICAgICAgbmV3IENoYW5nZUNvbG9yKClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdWJlO1xyXG4iLCIvLyBsb2NhdGlvbi5ocmVmID0gXCJodHRwOi8vMTkyLjE2OC4xLjE4OjgwMDcvaW5kZXguaHRtbFwiO1xyXG5jbGFzcyBNeUltYWdlIGV4dGVuZHMgVEhSRUUuTWVzaCB7XHJcbiAgY29uc3RydWN0b3IodXJsKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEwMCwgMTAwLCAxMDApLFxyXG4gICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xyXG4gICAgbG9hZGVyLmNyb3NzT3JpZ2luID0gJyc7XHJcbiAgICBsb2FkZXIubG9hZCh1cmwsIChsb2FkZWQpID0+IHtcclxuICAgICAgY29uc3QgdGV4dHVyZSA9IGxvYWRlZDtcclxuXHJcbiAgICAgIHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xyXG4gICAgICB0aGlzLm1hdGVyaWFsLm1hcCA9IHRleHR1cmU7XHJcbiAgICAgIHRoaXMubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUltYWdlO1xyXG4iLCJpbXBvcnQgQ3ViZSBmcm9tICcuL0VudGl0eS9DdWJlJztcclxuaW1wb3J0IE15SW1hZ2UgZnJvbSAnLi9FbnRpdHkvSW1hZ2UnO1xyXG5cclxuY29uc3Qgc2ltID0gYWx0c3BhY2UudXRpbGl0aWVzLlNpbXVsYXRpb24oKTtcclxuY29uc3QgaW5zdGFuY2VCYXNlID0gYWx0c3BhY2UudXRpbGl0aWVzLnN5bmMuZ2V0SW5zdGFuY2Uoe1xyXG4gIGF1dGhvcklkOiAnQm9ibydcclxufSk7XHJcblxyXG5jb25zdCBzY2VuZVN5bmMgPSBhbHRzcGFjZS51dGlsaXRpZXMuYmVoYXZpb3JzLlNjZW5lU3luYyhpbnN0YW5jZUJhc2UsIHtcclxuICBpbnN0YW50aWF0b3JzOiB7XHJcbiAgICBDdWJlOiAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGN1YmUgPSBuZXcgQ3ViZSgpO1xyXG4gICAgICBzaW0uc2NlbmUuYWRkKGN1YmUpO1xyXG4gICAgICByZXR1cm4gY3ViZTtcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgcmVhZHkoZmlyc3RJbnN0YW5jZSkge1xyXG4gICAgaWYgKGZpcnN0SW5zdGFuY2UpIHtcclxuICAgICAgLy8gc2NlbmVTeW5jLmluc3RhbnRpYXRlKCdDdWJlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG5zaW0uc2NlbmUuYWRkQmVoYXZpb3Ioc2NlbmVTeW5jKTtcclxuXHJcbi8vIEpGU1xyXG5jb25zdCBnZXRQYXJhbWV0ZXJCeU5hbWUgPSBmdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSwgdXJsKSB7XHJcbiAgICBpZiAoIXVybCkgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKSxcclxuICAgICAgICByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xyXG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG59O1xyXG5cclxuY29uc3QgdHBJbWFnZXMgPSB7XHJcbiAgJ3Bhc2NhbCcgOiAnSW1hZ2VzL3Bhc2NhbC1wb3J0YWwuanBnJywgIFxyXG4gICdicmVudCcgOiAnSW1hZ2VzL2JyZW50LXBvcnRhbC5qcGcnLCAgXHJcbiAgJ2NhaXBodXMnIDogJ0ltYWdlcy9jYWlwaHVzLXBvcnRhbC5qcGcnLCBcclxuICAnbGFuZGluZycgOiAnSW1hZ2VzL2xhbmRpbmctcG9ydGFsLmpwZycsIFxyXG4gICd3ZWxjb21lJyA6ICdJbWFnZXMvd2VsY29tZS1wb3J0YWwucG5nJyBcclxufVxyXG5cclxuY29uc3Qgc3RhdGVtZW50cyA9IHtcclxuICAncGFzY2FsJyA6ICdJbWFnZXMvcGFzY2FsLXN0YXRlbWVudC5wbmcnLCBcclxuICAnYnJlbnQnIDogJ0ltYWdlcy9icmVudC1zdGF0ZW1lbnQucG5nJyxcclxuICAnY2FpcGh1cycgOiAnSW1hZ2VzL2NhaXBodXMtc3RhdGVtZW50LmpwZydcclxufVxyXG5cclxuLy8gQXNzdW1lcyBJbldvcmxkQnJvd3NlciBpcyBzZXQgdy9cclxuLy8gICBwb3NpdGlvbjogMCAwIDBcclxuLy8gICByb3RhdGlvbjogMCAwIDBcclxuLy8gICBzY2FsZTogNjAgNjAgNjBcclxuLy8gQWxzbyBhc3N1bWVzIGltYWdlIHdpbGwgaGF2ZSBpbml0aWFsIHNjYWxlIDEgMSAxXHJcbmNvbnN0IGRlZzJyYWQgPSBmdW5jdGlvbiBkZWcycmFkKGRlZykge1xyXG4gIHJldHVybiBkZWcgKiBNYXRoLlBJIC8gMTgwO1xyXG59XHJcblxyXG5jb25zdCBpbWFnZXMgPSB7XHJcbiAgJ2xhbmRpbmcnIDoge1xyXG4gICAgJ2xlZnQgcG9ydGFsJyA6IHtcclxuICAgICAgdXJsOiB0cEltYWdlc1tnZXRQYXJhbWV0ZXJCeU5hbWUoJ2xlZnQnKV0sXHJcbiAgICAgIHBvczogbmV3IFRIUkVFLlZlY3RvcjMoMTE5LjQsIDMyLCA2Ni40KSxcclxuICAgICAgcm90OiBuZXcgVEhSRUUuRXVsZXIoMCwgLWRlZzJyYWQoMTE2LjQ2KSwgMCksXHJcbiAgICAgIHNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMygwLjMxNywgMC4zMTcsIDAuMDIpXHJcbiAgICB9LFxyXG4gICAgJ2NlbnRlciBwb3J0YWwnIDoge1xyXG4gICAgICB1cmw6IHRwSW1hZ2VzW2dldFBhcmFtZXRlckJ5TmFtZSgnY2VudGVyJyldLFxyXG4gICAgICBwb3M6IG5ldyBUSFJFRS5WZWN0b3IzKC0yNi4zLCAzMiwgMTM1LjUpLFxyXG4gICAgICByb3Q6IG5ldyBUSFJFRS5FdWxlcigwLCAtZGVnMnJhZCgxODkuNTcpLCAwKSxcclxuICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMzE3LCAwLjMxNywgMC4wMilcclxuICAgIH0sXHJcbiAgICAncmlnaHQgcG9ydGFsJyA6IHtcclxuICAgICAgdXJsOiB0cEltYWdlc1tnZXRQYXJhbWV0ZXJCeU5hbWUoJ3JpZ2h0JyldLFxyXG4gICAgICBwb3M6IG5ldyBUSFJFRS5WZWN0b3IzKC0xMzYuNywgMzIsIDE4LjQpLFxyXG4gICAgICByb3Q6IG5ldyBUSFJFRS5FdWxlcigwLCAtZGVnMnJhZCg4Mi41MDQpLCAwKSxcclxuICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMzE3LCAwLjMxNywgMC4wMilcclxuICAgIH0sXHJcbiAgICAnYmFjayBwb3J0YWwnIDp7IFxyXG4gICAgICB1cmw6IHRwSW1hZ2VzW2dldFBhcmFtZXRlckJ5TmFtZSgnYmFjaycpXSxcclxuICAgICAgcG9zOiBuZXcgVEhSRUUuVmVjdG9yMygyNC42LCAzMiwgLTEzMy45KSxcclxuICAgICAgcm90OiBuZXcgVEhSRUUuRXVsZXIoMCwgLWRlZzJyYWQoMTkxLjQ4KSwgMCksXHJcbiAgICAgIHNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMygwLjMxNywgMC4zMTcsIDAuMDIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgJ2dhbGxlcnknIDoge1xyXG4gICAgJ2xlZnQgcG9ydGFsJyA6IHtcclxuICAgICAgdXJsOiB0cEltYWdlc1tnZXRQYXJhbWV0ZXJCeU5hbWUoJ2xlZnQnKV0sXHJcbiAgICAgIHBvczogbmV3IFRIUkVFLlZlY3RvcjMoLTMzNC44LCA2Mi44LCAxMDMpLFxyXG4gICAgICByb3Q6IG5ldyBUSFJFRS5FdWxlcigwLCBNYXRoLlBJIC8gMiwgMCksXHJcbiAgICAgIHNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMygwLjMxNywgMC4zMTcsIDAuMDIpXHJcbiAgICB9LFxyXG4gICAgJ2NlbnRlciBwb3J0YWwnIDoge1xyXG4gICAgICB1cmw6IHRwSW1hZ2VzW2dldFBhcmFtZXRlckJ5TmFtZSgnY2VudGVyJyldLFxyXG4gICAgICBwb3M6IG5ldyBUSFJFRS5WZWN0b3IzKC0zMzQuOCwgNjIuOCwgNDguMSksXHJcbiAgICAgIHJvdDogbmV3IFRIUkVFLkV1bGVyKDAsIE1hdGguUEkgLyAyLCAwKSxcclxuICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMzE3LCAwLjMxNywgMC4wMilcclxuICAgIH0sXHJcbiAgICAncmlnaHQgcG9ydGFsJyA6IHtcclxuICAgICAgdXJsOiB0cEltYWdlc1tnZXRQYXJhbWV0ZXJCeU5hbWUoJ3JpZ2h0JyldLFxyXG4gICAgICBwb3M6IG5ldyBUSFJFRS5WZWN0b3IzKC0zMzQuOCwgNjIuOCwgLTMpLFxyXG4gICAgICByb3Q6IG5ldyBUSFJFRS5FdWxlcigwLCBNYXRoLlBJIC8gMiwgMCksXHJcbiAgICAgIHNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMygwLjMxNywgMC4zMTcsIDAuMDIpXHJcbiAgICB9LFxyXG4gICAgJ2FydGlzdCBzdGF0ZW1lbnQnIDoge1xyXG4gICAgICB1cmw6IHN0YXRlbWVudHNbZ2V0UGFyYW1ldGVyQnlOYW1lKCdzdGF0ZW1lbnQnKV0sXHJcbiAgICAgIHBvczogbmV3IFRIUkVFLlZlY3RvcjMoLTE3OC43LCA0OS42LCAxMC41KSxcclxuICAgICAgcm90OiBuZXcgVEhSRUUuRXVsZXIoMCwgMyAqIE1hdGguUEkgLyAyLCAwKSxcclxuICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IzKDAuNjYxODksIDAuMzcyMzEsIDAuMDE4MDM0KSxcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uKiBlbnRyaWVzKG9iail7XHJcbiAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpe1xyXG4gICAgeWllbGQgW2tleSwgb2JqW2tleV1dO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcGxhY2Vob2xkZXIgPSAnSW1hZ2VzL2hrLnBuZyc7XHJcbmNvbnN0IHNwYWNlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdzcGFjZScpIHx8ICdnYWxsZXJ5JztcclxuZm9yIChsZXQgaW1hZ2Ugb2YgZW50cmllcyhpbWFnZXNbc3BhY2VdKSl7XHJcbiAgY29uc3QgZGF0YSA9IGltYWdlWzFdO1xyXG4gIGNvbnN0IGltZyA9IG5ldyBNeUltYWdlKGRhdGEudXJsIHx8IHBsYWNlaG9sZGVyKTtcclxuICBpbWcucG9zaXRpb24uY29weShkYXRhLnBvcyk7XHJcbiAgaW1nLnJvdGF0aW9uLmNvcHkoZGF0YS5yb3QpO1xyXG4gIGltZy5zY2FsZS5jb3B5KGRhdGEuc2NhbGUpO1xyXG4gIHNpbS5zY2VuZS5hZGQoaW1nKTtcclxufVxyXG4iXX0=
