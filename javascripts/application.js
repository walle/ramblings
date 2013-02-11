'use strict';

var gravity = new Vector2d(0, 9.82);

window.onload = function () {
  document.body.innerHTML += '<canvas id="particle-field"></canvas>';
  var menuButton = new MenuButton();
  var canvas = new Canvas(document.getElementById('particle-field'));
  canvas.init();
};

function MenuButton() {
  this.id = 'menu-button';
  this.wrapper = document.getElementById('wrapper');
  this.button = document.getElementById(this.id);
  this.button.onclick = this.toggleNav.bind(this);
}

MenuButton.prototype.toggleNav = function (event) {
  event.preventDefault();
  this.wrapper.classList.toggle('show-nav');
};

function clamp(value) {
  if (value <= 0) {
    return 0;
  } else if (value >= 255) {
    return 255;
  }

  return value + 0.5;
}

Math.radians = function (degrees) {
  return degrees * Math.PI / 180;
};

Math.randomBetween = function (min, max) {
  return Math.random() * (max - min) + min;
};

function Color(r, g, b, a) {
  this.r = r || 0;
  this.g = g || 0;
  this.b = b || 0;
  this.a = a || 1;
  this.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

Color.prototype.setHueRotation = function(degrees) {
  var cosA = Math.cos(Math.radians(degrees));
  var sinA = Math.sin(Math.radians(degrees));
  this.matrix[0][0] = cosA + (1.0 - cosA) / 3.0;
  this.matrix[0][1] = 1.0 / 3.0 * (1.0 - cosA) - Math.sqrt(1.0 / 3.0) * sinA;
  this.matrix[0][2] = 1.0 / 3.0 * (1.0 - cosA) + Math.sqrt(1.0 / 3.0) * sinA;
  this.matrix[1][0] = 1.0 / 3.0 * (1.0 - cosA) + Math.sqrt(1.0 / 3.0) * sinA;
  this.matrix[1][1] = cosA + 1.0 / 3.0 * (1.0 - cosA);
  this.matrix[1][2] = 1.0 / 3.0 * (1.0 - cosA) - Math.sqrt(1.0 / 3.0) * sinA;
  this.matrix[2][0] = 1.0 / 3.0 * (1.0 - cosA) - Math.sqrt(1.0 / 3.0) * sinA;
  this.matrix[2][1] = 1.0 / 3.0 * (1.0 - cosA) + Math.sqrt(1.0 / 3.0) * sinA;
  this.matrix[2][2] = cosA + 1.0 / 3.0 * (1.0 - cosA);
  this.apply();
};

Color.prototype.apply = function () {
  var rx = this.r * this.matrix[0][0] + this.g * this.matrix[0][1] + this.b * this.matrix[0][2];
  var gx = this.r * this.matrix[1][0] + this.g * this.matrix[1][1] + this.b * this.matrix[1][2];
  var bx = this.r * this.matrix[2][0] + this.g * this.matrix[2][1] + this.b * this.matrix[2][2];
  this.r = parseInt(clamp(rx), 10);
  this.g = parseInt(clamp(gx), 10);
  this.b = parseInt(clamp(bx), 10);
};

Color.prototype.toRGBA = function () {
  return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ', ' + this.a + ')';
};

function Vector2d(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

function Particle(position, velocity) {
  this.position = position;
  this.velocity = velocity;
  this.acceleration = new Vector2d(0, 0);
  this.life = parseInt(Math.randomBetween(20, 200), 10);
  this.radius = parseInt(Math.randomBetween(1, 10), 10);
  this.color = new Color(200, 0, 70, 0.6);
}

Particle.prototype.update = function () {
  var totalAccelerationX = 0;
  var totalAccelerationY = 0;

  var mass = 5.972;// * Math.pow(10, 24);

  var force = mass / Math.pow((gravity.x * gravity.x + mass / 2 + gravity.y * gravity.y + mass / 2), 1.5);
  totalAccelerationX += gravity.x * force;
  totalAccelerationY += gravity.y * force;

  this.acceleration = new Vector2d(totalAccelerationX, totalAccelerationY);

  this.velocity.x += this.acceleration.x;
  this.velocity.y += this.acceleration.y;
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  this.life--;

  this.color.setHueRotation(0.65);
};

Particle.prototype.render = function (context) {
  context.fillStyle = this.color.toRGBA();
  context.beginPath();
  context.arc(this.position.x, this.position.y, this.radius, 0 , 2 * Math.PI, false);
  context.closePath();
  context.fill();
};

function ParticleEmitter() {
  this.numberOfParticles = 100;
  this.particles = [];
}

ParticleEmitter.prototype.emit = function (x, y) {
  for (var i = 0; i < this.numberOfParticles; i++) {
    var position = new Vector2d(x + Math.randomBetween(-15, 15), y + Math.randomBetween(-15, 15));
    var velocity = new Vector2d(Math.randomBetween(-1.8, 1.8), Math.randomBetween(-1.8, 1.8));
    this.particles.push(new Particle(position, velocity));
  }
};

function Canvas(canvas) {
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  this.background = new Color(255, 255, 255);
  this.particleEmitter = new ParticleEmitter();
}

Canvas.prototype.resize = function () {
  this.canvas.height = window.innerHeight;
  this.canvas.width = window.innerWidth - (this.section.offsetLeft + this.section.offsetWidth);
};

Canvas.prototype.update = function () {
  for (var i = 0; i < this.particleEmitter.particles.length; i++) {
    var particle = this.particleEmitter.particles[i];
    particle.update();
    if ((particle.position.x < 0 || particle.position.x > this.canvas.width) ||
        (particle.position.y < 0 || particle.position.y > this.canvas.height) ||
        particle.life <= 0) {
      this.particleEmitter.particles.splice(i, 1);
    }
  }
};

Canvas.prototype.render = function () {
  this.context.fillStyle = this.background.toRGBA();
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  var context = this.context;
  this.particleEmitter.particles.forEach(function(particle) {
    particle.render(context);
  });
};

Canvas.prototype.init = function () {
  this.section = document.getElementsByTagName('section')[0];
  this.resize();
  window.onresize = this.resize.bind(this);
  requestAnimationFrame(this.tick.bind(this));
  this.canvas.onclick = this.handleMouseInteraction.bind(this);
};

Canvas.prototype.tick = function () {
  requestAnimationFrame(this.tick.bind(this));
  this.update();
  this.render();
};

Canvas.prototype.handleMouseInteraction = function (event) {
  _gaq.push(['_trackEvent', 'Canvas', 'Use']);
  var rect = this.canvas.getBoundingClientRect();
  var x = event.clientX - rect.left - this.canvas.clientLeft + this.canvas.scrollLeft;
  var y = event.clientY - rect.top - this.canvas.clientTop + this.canvas.scrollTop;
  this.particleEmitter.emit(x, y);
};

// https://gist.github.com/paulirish/1579671
(function() {
  var lastTime = 0,
      vendors = ['ms', 'moz', 'webkit', 'o'],
      x,
      length,
      currTime,
      timeToCall;

  for(x = 0, length = vendors.length; x < length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        lastTime = currTime + timeToCall;
        return window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());