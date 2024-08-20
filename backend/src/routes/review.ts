import { Router } from 'express';
import { getReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/review';

const router = Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieve a list of reviews with pagination, sorting, and searching.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of reviews per page
 *         required: false
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         description: Field to sort by
 *         required: false
 *         schema:
 *           type: string
 *       - name: order
 *         in: query
 *         description: Sort order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/', getReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     description: Retrieve a single review by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Review ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getReviewById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     description: Add a new review to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 */
router.post('/', createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by ID
 *     description: Modify an existing review.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Review ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     description: Remove a review from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Review ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteReview);

export default router;
