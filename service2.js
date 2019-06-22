var cote = require('cote');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

var service2 = new cote.Responder({
    name: 'service2'
});

const connectAndRead = async (insertInfo) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(`documdb`);
    const collection = db.collection(`documents`);

    await collection.find().toArray(function(err, results){            
        console.log(results);
        client.close();
    });

    collection.deleteMany(insertInfo, function(err, results){
    });
  };

service2.on('messageto2',async function(req, cb) {
    var insertInfo=req.doki;

    connectAndRead(insertInfo).catch((e) => {
        throw e;
      });
    cb('Service2:the data obtained!');
})