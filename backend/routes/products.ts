import express from 'express';
import { getProducts, addProduct, deleteProduct, editProduct } from '../controllers/productsController';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', getProducts);
router.post('/', upload.array('images', 10), addProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', upload.array('images', 10), editProduct);

export default router; 