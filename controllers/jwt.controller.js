// console.log('import jwt.controller');

const encoder = require('nodejs-base64-encode');
const sha512 = require('js-sha512');


const minute = 60000;
const header = {
    alg: 'HS512',
    typ: 'JWT'
}

const secret = 'abcd';

/**
 * @description Create new JsonWebToken
 * 
 * @param { JSON } data The data to add for the JsonWebToken
 * @param { String } secret The uniuqe secret of your JsonWebToken
 * @param { number } expierdIn The number of minutes of the vailidability of this JsonWebToken
 * 
 * @returns { String } The string of your JsonWebToken
*/
exports.create = (payload, expierdIn, secret) => {
    secret = secret;
    payload['exp'] = Date.now() + (this.minute * expierdIn); // Adding 25 min to current time

    console.log(payload.exp);
    
    let accessToken = base64UrlEncode(JSON.stringify(this.header)) + '.' + base64UrlEncode(JSON.stringify(payload));

    accessToken = accessToken + '.' + base64UrlEncode(sha512.hmac(this.secret, accessToken));
    return accessToken;
}

/**
 * @description extract from the JsonWebToken the encrypted data
 * 
 * @param { String } encData The data from the JsonWebToken
 * 
 * @returns JSON with all the JsonWebToken like object
*/
var extractData = (encData) => {
    let jsonsCheck = encData;
    let splitted = jsonsCheck.split('.');
    let rJson = {
        header: '',
        payload: '',
        signiture: ''
    }

    try{
        rJson.header = JSON.parse(new Buffer(splitted[0], 'base64').toString('ascii'));
        rJson.payload = JSON.parse(new Buffer(splitted[1], 'base64').toString('ascii'));
        rJson.signiture = new Buffer(splitted[2], 'base64').toString('ascii');

        return rJson;
    } catch(ex) {
        console.error(ex);
    }
}

exports.verify = (encryptedData) => {
    try {
        let jsonWebToken = extractData(encryptedData);
        console.log('jsonWebToken: ' ,jsonWebToken);

        let accessToken = base64UrlEncode(JSON.stringify(jsonWebToken.header)) + '.' + base64UrlEncode(JSON.stringify(jsonWebToken.payload));
        if(jsonWebToken.signiture == sha512.hmac(this.secret, accessToken)){
            console.log('they equals');

            if(Date.now() - jsonWebToken.payload.exp >= (this.minute * 5)){
                // Need to send a refresh token 
                return {
                    code: 401, // Its use to be like this
                    validation: 'GET_NEW_ACCESS_TOKEN'
                }

            }else{
                return {
                    validation: 'VALID'
                }
            }
        } else {
            return {
                validation: 'INVALID'
            }
        }
    } catch(ex) {
        return {
            validation: 'INVALID'
        }
    }
}

var base64UrlEncode = (dataToEncode) => {
    return Buffer.from(dataToEncode).toString('base64');
}