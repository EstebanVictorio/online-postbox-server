var MessageSender = require('./Agent/MessageSender');

var sender = new MessageSender();
sender.connectToRabbitMQ()
  .then(
    function(){
      sender.sendMessage('Message for Gabs Postbox!');
  });
