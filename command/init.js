'use strict'
const exec = require('child_process').exec
const config = require('../templates')
const chalk = require('chalk'),
  inquirer = require('inquirer');


let temArr = config.tpl


module.exports = () => {

  const questions = [{
    type: 'list',
    name: 'TemplateName',
    message: '请输入模版名称',
    choices: temArr
  }, {
    type: 'text',
    name: 'projectName',
    message: '请输入项目名称',
    default: 'demo'
  }]
  inquirer.prompt(questions).then(function (answer) {

    let gitUrl = null
    let projectName = answer.projectName

    for ( let i = 0 ; i < temArr.length ; i ++ ) {
      temArr[i].name === answer.TemplateName && ( gitUrl = temArr.url )
    }

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && rm -rf .git`

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
