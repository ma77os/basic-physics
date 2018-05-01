(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.BP = {})));
}(this, (function (exports) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Vector = function () {
    function Vector() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      classCallCheck(this, Vector);

      this.x = x;
      this.y = y;

      return this;
    }

    createClass(Vector, [{
      key: "add",
      value: function add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }
    }, {
      key: "sub",
      value: function sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
      }
    }, {
      key: "mult",
      value: function mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
      }
    }, {
      key: "div",
      value: function div(n) {
        this.x /= n;
        this.y /= n;
        return this;
      }
    }, {
      key: "mag",
      value: function mag() {
        return Math.sqrt(this.magSQ());
      }
    }, {
      key: "magSQ",
      value: function magSQ() {
        return this.x * this.x + this.y * this.y;
      }
    }, {
      key: "normalize",
      value: function normalize() {
        var m = this.mag();
        if (m != 0) this.div(m);

        return this;
      }
    }, {
      key: "limit",
      value: function limit(n) {
        var m = this.mag();
        if (m > n) {
          this.normalize();
          this.mult(n);
        }

        return this;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Vector(this.x, this.y);
      }
    }], [{
      key: "add",
      value: function add(v1, v2) {
        return new Vector(v1.x, v1.y).add(v2);
      }
    }, {
      key: "sub",
      value: function sub(v1, v2) {
        return new Vector(v1.x, v1.y).sub(v2);
      }
    }, {
      key: "mult",
      value: function mult(v1, n) {
        return new Vector(v1.x, v1.y).mult(n);
      }
    }, {
      key: "div",
      value: function div(v1, n) {
        return new Vector(v1.x, v1.y).div(n);
      }
    }]);
    return Vector;
  }();

  var Mover = function () {
    function Mover() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var maxSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      classCallCheck(this, Mover);

      this.position = new Vector(x, y);
      this.acceleration = new Vector();
      this.velocity = new Vector();
      this.maxSpeed = maxSpeed;
    }

    createClass(Mover, [{
      key: "update",
      value: function update() {
        // return;
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      // steering behaviours

    }, {
      key: "arrive",
      value: function arrive(vector) {
        var maxForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.4;
        var minDist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;


        var targetVec = Vector.sub(vector, this.position);
        var dist = targetVec.mag();

        targetVec.normalize();

        if (dist < minDist) {
          var m = dist / minDist * this.maxSpeed;
          targetVec.mult(m);
        } else {
          targetVec.mult(this.maxSpeed);
        }

        var steer = Vector.sub(targetVec, this.velocity);
        steer.limit(maxForce);

        this.acceleration.add(steer);
      }
    }, {
      key: "spring",
      value: function spring(vector) {
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
        var friction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.8;
        var normalize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var targetVec = Vector.sub(vector, this.position);
        if (normalize) targetVec.normalize();

        targetVec.mult(force);

        this.acceleration.x = targetVec.x;
        this.acceleration.y = targetVec.y;

        this.velocity.mult(friction);
      }

      // springs to a ik length

    }, {
      key: "springOffset",
      value: function springOffset(vector) {
        var friction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.8;
        var length = arguments[3];

        var targetVec = Vector.sub(vector, this.position);

        var angle = Math.atan2(targetVec.y, targetVec.x);
        targetVec.x = vector.x - Math.cos(angle) * length;
        targetVec.y = vector.y - Math.sin(angle) * length;

        this.spring(targetVec, 2, friction, true);
      }

      // forward kinematics

    }, {
      key: "fk",
      value: function fk(vector) {}
      // TODO


      // inverse kinematics

    }, {
      key: "ik",
      value: function ik(vector) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

        var targetVec = Vector.sub(vector, this.position);
        var angle = Math.atan2(targetVec.y, targetVec.x);
        this.position.x = vector.x - Math.cos(angle) * length;
        this.position.y = vector.y - Math.sin(angle) * length;
      }
    }, {
      key: "x",
      set: function set$$1(value) {
        this.position.x = value;
      },
      get: function get$$1() {
        return this.position.x;
      }
    }, {
      key: "y",
      set: function set$$1(value) {
        this.position.y = value;
      },
      get: function get$$1() {
        return this.position.y;
      }
    }]);
    return Mover;
  }();

  exports.Vector = Vector;
  exports.Mover = Mover;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
