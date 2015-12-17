/*jshint esnext: true */
"use strict";

(function () {
    "use strict";

    var editorOptions = {
        fontSize: "22px"
    };

    var editorsContent = {
        ".let .editor": "var foo = 1;\n\nfunction theFunction()\n{\n  console.log(foo);\n\n  var bar = 2;\n\n  if (true)\n  {\n    var baz = 3;\n    console.log(bar);\n  }\n\n  console.log(baz);\n}\n\ntheFunction();",
        ".redeclare .editor": "var a = 0;\nvar a = 1;\n\nconsole.log(a);\n\nfunction theFunction()\n{\n  var b = 2;\n  var b = 3;\n\n  console.log(b);\n}\n\ntheFunction();",
        ".const .editor": "const foo = {\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\"\n};\n\nconsole.log(foo);\n\nfoo.lastName = \"Travolta\";\n\nconsole.log(foo);\n\nfoo = {};",
        ".parameters .editor": "function theFunction(foo = \"PHP\", bar = \"is not\", baz = \"awesome\")\n{\n  console.log(foo, bar, baz);\n}\n\ntheFunction(\"Javascript\", \"is\");"
    };

    var scaleAllSteps = function scaleAllSteps() {
        var SCALE = "0.1";

        var scaled = document.querySelectorAll(".scaled");

        Array.from(scaled).forEach(function (element) {
            element.setAttribute("data-scale", SCALE);
        });
    };

    var runLetCode = function runLetCode(element) {
        var editorElement = element.target.parentElement.querySelector(".editor");
        var editor = ace.edit(editorElement);
        eval(editor.getSession().getValue());
    };

    var getEditor = function getEditor(selector) {
        return ace.edit(document.querySelector(selector));
    };

    var initEditors = function initEditors(editors) {
        Array.from(editors).forEach(function (editor) {
            editor = ace.edit(editor);
            editor.getSession().setMode("ace/mode/javascript");
            editor.setTheme("ace/theme/monokai");
            editor.$blockScrolling = "Infinity"; //Disable warning
            editor.setOptions(editorOptions);
        });
    };

    var populateEditors = function populateEditors() {
        for (var i in editorsContent) {
            if (editorsContent.hasOwnProperty(i)) {
                var editor = getEditor(i);
                editor.getSession().setValue(editorsContent[i]);
            }
        }
    };

    var init = function init() {
        var editors = document.querySelectorAll(".editor");
        initEditors(editors);
        populateEditors(editors);
        scaleAllSteps();
        var runButtons = document.querySelectorAll(".run-code");

        Array.from(runButtons).forEach(function (button) {
            button.addEventListener("click", runLetCode);
        });
    };

    init();
})();
