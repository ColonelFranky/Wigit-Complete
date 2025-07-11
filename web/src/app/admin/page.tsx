"use client";
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrls?: string[];
  stock: number;
  type?: string;
  tags?: string[];
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    type: 'wigit',
    tags: '',
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]); // Prevent .map error
          console.error('Products API did not return an array:', data);
        }
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:4000/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      const fileArr = Array.from(files);
      setForm(f => ({ ...f, images: fileArr }));
      setImagePreviews(fileArr.map(file => URL.createObjectURL(file)));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      type: product.type || 'wigit',
      tags: product.tags ? product.tags.join(', ') : '',
      images: [],
    });
    setImagePreviews(product.imageUrls || []);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('type', form.type);
    formData.append('tags', JSON.stringify(form.tags.split(',').map(tag => tag.trim()).filter(Boolean)));
    if (form.images.length > 0) {
      form.images.forEach(image => formData.append('images', image));
    } else {
      formData.append('imageUrls', JSON.stringify(imagePreviews));
    }
    const res = await fetch(`http://localhost:4000/products/${editId}`, {
      method: 'PUT',
      body: formData,
    });
    const updated = await res.json();
    setProducts(products.map(p => p.id === editId ? updated : p));
    setEditId(null);
    setForm({ name: '', description: '', price: '', stock: '', type: 'wigit', tags: '', images: [] });
    setImagePreviews([]);
    setSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('type', form.type);
    formData.append('tags', JSON.stringify(form.tags.split(',').map(tag => tag.trim()).filter(Boolean)));
    form.images.forEach(image => formData.append('images', image));
    const res = await fetch('http://localhost:4000/products', {
      method: 'POST',
      body: formData,
    });
    const created = await res.json();
    setProducts([...products, created]);
    setForm({ name: '', description: '', price: '', stock: '', type: 'wigit', tags: '', images: [] });
    setImagePreviews([]);
    setSubmitting(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Admin Dashboard</h1>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>{editId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={editId ? handleEditSubmit : handleSubmit} style={{ marginBottom: 32 }} encType="multipart/form-data">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" min="0" step="0.01" required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" min="0" required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
        <select name="type" value={form.type} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 8 }}>
          <option value="wigit">Wigit</option>
          <option value="tshirt">T-Shirt</option>
        </select>
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
        <input name="images" type="file" accept="image/*" multiple onChange={handleChange} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
        {imagePreviews.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {imagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
            ))}
          </div>
        )}
        <button type="submit" disabled={submitting} style={{ background: '#0070f3', color: 'white', padding: '8px 24px', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          {submitting ? (editId ? 'Saving...' : 'Adding...') : (editId ? 'Save Changes' : 'Add Product')}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ name: '', description: '', price: '', stock: '', type: 'wigit', tags: '', images: [] }); setImagePreviews([]); }} style={{ marginLeft: 8, background: '#eee', color: '#333', padding: '8px 24px', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
        )}
      </form>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <b>{product.name}</b> - ${product.price}
            <button onClick={() => handleEdit(product)} style={{ marginLeft: 8, color: 'white', background: 'orange', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Edit</button>
            <button onClick={() => handleDelete(product.id)} style={{ marginLeft: 8, color: 'white', background: 'red', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 