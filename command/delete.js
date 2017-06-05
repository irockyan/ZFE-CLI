'use strict'

const config = require('../templates');
const chalk = require('chalk'),
  inquirer = require('inquirer');
const fs = require('fs')

let temArr = config.tpl

module.exports = () => {
  // 接收用户输入的参数
  const questions = [{
    type: 'list',
    name: 'DeleteName',
    message: '输入要删除的模版名字',
    choices: temArr
  }]
  inquirer.prompt(questions).then(function (answers) {
    //删除对应的模版
    for ( let i = 0 ; i < temArr.length ; i ++ ) {
      answers.DeleteName === temArr[i].name && temArr.splice(i, 1)
    }
    // 写入template.json
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(chalk.green('模版删除成功!'))
      console.log(chalk.grey('最后的模版配置为: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  });
}
