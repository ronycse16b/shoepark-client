import React, { useState } from "react";

const ReviewSection = () => {
  const [userRating, setUserRating] = useState(1); // State for user's rating selection
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg", // Default avatar URL for new reviews
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "John Doe",
      rating: 4,
      comment: "Great product! Really satisfied with the quality.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      userName: "Jane Smith",
      rating: 5,
      comment: "Awesome service! Would definitely recommend.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    // Add more reviews as needed
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedReviews = [
      ...reviews,
      { ...newReview, id: reviews.length + 1 },
    ];
    setReviews(updatedReviews);
    setNewReview({
      userName: "",
      rating: 0,
      comment: "",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    });
  };

  const handleStarClick = (star) => {
    setUserRating(star);
    setNewReview({
      ...newReview,
      rating: star,
    });
  };

  return (
    <div className=" rounded-lg overflow-hidden  mb-6">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className=" bg-white p-4 mb-2 shadow rounded-md flex justify-between">
          <div>
            <div className="flex items-center mb-2">
              <img
                src={review.avatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 fill-current"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1l2.928 6.786 6.072.614-4.622 4.473 1.093 6.342L10 15.404l-5.471 2.407 1.093-6.342-4.622-4.473 6.072-.614L10 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
          <div>

            <h1 className="text-sm">5 months ago</h1>
          </div>
          {/* <img src={review.avatar} alt={review.userName} className="mt-2 w-16 rounded-lg shadow-md" /> */}
        </div>
      ))}
      {/* Form for submitting a new review */}
      <form onSubmit={handleSubmit} className="mt-4 max-w-md">
        <h3 className="text-lg font-semibold mb-2">Submit a Review</h3>
        
        <div className="flex space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleStarClick(star)}
              className={`w-7 cursor-pointer ${
                star <= userRating ? "text-yellow-500" : "text-gray-300"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
            </svg>
          ))}
        </div>
        <textarea
          name="comment"
          placeholder="Your Review"
          value={newReview.comment}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full h-20 resize-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
