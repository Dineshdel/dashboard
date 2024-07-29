import React, { useState } from 'react';

const FeedbackForm = ({ addFeedback }) => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [questionType, setQuestionType] = useState('yes_no');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === '') {
      setError('Question cannot be empty.');
    } else {
      const question = {
        feedback,
        type: questionType,
        options: questionType === 'yes_no' ? ['Yes', 'No'] : [],
        rating: questionType === 'rating' ? rating : null,
      };
      addFeedback(question);
      setFeedback('');
      setError('');
      setRating(0);
    }

   
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl mb-4">Add Question</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full p-2 border mb-4"
        placeholder="Type your question here..."
      ></textarea>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Question Type:</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full p-2 border"
        >
          <option value="Yes/no">Yes/No</option>
          <option value="Rating">5-Star Rating</option>
          {/* <option value="Text">Text</option> */}
        </select>
      </div>
      {questionType === 'rating' && (
        <div className="mb-4">
          <label className="block font-semibold mb-2">Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`p-2 ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      )}
      <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg">
        Add Question
      </button>
    </form>
  );
};

export default FeedbackForm;
