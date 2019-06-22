var cote = require('cote');
const MongoClient = require("mongodb").MongoClient; 
const url = "mongodb://localhost:27017/";
 
var service1 = new cote.Responder({
    name: 'service1'
});
var client1 = new cote.Requester({
    name: 'client1'
});
const request_to2 = {
    type: 'messageto2',
    insertedIds: String
}

async function sendRequest(){
  console.log('\nsending data to service2...');
    await client1.send(
      request_to2
    , function(res) {
        console.log('reseived', res);
    });
};

const connectAndWrite = async (doki) => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db(`documdb`);
  const collection = db.collection(`documents`);

  collection.insertMany(doki, function(err, results){
    var str="";
    for (var i=0;i<results.insertedCount;i++){
       str+=results.insertedIds[i];
       if (i<results.insertedCount-1) 
          str+=",";
    }
    request_to2.insertedIds=str;
    console.log(results);
    sendRequest();
});
  client.close();
};

service1.on('datato1', async function(req, cb) {
  var doki=req.doki;
  
  connectAndWrite(doki).catch((e) => {
    throw e;
  });
     console.log('\nService1:reseive data from Client. replying with ok');
    cb('ok! Service1 reseive data from Client');
})