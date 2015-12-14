/*jshint esnext: true */
(function () {
    "use strict";
    let scaleAllSteps = function () {
        const SCALE = "0.1";

        let scaled = document.querySelectorAll(".scaled");

        Array.from(scaled).forEach(function (element) {
            element.setAttribute("data-scale", SCALE);
        });
    };

    let runLetCode = function () {
        let code = editor.getSession().getValue();
        eval(code);
    };

    let init = function init() {
        scaleAllSteps();
        document.querySelector(".run-let-code").addEventListener("click", runLetCode);
    };

    init();
}());
