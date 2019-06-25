var cote = require('cote');

var log4js = require('log4js');
log4js.configure('./config/log4js.json');
var logger = log4js.getLogger();

var client = new cote.Requester({
    name: 'client',
    key: 'key1'
});

const request = {
    type: 'datato1',
    doki:""
};

const sendRequest = function sendRequest(){
    request.doki=[{name: Math.random().toString(10).substring(2,10)}, {name: Math.random().toString(10).substring(2,10)},
         {name: Math.random().toString(10).substring(2,10)} ];
      
    console.log('sending data to Service1');
    client.send(
        request
        , function(res) {
            console.log('reseived', res);
    });
    logger.info("I'm sending data to Service1");
};

setInterval(sendRequest, 2000);