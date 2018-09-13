import mongoose from 'mongoose';
const Lesson = mongoose.model('Lesson');

export const saveLesson = async(ctx, next) => {
    const opts = ctx.request.body;
    const lesson = new Lesson(opts);
    const saveLesson = await lesson.save();

    if (saveLesson) {
        ctx.body = {
            success: true,
            lesson: saveLesson
        }
    } else {
        ctx.body = {
            success: false
        }
    }
};

export const fetchLesson = async(ctx, next) => {
    const lessons = await Lesson.find({})
    if (lessons) {
        ctx.body = {
            success: true,
            lessons
        }
    } else {
        ctx.body = {
            success: false
        }
    }
};

export const fetchLessonById = async(ctx, next) => {
    const params = ctx.params;
    const getLessonById = await Lesson.findOne({_id: mongoose.Types.ObjectId(params.id)}).exec();

    if (getLessonById) {
        ctx.body = {
            success: true,
            lesson: getLessonById
        }
    } else {
        ctx.body = {
            success: false
        }
    }
};