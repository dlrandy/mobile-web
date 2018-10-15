(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

document.body.addEventListener('touchmove', function (event) {
  event = event || window.event;

  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}, {
  passive: false
});

function pages(_ref) {
  var wrapId = _ref.wrapId,
      wrap2Id = _ref.wrap2Id,
      len = _ref.len,
      n = _ref.n;
  var box = document.getElementById(wrapId),
      box2 = document.getElementById(wrap2Id);
  var startY, moveY, clientHeight;

  var getViewportHeight = function getViewportHeight() {
    clientHeight = document.body.clientHeight;
  };

  getViewportHeight();
  window.addEventListener('resize', getViewportHeight);

  var touchStart = function touchStart(event) {
    if (!event.touches.length) {
      return;
    }

    startY = event.touches[0].pageY;
    moveY = 0;
  };

  var touchMove = function touchMove(event) {
    if (!event.touches.length) {
      return;
    }

    moveY = event.touches[0].pageY - startY;
    box2.style.transform = "translateY(".concat(-n * clientHeight + moveY, "px)");
  };

  var touchEnd = function touchEnd(event) {
    if (moveY < -50) {
      n++;
    }

    if (moveY > 50) {
      n--;
    }

    if (n < 0) {
      n = 0;
    }

    if (n > len - 1) {
      n = len - 1;
    }

    box2.style.transform = "translateY( ".concat(-n * 10, "%)");
  };

  box.addEventListener('touchstart', touchStart, false);
  box.addEventListener('touchmove', touchMove, false);
  box.addEventListener('touchend', touchEnd, false);
}

pages({
  wrapId: 'wrap',
  wrap2Id: 'wrap2',
  len: 6,
  n: 0
});

},{}]},{},[1])

//# sourceMappingURL=map/app.js.map
