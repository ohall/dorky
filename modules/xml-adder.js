/**
 * Created by Oakley Hall on 12/16/14.
 */
(function () {
    'use strict';

    //<item>
    //<title> 045 Gremlins </title>
    //<itunes:subtitle>Liz, Bairam and Oakley host a monumental podcast of incalculable importance.</itunes:subtitle>
    //<itunes:image href="http://bizarr2d2.com/pod/cover2.jpg" />
    //<itunes:author>Oakley, Liz, Bairam</itunes:author>
    //<itunes:summary> Dude, we just imploded. </itunes:summary>
    //<enclosure url="http://bizarr2d2.com/pod/cis_12_10_14.mp3" length="" type="audio/mp3" />
    //<guid>http://bizarr2d2.com/pod/cis_12_10_14.mp3</guid>
    //<itunes:duration>00:12:19</itunes:duration>
    //<itunes:keywords></itunes:keywords>
    //<pubDate>Wed, 10 Dec 2014 13:00:00 GMT</pubDate>
    //<itunes:explicit>Yes</itunes:explicit>
    //</item>

    module.exports = function(podcast, episode, cb){

        var fs = require('fs'),
            xml2js = require('xml2js'),
            mm = require('musicmetadata'),
            parser = new xml2js.Parser(),
            localpath = podcast.getDefaults().localpath,
            xmlPath = localpath + podcast.getDefaults().xmlFile;

        // create a new parser from a node ReadStream
        var parser = mm(fs.createReadStream( 'localpath'+'/'+ podcast.getAudioFileName() ));

        // listen for the metadata event
        parser.on('metadata', function (result) {
            console.log(result);
        });


        fs.readFile(xmlPath, function(err, data) {
            parser.parseString(data, function (err, result) {
                if(err){
                    cb(err);
                }
                var items = result.rss.channel[0].item,
                    builder = new xml2js.Builder();

                items.push( episode );
                var xml = builder.buildObject( result );

                fs.writeFile( xmlPath, xml, function ( err ) {
                    if( err ){
                        cb( err );
                    }
                });

            });
        });

    };
})();