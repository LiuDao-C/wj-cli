'use strict';

var _createExecutor = require('./createExecutor.js');

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const program = require('commander');


require('babel-core/register');

program.command('create <path>').description('创建项目').option('-f, --force', '如果目录已存在，会覆盖该目录').action((path, cmd) => {
    let data = {};
    console.log('path: ', path);
    new _createExecutor.createExecutor(Object.assign(data, { 'path': path }, cmd));
});

program
// 配置版本号信息
.version(`v${require('../package.json').version}`).usage('<command> [option]');

// 解析用户执行命令传入参数    
program.parse(process.argv);

// var data = {};

// function collectUserInput(data = {}) {
//     return new Promise((resolve, reject) => {
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'name',
//                 message: '请输入项目名称',
//                 default: 'my-node-cli',
//             }
//         ]).then(answer => {
//             resolve(Object.assign(data, answer));
//             copyTemplate2Dir(data);
//         })
//     })
// }

// function copyTemplate2Dir(data) {
//     // 模板文件目录
//     const destUrl = path.join(__dirname, '../templates/vue/src/views/index');

//     // 生成文件目录
//     const cwdUrl = process.cwd();

//     // 从模板目录中读取文件
//     fs.readdir(destUrl, (err, files) => {
//         if(err) throw err;
//         files.forEach(file => {
//             // 使用 ejs 渲染对应的模板文件
//             ejs.renderFile(path.join(destUrl, file), data).then(fileData => {
//                 // 生成 ejs 处理后的模板文件
//                 fs.writeFileSync(path.join(cwdUrl, file), fileData);
//             })
//         })
//     })
// }

// console.log('脚手架开始工作啦')
// collectUserInput(data);