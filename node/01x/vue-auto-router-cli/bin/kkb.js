#!/usr/bin/env node
// 指定解释器类型
// 定制命令行界面
const program = require("commander");
program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init"));

program
  .command("refresh")
  .description("refresh routers...")
  .action(require("../lib/refresh"));

program.parse(process.argv);
