var cluster = require("cluster");
var os = require("os");
var cpuCount = os.cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on("exit", function () {
    cluster.fork();
  });
} else {
  require("../server");
}
