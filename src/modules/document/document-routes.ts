import express from 'express';
import { uploadDocument, approvedDocument } from '../document/document-controller';
import { authenticate } from '../../middleware/auth-middleware';
import { authorizationRole } from '../../middleware/role-middleware';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/upload', authenticate, authorizationRole(["A"]), upload.single('file'), uploadDocument)
router.put("/approve/:id", authenticate, authorizationRole(["B"]), approvedDocument)
export default router;
