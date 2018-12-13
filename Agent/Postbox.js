var amqp = require('amqplib');

async function getMessage(msg){
  var message = await this.channel.get(this.queue,{noAck: true})
    .then(async result => await result);
  return message;
}

async function getMessages(){
  var messagePostbox = [];
  var result = await this.getMessage();
  while(result){
    console.log('Message:');
    var message = result.content.toString();
    console.log(message);
    messagePostbox.push(message);
    result = await this.getMessage();
  }

  return {close: () => this.close(), messages: messagePostbox};
}

function onCreateChannel(ch){
  console.log('Channel Init:');
  this.channel = ch;
  this.channel.assertQueue(this.queue,{durable:false});
  console.log('[*] Waiting for messages in %s...',this.queue);
  return this.getMessages();
}

function onConnect(conn) {
  console.log('Connection Init:');
  this.connection = conn;
  return this.connection.createConfirmChannel();
}

function connectToRabbitMQ() {
  console.log('Attempt connect...');
  return amqp.connect('amqp://localhost')
    .then(conn => this.onConnect(conn))
    .then(ch => this.onCreateChannel(ch));
}


function close(e){
    this.connection.close()
      .then(() => {
        this.channel = null;
        this.connection = null;
        process.exit(0);
      });
}

function Postbox(destination){
  this.channel = null;
  this.queue = 'postbox';
  this.connection = null;
  this.destination = destination;
}

Postbox.prototype = {
  close: close,
  onConnect: onConnect,
  getMessages: getMessages,
  getMessage: getMessage,
  onCreateChannel: onCreateChannel,
  connectToRabbitMQ: connectToRabbitMQ,
};

module.exports = Postbox;
