var cote = require('cote');

var client = new cote.Requester({
    name: 'client'
});
/*
const dokisrc = [
  {name: Math.random().toString(10).substring(2,10)},
  {name: Math.random().toString(10).substring(2,10)},
  {name: Math.random().toString(10).substring(2,10)}
];
*/


function sendRequest(){
    console.log('sending data to service1...');
    var request = {
        type: 'datato1',
        numbDocs:1,
        doki:""
    };
    var numb=(1+Math.random()*5);
    request.numbDocs= Math.floor(numb);
    var i;
    for (i=0;i<request.numbDocs;i++)
      request.doki+="{name:" + Math.random().toString(10).substring(2,10)+"},";
    client.send(
        request
    , function(res) {
        console.log('reseived', res);
    });
};

setInterval(sendRequest, 2000);
