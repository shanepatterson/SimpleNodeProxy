var http = require('http');
var https = require('https');
var url = require('url');
//var qs = require('querystring');

function getOptions(req_link) {

    var segment = url.parse(req_link);
    var port  = 80;     //default port is 80

    console.log(segment);

//    console.log(segment);
    if (segment.protocol !== null) {
        port = segment.protocol == 'https:' ? 443 : 80;

        if (port == 443) {
            var regex = /^http:/gi;
            if (link_to_get.match(regex)) {
                // set the new value for the global variable
                link_to_get = link_to_get.replace(/^http:/gi,'https:');
            }
        } else {
            var regex = /^https:/gi;
            if (link_to_get.match(regex)) {
                // set the new value for the global variable
                link_to_get = link_to_get.replace(/^https:/gi,'http:');
            }
        }
    }

    var options = {
        hostname: segment.hostname || null,
        port: port,
        path: segment.pathname + (segment.search || ''),
        method: 'GET',
        headers: {
            'user-agent': 'Mozilla/5.0 ' +
                '(Macintosh; Intel Mac OS X 10_7_5) ' +
                'AppleWebKit/537.22 (KHTML, like Gecko) ' +
                'Chrome/25.0.1364.172 Safari/537.22'
        }
    };

    //console.log(segment);
    //console.log(options);

    return options;
}

// http Request
function proxReq(options, request, response) {

//    response.on('pipe', function () {
//        console.log('I\'m being piped.');
//        //console.log(arguments);
//    });

    var proxy = null;
    // make requests
    if (options['port'] == 80) {
        proxy = http.request(options, function(res) {
            res.setEncoding('utf8');

            console.log(request.url);
            console.log('Proxy Begin Request...');
        });
    } else {
        proxy = https.request(options, function(res) {
            res.setEncoding('utf8');

            console.log(request.url);
            console.log('Proxy Begin Request...');
        });
    }
    proxy.end();

    proxy.on('response', function(proxyRes) {
        var body = [];

        proxyRes.on('data', function (chunk) {
            body.push(chunk);
        });

        proxyRes.on('end',function () {
//            // handles response
            onResponse(options, proxy, proxyRes, request, response, body);

            console.log('Proxy End Request...\n');
        });

        // handles response
//        onResponse(options, proxy, proxyRes, request, response);
    });

    return proxy;
}

function onResponse (options, proxy, proxyRes, req, res, body) {
    if (proxyRes.headers['location']) {
        proxy.end();

        var redirectTo = proxyRes.headers['location'];

        // follow redirect
        console.log('Redirecting to : ' + redirectTo);

        if (/^\//.test(redirectTo)) {
            var protocol = options['port'] == 80 ? 'http://' : 'https://';

            redirectTo = protocol + options['hostname'] + redirectTo;
            console.log('Actually to : ' + redirectTo);
        }

        // re-init options
        var options = getOptions(redirectTo);

        // make requests
        proxReq(options, req, res);
    } else {
//        proxyRes.pipe(res);

        console.log('****Data****\n' + body.join(''));
        res.end(body.join(''));
        body.length = 0;
    }
}

exports.options = getOptions;
exports.proxReq = proxReq;