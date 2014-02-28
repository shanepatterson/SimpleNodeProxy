
var http = require('http');
var func = require('./sendrequest.js');

link_to_get = 'http://google.com';
    //'http://jobsearch.monster.com/search/web-developer_5?where=30331';
    //'https://www.facebook.com';

function handler (req, res) {

    console.log('Main Url: ' + link_to_get + req.url + '\n');

    var options = func.options(link_to_get + req.url);

    // make requests
    func.proxReq(options, req, res);

//    switch (pathname) {
//        case '/':
//
//            break;
//        default:
//    }

////    console.log("Request for " + pathname + " received.");
//    res.writeHead(200, {'Content-Type': 'text/plain'});

}

http.createServer(handler).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/\n');

//setInterval(function () {
//    var options = {};
//
//    //options for google.com
//    options = {
//        hostname: 'www.google.com',
//        port: 80,
//        path: '/',
//        method: 'GET'
//    };
//
//    // begin webRequest
//    var webReq = http.request(options, function(res) {
//        var resData = [];
//
//        //    console.log('STATUS: ' + res.statusCode);
//        //    console.log('HEADERS: ' + JSON.stringify(res.headers));
//
//        res.setEncoding('utf8');
//
//        res.on('data', function (chunk) {
//            if (chunk) {
//                resData.push(chunk);
//            }
//            //console.log('BODY: ' + resData.join(''));
//        });
//
//        res.on('end', function() {
//            if (resData.length > 0) {
//                //console.log(resData.join(''));
//                func.PostData(resData.join(''));
//            } else {
//                console.log('no data');
//            }
//            console.log('WebRequest.response ended.');
//        });
//    });
//
//    webReq.on('error', function(e) {
//        console.log('problem with request: ' + e.message);
//    });
//
//    webReq.end();
//    console.log('end webRequest');
//
//    // end webRequest
//
//
//}, 5000);
