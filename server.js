import Koa from 'koa';
import KoaStatic from 'koa-static';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import {database} from './mongodb';
import cors from 'koa-cors';
import { ApolloServer, gql } from 'apollo-server-koa'
import resolvers from './graphql/resolvers'
import {readFileSync} from "fs";

database();

const GraphqlRouter = require('./router');
const app = new Koa();
const router = new Router();
//Read graphql schema file
const graphqls = readFileSync( process.cwd() + '/bff.graphqls', 'utf8')
const typeDefs = gql`${graphqls}`;
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });
app.use(cors());
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));
router.use('', GraphqlRouter.routes())
app.use(router.routes()).use(router.allowedMethods());


app.listen({ port: 3001 }, () => {
    console.log('graphQL server listen port: ' + 3001);
});