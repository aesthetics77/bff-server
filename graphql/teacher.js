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

export function saveTeacher(params){
    const input = params.input;
    const teacher = new Teacher({
        name: input.name,
        sex: input.sex,
        age: input.age,
        lessons: input.lessons
    });
    return teacher.save();
}

export function teachers() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3001/teachers').then((response) => {
      if (response.status === 200) {
        resolve(response.data.teachers.map(teacher => {
          teacher.id = teacher._id
        }))
      } else {
        reject('Request failed')
      }
    })
  })
}

export function getTeacherById(params){
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3001/teacher/${params.id}`).then((response) => {
            //todo 状态码的判断
            const teacher = response.data.teacher;
            let queryTimes = 0;
            let lessons = [];
            teacher.lessons.forEach((lessonId) => {
                axios.get(`http://localhost:3001/lesson/${lessonId}`).then((lessonRes) => {
                    //todo 状态码判断
                    lessons.push({
                        id: lessonRes.data.lesson._id,
                        name: lessonRes.data.lesson.name
                    });
                    queryTimes++;
                    if (queryTimes === teacher.lessons.length) {
                        const data = {
                            id: teacher._id,
                            name: teacher.name,
                            sex: teacher.sex,
                            age: teacher.age,
                            lessons
                        };
                        resolve(data);
                    }
                })
            })
        })
    })
}