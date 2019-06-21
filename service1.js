var cote = require('cote');
const MongoClient = require("mongodb").MongoClient;
   
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 

var service1 = new cote.Responder({
    name: 'service1'
});
var client1 = new cote.Requester({
    name: 'client1'
});
const request_to2 = {
    type: 'messageto2',
    insertedCount:Number,
    insertedIds: String
}

async function sendRequest(){
    console.log('sending data to service2...');
    await client1.send(
      request_to2
    , function(res) {
        console.log('reseived', res);
    });
};

 
service1.on('datato1', async function(req, cb) {

  var numbDocs=req.numbDocs;
  var doki=req.doki;
  var manydoki=JSON.stringify(doki);
 
    request_to2.insertedCount=numbDocs;
    request_to2.insertedIds=ms;
//     doki.name=req.doki;

  //    mongoWrite();
  //doki.name=Math.random().toString(10).substring(2,10);

 
    sendRequest()
    console.log('Service1:reseive data. replying with ok');
    cb('ok!');
})
