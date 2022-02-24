import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';

export class createExecutor {
    // 验证是否正常取到值
    constructor(data) {
        console.log(data);
        checkProjectDir(data);
    }

    // 检查项目目录是否可用
    checkProjectDir(data = {}) {
        return new Promise((resolve, reject) => {
            // 当前所在目录
            const cwd = process.cwd();
            // 需要创建项目的目录
            const targetDir = path.join(cwd, data.name);

            // 判断目录是否已经存在？
            if(fs.existsSync(targetDir)) {
                // 是否带有强制参数？
                if(data.force) {
                    resolve(data);
                } else {
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'ok',
                            message: '目录不为空，是否继续？（no）',
                            default: 'no',
                            choices: ['yes', 'no'],
                        },
                    ])
                    .then(answer => {
                        if(answer.ok === 'yes') {
                            resolve(data);
                        } else {
                            process.exit(0);
                        }
                    })
                }
            } else {
                resolve(data);
            }
        })
    }
}