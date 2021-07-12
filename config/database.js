const { Sequelize } = require('sequelize');

var AWS = require('aws-sdk'),
    region = "us-east-2",
    secretName = "/PROD/INTELIUS/SQLSERVER/NODEUSER/",
    secret,
    decodedBinarySecret;
var credentials = new AWS.SharedIniFileCredentials({profile: 'noderestapi'});
// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region,
    credentials: credentials,
    httpOptions: {xhrAsync: false}
});

let db,db_cred;

const getdb = async () => {
  //setTimeout(() => {  console.log("World!"); }, 2000);
  if (db==null) {
    const result = await client.getSecretValue({SecretId: secretName}).promise();
    db_cred = JSON.parse(result.SecretString)
    console.log(db_cred)  
    db = new Sequelize('BOOK', db_cred.username, db_cred.password, {
      host: db_cred.host,
      dialect: 'mssql' 
    })
  }
  return db
}
/*
;(async () => {
  getdb().then(db => {
    db.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error " + err))
  })
})()
*/
module.exports = getdb
