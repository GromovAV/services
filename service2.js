var cote = require('cote');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

var service2 = new cote.Responder({
    name: 'service2'
});
var client2 = new cote.Requester({
    name: 'client2'
  });

  async function sendRequest(){
    console.log('sending to service1...');
    await client1.send({
        type: 'messagefrom2'
    }, function(res) {
        console.log('reseived', res);
    });
};

const connectAndRead = async (insertInfo) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(`documdb`);
    const collection = db.collection(`documents`);

    await collection.find().toArray(function(err, results){    
        console.log('\nService2: data obtained from Client.');        
        console.log(results);
        client.close();
    });

    await collection.deleteMany(insertInfo, function(err, results){
    });
  };

service2.on('messageto2',async function(req, cb) {
    var insertInfo=req.doki;

    connectAndRead(insertInfo).catch((e) => {
        throw e;
      });
    cb('Service2:the data obtained!');
})