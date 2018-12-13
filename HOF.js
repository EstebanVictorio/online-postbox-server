import {differRouteMethod, enableCORS} from './Utils';
function withRoutes(server, routes){
  routes.map(route => differRouteMethod(server,route).subscribe());
  return server;
}

function withStaticResources(server, staticResources){
  staticResources
    .map(resource => server.use(`/${resource}`,resource));
  return server;
}

function withCORS(server){
  server.use(enableCORS);
  return server;
}

export {
  withRoutes,
  withStaticResources,
  withCORS
};
