/**
 * Created by Oakley Hall on 12/16/14.
 */
(function () {
    'use strict';


    //            {
    //                "title":[
    //                    " 043 Snow Inhalation "
    //                ],
    //                "itunes:subtitle":[
    //                    "Liz, Bairam and Oakley host a monumental podcast of incalculable importance."
    //                ],
    //                "itunes:image":[
    //                    {
    //                        "$":{
    //                            "href":"http://bizarr2d2.com/pod/cover2.jpg"
    //                        }
    //                    }
    //                ],
    //                "itunes:author":[
    //                    "Oakley, Liz, Bairam"
    //                ],
    //                "itunes:summary":[
    //                    " Hilarity ensues. "
    //                ],
    //                "enclosure":[
    //                    {
    //                        "$":{
    //                            "url":"http://bizarr2d2.com/pod/cis_11_19_14.mp3",
    //                            "length":"",
    //                            "type":"audio/mp3"
    //                        }
    //                    }
    //                ],
    //                "guid":[
    //                    "http://bizarr2d2.com/pod/cis_11_19_14.mp3"
    //                ],
    //                "itunes:duration":[
    //                    "00:48:45"
    //                ],
    //                "itunes:keywords":[
    //                    ""
    //                ],
    //                "pubDate":[
    //                    "Wed, 19 Nov 2014 13:00:00 GMT"
    //                ],
    //                "itunes:explicit":[
    //                    "Yes"
    //                ]
    //            },
    //            {
    //                "title":[
    //                    " 044 Festing "
    //                ],
    //                "itunes:subtitle":[
    //                    "Liz, Bairam and Oakley host a monumental podcast of incalculable importance."
    //                ],
    //                "itunes:image":[
    //                    {
    //                        "$":{
    //                            "href":"http://bizarr2d2.com/pod/cover2.jpg"
    //                        }
    //                    }
    //                ],
    //                "itunes:author":[
    //                    "Oakley, Liz, Bairam"
    //                ],
    //                "itunes:summary":[
    //                    " Dental hygiene at its most ill-conceived. "
    //                ],
    //                "enclosure":[
    //                    {
    //                        "$":{
    //                            "url":"http://bizarr2d2.com/pod/cis_12_3_14.mp3",
    //                            "length":"",
    //                            "type":"audio/mp3"
    //                        }
    //                    }
    //                ],
    //                "guid":[
    //                    "http://bizarr2d2.com/pod/cis_12_3_14.mp3"
    //                ],
    //                "itunes:duration":[
    //                    "00:41:02"
    //                ],
    //                "itunes:keywords":[
    //                    ""
    //                ],
    //                "pubDate":[
    //                    "Wed, 3 Dec 2014 13:00:00 GMT"
    //                ],
    //                "itunes:explicit":[
    //                    "Yes"
    //                ]
    //            },
    //            {
    //                "title":[
    //                    " 045 Gremlins "
    //                ],
    //                "itunes:subtitle":[
    //                    "Liz, Bairam and Oakley host a monumental podcast of incalculable importance."
    //                ],
    //                "itunes:image":[
    //                    {
    //                        "$":{
    //                            "href":"http://bizarr2d2.com/pod/cover2.jpg"
    //                        }
    //                    }
    //                ],
    //                "itunes:author":[
    //                    "Oakley, Liz, Bairam"
    //                ],
    //                "itunes:summary":[
    //                    " Dude, we just imploded. "
    //                ],
    //                "enclosure":[
    //                    {
    //                        "$":{
    //                            "url":"http://bizarr2d2.com/pod/cis_12_10_14.mp3",
    //                            "length":"",
    //                            "type":"audio/mp3"
    //                        }
    //                    }
    //                ],
    //                "guid":[
    //                    "http://bizarr2d2.com/pod/cis_12_10_14.mp3"
    //                ],
    //                "itunes:duration":[
    //                    "00:12:19"
    //                ],
    //                "itunes:keywords":[
    //                    ""
    //                ],
    //                "pubDate":[
    //                    "Wed, 10 Dec 2014 13:00:00 GMT"
    //                ],
    //                "itunes:explicit":[
    //                    "Yes"
    //                ]
    //            }
    //        ]
    //    }
    //]


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


        function Episode(){
            this['title'] = 'Blarg';
            this['itunes:subtitle'] = 'Cat';
            this['itunes:author'] = 'Fred';
            this['itunes:image'] = 'Dog';
            this['itunes:summary'] = 'qwert';
            this['enclosure'] = '2345';
            this['guid'] = 'sfdg';
            this['itunes:duration'] = 'sdfg';
            this['pubDate'] = 'sdfg';
            this['itunes:explicit'] = 'sfg';
        }

        var fs = require('fs'),
            xml2js = require('xml2js');

        var parser = new xml2js.Parser();
        fs.readFile('./foo.xml', function(err, data) {
            parser.parseString(data, function (err, result) {

                var items = result.rss.channel[0].item;


                var ep = new Episode();
                items.push( ep );

                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);

                console.log( xml );

            });
        });

    };
})();