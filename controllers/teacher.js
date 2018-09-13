import mongoose from 'mongoose';
const Teacher = mongoose.model('Teacher');

export const saveTeacher = async(ctx, next) => {
    const opts = ctx.request.body;
    const teacher = new Teacher(opts);
    const saveTeacher = await teacher.save();

    if (saveTeacher) {
        ctx.body = {
            success: true,
            teacher: saveTeacher
        }
    } else {
        ctx.body = {
            success: false
        }
    }
};

export const fetchTeacher = async(ctx, next) => {
    const teachers = await Teacher.find({})

    if (teachers) {
        ctx.body = {
            success: true,
            teachers
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}

export const fetchTeacherById = async(ctx, next) => {
    const params = ctx.params;
    const getTeacherById = await Teacher.findOne({_id: mongoose.Types.ObjectId(params.id)}).exec();

    if (getTeacherById) {
        ctx.body = {
            success: true,
            teacher: getTeacherById
        }
    } else {
        ctx.body = {
            success: false
        }
    }
};