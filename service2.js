var cote = require('cote');

var service2 = new cote.Responder({
    name: 'service2'
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

service2.on('messageto2', function(req, cb) {
    console.log('reseived count', req.insertedCount);
    console.log('reseived id', req.insertedIds);
 //   console.log('Service2:reseive message. replying with ok');
 cb('ok from service2!');
})
