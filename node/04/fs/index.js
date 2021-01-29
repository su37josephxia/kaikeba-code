const fs = require("fs");

function get(key) {
  fs.readFile("./db.json", (err, data) => {
    const json = JSON.parse(data);
    console.log(json[key]);
  });
}

function set(key, value) {
  fs.readFile("./db.json", (err, data) => {
    const json = data ? JSON.parse(data) : {};
    json[key] = value;
    // 重新写入文件
    fs.writeFile("./db.json", JSON.stringify(json), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("写入成功");
      }
    });
  });
}

// set a 1
// get a
// 流 \n
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  const [op, key, value] = input.split(" ");
  if (op === "get") {
    get(key);
  } else if (op === "set") {
    set(key, value);
  } else if (op === "quit") {
    rl.close();
  } else {
    console.log("没有此操作");
  }
});

rl.on("close", () => {
  console.log("程序结束");
  process.exit(0);
});
