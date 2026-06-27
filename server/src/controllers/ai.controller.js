import { generateSummary, suggestSkills } from '../services/openai.service.js';
import { Resume } from '../models/Resume.js';

export const createSummary = async (req, res, next) => {
  try {
    const { resumeId, jobTitle, experience, skills } = req.body;

    let data = { jobTitle, experience, skills };
    if (resumeId) {
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
      if (resume) {
        data = {
          jobTitle: jobTitle || resume.personalInfo?.jobTitle,
          experience: experience || resume.experience,
          skills: skills || resume.skills,
        };
      }
    }

    const summary = await generateSummary(data);
    res.json({ summary });
  } catch (err) {
    next(err);
  }
};

export const createSkillSuggestions = async (req, res, next) => {
  try {
    const { resumeId, jobTitle, experience, currentSkills } = req.body;

    let data = { jobTitle, experience, currentSkills };
    if (resumeId) {
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
      if (resume) {
        data = {
          jobTitle: jobTitle || resume.personalInfo?.jobTitle,
          experience: experience || resume.experience,
          currentSkills: currentSkills || resume.skills,
        };
      }
    }

    const skills = await suggestSkills(data);
    res.json({ skills });
  } catch (err) {
    next(err);
  }
};
