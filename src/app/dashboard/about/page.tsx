

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Search, ChevronDown, ChevronUp, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { authenticatedFetch } from '@/service/authenticator';

interface Value {
  title: string;
  description: string;
  icon: string;
  _id?: string;
}

interface Achievement {
  number: number;
  label: string;
  suffix: string;
  _id?: string;
}

interface AboutData {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  mission: string;
  vision: string;
  story: string;
  companyName: string;
  tagline: string;
  foundedYear: number;
  employeesCount: number;
  clientsCount: number;
  projectsCompleted: number;
  values: Value[];
  achievements: Achievement[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  createdAt: string;
  updatedAt: string;
}

export default function AboutPageUpdater() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData[]>([]);
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    mission: '',
    vision: '',
    story: '',
    companyName: '',
    tagline: '',
    foundedYear: 0,
    employeesCount: 0,
    clientsCount: 0,
    projectsCompleted: 0,
    values: [{ title: '', description: '', icon: '' }],
    achievements: [{ number: 0, label: '', suffix: '' }],
    ctaTitle: '',
    ctaDescription: '',
    ctaButtonText: '',
    ctaButtonLink: '',
  });
  const [editFormData, setEditFormData] = useState(null);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Fetch About Us data
  const fetchAboutData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/about', {
        method: 'GET',
        headers: { 'Accept': '*/*' },
      });
      if (response.ok) {
        const { data } = await response.json();
        setAboutData([data]); // Wrap in array for table rendering
      } else {
        setError('Failed to fetch About Us data');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Fetch About Us error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for creating/updating About Us data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...formData,
      foundedYear: Number(formData.foundedYear),
      employeesCount: Number(formData.employeesCount),
      clientsCount: Number(formData.clientsCount),
      projectsCompleted: Number(formData.projectsCompleted),
      values: formData.values.filter(v => v.title && v.description && v.icon),
      achievements: formData.achievements.filter(a => a.number && a.label && a.suffix),
    };

    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/about', {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormData({
          heroTitle: '',
          heroSubtitle: '',
          heroImage: '',
          mission: '',
          vision: '',
          story: '',
          companyName: '',
          tagline: '',
          foundedYear: 0,
          employeesCount: 0,
          clientsCount: 0,
          projectsCompleted: 0,
          values: [{ title: '', description: '', icon: '' }],
          achievements: [{ number: 0, label: '', suffix: '' }],
          ctaTitle: '',
          ctaDescription: '',
          ctaButtonText: '',
          ctaButtonLink: '',
        });
        alert('About Us data saved successfully!');
        setShowForm(false);
        fetchAboutData();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save About Us data');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('About Us save error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for editing About Us data
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...editFormData,
      foundedYear: Number(editFormData.foundedYear),
      employeesCount: Number(editFormData.employeesCount),
      clientsCount: Number(editFormData.clientsCount),
      projectsCompleted: Number(editFormData.projectsCompleted),
      values: editFormData.values.filter(v => v.title && v.description && v.icon),
      achievements: editFormData.achievements.filter(a => a.number && a.label && a.suffix),
    };

    try {
      const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/about`, {
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
        alert('About Us data updated successfully!');
        fetchAboutData();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update About Us data');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('About Us update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this About Us data?')) {
      setError(null);
      setLoading(true);
      try {
        const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/about/${id}`, {
          method: 'DELETE',
          headers: { 'Accept': '*/*' },
        });
        if (response.ok) {
          alert('About Us data deleted successfully!');
          fetchAboutData();
          if (aboutData.length <= itemsPerPage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to delete About Us data');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
        console.error('Delete About Us error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle opening details modal
  const handleOpenDetails = (about) => {
    setSelectedAbout(about);
    setShowDetails(true);
  };

  // Handle opening edit modal
  const handleOpenEdit = (about) => {
    setSelectedAbout(about);
    setEditFormData({ ...about });
    setShowEdit(true);
  };

  // Handle adding/removing values and achievements
  const addValue = () => {
    setFormData({
      ...formData,
      values: [...formData.values, { title: '', description: '', icon: '' }],
    });
  };

  const removeValue = (index) => {
    setFormData({
      ...formData,
      values: formData.values.filter((_, i) => i !== index),
    });
  };

  const updateValue = (index, field, value) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { number: 0, label: '', suffix: '' }],
    });
  };

  const removeAchievement = (index) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  const updateAchievement = (index, field, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setFormData({ ...formData, achievements: newAchievements });
  };

  const updateEditValue = (index, field, value) => {
    const newValues = [...editFormData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setEditFormData({ ...editFormData, values: newValues });
  };

  const updateEditAchievement = (index, field, value) => {
    const newAchievements = [...editFormData.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setEditFormData({ ...editFormData, achievements: newAchievements });
  };

  // Filter and sort data
  const filteredData = aboutData.filter(about =>
    about.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    about.heroTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const nameA = a.companyName.toLowerCase();
    const nameB = b.companyName.toLowerCase();
    return sortOrder === 'asc' ? (nameA > nameB ? 1 : -1) : (nameA < nameB ? 1 : -1);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <section className="w-full min-h-screen p-6 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
      <Card className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            {showForm ? 'Create About Us' : 'Manage About Us'}
          </CardTitle>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 h-12 shadow-md hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {showForm ? 'View About Us' : 'Update About Us'}
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
                  placeholder="Search by company name or title..."
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
                  <Label htmlFor="heroTitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    placeholder="Enter hero title"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="heroSubtitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">Hero Subtitle</Label>
                  <Input
                    id="heroSubtitle"
                    placeholder="Enter hero subtitle"
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="heroImage" className="text-neutral-700 dark:text-neutral-200 font-semibold">Hero Image URL</Label>
                  <Input
                    id="heroImage"
                    placeholder="Enter hero image URL"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="companyName" className="text-neutral-700 dark:text-neutral-200 font-semibold">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="tagline" className="text-neutral-700 dark:text-neutral-200 font-semibold">Tagline</Label>
                  <Input
                    id="tagline"
                    placeholder="Enter tagline"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="foundedYear" className="text-neutral-700 dark:text-neutral-200 font-semibold">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    placeholder="Enter founded year"
                    value={formData.foundedYear || ''}
                    onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="employeesCount" className="text-neutral-700 dark:text-neutral-200 font-semibold">Employees Count</Label>
                  <Input
                    id="employeesCount"
                    type="number"
                    placeholder="Enter employees count"
                    value={formData.employeesCount || ''}
                    onChange={(e) => setFormData({ ...formData, employeesCount: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="clientsCount" className="text-neutral-700 dark:text-neutral-200 font-semibold">Clients Count</Label>
                  <Input
                    id="clientsCount"
                    type="number"
                    placeholder="Enter clients count"
                    value={formData.clientsCount || ''}
                    onChange={(e) => setFormData({ ...formData, clientsCount: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="projectsCompleted" className="text-neutral-700 dark:text-neutral-200 font-semibold">Projects Completed</Label>
                  <Input
                    id="projectsCompleted"
                    type="number"
                    placeholder="Enter projects completed"
                    value={formData.projectsCompleted || ''}
                    onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="mission" className="text-neutral-700 dark:text-neutral-200 font-semibold">Mission</Label>
                  <Input
                    id="mission"
                    placeholder="Enter mission statement"
                    value={formData.mission}
                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="vision" className="text-neutral-700 dark:text-neutral-200 font-semibold">Vision</Label>
                  <Input
                    id="vision"
                    placeholder="Enter vision statement"
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="story" className="text-neutral-700 dark:text-neutral-200 font-semibold">Story</Label>
                  <Input
                    id="story"
                    placeholder="Enter company story"
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Values</Label>
                  {formData.values.map((value, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          placeholder="Value title"
                          value={value.title}
                          onChange={(e) => updateValue(index, 'title', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Value description"
                          value={value.description}
                          onChange={(e) => updateValue(index, 'description', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Value icon"
                          value={value.icon}
                          onChange={(e) => updateValue(index, 'icon', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                      </div>
                      {formData.values.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeValue(index)}
                          className="text-red-600 hover:text-red-700 mt-2"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={addValue}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Value
                  </Button>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Achievements</Label>
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          type="number"
                          placeholder="Achievement number"
                          value={achievement.number || ''}
                          onChange={(e) => updateAchievement(index, 'number', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Achievement label"
                          value={achievement.label}
                          onChange={(e) => updateAchievement(index, 'label', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Achievement suffix"
                          value={achievement.suffix}
                          onChange={(e) => updateAchievement(index, 'suffix', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                      </div>
                      {formData.achievements.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeAchievement(index)}
                          className="text-red-600 hover:text-red-700 mt-2"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={addAchievement}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Achievement
                  </Button>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="ctaTitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Title</Label>
                  <Input
                    id="ctaTitle"
                    placeholder="Enter CTA title"
                    value={formData.ctaTitle}
                    onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="ctaDescription" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Description</Label>
                  <Input
                    id="ctaDescription"
                    placeholder="Enter CTA description"
                    value={formData.ctaDescription}
                    onChange={(e) => setFormData({ ...formData, ctaDescription: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="ctaButtonText" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Button Text</Label>
                  <Input
                    id="ctaButtonText"
                    placeholder="Enter CTA button text"
                    value={formData.ctaButtonText}
                    onChange={(e) => setFormData({ ...formData, ctaButtonText: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="ctaButtonLink" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Button Link</Label>
                  <Input
                    id="ctaButtonLink"
                    placeholder="Enter CTA button link"
                    value={formData.ctaButtonLink}
                    onChange={(e) => setFormData({ ...formData, ctaButtonLink: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
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
                    'Save About Us'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-neutral-50 dark:bg-neutral-800">
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Company Name</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Hero Title</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Created At</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((about) => (
                      <TableRow key={about._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">{about.companyName}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{about.heroTitle}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{new Date(about.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400">...</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                              <DropdownMenuItem onClick={() => handleOpenDetails(about)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenEdit(about)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(about._id)} className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-neutral-600 dark:text-neutral-300">
                        {loading ? 'Loading...' : 'No About Us data found.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page ? 'bg-blue-600 text-white rounded-full h-10' : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10'}
                      disabled={page > totalPages}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10 flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Next
                  </Button>
                  <span className="text-sm text-neutral-600 dark:text-neutral-300 ml-4">
                    Page {currentPage}
                  </span>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      {showDetails && selectedAbout && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
            <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-4 px-6">
              <DialogTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{selectedAbout.companyName}</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-6">
              <img
                src={selectedAbout.heroImage}
                alt={selectedAbout.heroTitle}
                className="w-full h-64 object-cover rounded-2xl shadow-md mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hero Title</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.heroTitle}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hero Subtitle</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.heroSubtitle}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Company Name</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.companyName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Tagline</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.tagline}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Founded Year</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.foundedYear}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Employees Count</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.employeesCount}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Clients Count</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.clientsCount}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Projects Completed</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.projectsCompleted}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Mission</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.mission}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Vision</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.vision}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Story</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.story}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">CTA Title</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.ctaTitle}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">CTA Description</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.ctaDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">CTA Button Text</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.ctaButtonText}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">CTA Button Link</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedAbout.ctaButtonLink}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Values</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 dark:bg-neutral-800">
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Title</TableHead>
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Description</TableHead>
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Icon</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedAbout.values.map((value) => (
                      <TableRow key={value._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{value.title}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{value.description}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{value.icon}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Achievements</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 dark:bg-neutral-800">
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Number</TableHead>
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Label</TableHead>
                      <TableHead className="text-neutral-700 dark:text-neutral-200">Suffix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedAbout.achievements.map((achievement) => (
                      <TableRow key={achievement._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{achievement.number}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{achievement.label}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{achievement.suffix}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter className="p-4 border-t border-neutral-200 dark:border-neutral-700">
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
            <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-4 px-6">
              <DialogTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">Edit About Us</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
                  <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="edit-heroTitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">Hero Title</Label>
                  <Input
                    id="edit-heroTitle"
                    placeholder="Enter hero title"
                    value={editFormData.heroTitle}
                    onChange={(e) => setEditFormData({ ...editFormData, heroTitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-heroSubtitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">Hero Subtitle</Label>
                  <Input
                    id="edit-heroSubtitle"
                    placeholder="Enter hero subtitle"
                    value={editFormData.heroSubtitle}
                    onChange={(e) => setEditFormData({ ...editFormData, heroSubtitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-heroImage" className="text-neutral-700 dark:text-neutral-200 font-semibold">Hero Image URL</Label>
                  <Input
                    id="edit-heroImage"
                    placeholder="Enter hero image URL"
                    value={editFormData.heroImage}
                    onChange={(e) => setEditFormData({ ...editFormData, heroImage: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-companyName" className="text-neutral-700 dark:text-neutral-200 font-semibold">Company Name</Label>
                  <Input
                    id="edit-companyName"
                    placeholder="Enter company name"
                    value={editFormData.companyName}
                    onChange={(e) => setEditFormData({ ...editFormData, companyName: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-tagline" className="text-neutral-700 dark:text-neutral-200 font-semibold">Tagline</Label>
                  <Input
                    id="edit-tagline"
                    placeholder="Enter tagline"
                    value={editFormData.tagline}
                    onChange={(e) => setEditFormData({ ...editFormData, tagline: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-foundedYear" className="text-neutral-700 dark:text-neutral-200 font-semibold">Founded Year</Label>
                  <Input
                    id="edit-foundedYear"
                    type="number"
                    placeholder="Enter founded year"
                    value={editFormData.foundedYear || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, foundedYear: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-employeesCount" className="text-neutral-700 dark:text-neutral-200 font-semibold">Employees Count</Label>
                  <Input
                    id="edit-employeesCount"
                    type="number"
                    placeholder="Enter employees count"
                    value={editFormData.employeesCount || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, employeesCount: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-clientsCount" className="text-neutral-700 dark:text-neutral-200 font-semibold">Clients Count</Label>
                  <Input
                    id="edit-clientsCount"
                    type="number"
                    placeholder="Enter clients count"
                    value={editFormData.clientsCount || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, clientsCount: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-projectsCompleted" className="text-neutral-700 dark:text-neutral-200 font-semibold">Projects Completed</Label>
                  <Input
                    id="edit-projectsCompleted"
                    type="number"
                    placeholder="Enter projects completed"
                    value={editFormData.projectsCompleted || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, projectsCompleted: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="edit-mission" className="text-neutral-700 dark:text-neutral-200 font-semibold">Mission</Label>
                  <Input
                    id="edit-mission"
                    placeholder="Enter mission statement"
                    value={editFormData.mission}
                    onChange={(e) => setEditFormData({ ...editFormData, mission: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="edit-vision" className="text-neutral-700 dark:text-neutral-200 font-semibold">Vision</Label>
                  <Input
                    id="edit-vision"
                    placeholder="Enter vision statement"
                    value={editFormData.vision}
                    onChange={(e) => setEditFormData({ ...editFormData, vision: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="edit-story" className="text-neutral-700 dark:text-neutral-200 font-semibold">Story</Label>
                  <Input
                    id="edit-story"
                    placeholder="Enter company story"
                    value={editFormData.story}
                    onChange={(e) => setEditFormData({ ...editFormData, story: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Values</Label>
                  {editFormData.values.map((value, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          placeholder="Value title"
                          value={value.title}
                          onChange={(e) => updateEditValue(index, 'title', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Value description"
                          value={value.description}
                          onChange={(e) => updateEditValue(index, 'description', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Value icon"
                          value={value.icon}
                          onChange={(e) => updateEditValue(index, 'icon', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                      </div>
                      {editFormData.values.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => setEditFormData({ ...editFormData, values: editFormData.values.filter((_, i) => i !== index) })}
                          className="text-red-600 hover:text-red-700 mt-2"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => setEditFormData({ ...editFormData, values: [...editFormData.values, { title: '', description: '', icon: '' }] })}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Value
                  </Button>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Achievements</Label>
                  {editFormData.achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          type="number"
                          placeholder="Achievement number"
                          value={achievement.number || ''}
                          onChange={(e) => updateEditAchievement(index, 'number', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Achievement label"
                          value={achievement.label}
                          onChange={(e) => updateEditAchievement(index, 'label', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                        <Input
                          placeholder="Achievement suffix"
                          value={achievement.suffix}
                          onChange={(e) => updateEditAchievement(index, 'suffix', e.target.value)}
                          className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                          required
                          disabled={loading}
                        />
                      </div>
                      {editFormData.achievements.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => setEditFormData({ ...editFormData, achievements: editFormData.achievements.filter((_, i) => i !== index) })}
                          className="text-red-600 hover:text-red-700 mt-2"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => setEditFormData({ ...editFormData, achievements: [...editFormData.achievements, { number: 0, label: '', suffix: '' }] })}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Achievement
                  </Button>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-ctaTitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Title</Label>
                  <Input
                    id="edit-ctaTitle"
                    placeholder="Enter CTA title"
                    value={editFormData.ctaTitle}
                    onChange={(e) => setEditFormData({ ...editFormData, ctaTitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-ctaDescription" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Description</Label>
                  <Input
                    id="edit-ctaDescription"
                    placeholder="Enter CTA description"
                    value={editFormData.ctaDescription}
                    onChange={(e) => setEditFormData({ ...editFormData, ctaDescription: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-ctaButtonText" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Button Text</Label>
                  <Input
                    id="edit-ctaButtonText"
                    placeholder="Enter CTA button text"
                    value={editFormData.ctaButtonText}
                    onChange={(e) => setEditFormData({ ...editFormData, ctaButtonText: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-ctaButtonLink" className="text-neutral-700 dark:text-neutral-200 font-semibold">CTA Button Link</Label>
                  <Input
                    id="edit-ctaButtonLink"
                    placeholder="Enter CTA button link"
                    value={editFormData.ctaButtonLink}
                    onChange={(e) => setEditFormData({ ...editFormData, ctaButtonLink: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
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
}