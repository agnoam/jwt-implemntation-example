// exports.JWT = class JWT {
//     constructor(data){
//         this.NodeRSA = require('node-rsa');
//         this.key = new NodeRSA({b: 512});        

//         this.header = {
//             alg: 'RSA512',
//             typ: 'JWT'
//         }

//         this.secret = 'myFirstSecret';

//         console.log(this.create(data));
//     }

//     /**
//      * @description Create new JsonWebToken
//      * 
//      * @param { JSON } data The data to add for the JsonWebToken
//      * @param { String } secret The uniuqe secret of your JsonWebToken
//      * @param { number } expierdIn The timestamp of the vailidability of this JsonWebToken
//      * 
//      * @returns { String } The string of your JsonWebToken
//     */
//     create(data, secret, expierdIn) {

//         let minute = 60000;
//         data['expierdIn'] = Date.now() + ( minute * 25 ); // Adding 25 min to current time

//         let encryptedData = {
//             header: key.encrypt(JSON.stringify(this.header)),
//             data: key.encrypt(JSON.stringify(data)),
//             secret: key.encrypt(this.secret)
//         }

//         return (base64UrlEncode(encryptedData.header) + '.' + base64UrlEncode(encryptedData.data) + '.' + base64UrlEncode(encryptedData.secret));
//     }

//     verify() {

//     }
// }