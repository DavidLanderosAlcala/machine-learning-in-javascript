define("Application", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Application = (function () {
        function Application() {
        }
        Application.prototype.main = function () {
            console.log('Hello world');
        };
        return Application;
    }());
    exports.Application = Application;
});