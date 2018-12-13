var amqp = require('amqplib');

function sendMessage(message) {
  console.log('Attempt to send message...');
  if(this.connection !== null){
      if(this.channel !== null){
        this.channel.waitForConfirms().then(() => this.close());
        console.log(this.channel.sendToQueue(this.queue, new Buffer(message)));
    }else{
      console.log('Channel not initialized. End sending.')
    }
  }else{
    console.log('Connection not initialized. End sending.')
  }
}

function close(e){
    this.connection.close()
      .then(() => {
        this.channel = null;
        this.connection = null;
        process.exit(0);
      });
}

function onCreateChannel(ch){
  console.log('Channel Init:');
  this.channel = ch;
  this.channel.assertQueue(this.queue,{durable:false});
}

function onConnect(conn) {
  console.log('Connection Init:');
  this.connection = conn;
  return this.connection.createConfirmChannel()
    .then(ch => this.onCreateChannel(ch));
}

function connectToRabbitMQ() {
  console.log('Attempt connect...');
  var promise = amqp.connect('amqp://localhost')
    .then(conn => this.onConnect(conn));
  return promise;
}


function MessageSender(){
  this.message = '';
  this.channel = null;
  this.queue = 'postbox';
  this.connection = null;
}

MessageSender.prototype = {
  sendMessage: sendMessage,
  onCreateChannel: onCreateChannel,
  onConnect: onConnect,
  connectToRabbitMQ: connectToRabbitMQ,
  close: close
};

module.exports = MessageSender;
