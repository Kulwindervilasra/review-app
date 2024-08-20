import { Request, Response } from 'express';
import Review, { IReview } from "../models/review";
import { SortOrder } from 'mongoose';
import { io } from '../server';

// Get reviews with pagination
export const getReviews = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, sort = 'dateTime', order = 'desc', search = '' } = req.query;
        const sortOption: { [key: string]: SortOrder } = { [sort as string]: order === 'asc' ? 1 : -1 };

        const query: any = { deletedAt: null };
        if (search) {
            query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
        }
        const reviews = await Review.find(query)
            .sort(sortOption)
            .limit(+limit)
            .skip((+page - 1) * +limit)
            .exec();
        const count = await Review.countDocuments(query);
        res.json({
            reviews,
            totalPages: Math.ceil(count / +limit),
            currentPage: +page,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Get review by ID
export const getReviewById = async (req: Request, res: Response) => {
    try {
        const review = await Review.findOne({ _id: req.params.id, deletedAt: null });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Create new review
export const createReview = async (req: Request, res: Response) => {
    try {
        const review: IReview = new Review(req.body);
        await review.validate(); // Validate review
        await review.save();
        io.emit('reviewAdded', review); // Emit event
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error });
    }
};

// Update review
export const updateReview = async (req: Request, res: Response) => {
    try {
        const review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        io.emit('reviewUpdated', review); // Emit event
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error });
    }
};

// Soft delete review
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        );
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        io.emit('reviewDeleted', review._id); // Emit event
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
