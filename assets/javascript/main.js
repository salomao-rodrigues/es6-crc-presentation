/*jshint esnext: true */
(function () {
    "use strict";

    let editorOptions = {
        fontSize: "22px"
    };

    let editorsContent = {
        ".let .editor": `var foo = 1;

function theFunction()
{
  console.log(foo);

  var bar = 2;

  if (true)
  {
    var baz = 3;
    console.log(bar);
  }

  console.log(baz);
}

theFunction();`,
        ".redeclare .editor": `var a = 0;
var a = 1;

console.log(a);

function theFunction()
{
  var b = 2;
  var b = 3;

  console.log(b);
}

theFunction();`,
        ".const .editor": `const foo = {
  "firstName": "John",
  "lastName": "Doe"
};

console.log(foo);

foo.lastName = "Travolta";

console.log(foo);

foo = {};`,
        ".parameters .editor": `function theFunction(a = "JavaScript", b = "is", c = "awesome")
{
  console.log(a, b, c);
}

theFunction();`
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
