import mongoose from 'mongoose'
const Student = mongoose.model('Student')

export const saveStudent = async (ctx, next) => {
    const opts = ctx.request.body
    const student = new Student(opts)
    const saveStudent = await student.save()

    if (saveStudent) {
        ctx.body = {
            success: true,
            student: saveStudent
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}

export const fetchStudent = async (ctx, next) => {
    const students = await Student.find({})

    if (students.length) {
        ctx.body = {
            success: true,
            students
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}

export const fetchStudentById = async(ctx, next) => {
    const params = ctx.params;
    const getStudentById = await Student.findOne({_id: mongoose.Types.ObjectId(params.id)}).exec();
    if (getStudentById) {
        ctx.body = {
            success: true,
            student: getStudentById
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}

export const fetchStudentDetail = async (ctx, next) => {
    const students = await Student.find({}).populate({
        path: 'info',
        select: 'hobby height weight'
    }).exec()

    if (students.length) {
        ctx.body = {
            success: true,
            student: students
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}