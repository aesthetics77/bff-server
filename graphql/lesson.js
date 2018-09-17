import mongoose from 'mongoose'
import axios from 'axios'

const Lesson = mongoose.model('Lesson')

export function saveLesson(input) {
    const lesson = new Lesson({
        name: input.name,
        teacher: input.teacher
    });
    return lesson.save();
}

export function getLessons() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/lessons').then((response) => {
            if (response.status === 200) {
                let lessons = []
                for (let i = 0; i < response.data.lessons.length; i++) {
                    lessons.push({
                        id: response.data.lessons[i]._id,
                        name: response.data.lessons[i].name,
                        teacher: response.data.lessons[i].teacher
                    })
                }
                resolve(lessons)
            } else {
                reject('Request failed')
            }
        })
    })
}

export function getLessonById(params) {
    return axios.get(`http://localhost:3001/lesson/${params.id}`).then((response) => {
        const data = response.data;
        return {
            id: data.lesson._id,
            name: data.lesson.name,
            teacher: data.lesson.teacher
        }
    })
    // return Lesson.findOne({_id: mongoose.Types.ObjectId(params.id)}).exec()
}

export function getLessonByCurrentTypeId(currentType, id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3001/${currentType}/${id}`).then((response) => {
            const data = response.data[currentType];
            let queryTimes = 0;
            let lessons = [];
            console.log(data.lessons)
            if (data.lessons.length > 0) {
                data.lessons.forEach((lessonId) => {
                    axios.get(`http://localhost:3001/lesson/${lessonId}`).then((lessonRes) => {
                        //todo 状态码判断
                        lessons.push({
                            id: lessonRes.data.lesson._id,
                            name: lessonRes.data.lesson.name
                        });
                        queryTimes++;
                        if (queryTimes === data.lessons.length) {
                            resolve(lessons);
                        }
                    })
                })
            } else {
                resolve(lessons)
            }
        })
    });
}