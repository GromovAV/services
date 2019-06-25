var cote = require('cote');
const MongoClient = require("mongodb").MongoClient; 
const url = "mongodb://localhost:27017/";

var log4js = require('log4js');
log4js.configure('./config/log4js.json');
var logger = log4js.getLogger();
 
var service1 = new cote.Responder({
    name: 'service1',
    key: 'key1'
});
var client1 = new cote.Requester({
    name: 'client1',
    key: 'key2'
});
const request_to2 = {
    type: 'messageto2',
    insertedIds: String
}

function sendRequest(){
    client1.send(
      request_to2
      , function(res) {
        logger.info("I'm sending data to Service2");
        console.log('', res);
    });
};

const connectAndWrite = async (doki) => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db(`documdb`);
  const collection = db.collection(`documents`);

  const results = await collection.insertMany(doki);
  logger.info("I'm reseived data from Client");
  var str="";
    for (var i=0;i<results.insertedCount;i++){
       str+=results.insertedIds[i];
      if (i<results.insertedCount-1) 
        str+=",";
    }
    request_to2.insertedIds=str;
    console.log('sending data to service2...');
    sendRequest();
    console.log(results);
    client.close();
};

service1.on('datato1', function(req, cb) {
  var doki=req.doki;
  logger.info("I accepted the data from Client");
  
  connectAndWrite(doki).catch((e) => {
    throw e;
  });
  console.log('\nService1:reseived data from Client. replying with ok');
  cb('ok! Service1 reseived data from Client');
})