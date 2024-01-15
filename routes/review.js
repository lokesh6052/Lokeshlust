const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const ReviewController = require("../controllers/review.js");

//reviews route(post review)
router.post("/", isLoggedIn , validateReview,wrapAsync(ReviewController.newReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn , isReviewAuthor ,wrapAsync(ReviewController.destroyReview));

module.exports = router;