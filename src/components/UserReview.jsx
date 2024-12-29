


import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({ restaurantName: '', rating: '', comment: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get('/review');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/review', reviewData);
      setMessage('Review submitted successfully!');
      setReviewData({ restaurantName: '', rating: '', comment: '' });
      fetchReviews();
      console.log(response.data);
    } catch (error) {
      setMessage('Error submitting review.');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/review/${id}`);
      setMessage('Review deleted successfully!');
      fetchReviews();
    } catch (error) {
      setMessage('Error deleting review.');
      console.error(error);
    }
  };

  const handleEdit = async (id, updatedReview) => {
    try {
      await axiosInstance.put(`/review/${id}`, updatedReview);
      setMessage('Review updated successfully!');
      fetchReviews();
    } catch (error) {
      setMessage('Error updating review.');
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Restaurant Name</label>
          <input
            type="text"
            value={reviewData.restaurantName}
            onChange={(e) => setReviewData({ ...reviewData, restaurantName: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={reviewData.rating}
            onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            value={reviewData.comment}
            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
            className="border p-2 w-full rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}

      <h2 className="text-2xl font-bold mt-8">Reviews</h2>
      <div className="space-y-4 mt-4">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded">
            <p><strong>Restaurant:</strong> {review.restaurantName}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  const updatedComment = prompt('Edit your comment:', review.comment,);
                  const updatedRating = prompt('Edit your rating:', review.rating);
                  if (updatedComment) {
                    handleEdit(review._id, { ...review ,  comment: updatedComment });
                  }
                  if (updatedRating) {
                    handleEdit(review._id, { ...review ,  rating:updatedRating,});
                  }
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewComponent;

