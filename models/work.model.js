import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Work = mongoose.model("Work", workSchema);

export default Work;
