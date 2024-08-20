import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    title: string;
    content: string;
    dateTime: Date;
    deletedAt?: Date | null;
}

const ReviewSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [10, 'Content must be at least 10 characters long']
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

ReviewSchema.index({ deletedAt: 1 });

export default mongoose.model<IReview>('Review', ReviewSchema);
