import mongoose from 'mongoose'
import axios from "axios/index";
const Student = mongoose.model('Student')

export function saveStudent(input) {
    const student = new Student({
        name: input.name,
        teacher: input.teacher
    });
    return student.save();
}

export function getStudents() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/students').then((response) => {
            response.data.students.map(student => {
                student.id = student._id
            });
            resolve(response.data.students)
        }).catch((e) => {
            reject(e);
        })
    })
}

export function getStudentById(id){
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3001/student/${id}`).then((response) => {
            //todo 状态码的判断
            const student = response.data.student;
            student.id = student._id;
            resolve(student);
        }).catch((e) => {
            reject(e);
        })
    })
}
