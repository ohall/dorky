/**
 * Created by Oakley Hall on 12/15/14.
 */

(function () {
    'use strict';

    console.log( 'PodSmash!' );

    var ftp = require('./ftp');
    var xml = require('./xml-adder');

    var chalk = require('chalk');
    var program = require('commander');

    var prompt = require('prompt');

    console.log(  chalk.blue.bold('Welcome to PodSmash!')  );

    program
        .version('0.0.1')
        .option( '-u, --url',       'Add file(s) url')
        .option( '-t, --title',     'Add title')
        .option( '-s, --subtitle',  'Add subtitle')
        .option( '-i, --image',     'Add image file name')
        .option( '-a, --author',    'Add author')
        .option( '-s, --summary',   'Add summary')
        .option( '-f, --filename',  'Add audio file name')
        .option( '-e, --explicit',  'Add explicit flag')
        .parse(process.argv);

    //console.log('you ordered a pizza with:');
    //if (program.peppers) console.log('  - peppers');
    //if (program.pineapple) console.log('  - pineapple');
    //if (program.bbq) console.log('  - bbq');
    //console.log('  - %s cheese', program.cheese);


    xml();

    //if( process.argv[2] && process.argv[3] && process.argv[4] ){
    //    ftp( process.argv[2], process.argv[3], process.argv[4], function () {
    //        console.log('PodSmash complete!');
    //    });
    //}else{
    //    console.log('Requires args: FTP Host, User, Password');
    //}


    //prompt.start();


    //prompt.get(['Title', 'path'], function (err, result) {
    //    //
    //    // Log the results.
    //    //
    //    console.log('Command-line input received:');
    //    console.log('  Title: ' + result.Title);
    //    console.log('  path: ' + result.path);
    //});

})();
