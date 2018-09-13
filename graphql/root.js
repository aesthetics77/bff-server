/**
 * Created by WebStorm.
 * User: xiaoyu
 * Date: 2018/8/27
 * Time: 18:11
 *
 */
import {getLessonById, saveLesson, lessons} from "./lesson";
import {getTeacherById, saveTeacher, teachers} from "./teacher";
import {getStudentById, students} from "./student";

export default {
    saveLesson: saveLesson,
    getLessonById: getLessonById,
    getTeacherById: getTeacherById,
    getStudentById: getStudentById,
    saveTeacher: saveTeacher,
    students: students,
    lessons: lessons,
    teachers: teachers
}