import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import mongoose from 'mongoose'

import {InfoType} from './info'
import axios from "axios/index";
const Student = mongoose.model('Student')

export function students() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/students').then((response) => {
            if (response.status === 200) {
                resolve(response.data.students.map(student => {
                    student.id = student._id
                }))
            } else {
                reject('Request failed')
            }
        })
    })
}

export function getStudentById(params){
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3001/student/${params.id}`).then((response) => {
            //todo 状态码的判断
            const student = response.data.student;
            console.log(student)
            let queryTimes = 0;
            let lessons = [];
            student.lessons.forEach((lessonId) => {
                axios.get(`http://localhost:3001/lesson/${lessonId}`).then((lessonRes) => {
                    //todo 状态码判断
                    lessons.push({
                        id: lessonRes.data.lesson._id,
                        name: lessonRes.data.lesson.name
                    });
                    queryTimes++;
                    if (queryTimes === student.lessons.length) {
                        const data = {
                            id: student._id,
                            name: student.name,
                            sex: student.sex,
                            age: student.age,
                            lessons
                        };
                        resolve(data);
                    }
                })
            })
        })
    })
}