import { spawn } from "child_process";
import refresh from "./refresh.js";
import watch from "watch";

const AsyncSpawn = (...args) => {
  const proc = spawn(...args);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  return proc;
};

export default async () => {
  let process;
  let isRefresh = false;
  watch.watchTree("./src", async (f) => {
    console.log("change...", f);
    if (!isRefresh) {
      isRefresh = true;
      process && process.kill();
      await refresh();
      setTimeout(() => {
        isRefresh = false;
      }, 5000);
      process = spawn("npm", ["run", "serve"]);
    }
  });
};
