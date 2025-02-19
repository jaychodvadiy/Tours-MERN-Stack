import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";

const router = express.Router();

//create new tour
// router.post("/", verifyAdmin, createTour); 

router.post("/", createTour);


//update  tour
router.put("/:id",  updateTour);

//delete tour
router.delete("/:id", deleteTour);

//get single tour
router.get("/:id", getSingleTour);

//get all tour
router.get("/", getAllTour);

//get all tour
router.get("/search/getTourBySearch", getTourBySearch);

//get featured tour
router.post("/search/getFeaturedTours", getFeaturedTour);


//get tour count
router.post("/search/getTourCount", getTourCount);

export default router;
