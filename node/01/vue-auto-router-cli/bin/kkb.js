#!/usr/bin/env node
const program = require("commander");
program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init"));
// console.log('process.argv',process.argv)
program
  .command("refresh")
  .description("refresh router")
  .action(require("../lib/refresh"));

program.parse(process.argv);
