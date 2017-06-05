'use strict'

const config = require('../templates');
const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');


module.exports = () => {
  console.log('添加一个模版');
  const questions = [{
    type: 'input',
    name: 'TemplateName',
    message: '模版名称',
    default: 'demo'
  }, {
    type: 'input',
    name: 'HttpsUrl',
    message: 'git地址',
    validate: function (value) {
      if (value) {
        return true;
      } else {
        console.log('请输入一个确定的地址');
      }
    },
  }]

  inquirer.prompt(questions).then(function (answers) {
    // 避免重复添加
    let tepName = answers.TemplateName
    if (!config.tpl[answers.TemplateName]) {
      config.tpl.push({
        name: tepName,
        url: answers.HttpsUrl.replace(/[\u0000-\u0019]/g, '')
      })
    } else {
      console.log(chalk.red('Template has already existed!'))
      process.exit()
    }
    // 把模板信息写入templates.json
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(chalk.green('模版已经添加完毕!\n'))
      console.log(chalk.grey('最新的配置为: \n'))
      console.log(config)
      console.log('\n')
      process.exit()
    })
  })
}
