const log4js = require("log4js");
log4js.configure({
  appenders: { appLog: { type: "file", filename: "app.log" } },
  categories: { default: { appenders: ["appLog"], level: "info" } }
});
 
module.exports = log4js.getLogger("appLog");
