import Feedback from '../models/Feedback.js';
import User from '../models/User.js';

export const submitFeedback = async (req, res) => {
    try {
      const { title, description, important, suggestion, bugreport } = req.body;
  
      if (!title || !description || !suggestion || !bugreport) {
        return res.status(400).json({ error: 'Please fill all required fields.' });
      }
  
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const feedback = await Feedback.create({
        user: req.user.userId,
        title,
        description,
        important,
        suggestion,
        bugreport,
      });
  
      user.feedbacks.push(feedback._id);
      await user.save();
  
      res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error while submitting feedback' });
    }
  };
  
  export const getFeedbacks = async (req, res) => {
    try {
      const { important, sortBy } = req.query;
  
      const filter = {};
      if (important) {
        filter.important = important === 'true';
      }
  
      const sortOption = sortBy ? { [sortBy]: -1 } : { createdAt: -1 };
  
      const feedbacks = await Feedback.find(filter)
        .populate('user', 'username email') 
        .sort(sortOption);
  
      res.json(feedbacks);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
  };


  export const deleteFeedback = async (req, res) => {
    try {
      const feedbackId = req.params.id; 
  
      // Find the feedback document by its ID
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
  
      // Check if the logged-in user is the one who created the feedback
      if (feedback.user.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this feedback' });
      }
  
      // Find the user who created the feedback and remove the feedback ID from their list
      const user = await User.findById(req.user.userId);
      user.feedbacks.pull(feedbackId);
      await user.save();
  
      // Use findByIdAndDelete to delete the feedback
      await Feedback.findByIdAndDelete(feedbackId); 
  
      res.status(200).json({ message: 'Feedback deleted successfully' });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error while deleting feedback' });
    }
  };
  
// Update title and description
export const updateFeedbackDetails = async (req, res) => {
    try {
      const { title, description } = req.body;
      const feedbackId = req.params.id;
  
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
  
      // Check if the user is the owner
      if (feedback.user.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'You are not authorized to update this feedback' });
      }
  
      feedback.title = title || feedback.title;
      feedback.description = description || feedback.description;
      await feedback.save();
  
      res.status(200).json({ message: 'Feedback details updated successfully', feedback });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error while updating feedback details' });
    }
  }; 

  // Update important flag
export const updateFeedbackImportant = async (req, res) => {
    try {
      const { important } = req.body;
      const feedbackId = req.params.id;
  
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
  
      if (feedback.user.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'You are not authorized to update this feedback' });
      }
  
      feedback.important = important;
      await feedback.save();
      console.log("Updated feedback:", feedback);
  
      res.status(200).json({ message: 'Feedback importance updated successfully', feedback });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error while updating feedback importance' });
    }
  };
  
  //Update Suggestion
export const updateFeedbackSuggestion = async (req, res) => {
  try {
    const { suggestion } = req.body;
    const feedbackId = req.params.id;

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    if (feedback.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'You are not authorized to update this feedback' });
    }

    feedback.Suggestion = suggestion || feedback.Suggestion;
    await feedback.save();

    res.status(200).json({ message: 'Suggestion updated successfully', feedback });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating suggestion' });
  }
};

// Update Bug Report
export const updateFeedbackBugReport = async (req, res) => {
    try {
      const { bugreport } = req.body;
      const feedbackId = req.params.id;
  
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
  
      if (feedback.user.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'You are not authorized to update this feedback' });
      }
  
      feedback.Bugreport = bugreport || feedback.Bugreport;
      await feedback.save();
  
      res.status(200).json({ message: 'Bug report updated successfully', feedback });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error while updating bug report' });
    }
  };