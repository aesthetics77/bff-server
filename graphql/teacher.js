/**
 * Created by WebStorm.
 * User: xiaoyu
 * Date: 2018/8/29
 * Time: 10:21
 *
 */
import mongoose from 'mongoose'
import axios from 'axios'

const Teacher = mongoose.model('Teacher');
const Lesson = mongoose.model('Lesson');

export function saveTeacher(input){
    const teacher = new Teacher({
        name: input.name,
        sex: input.sex,
        age: input.age,
        lessons: input.lessons
    });
    return teacher.save();
}

export function getTeachers() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/teachers').then((response) => {
            response.data.teachers.map(teacher => {
                teacher.id = teacher._id
            });
            resolve(response.data.teachers)
        }).catch((e) => {
            reject(e);
        })
    })
}

export function getTeacherById(id){
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3001/teacher/${id}`).then((response) => {
            //todo 状态码的判断
            let teacher = response.data.teacher;
            teacher.id = teacher._id;
            resolve(teacher);
        }).catch((e) => {
            reject(e);
        })
    })
}