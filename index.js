#!/usr/bin/env node

const download = require('download-git-repo')
const { Command } = require('commander')
const program = new Command()

program.version(require('./package.json').version)

// 帮助信息
program.option(
  '-F, --framework',
  '指定创建项目的框架，目前支持-vue, -nuxt, -uni | zq create project -vue 格式'
)

// 创建指令
program
  .command('create <projectName>')
  .description('指令描述')
  .option('-vue', '选项描述')
  .option('-nuxt', '选项描述')
  .action((projectName, option) => {
    const type = Object.keys(option)[0]
    switch (type) {
      case 'Vue':
        console.log('开始创建vue项目')
        download(
          'direct:https://github.com/zhe-qi/template-vue3-vite-ts-unocss.git',
          projectName,
          { clone: true },
          err => {
            // 个人分析出的两种错误情况：1 同目录项目名已存在 2 储存库出现问题
            if (err) return console.log('项目已存在或存储库错误！')
            // 创建成功 提示
            console.log('vue项目创建成功')
            console.log('cd ' + projectName)
            console.log('pnpm install')
            console.log('pnpm dev')
            console.log('or npm install but delete pnpm-lock.yaml')
          }
        )
        break
      case 'Nuxt':
        console.log('创建nuxt项目')
        break
      case 'Uni':
        console.log('创建uniapp项目')
        break
      default:
        console.log('未知选项')
    }
  })
// 解析指令，这点很重要  不解析指令则无效
program.parse(process.argv)
