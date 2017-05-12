'use strict'
const exec = require('child_process').exec
const config = require('../templates')
const chalk = require('chalk'),
  inquirer = require('inquirer');

module.exports = () => {

  const questions = [{
    type: 'input',
    name: 'TemplateName',
    message: '请输入模版名称',
    default: 'demo'
  }, {
    name: 'projectName',
    message: '请输入项目名称',
    default: 'demo'
  }]
  inquirer.prompt(questions).then(function (answer) {
    if (!config.tpl[answer.TemplateName]) {
      console.log(chalk.red('\n × 模版不存在'))
      process.exit()
    }
    let gitUrl = config.tpl[answer.TemplateName].url,
        projectName = answer.projectName;

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName}`

    console.log(chalk.white('\n 开始生成...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ 完成!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  });
}
