import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
    Suggestion: {
      type: String,
      required: true,
    },
    Bugreport: {
      type: String,
      required: true,
    },
  }, { timestamps: true });

  const Feedback = mongoose.model('Feedback', feedbackSchema);
  export default Feedback;  