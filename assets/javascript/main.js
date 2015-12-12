/*jshint esnext: true */
(function scaleAllSteps() {
    "use strict";

    const SCALE = "0.1";

    let scaled = document.querySelectorAll(".scaled");

    Array.from(scaled).forEach(function (element) {
        element.setAttribute("data-scale", SCALE);
    });
}());
