import { Resume } from '../models/Resume.js';
import { generatePdfBuffer } from '../services/pdf.service.js';

export const listResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .select('title personalInfo updatedAt createdAt');
    res.json(resumes);
  } catch (err) {
    next(err);
  }
};

export const createResume = async (req, res, next) => {
  try {
    const resume = await Resume.create({
      userId: req.user._id,
      personalInfo: {
        fullName: req.user.name,
        email: req.user.email,
      },
      ...req.body,
    });
    res.status(201).json(resume);
  } catch (err) {
    next(err);
  }
};

export const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    next(err);
  }
};

export const updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    next(err);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    next(err);
  }
};

export const downloadPdf = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const pdf = await generatePdfBuffer(resume);
    const filename = `${(resume.personalInfo?.fullName || 'resume').replace(/\s+/g, '_')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdf);
  } catch (err) {
    next(err);
  }
};
