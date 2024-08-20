import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import axios from '../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io(process.env.REACT_APP_API_URL);

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedReviewId, setHighlightedReviewId] = useState(null);
    const [deletedReview, setDeletedReview] = useState(null);

    const fetchReviews = async (page, sort = 'dateTime', order = sortOrder) => {
        try {
            const response = await axios.get('/reviews', {
                params: {
                    page,
                    limit: 10,
                    sort,
                    order,
                    searchTerm
                }
            });
            const data = response.data;
            setReviews(data.reviews);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        fetchReviews(currentPage);

        socket.on('reviewAdded', (review) => {
            setReviews((prev) => [review, ...prev]);
            setHighlightedReviewId(review._id);
            toast.success('Review added!', { autoClose: 3000 });
        });

        socket.on('reviewUpdated', (updatedReview) => {
            setReviews((prev) =>
                prev.map((review) =>
                    review._id === updatedReview._id ? updatedReview : review
                )
            );
            setHighlightedReviewId(updatedReview._id);
            toast.info('Review updated!', { autoClose: 3000 });
        });

        socket.on('reviewDeleted', (deleted) => {
            setDeletedReview(deleted);
            setReviews((prev) => prev.filter((review) => review._id !== deleted));
            toast.success('Review deleted!', {
                autoClose: 1000,
                closeButton: () => (
                    <button onClick={() => handleUndoDelete(deleted)}>Undo</button>
                )
            });
        });

        return () => {
            socket.off('reviewAdded');
            socket.off('reviewUpdated');
            socket.off('reviewDeleted');
        };
    }, [currentPage, searchTerm]);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleSort = (field) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        fetchReviews(currentPage, field, order);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        fetchReviews(currentPage);
    };

    const handleDelete = async (review) => {
        try {
            await axios.delete(`/reviews/${review._id}`);
        } catch (err) {
            console.error('Error deleting review:', err);
            toast.error('Error while removing review', { autoClose: 1000 });
        }
    };

    const handleUndoDelete = async (id) => {
        try {
            await axios.put(`/reviews/${id}`, { deletedAt: null });
            toast.success('Review restored!', { autoClose: 3000 });
        } catch (err) {
            console.error('Error restoring review:', err);
        }
    };

    return (
        <div>
            <h1>Reviews</h1>
            <Link to="/new">Create New Review</Link>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={() => handleSort('title')}>Title</th>
                        <th>Content</th>
                        <th onClick={() => handleSort('dateTime')}>Date-Time</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews
                        .filter((review) =>
                            review.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((review) => (
                            <tr
                                key={review._id}
                                className={
                                    review._id === highlightedReviewId
                                        ? 'highlight-green'
                                        : review._id === deletedReview?._id
                                            ? 'highlight-red'
                                            : ''
                                }
                            >
                                <td>{review._id}</td>
                                <td>{review.title}</td>
                                <td>{review.content}</td>
                                <td>{new Date(review.dateTime).toLocaleString()}</td>
                                <td>
                                    <Link to={`/${review._id}`}>Edit</Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(review)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePrevPage}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default ReviewList;
