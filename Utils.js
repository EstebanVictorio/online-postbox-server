function differRouteMethod(server, route){
  let subscribe = null;
  switch (route.method) {
    case 'POST':
      subscribe = () => server.post(route.path, route.action);
      break;
    case 'GET':
    default:
      subscribe = () => server.get(route.path, route.action);
      break;

  }
  return { subscribe };
}

function enableCORS(req, res, next){
  res.setHeader('Access-Control-Allow-Headers','*');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  next();
}


export {differRouteMethod, enableCORS};
