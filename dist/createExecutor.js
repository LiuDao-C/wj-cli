"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExecutor = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var createExecutor = /*#__PURE__*/function () {
  // 验证是否正常取到值
  function createExecutor(data) {
    _classCallCheck(this, createExecutor);

    console.log(data);
    checkProjectDir(data);
  } // 检查项目目录是否可用


  _createClass(createExecutor, [{
    key: "checkProjectDir",
    value: function checkProjectDir() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        // 当前所在目录
        var cwd = process.cwd(); // 需要创建项目的目录

        var targetDir = _path["default"].join(cwd, data.name); // 判断目录是否已经存在？


        if (_fsExtra["default"].existsSync(targetDir)) {
          // 是否带有强制参数？
          if (data.force) {
            resolve(data);
          } else {
            _inquirer["default"].prompt([{
              type: 'list',
              name: 'ok',
              message: '目录不为空，是否继续？（no）',
              "default": 'no',
              choices: ['yes', 'no']
            }]).then(function (answer) {
              if (answer.ok === 'yes') {
                resolve(data);
              } else {
                process.exit(0);
              }
            });
          }
        } else {
          resolve(data);
        }
      });
    }
  }]);

  return createExecutor;
}();

exports.createExecutor = createExecutor;