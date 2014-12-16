/**
 * Created by Oakley Hall on 12/15/14.
 */

(function () {
    'use strict';

    console.log( 'PodSmash!' );
    var ftp = require('./ftp');

    if( process.argv[2] && process.argv[3] && process.argv[4] ){
        ftp( process.argv[2], process.argv[3], process.argv[4], function () {
            console.log('PodSmash complete!');
        });
    }else{
        console.log('Requires args: FTP Host, User, Password');
}

})();
