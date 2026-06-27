import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
  },
  { _id: true }
);

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, default: '' },
    degree: { type: String, default: '' },
    field: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
  },
  { _id: true }
);

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, default: 'My Resume' },
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      website: { type: String, default: '' },
      jobTitle: { type: String, default: '' },
    },
    summary: { type: String, default: '' },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [{ type: String }],
    template: {
      type: String,
      enum: ['aura', 'executive', 'nova', 'minimal', 'classic'],
      default: 'nova',
    },
    atsOptimized: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Resume = mongoose.model('Resume', resumeSchema);
