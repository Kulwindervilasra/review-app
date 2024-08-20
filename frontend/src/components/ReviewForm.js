import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewForm = ({ isEditing = false }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            const fetchReview = async () => {
                try {
                    const response = await axios.get(`/reviews/${id}`);
                    const data = response.data;
                    setTitle(data.title);
                    setContent(data.content);
                } catch (err) {
                    handleError(err, "Error fetching review details");
                }
            };

            fetchReview();
        }
    }, [id, isEditing]);

    const handleSave = async () => {
        try {
            if (isEditing) {
                await axios.put(`/reviews/${id}`, { title, content });
                toast.success('Review updated successfully!', { autoClose: 3000 });
            } else {
                await axios.post('/reviews', { title, content });
                toast.success('Review created successfully!', { autoClose: 3000 });
            }
            navigate('/');
        } catch (err) {
            handleError(err, isEditing ? "Error while updating review" : "Error while creating review");
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/reviews/${id}`);
            toast.success('Review deleted successfully!', { autoClose: 3000 });
            navigate('/');
        } catch (err) {
            handleError(err, "Error while deleting review");
        }
    };

    const handleError = (err, defaultMessage) => {
        if (err.response) {
            toast.error(err.response.data?.error?.message || defaultMessage, { autoClose: 3000 });
        } else if (err.request) {
            toast.error("No response received from the server. Please try again later.", { autoClose: 3000 });
        } else {
            toast.error("An error occurred. Please try again.", { autoClose: 3000 });
        }
    };

    return (
        <div className="review-form">
            <h1>{isEditing ? 'Edit Review' : 'Create New Review'}</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="form-buttons">
                <button className="save" onClick={handleSave}>{isEditing ? 'Save' : 'Create'}</button>
                {isEditing && <button className="delete" onClick={handleDelete}>Delete</button>}
                <button className="cancel" onClick={() => navigate('/')}>Cancel</button>
                <button className="go-back" onClick={() => navigate(-1)}>Go Back</button>

            </div>
        </div>
    );
};

export default ReviewForm;
