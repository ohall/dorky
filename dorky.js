/**
 * Created by Oakley Hall on 12/15/14.
 */

(function () {
    'use strict';
    var ftp      = require('./ftp'),
        xml      = require('./xml-adder'),
        chalk    = require('chalk'),
        prompt   = require('prompt'),
        fs       = require("fs"),
        podcasts = [{defaults:{}}],
        episode;

    var PODSFILE = './podcasts.json';

    function getDateStamp(){ return new Date(Date.now()).toString();}

    //var podcast = {
    //    localpath : './',
    //    serverpath : 'http://coolsite.com/pod/',
    //    xmlFile: 'foo.xml',
    //    author:'Oakley'
    //};


    fs.exists(PODSFILE, function(exists) {
        if (exists) {
            podcasts = JSON.parse(fs.readFileSync(PODSFILE, 'utf8'));
            episode = new Episode(podcasts);
            var promptschema = {
                properties: {
                    title: {
                        description: 'Episode title'.magenta
                    },
                    subtitle: {
                        description: 'Episode subtitle'.cyan,
                        default: podcasts[0].defaults.subtitle || ''
                    },
                    author: {
                        description: 'Episode author'.white,
                        default: podcasts[0].defaults.author || ''
                    },
                    image: {
                        description: 'Cover image name'.yellow,
                        default: podcasts[0].defaults.image || ''
                    },
                    summary: {
                        description: 'Episode summary'.magenta,
                        default: podcasts[0].defaults.summary || ''
                    },
                    audFile: {
                        description: 'Audio file name'.cyan,
                        default: podcasts[0].defaults.summary || ''
                    },
                    duration: {
                        description: 'Episode duration'.white
                    },
                    isExplicit: {
                        description: 'Explict? Yes/No'.yellow,
                        default: podcasts[0].defaults.isExplicit || ''
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
                xml(podcasts[0].defaults, episode.getXMLishObject(), function(err){
                    console.log( JSON.stringify(err) );
                    throw err;
                });
            });

        } else {
            //console.log( 'NO PODSFILE' );
            //fs.writeFile( PODSFILE, JSON.stringify( podcast ), 'utf8', function(){
            //    console.log( 'wrote pod file' );
            //});
        }
    });


    function Episode(pod){
        console.log( 'POD:' + JSON.stringify(pod) );
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



    //if( process.argv[2] && process.argv[3] && process.argv[4] ){
    //    ftp( process.argv[2], process.argv[3], process.argv[4], function () {
    //        console.log('PodSmash complete!');
    //    });
    //}else{
    //    console.log('Requires args: FTP Host, User, Password');
    //}

    //prompt.start();

})();
