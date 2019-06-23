var cote = require('cote');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectID;

var service2 = new cote.Responder({
    name: 'service2',
    key: 'key2'
});
var client2 = new cote.Requester({
    name: 'client2'
  });

  function sendRequest(){
    console.log('sending to service1...');
    client1.send({
        type: 'messagefrom2'
      }, function(res) {
          console.log('reseived', res);
    });
};

const connectAndRead = async (myquery) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(`documdb`);
    const collection = db.collection(`documents`);

    const results = await collection.find().toArray();
    console.log('\nService2: data obtained from Service1.');        
    console.log(results);

    await collection.deleteMany(myquery);
    client.close();
  };

service2.on('messageto2', function(req, cb) {
    var  ids=[]; 
    ids = req.insertedIds.split(",");
    var ods=[];
  
    for (var i=0;i<3;i++)
        ods.push(ObjectId(ids[i]));
    
    var myquery = { _id: { $in: ods} };
    connectAndRead(myquery).catch((e) => {
          throw e;
    });
    cb('ok from service2!');
  })