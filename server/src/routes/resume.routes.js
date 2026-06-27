import { Router } from 'express';
import {
  listResumes,
  createResume,
  getResume,
  updateResume,
  deleteResume,
  downloadPdf,
} from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', listResumes);
router.post('/', createResume);
router.get('/:id', getResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);
router.get('/:id/pdf', downloadPdf);

export default router;
