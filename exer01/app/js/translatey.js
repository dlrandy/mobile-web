document.body.addEventListener('touchmove', (event) => {
  event = event || window.event;
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }  
}, {
  passive: false
});


function pages({wrapId, wrap2Id, len, n}) {
  const box = document.getElementById(wrapId),
    box2 = document.getElementById(wrap2Id);
  
  let startY, moveY, clientHeight;
  
  const getViewportHeight = function () {
    clientHeight = document.body.clientHeight;
  }

  getViewportHeight();

  window.addEventListener('resize', getViewportHeight);

  const touchStart = function (event) {
    if (!event.touches.length) {
      return;
    }
    startY = event.touches[0].pageY;
    moveY = 0;
  }

  const touchMove = function (event) {
    if (!event.touches.length) {
      return;
    }
    moveY = event.touches[0].pageY - startY;
    box2.style.transform=`translateY(${-n * clientHeight + moveY}px)`;
  }

  const touchEnd = function (event) {
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

    box2.style.transform = `translateY( ${(-n * 10)}%)`;
  }

  box.addEventListener('touchstart', touchStart, false);
  box.addEventListener('touchmove', touchMove, false);
  box.addEventListener('touchend', touchEnd, false);
}

pages({
  wrapId: 'wrap',
  wrap2Id: 'wrap2',
  len: 6,
  n:0
})


