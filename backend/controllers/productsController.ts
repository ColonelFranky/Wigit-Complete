import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, type, tags } = req.body;
  const files = (req.files as Express.Multer.File[]) || [];
  const imageUrls = files.map(file => `/uploads/${file.filename}`);
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        type,
        tags: Array.isArray(tags) ? tags : JSON.parse(tags),
        imageUrls,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, type, tags } = req.body;
  const { id } = req.params;
  const files = (req.files as Express.Multer.File[]) || [];
  let imageUrls: string[] = [];

  if (files.length > 0) {
    imageUrls = files.map(file => `/uploads/${file.filename}`);
  } else if (req.body.imageUrls) {
    // If no new files, keep existing imageUrls from the request
    try {
      imageUrls = typeof req.body.imageUrls === 'string' ? JSON.parse(req.body.imageUrls) : req.body.imageUrls;
    } catch {
      imageUrls = [];
    }
  }

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        type,
        tags: Array.isArray(tags) ? tags : JSON.parse(tags),
        imageUrls,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
}; 