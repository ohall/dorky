/**
 * Created by Oakley Hall on 12/15/14.
 */

(function () {
    'use strict';

    module.exports = function (host, user, password, callback) {

        var Client = require('ftp'),
            fs = require('fs'),
            client = new Client();

        client.on('ready', function () {
            client.put('foo.txt', 'foo.remote-copy.txt', function (err) {
                if (err) {
                    throw err;
                }
                client.end();
            });
        });

        client.connect({
            host: host,
            user: user,
            password: password
        });

        callback();
    };
})();
