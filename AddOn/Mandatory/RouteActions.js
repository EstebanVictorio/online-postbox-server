import Index from 'Controller/Index';
import PostBox from 'Controller/PostBox';

function index(){
  let indexController = new Index();
  indexController.render();
}

function postbox(req, res){
  let postboxController = new PostBox(req, res);
  postboxController.getMessages();
}


export default {
  POSTBOX: (req, res) => postbox(req, res),
};
