import React, { useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './FeedbackForm.css';  // Import the external CSS file

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
    <div className="feedback-form-container">
      <div className="feedback-header">
        <h2 className="feedback-title">Provide Feedback</h2>
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div>
          <label className="form-label">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="form-textarea"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
