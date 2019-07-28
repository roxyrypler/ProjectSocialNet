const cluster = require('cluster');

if (cluster.isMaster) {
    // Count the machines CPU`s
    let cpuCount = require('os').cpus().length;

    // create a worker for each CPU
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    // listen for dying workers
    cluster.on('exit', function () {
        cluster.fork();
    });
}else {
    require('./index');
}