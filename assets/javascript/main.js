/*jshint esnext: true */
(function () {
    "use strict";

    let editorOptions = {
        fontSize: "22px"
    };

    var editorsContent = {
        ".let .editor":        "var foo = 1;\n\nfunction theFunction()\n{\n  console.log(foo);\n\n  var bar = 2;\n\n  if (true)\n  {\n    var baz = 3;\n    console.log(bar);\n  }\n\n  console.log(baz);\n}\n\ntheFunction();",
        ".redeclare .editor":  "var a = 0;\nvar a = 1;\n\nconsole.log(a);\n\nfunction theFunction()\n{\n  var b = 2;\n  var b = 3;\n\n  console.log(b);\n}\n\ntheFunction();",
        ".const .editor":      "const foo = {\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\"\n};\n\nconsole.log(foo);\n\nfoo.lastName = \"Travolta\";\n\nconsole.log(foo);\n\nfoo = {};",
        ".parameters .editor": "function theFunction(a = \"JavaScript\", b = \"is\", c = \"awesome\")\n{\n  console.log(a, b, c);\n}\n\ntheFunction();"
    };

    let scaleAllSteps = function () {
        const SCALE = "0.1";

        let scaled = document.querySelectorAll(".scaled");

        Array.from(scaled).forEach(function (element) {
            element.setAttribute("data-scale", SCALE);
        });
    };

    let runLetCode = function (element) {
        let editorElement = element.target.parentElement.querySelector(".editor");
        let editor = ace.edit(editorElement);
        eval(editor.getSession().getValue());
    };

    let getEditor = function (selector) {
        return ace.edit(document.querySelector(selector));
    };

    let initEditors = function (editors) {
        Array.from(editors).forEach(function (editor) {
            editor = ace.edit(editor);
            editor.getSession().setMode("ace/mode/javascript");
            editor.setTheme("ace/theme/monokai");
            editor.$blockScrolling = "Infinity"; //Disable warning
            editor.setOptions(editorOptions);
        });
    };

    let populateEditors = function () {
        for (let i in editorsContent) {
            if (editorsContent.hasOwnProperty(i)) {
                let editor = getEditor(i);
                editor.getSession().setValue(editorsContent[i]);
            }
        }
    };

    let init = function init() {
        let editors = document.querySelectorAll(".editor");
        initEditors(editors);
        populateEditors(editors);
        scaleAllSteps();
        let runButtons = document.querySelectorAll(".run-code");

        Array.from(runButtons).forEach(function (button) {
            button.addEventListener("click", runLetCode);
        });
    };

    init();
}());
