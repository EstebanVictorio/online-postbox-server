import Express from 'express';
import BodyParser from 'body-parser';
import {withRoutes, withStaticResources, withCORS} from './HOF';
import Routes from 'AddOn/Mandatory/Routes';
import StaticResources from 'AddOn/Optin/StaticResources';
let server = Express();
server = withCORS(server);
server = withRoutes(server,Routes);
server = withStaticResources(server,StaticResources);
server.use(BodyParser.urlencoded({extended:false}));
server.use(BodyParser.json());

export default server;
