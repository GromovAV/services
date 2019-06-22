var cote = require('cote');

var client = new cote.Requester({
    name: 'client'
});

const request = {
    type: 'datato1',
    doki:""
};
const sendRequest = async function sendRequest(){
      request.doki=[{name: Math.random().toString(10).substring(2,10)}, {name: Math.random().toString(10).substring(2,10)},
         {name: Math.random().toString(10).substring(2,10)} ];

         console.log('sending data to services...');
         await client.send(
        request
    , function(res) {
        console.log('reseived', res);
    });
};

setInterval(sendRequest, 2000);