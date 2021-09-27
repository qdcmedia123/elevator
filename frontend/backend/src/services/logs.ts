import log4js from "log4js";

log4js.configure({
  appenders: { cheese: { type: "file", filename: "./logs/logs.log" },
  console: { type: 'console' ,"layout": { "type": "pattern", "pattern": "%d - %c:[%p]: %m" }}, },
  categories: { default: { appenders: ["cheese", "console"], level: "all" } },
});

export default log4js;
