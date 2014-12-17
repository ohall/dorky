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



    module.exports = function(){
        var XMLWriter = require('xml-writer'),
            xw = new XMLWriter();
        xw.startDocument();
        xw.startElement('root');
        xw.writeAttribute('foo', 'value');
        xw.text('Some content');
        xw.endDocument();

        console.log(xw.toString());
    }
    ;
})();