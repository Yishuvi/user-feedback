import express from 'express';
import { 
  submitFeedback, 
  getFeedbacks, 
  deleteFeedback,
  updateFeedbackDetails,
  updateFeedbackImportant,
  updateFeedbackSuggestion,
  updateFeedbackBugReport
} from '../controllers/feedbackController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitFeedback);
router.get('/', getFeedbacks);
router.delete('/:id', protect, deleteFeedback);

router.put('/update-details/:id', protect, updateFeedbackDetails);
router.put('/update-important/:id', protect, updateFeedbackImportant);
router.put('/update-suggestion/:id', protect, updateFeedbackSuggestion);
router.put('/update-bugreport/:id', protect, updateFeedbackBugReport);

export default router;