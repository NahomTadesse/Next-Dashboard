'use client';

import { useState, useEffect, FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { authenticatedFetch } from '@/service/authenticator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Feature {
  title: string;
  description: string;
  _id?: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  images: string[];
  logo: string;
  features: Feature[];
  technologies: string[];
  demoUrl: string;
  liveUrl: string;
  status: string;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const ProductPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    fullDescription: '',
    category: '',
    images: [''],
    logo: '',
    features: [{ title: '', description: '' }],
    technologies: [''],
    demoUrl: '',
    liveUrl: '',
    status: 'active',
    isFeatured: true,
    order: 0,
  });
  const [editFormData, setEditFormData] = useState<Product | null>(null);
  const productsPerPage = 7;

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/products', {
        method: 'GET',
        headers: { 'Accept': '*/*' },
      });
      if (response.ok) {
        const { data } = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for creating a product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...formData,
      order: Number(formData.order),
      images: formData.images.filter(img => img.trim()),
      features: formData.features.filter(f => f.title && f.description),
      technologies: formData.technologies.filter(t => t.trim()),
    };

    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormData({
          name: '',
          slug: '',
          description: '',
          fullDescription: '',
          category: '',
          images: [''],
          logo: '',
          features: [{ title: '', description: '' }],
          technologies: [''],
          demoUrl: '',
          liveUrl: '',
          status: 'active',
          isFeatured: true,
          order: 0,
        });
        alert('Product created successfully!');
        setShowForm(false);
        fetchProducts();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create product');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Product creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for editing a product
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!editFormData) return;

    const payload = {
      ...editFormData,
      order: Number(editFormData.order),
      images: editFormData.images.filter(img => img.trim()),
      features: editFormData.features.filter(f => f.title && f.description),
      technologies: editFormData.technologies.filter(t => t.trim()),
    };

    try {
      const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/products/${editFormData._id}`, {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setEditFormData(null);
        setShowEdit(false);
        alert('Product updated successfully!');
        fetchProducts();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update product');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Product update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setError(null);
      setLoading(true);
      try {
        const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/products/${id}`, {
          method: 'DELETE',
          headers: { 'Accept': '*/*' },
        });
        if (response.ok) {
          alert('Product deleted successfully!');
          fetchProducts();
          if (products.length <= productsPerPage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to delete product');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
        console.error('Delete product error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle opening details modal
  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  // Handle opening edit modal
  const handleOpenEdit = (product: Product) => {
    setEditFormData({ ...product });
    setShowEdit(true);
  };

  // Handle dynamic fields for features, technologies, and images
  const addFeature = (isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      features: [...prev.features, { title: '', description: '' }],
    }));
  };

  const removeFeature = (index: number, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index: number, field: string, value: string, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      features: prev.features.map((f, i) =>
        i === index ? { ...f, [field]: value } : f
      ),
    }));
  };

  const addTechnology = (isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      technologies: [...prev.technologies, ''],
    }));
  };

  const removeTechnology = (index: number, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const updateTechnology = (index: number, value: string, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      technologies: prev.technologies.map((t, i) => (i === index ? value : t)),
    }));
  };

  const addImage = (isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImage = (index: number, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index: number, value: string, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }));
  };

  // Filter and sort products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === 'asc' ? (nameA > nameB ? 1 : -1) : (nameA < nameB ? 1 : -1);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="w-full min-h-screen p-6 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
      <Card className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            {showForm ? 'Create Product' : 'Manage Products'}
          </CardTitle>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 h-12 shadow-md hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {showForm ? 'View Products' : 'Add New Product'}
              </Button>
              {!showForm && (
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full py-3 h-12"
                  disabled={loading}
                >
                  Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                  {sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>
            {!showForm && (
              <div className="relative max-w-md mx-auto">
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 pl-10"
                  disabled={loading}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
              <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
            </Alert>
          )}
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-neutral-700 dark:text-neutral-200 font-semibold">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="slug" className="text-neutral-700 dark:text-neutral-200 font-semibold">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="Enter product slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-neutral-700 dark:text-neutral-200 font-semibold">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter short description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="fullDescription" className="text-neutral-700 dark:text-neutral-200 font-semibold">Full Description</Label>
                  <Textarea
                    id="fullDescription"
                    placeholder="Enter full description"
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl"
                    rows={4}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-neutral-700 dark:text-neutral-200 font-semibold">Category</Label>
                  <Input
                    id="category"
                    placeholder="Enter category (e.g., web-app)"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="logo" className="text-neutral-700 dark:text-neutral-200 font-semibold">Logo URL</Label>
                  <Input
                    id="logo"
                    placeholder="Enter logo URL"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="demoUrl" className="text-neutral-700 dark:text-neutral-200 font-semibold">Demo URL</Label>
                  <Input
                    id="demoUrl"
                    placeholder="Enter demo URL"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="liveUrl" className="text-neutral-700 dark:text-neutral-200 font-semibold">Live URL</Label>
                  <Input
                    id="liveUrl"
                    placeholder="Enter live URL"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="order" className="text-neutral-700 dark:text-neutral-200 font-semibold">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    placeholder="Enter order number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="status" className="text-neutral-700 dark:text-neutral-200 font-semibold">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 w-full px-3"
                    disabled={loading}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="isFeatured" className="text-neutral-700 dark:text-neutral-200 font-semibold">Featured</Label>
                  <select
                    id="isFeatured"
                    value={formData.isFeatured.toString()}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.value === 'true' })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 w-full px-3"
                    disabled={loading}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Images</Label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Enter image URL"
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                        className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                        required
                        disabled={loading}
                      />
                      {formData.images.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeImage(index)}
                          className="text-red-600 hover:text-red-700"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addImage()}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Image
                  </Button>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Features</Label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          placeholder="Feature title"
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Feature description"
                          value={feature.description}
                          onChange={(e) => updateFeature(index, 'description', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                      </div>
                      {formData.features.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-700 mt-2"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addFeature()}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Technologies</Label>
                  {formData.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Technology name"
                        value={tech}
                        onChange={(e) => updateTechnology(index, e.target.value)}
                        className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                        required
                        disabled={loading}
                      />
                      {formData.technologies.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeTechnology(index)}
                          className="text-red-600 hover:text-red-700"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addTechnology()}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Technology
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-12"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12 shadow-md hover:scale-105 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    'Create Product'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-neutral-50 dark:bg-neutral-800">
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Name</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Description</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Status</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Created At</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <TableRow key={product._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">{product.name}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{product.description}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{product.status}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{new Date(product.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400">...</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                              <DropdownMenuItem onClick={() => handleOpenDetails(product)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenEdit(product)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(product._id)} className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-neutral-600 dark:text-neutral-300">
                        {loading ? 'Loading...' : 'No products found.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page ? 'bg-blue-600 text-white rounded-full h-10' : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10'}
                      disabled={page > totalPages || loading}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      {showDetails && selectedProduct && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="w-[90vw] max-w-7xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
            <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-6 px-8">
              <DialogTitle className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{selectedProduct.name}</DialogTitle>
            </DialogHeader>
            <div className="p-8 space-y-8">
              <img
                src={selectedProduct.logo}
                alt={selectedProduct.name}
                className="w-full h-80 object-cover rounded-2xl shadow-md mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">ID</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct._id}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Name</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Slug</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.slug}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Description</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Full Description</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.fullDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Category</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.category}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Logo</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 break-all">{selectedProduct.logo}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Demo URL</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 break-all">{selectedProduct.demoUrl}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Live URL</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 break-all">{selectedProduct.liveUrl}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Status</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.status}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Featured</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.isFeatured ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Order</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedProduct.order}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Created At</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{new Date(selectedProduct.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Updated At</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{new Date(selectedProduct.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-xl shadow-md"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Features</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 dark:bg-neutral-800">
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Title</TableHead>
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProduct.features.map((feature) => (
                      <TableRow key={feature._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{feature.title}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{feature.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Technologies</h3>
                <ul className="list-disc pl-4 text-neutral-600 dark:text-neutral-300">
                  {selectedProduct.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter className="p-6 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                onClick={() => setShowDetails(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12 shadow-md hover:scale-105 transition-all duration-200"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      {showEdit && editFormData && (
        <Dialog open={showEdit} onOpenChange={setShowEdit}>
          <DialogContent className="w-[90vw] max-w-7xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
            <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-6 px-8">
              <DialogTitle className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
                  <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="edit-name" className="text-neutral-700 dark:text-neutral-200 font-semibold">Name</Label>
                  <Input
                    id="edit-name"
                    placeholder="Enter product name"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-slug" className="text-neutral-700 dark:text-neutral-200 font-semibold">Slug</Label>
                  <Input
                    id="edit-slug"
                    placeholder="Enter product slug"
                    value={editFormData.slug}
                    onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-description" className="text-neutral-700 dark:text-neutral-200 font-semibold">Description</Label>
                  <Input
                    id="edit-description"
                    placeholder="Enter short description"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-fullDescription" className="text-neutral-700 dark:text-neutral-200 font-semibold">Full Description</Label>
                  <Textarea
                    id="edit-fullDescription"
                    placeholder="Enter full description"
                    value={editFormData.fullDescription}
                    onChange={(e) => setEditFormData({ ...editFormData, fullDescription: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl"
                    rows={4}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-category" className="text-neutral-700 dark:text-neutral-200 font-semibold">Category</Label>
                  <Input
                    id="edit-category"
                    placeholder="Enter category (e.g., web-app)"
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-logo" className="text-neutral-700 dark:text-neutral-200 font-semibold">Logo URL</Label>
                  <Input
                    id="edit-logo"
                    placeholder="Enter logo URL"
                    value={editFormData.logo}
                    onChange={(e) => setEditFormData({ ...editFormData, logo: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-demoUrl" className="text-neutral-700 dark:text-neutral-200 font-semibold">Demo URL</Label>
                  <Input
                    id="edit-demoUrl"
                    placeholder="Enter demo URL"
                    value={editFormData.demoUrl}
                    onChange={(e) => setEditFormData({ ...editFormData, demoUrl: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-liveUrl" className="text-neutral-700 dark:text-neutral-200 font-semibold">Live URL</Label>
                  <Input
                    id="edit-liveUrl"
                    placeholder="Enter live URL"
                    value={editFormData.liveUrl}
                    onChange={(e) => setEditFormData({ ...editFormData, liveUrl: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-order" className="text-neutral-700 dark:text-neutral-200 font-semibold">Order</Label>
                  <Input
                    id="edit-order"
                    type="number"
                    placeholder="Enter order number"
                    value={editFormData.order}
                    onChange={(e) => setEditFormData({ ...editFormData, order: Number(e.target.value) })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-status" className="text-neutral-700 dark:text-neutral-200 font-semibold">Status</Label>
                  <select
                    id="edit-status"
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 w-full px-3"
                    disabled={loading}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-isFeatured" className="text-neutral-700 dark:text-neutral-200 font-semibold">Featured</Label>
                  <select
                    id="edit-isFeatured"
                    value={editFormData.isFeatured.toString()}
                    onChange={(e) => setEditFormData({ ...editFormData, isFeatured: e.target.value === 'true' })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 w-full px-3"
                    disabled={loading}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Images</Label>
                  {editFormData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Enter image URL"
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value, true)}
                        className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                        required
                        disabled={loading}
                      />
                      {editFormData.images.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeImage(index, true)}
                          className="text-red-600 hover:text-red-700"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addImage(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Image
                  </Button>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Features</Label>
                  {editFormData.features.map((feature, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          placeholder="Feature title"
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value, true)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Feature description"
                          value={feature.description}
                          onChange={(e) => updateFeature(index, 'description', e.target.value, true)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                      </div>
                      {editFormData.features.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeFeature(index, true)}
                          className="text-red-600 hover:text-red-700 mt-2"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addFeature(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Technologies</Label>
                  {editFormData.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Technology name"
                        value={tech}
                        onChange={(e) => updateTechnology(index, e.target.value, true)}
                        className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                        required
                        disabled={loading}
                      />
                      {editFormData.technologies.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeTechnology(index, true)}
                          className="text-red-600 hover:text-red-700"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addTechnology(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Technology
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-12"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12 shadow-md hover:scale-105 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ProductPage;