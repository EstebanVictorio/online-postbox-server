import Server from './Server';
let port = 8888;

function bootstrapMessage(){
  console.log(`Started listening at http://localhost:${port}`);
}

function start(){
  Server.listen(port,bootstrapMessage);
}

export default {start};
