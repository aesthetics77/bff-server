import mongoose from 'mongoose'
import axios from 'axios'

const Lesson = mongoose.model('Lesson')

export function saveLesson(params){
    const lesson = new Lesson({
        name: params.name
    });
    return lesson.save();
}

export function lessons() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3001/lessons').then((response) => {
      if (response.status === 200) {
        let lessons = []
        for (let i = 0; i < response.data.lessons.length; i++) {
          lessons.push({
            id: response.data.lessons[i]._id,
            name: response.data.lessons[i].name
          })
        }
        resolve(lessons)
        console.log(lessons)
      } else {
        reject('Request failed')
      }
    })
  })
}

export function getLessonById(params){
    return axios.get(`http://localhost:3001/lesson/${params.id}`).then((response) => {
        const data = response.data;
        return {
            id: data.lesson._id,
            name: data.lesson.name
        }
    })
    // return Lesson.findOne({_id: mongoose.Types.ObjectId(params.id)}).exec()
}