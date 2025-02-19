export const createReview = async (req, res) => {
  console.log("Incoming Request Body:", req.body); // 🔹 Debugging log
  console.log("Tour ID:", req.params.tourId);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON request" });
  }

  const { username, reviewText, rating } = req.body;

  if (!username || !reviewText || !rating) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const newReview = new Review({
      username,
      reviewText,
      rating,
      productId: req.params.tourId,
    });
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(req.params.tourId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review Submitted", data: savedReview });
  } catch (err) {
    console.error("Review Submission Error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to Submit",
        error: err.message,
      });
  }
};
