// add event listeners to following #scroll element id
var el = document.getElementById("scroll");
el.addEventListener("touchstart", touchStart, false);
el.addEventListener("touchend", touchEnd, false);
el.addEventListener("touchmove", touchMove, false);
el.addEventListener("webkitTransitionEnd", animEnd, false);
el.style.webkitTransition = "all 0.25s ease-out";

// default values that will get changed later
var originalCoord = {
    x: 0
}
var finalCoord = {
    x: 0
}
var startSpot = 0;
var changeX = 0;

// what happens immediately after user puts finger on screen and swipe side to side

function touchStart(evt) {
    el.style.webkitTransform = "translate3d(" + -(startSpot) + "px,0,0)";
    originalCoord.x = event.targetTouches[0].pageX;
}
// what happens when user lifts finger from screen

function touchEnd(evt) {
    startSpot = changeX;
    originalCoord.x = 0;
    finalCoord.x = 0;
}

// code to run immediately after touchEnd

function animEnd(evt) {
    // sets margins for when client tries to scroll all the way left
    if ($slide.offset().left > 0) {
        $slide.offset({
            left: 0
        });
    }
    // sets margins for when client tries to scroll all the way right
    if ($slide.offset().left < -6535 + window_width) {
        $slide.offset({
            left: -6535 + window_width
        });
    }
}

// handles all the moving/scrolling/touching that user does

function touchMove(evt) {
    // the action of moving left and right when swiping/scrolling
    if ($slide.offset().left <= 0 && $slide.offset().left >= -6535 + window_width) {
        evt.preventDefault();
        finalCoord.x = event.targetTouches[0].pageX;
        changeX = startSpot + (originalCoord.x - finalCoord.x);
        el.style.webkitTransform = "translate3d(" + -(changeX) + "px,0,0)";
    }
}