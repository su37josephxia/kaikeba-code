#!/usr/bin/env node
import program from "commander";
import init from "../lib/init.js";
import refresh from "../lib/refresh.js";
import serve from "../lib/serve.js";

program.command("init <name>").description("init project").action(init);

program.command("refresh").description("refresh routers...").action(refresh);

program.command("serve").description("serve routers...").action(serve);

program.parse(process.argv);
