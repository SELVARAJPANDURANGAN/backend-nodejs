const os = require("os");

console.log("free memory", os.freemem() /1024/1024/1024);

console.log("total memory", os.totalmem() /1024/1024/1024);

console.log("os version", os.version());

console.log("platform", os.platform());

console.log("cpu", os.cpus());

console.log("Architecture", os.arch());

console.log("uptime", os.uptime());

console.log("userinfo", os.userInfo());







