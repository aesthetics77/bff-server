import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import {saveInfo, fetchInfo} from '../controllers/info';
import {saveStudent, fetchStudent, fetchStudentById, fetchStudentDetail} from '../controllers/student';
import { fetchLessonById, saveLesson, fetchLesson } from "../controllers/lesson";
import schema from '../graphql/schema';
import root from '../graphql/root';
import {saveTeacher, fetchTeacherById, fetchTeacher} from "../controllers/teacher";
const router = require('koa-router')();

router.get('/info', fetchInfo )
    .post('/saveinfo', saveInfo)
    .get('/lesson/:id', fetchLessonById)
    .post('/savelesson', saveLesson)
    .get('/lessons', fetchLesson)
    .get('/teacher/:id', fetchTeacherById)
    .get('/teachers', fetchTeacher)
    .post('/saveteacher', saveTeacher)
    .post('/savestudent', saveStudent)
    .get('/students', fetchStudent)
    .get('/student/:id', fetchStudentById)
    .get('/studentDetail', fetchStudentDetail)
    .get('/graphiql', async (ctx, next) => {
        await graphiqlKoa({endpointURL: '/graphql'})(ctx, next)
    });

router.post('/graphql', async (ctx, next) => {
    await graphqlKoa({
        schema: schema,
        rootValue: root,
        graphiql: true
    })(ctx, next) // 使用schema
})
    .get('/graphql', async (ctx, next) => {
        await graphqlKoa({
            schema: schema,
            rootValue: root,
            graphiql: true
        })(ctx, next) // 使用schema
    })
    .get('/graphiql', async (ctx, next) => {
        await graphiqlKoa({endpointURL: '/graphql'})(ctx, next) // 重定向到graphiql路由
    });
module.exports = router;