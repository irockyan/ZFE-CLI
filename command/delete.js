'use strict'

const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk'),
  inquirer = require('inquirer');
const fs = require('fs')

module.exports = () => {
  // 接收用户输入的参数
  const questions = [{
    type: 'input',
    name: 'DeleteName',
    message: '输入要删除的模版名字',
    validate: function (value) {
      if (value) {
        return true;
      } else {
        console.log('请输入要删除的模版的名字');
      }
    }
  }]
  inquirer.prompt(questions).then(function (answers) {
    // 删除对应的模板
    if (config.tpl[answers.DeleteName]) {
      config.tpl[answers.DeleteName] = undefined
    } else {
      console.log(chalk.red('此模版不存在!'))
      process.exit()
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
