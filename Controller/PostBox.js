import Postbox from 'Agent/Postbox';

export default class PostBox{
  constructor(req, res){
    this.req = req;
    this.res = res;
    this.postbox = new Postbox();
  }


  async getMessages(){
    await this.postbox.connectToRabbitMQ()
      .then(({close, messages}) => {
        console.log('Messages found!');
        console.log(messages);
        //close(); -----> This one kills server and RBMQ Connection, so... better leave it there.
        this.res.send({messages: messages});
      });
  }
}
