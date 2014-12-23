/**
 * Created by Oakley Hall on 12/15/14.
 */

(function () {
    'use strict';
    var ftp = require('./ftp');
    var xml = require('./xml-adder');
    var chalk = require('chalk');
    var program = require('commander');
    var prompt = require('prompt');
    //console.log(  chalk.blue.bold('Welcome to PodSmash!')  );

    var podcast = {
        localpath : './',
        serverpath : 'http://coolsite.com/pod/',
        xmlFile: 'foo.xml'
    };

    function getDateStamp(){
        var now = new Date();
        console.log( Date.parse(now.getTime()) );
        return Date.parse(now.getTime());
    }

    function Episode(pod){
        var title,subtitle,author,image,summary,file,duration,isExplicit,
            pubdate = getDateStamp();
        return{
            title       :function(ptitle){ title = ptitle; },
            subtitle    :function(psubtitle){ subtitle = psubtitle; },
            author      :function(pauthor){ author = pauthor; },
            image       :function(pimage){ image = pimage; },
            summary     :function(psummary){ summary = psummary; },
            audFile     :function(pfile){ file = pfile; },
            duration    :function(pduration){ duration = pduration; },
            isExplicit  :function(pexp){ isExplicit = pexp; },

            getXMLishObject:function(){
                var toreturn = {};
                toreturn['title']           = title||'';
                toreturn['itunes:subtitle'] = subtitle||'';
                toreturn['itunes:author']   = author||'';
                toreturn['itunes:image']    = image||'';
                toreturn['itunes:summary']  = summary||'';
                toreturn['enclosure']       = pod.serverpath + ( file || '' );
                toreturn['guid']            = pod.serverpath + ( file || '' );
                toreturn['itunes:duration'] = duration||'';
                toreturn['pubDate']         = pubdate;
                toreturn['itunes:explicit'] = isExplicit||false;

                return toreturn;
            }
        };
    }

    var episode = new Episode(podcast);

    prompt.get(['Title'], function (err, result) {
        episode.title( result.Title );
        xml(podcast, episode.getXMLishObject(), function(err){
            console.log( JSON.stringify(err) );
            throw err;
        });
    });

    //program
    //    .version('0.0.1')
    //    .option( '-u, --url',       'Add file(s) url')
    //    .option( '-t, --title',     'Add title')
    //    .option( '-s, --subtitle',  'Add subtitle')
    //    .option( '-i, --image',     'Add image file name')
    //    .option( '-a, --author',    'Add author')
    //    .option( '-s, --summary',   'Add summary')
    //    .option( '-f, --filename',  'Add audio file name')
    //    .option( '-e, --explicit',  'Add explicit flag')
    //    .parse(process.argv);

    //console.log('you ordered a pizza with:');
    //if (program.title){
    //    episode.title = program.title;
    //}
    //if (program.pineapple) console.log('  - pineapple');
    //if (program.bbq) console.log('  - bbq');
    //console.log('  - %s cheese', program.cheese);

    //if( process.argv[2] && process.argv[3] && process.argv[4] ){
    //    ftp( process.argv[2], process.argv[3], process.argv[4], function () {
    //        console.log('PodSmash complete!');
    //    });
    //}else{
    //    console.log('Requires args: FTP Host, User, Password');
    //}

    //prompt.start();

})();
