$(document).on("click", function() {
  var $one = $("#div1"),
    mousemoveEventTimeout = 50, // mousemove event every N miliseconds
    transitionSteps = 5, // number of steps between the old and new mouse positions
    transitionStepDuration = Math.floor(
      mousemoveEventTimeout / transitionSteps
    ),
    browserPrefix = "",
    cx = Math.ceil(window.innerWidth / 2.0),
    cy = Math.ceil(window.innerHeight / 2.0),
    oldMousePositionX = cx,
    oldMousePositionY = cy,
    usrAg = navigator.userAgent;
  if (usrAg.indexOf("Chrome") > -1 || usrAg.indexOf("Safari") > -1) {
    browserPrefix = "-webkit-";
  } else if (usrAg.indexOf("Opera") > -1) {
    browserPrefix = "-o";
  } else if (usrAg.indexOf("Firefox") > -1) {
    browserPrefix = "-moz-";
  } else if (usrAg.indexOf("MSIE") > -1) {
    browserPrefix = "-ms-";
  }

  function calculateChanges(dx, dy) {
    var tiltx = dy / cy,
      tilty = -(dx / cx),
      radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2)),
      degree = radius * 30,
      shadx = degree * tiltx /*horizontal shadow*/,
      shady = degree * tilty /*vertical shadow*/,
      changes = Object.create(null);
    changes.degree = degree;
    changes.tiltx = -1 * tiltx;
    changes.tilty = -1 * tilty;
    changes.shadx = shadx;
    changes.shady = shady;
    return changes;
  }

  var wait = false;
  $(document).mousemove(function(event) {
    var newMousePositionX = event.pageX,
      newMousePositionY = event.pageY;

    if (!wait) {
      var distanceX = Math.round(
          (oldMousePositionX - newMousePositionX) / transitionSteps
        ),
        distanceY = Math.round(
          (oldMousePositionY - newMousePositionY) / transitionSteps
        ),
        dx = oldMousePositionX - cx - distanceX,
        dy = oldMousePositionY - cy - distanceY,
        i = 1;

      var myVar = setInterval(function() {
        if (i >= transitionSteps - 1) {
          clearInterval(myVar);
        }
        i++;
        dx = dx - distanceX;
        dy = dy - distanceY;

        var changes = calculateChanges(dx, dy);

        $one.css(
          browserPrefix + "transform",
          "rotate3d(" +
            changes.tiltx +
            ", " +
            changes.tilty +
            ", 0, " +
            changes.degree +
            "deg)"
        );

        if (dx > cx)
          /*without that horizontal values are reversed*/
          $("#div1").css(
            "box-shadow",
            +-changes.shady + "px " + -changes.shadx + "px 15px rgba(0,0,0,.5)"
          );
        else
          $("#div1").css(
            "box-shadow",
            +changes.shady + "px " + -changes.shadx + "px 15px rgba(0,0,0,.5)"
          );
      }, transitionStepDuration);

      oldMousePositionX = newMousePositionX;
      oldMousePositionY = newMousePositionY;
      wait = true;
      setTimeout(function() {
        wait = false;
      }, mousemoveEventTimeout);
    }
  });
});
