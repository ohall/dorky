/**
 * Created by Oakley Hall on 12/15/14.
 */

(function () {
    'use strict';
    var ftp      = require('./modules/ftp'),
        prompt   = require('./modules/dorkyprompt'),
        chalk    = require('chalk'),
        fs       = require("fs"),
        podcasts = [{defaults:{}}],
        episode;

    var PODSFILE = './podcasts.json';

    function getDateStamp(){ return new Date(Date.now()).toString();}

    //var podcast = {git sat
    //    localpath : './',
    //    serverpath : 'http://coolsite.com/pod/',
    //    xmlFile: 'foo.xml',
    //    author:'Oakley'
    //};


    fs.exists(PODSFILE, function(exists) {
        if (exists) {
            podcasts = JSON.parse(fs.readFileSync(PODSFILE, 'utf8'));
            episode = new Episode(podcasts);
            prompt(podcasts,episode,function(err){
                throw err;
            });
        } else {
            //console.log( 'NO PODSFILE' );
            //fs.writeFile( PODSFILE, JSON.stringify( podcast ), 'utf8', function(){
            //    console.log( 'wrote pod file' );
            //});
        }
    });


    function Episode(pod){
        var title,subtitle,author,image,summary,file,duration,isExplicit,
            defaults = pod[0].defaults,
            pubdate = getDateStamp();

        console.log( 'POD:' + JSON.stringify(defaults) );
        return{
            title       : function(ptitle){     title = ptitle; },
            subtitle    : function(psubtitle){  subtitle = psubtitle; },
            author      : function(pauthor){    author = pauthor; },
            image       : function(pimage){     image = pimage; },
            summary     : function(psummary){   summary = psummary; },
            audFile     : function(pfile){      file = pfile; },
            duration    : function(pduration){  duration = pduration; },
            isExplicit  : function(pexp){       isExplicit = pexp; },

            getDefaults      : function(){ return pod.defaults },
            getAudioFileName : function(){ return file },
            getXMLishObject  : function(){
                var toreturn = {};
                toreturn['title']           = title||'';
                toreturn['itunes:subtitle'] = subtitle||'';
                toreturn['itunes:author']   = author||'';
                toreturn['itunes:image']    = image||'';
                toreturn['itunes:summary']  = summary||'';
                toreturn['enclosure']       = defaults.serverpath + ( file || '' );
                toreturn['guid']            = defaults.serverpath + ( file || '' );
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
