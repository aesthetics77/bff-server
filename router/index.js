import {saveInfo, fetchInfo} from '../controllers/info';
import {saveStudent, fetchStudent, fetchStudentById, fetchStudentDetail} from '../controllers/student';
import { fetchLessonById, saveLesson, fetchLesson } from "../controllers/lesson";
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
    .get('/studentDetail', fetchStudentDetail);

module.exports = router;