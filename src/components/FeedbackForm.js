
// components/FeedbackForm.js
import React, { useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        userId: auth.currentUser.uid,
        feedback,
        timestamp: new Date(),
      });
      setFeedback('');
      alert('Feedback submitted successfully!');
    } catch (error) {
      alert('Error submitting feedback: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Provide Feedback</h2>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;