import { Router } from 'express';
import { createSummary, createSkillSuggestions } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.post('/summary', createSummary);
router.post('/skills', createSkillSuggestions);

export default router;
