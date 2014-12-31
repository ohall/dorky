/**
 * Created by Oakley Hall on 12/15/14.
 */

(function () {
    'use strict';
    var ftp     = require('./ftp'),
        xml     = require('./xml-adder'),
        chalk   = require('chalk'),
        prompt  = require('prompt'),
        fs      = require("fs"),
        podcasts;

    var PODSFILE = './podcasts.json';

    var podcast = {
        localpath : './',
        serverpath : 'http://coolsite.com/pod/',
        xmlFile: 'foo.xml',
        author:'Oakley'
    };


    fs.exists(PODSFILE, function(exists) {
        if (exists) {
            podcasts = require(PODSFILE);
        } else {
            fs.writeFile( PODSFILE, JSON.stringify( podcast ), 'utf8', function(){
                console.log( 'wrote pod file' );
            });
        }
    });

    function getDateStamp(){ return new Date(Date.now()).toString();}

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
                toreturn['itunes:explicit'] = isExplicit||'No';

                return toreturn;
            }
        };
    }
    var episode = new Episode(podcast);


    var promptschema = {
        properties: {
            title: {
                description: 'Episode title'.magenta
            },
            subtitle: {
                description: 'Episode subtitle'.cyan
            },
            author: {
                description: 'Episode author'.white,
                default: podcast.author
            },
            image: {
                description: 'Cover image name'.yellow
            },
            summary: {
                description: 'Episode summary'.magenta
            },
            audFile: {
                description: 'Audio file name'.cyan
            },
            duration: {
                description: 'Episode duration'.white
            },
            isExplicit: {
                description: 'Explict? Yes/No'.yellow
            }
        }
    };

    prompt.message = 'Podsmash'.rainbow;
    prompt.delimiter = '  -->  '.rainbow;
    prompt.get(promptschema, function (err, result) {
        episode.title( result.title );
        episode.subtitle( result.subtitle );
        episode.author( result.author );
        episode.image( result.image );
        episode.summary( result.summary );
        episode.audFile( result.audFile );
        episode.duration( result.duration );
        episode.isExplicit( result.isExplicit );
        xml(podcast, episode.getXMLishObject(), function(err){
            console.log( JSON.stringify(err) );
            throw err;
        });
    });

    //if( process.argv[2] && process.argv[3] && process.argv[4] ){
    //    ftp( process.argv[2], process.argv[3], process.argv[4], function () {
    //        console.log('PodSmash complete!');
    //    });
    //}else{
    //    console.log('Requires args: FTP Host, User, Password');
    //}

    //prompt.start();

})();
