/**
 * Created by WebStorm.
 * User: xiaoyu
 * Date: 2018/8/27
 * Time: 18:11
 *
 */
import {getLessonById, saveLesson, getLessons, getLessonByCurrentTypeId} from "./lesson";
import {getTeacherById, saveTeacher, getTeachers} from "./teacher";
import {getStudentById, getStudents, saveStudent} from "./student";

export default {
    Query: {
        teachers(root, args, context, info) {
            return getTeachers();
        },
        teacher(root, {id}) {
            return getTeacherById(id);
        },
        lessons() {
            return getLessons();
        },
        lesson(root, {id}) {
            return getLessonById(id);
        },
        students() {
            return getStudents();
        },
        student(root, {id}) {
            return getStudentById(id)
        }
    },
    Mutation: {
        saveTeacher(root, {input}) {
            return saveTeacher(input);
        },
        saveLesson(root, {input}) {
            return saveLesson(input);
        },
        saveStudent(root, {input}) {
            return saveStudent(input);
        }
    },
    Teacher: {
        lessons(teacher) {
            return getLessonByCurrentTypeId('teacher', teacher.id)
        }
    },
    Student: {
        lessons(student) {
            return getLessonByCurrentTypeId('student', student.id)
        }
    }
    // saveLesson: saveLesson,
    // getLessonById: getLessonById,
    // getTeacherById: getTeacherById,
    // getStudentById: getStudentById,
    // saveTeacher: saveTeacher,
    // students: students,
    // lessons: lessons,
    // teachers: getTeachers()
}