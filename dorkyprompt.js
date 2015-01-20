/**
 * Created by Oakley Hall on 1/20/15.
 */

module.exports = function(podcasts,episode,cb){

    var prompt = require('prompt'),
        xml    = require('./xml-adder');

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

    prompt.message = 'Dorky'.rainbow;
    prompt.delimiter = '  ->  '.rainbow;
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
            cb(err);
        });
    });
};