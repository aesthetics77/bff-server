// 引入GraphQL各种方法类型
import {
    GraphQLSchema,
    GraphQLObjectType,
    buildSchema
} from 'graphql';
import { readFileSync } from 'fs';
import { info, infos } from './info';
import { students } from './student';
import { saveLesson } from "./lesson";

const graphqls = readFileSync( process.cwd() + '/bff.graphqls', 'utf8')
export default buildSchema(graphqls);

// export default new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'Queries',
//         fields: {
//             infos,
//             info,
//             students
//         }
//     }),
//     mutation: new GraphQLObjectType({
//         name: 'Mutations',
//         fields: {
//             saveLesson
//         }
//     })
// })
