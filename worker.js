var cluster = require('cluster');
var http = require('http');
var numCPUs = 1;
var request = require('request');
var fs = require('fs')
  , gm = require('gm');

if (cluster.isMaster) {
    console.log('[master] ' + "start master...");

    for (var i = 0; i < numCPUs; i++) {
         cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    http.createServer(function (req, res) {
        console.log('worker'+cluster.worker.id);
	//console.log(req.url)
	tIdx = req.url.indexOf('src=')
	url = req.url.slice(tIdx+4)
	var ret;
	gm(request(url)).identify('%k', function (err, format) {
	    console.log(format);
	    ret = format
	    res.end(ret)
        })
    }).listen(80);
}
