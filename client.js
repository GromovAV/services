var cote = require('cote');

var client = new cote.Requester({
    name: 'client'
});

function sendRequest(){
    var request = {
        type: 'datato1',
        numbDocs:1,
        doki:""
    };

      request.doki=[{name: Math.random().toString(10).substring(2,10)}, {name: Math.random().toString(10).substring(2,10)},
         {name: Math.random().toString(10).substring(2,10)} ];

    client.send(
        request
    , function(res) {
        console.log('reseived', res);
    });
    console.log('sending data to service1...');
};

setInterval(sendRequest, 2000);