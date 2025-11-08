// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
// import { authenticatedFetch } from '@/service/authenticator';

// interface CardData {
//   _id?: string;
//   type: string;
//   title: string;
//   description: string;
//   shortDescription?: string;
//   image: string;
//   icon: string;
//   features: string[];
//   buttonText: string;
//   buttonLink: string;
//   order: number;
//   isActive: boolean;
//   price: string;
//   duration: string;
//   tags: string[];
//   createdAt: string;
//   updatedAt: string;
// }

// export default function CardsPageUpdater() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [cards, setCards] = useState<CardData[]>([]);
//   const [formData, setFormData] = useState<CardData>({
//     type: 'home',
//     title: '',
//     description: '',
//     shortDescription: '',
//     image: '',
//     icon: '',
//     features: [],
//     buttonText: '',
//     buttonLink: '',
//     order: 0,
//     isActive: true,
//     price: '',
//     duration: '',
//     tags: [],
//     createdAt: '',
//     updatedAt: '',
//   });
//   const [editFormData, setEditFormData] = useState<CardData | null>(null);
//   const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState<'title' | 'order'>('order');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Fetch cards
//   const fetchCards = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards', {
//         method: 'GET',
//         headers: { 'Accept': '*/*' },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setCards(data);
//       } else {
//         setError('Failed to fetch cards');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Fetch cards error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submission for creating card
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     const payload = {
//       ...formData,
//       order: Number(formData.order),
//       features: formData.features.filter(f => f.trim()),
//       tags: formData.tags.filter(t => t.trim()),
//     };

//     try {
//       const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards', {
//         method: 'POST',
//         headers: {
//           'Accept': '*/*',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setFormData({
//           type: 'home',
//           title: '',
//           description: '',
//           shortDescription: '',
//           image: '',
//           icon: '',
//           features: [],
//           buttonText: '',
//           buttonLink: '',
//           order: 0,
//           isActive: true,
//           price: '',
//           duration: '',
//           tags: [],
//           createdAt: '',
//           updatedAt: '',
//         });
//         alert('Card created successfully!');
//         setShowForm(false);
//         fetchCards();
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to create card');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Create card error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle edit submission
//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     if (!editFormData?._id) return;

//     const payload = {
//       ...editFormData,
//       order: Number(editFormData.order),
//       features: editFormData.features.filter(f => f.trim()),
//       tags: editFormData.tags.filter(t => t.trim()),
//     };

//     try {
//       const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards/${editFormData._id}`, {
//         method: 'PUT',
//         headers: {
//           'Accept': '*/*',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setEditFormData(null);
//         setShowEdit(false);
//         alert('Card updated successfully!');
//         fetchCards();
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to update card');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Update card error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle deletion
//   const handleDelete = async (id?: string) => {
//     if (!id || !window.confirm('Are you sure you want to delete this card?')) return;

//     setError(null);
//     setLoading(true);
//     try {
//       const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards/${id}`, {
//         method: 'DELETE',
//         headers: { 'Accept': '*/*' },
//       });
//       if (response.ok) {
//         alert('Card deleted successfully!');
//         fetchCards();
//         if (cards.length <= itemsPerPage && currentPage > 1) {
//           setCurrentPage(currentPage - 1);
//         }
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to delete card');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Delete card error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle opening details modal
//   const handleOpenDetails = (card: CardData) => {
//     setSelectedCard(card);
//     setShowDetails(true);
//   };

//   // Handle opening edit modal
//   const handleOpenEdit = (card: CardData) => {
//     setEditFormData({ ...card });
//     setShowEdit(true);
//   };

//   // Add/remove features and tags
//   const addFeature = (data: CardData, setData: (d: CardData) => void) => {
//     setData({ ...data, features: [...data.features, ''] });
//   };

//   const removeFeature = (data: CardData, setData: (d: CardData) => void, index: number) => {
//     setData({ ...data, features: data.features.filter((_, i) => i !== index) });
//   };

//   const updateFeature = (data: CardData, setData: (d: CardData) => void, index: number, value: string) => {
//     const newFeatures = [...data.features];
//     newFeatures[index] = value;
//     setData({ ...data, features: newFeatures });
//   };

//   const addTag = (data: CardData, setData: (d: CardData) => void) => {
//     setData({ ...data, tags: [...data.tags, ''] });
//   };

//   const removeTag = (data: CardData, setData: (d: CardData) => void, index: number) => {
//     setData({ ...data, tags: data.tags.filter((_, i) => i !== index) });
//   };

//   const updateTag = (data: CardData, setData: (d: CardData) => void, index: number, value: string) => {
//     const newTags = [...data.tags];
//     newTags[index] = value;
//     setData({ ...data, tags: newTags });
//   };

//   // Filter and sort data
//   const filteredData = cards.filter(card =>
//     card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     card.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedData = [...filteredData].sort((a, b) => {
//     if (sortBy === 'title') {
//       const valA = a.title.toLowerCase();
//       const valB = b.title.toLowerCase();
//       return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
//     } else {
//       return sortOrder === 'asc' ? a.order - b.order : b.order - a.order;
//     }
//   });

//   // Pagination
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const paginatedData = sortedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Fetch data on mount
//   useEffect(() => {
//     fetchCards();
//   }, []);

//   return (
//     <section className="w-full min-h-screen p-6 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
//       <Card className="max-w-7xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
//         <CardHeader className="text-center py-8 border-b border-neutral-200 dark:border-neutral-700">
//           <CardTitle className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
//             {showForm ? 'Create Card' : 'Manage Cards'}
//           </CardTitle>
//           <p className="text-neutral-600 dark:text-neutral-300 mt-2">Professional dashboard for card management</p>
//         </CardHeader>
//         <CardContent className="px-8 pb-10">
//           {error && (
//             <Alert variant="destructive" className="mb-6 bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
//               <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
//             </Alert>
//           )}
//           <div className="flex justify-between items-center mb-6">
//             <Button
//               onClick={() => setShowForm(!showForm)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 h-12 shadow-md hover:scale-105 transition-all duration-200"
//               disabled={loading}
//             >
//               {showForm ? 'View Cards' : 'Create New Card'}
//             </Button>
//             {!showForm && (
//               <div className="flex items-center gap-4">
//                 <Select value={sortBy} onValueChange={(value: 'title' | 'order') => setSortBy(value)}>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Sort by" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="title">Title</SelectItem>
//                     <SelectItem value="order">Order</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Button
//                   variant="outline"
//                   onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                   className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full py-3 h-12"
//                   disabled={loading}
//                 >
//                   {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                 </Button>
//               </div>
//             )}
//           </div>
//           {!showForm && (
//             <div className="relative max-w-md mx-auto mb-6">
//               <Input
//                 placeholder="Search by title or type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 pl-10"
//                 disabled={loading}
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
//             </div>
//           )}
//           {showForm ? (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <Label htmlFor="type">Type</Label>
//                   <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Home">Home</SelectItem>
//                       <SelectItem value="about">About</SelectItem>
//                       <SelectItem value="service">Service</SelectItem>
//                       <SelectItem value="insight">Insight</SelectItem>
//                       <SelectItem value="products">Products</SelectItem>
//                       <SelectItem value="contact">Contact</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="title">Title</Label>
//                   <Input
//                     id="title"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3 md:col-span-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Input
//                     id="description"
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="shortDescription">Short Description</Label>
//                   <Input
//                     id="shortDescription"
//                     value={formData.shortDescription || ''}
//                     onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="image">Image URL</Label>
//                   <Input
//                     id="image"
//                     value={formData.image}
//                     onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="icon">Icon</Label>
//                   <Input
//                     id="icon"
//                     value={formData.icon}
//                     onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="buttonText">Button Text</Label>
//                   <Input
//                     id="buttonText"
//                     value={formData.buttonText}
//                     onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="buttonLink">Button Link</Label>
//                   <Input
//                     id="buttonLink"
//                     value={formData.buttonLink}
//                     onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="order">Order</Label>
//                   <Input
//                     id="order"
//                     type="number"
//                     value={formData.order}
//                     onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="price">Price</Label>
//                   <Input
//                     id="price"
//                     value={formData.price}
//                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="duration">Duration</Label>
//                   <Input
//                     id="duration"
//                     value={formData.duration}
//                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="isActive"
//                     checked={formData.isActive}
//                     onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
//                     disabled={loading}
//                   />
//                   <Label htmlFor="isActive">Is Active</Label>
//                 </div>
//               </div>
//               <div className="space-y-3 md:col-span-2">
//                 <Label>Features</Label>
//                 {formData.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <Input
//                       placeholder="Feature"
//                       value={feature}
//                       onChange={(e) => updateFeature(formData, setFormData, index, e.target.value)}
//                       disabled={loading}
//                     />
//                     <Button
//                       variant="ghost"
//                       onClick={() => removeFeature(formData, setFormData, index)}
//                       disabled={loading || formData.features.length === 1}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   onClick={() => addFeature(formData, setFormData)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
//                   disabled={loading}
//                 >
//                   <Plus className="h-4 w-4 mr-2" /> Add Feature
//                 </Button>
//               </div>
//               <div className="space-y-3 md:col-span-2">
//                 <Label>Tags</Label>
//                 {formData.tags.map((tag, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <Input
//                       placeholder="Tag"
//                       value={tag}
//                       onChange={(e) => updateTag(formData, setFormData, index, e.target.value)}
//                       disabled={loading}
//                     />
//                     <Button
//                       variant="ghost"
//                       onClick={() => removeTag(formData, setFormData, index)}
//                       disabled={loading || formData.tags.length === 1}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   onClick={() => addTag(formData, setFormData)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
//                   disabled={loading}
//                 >
//                   <Plus className="h-4 w-4 mr-2" /> Add Tag
//                 </Button>
//               </div>
//               <div className="flex justify-end gap-4 mt-6">
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-12"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12 shadow-md hover:scale-105 transition-all duration-200"
//                   disabled={loading}
//                 >
//                   {loading ? 'Loading...' : 'Create Card'}
//                 </Button>
//               </div>
//             </form>
//           ) : (
//             <>
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-neutral-50 dark:bg-neutral-800">
//                     <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Type</TableHead>
//                     <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Title</TableHead>
//                     <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Order</TableHead>
//                     <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Created At</TableHead>
//                     <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {paginatedData.length > 0 ? (
//                     paginatedData.map((card) => (
//                       <TableRow key={card._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
//                         <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">{card.type}</TableCell>
//                         <TableCell className="text-neutral-900 dark:text-neutral-100">{card.title}</TableCell>
//                         <TableCell className="text-neutral-900 dark:text-neutral-100">{card.order}</TableCell>
//                         <TableCell className="text-neutral-900 dark:text-neutral-100">{new Date(card.createdAt).toLocaleString()}</TableCell>
//                         <TableCell>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400">...</Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
//                               <DropdownMenuItem onClick={() => handleOpenDetails(card)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
//                                 View Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => handleOpenEdit(card)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
//                                 Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => handleDelete(card._id)} className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50">
//                                 Delete
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} className="h-24 text-center text-neutral-600 dark:text-neutral-300">
//                         {loading ? 'Loading...' : 'No cards found.'}
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//               {totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-4 mt-6">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage <= 1}
//                     className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10 flex items-center gap-2"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                     Previous
//                   </Button>
//                   <span className="text-sm text-neutral-600 dark:text-neutral-300">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages}
//                     className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10 flex items-center gap-2"
//                   >
//                     Next
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Details Modal */}
//       {showDetails && selectedCard && (
//         <Dialog open={showDetails} onOpenChange={setShowDetails}>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
//             <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-4 px-6">
//               <DialogTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{selectedCard.title}</DialogTitle>
//             </DialogHeader>
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Type</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.type}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Description</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.description}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Short Description</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.shortDescription}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Image</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.image}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Icon</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.icon}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Button Text</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.buttonText}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Button Link</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.buttonLink}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Order</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.order}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Active</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.isActive ? 'Yes' : 'No'}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Price</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.price}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Duration</h3>
//                   <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.duration}</p>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Features</h3>
//                 <ul className="list-disc pl-5">
//                   {selectedCard.features.map((feature, i) => (
//                     <li key={i}>{feature}</li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Tags</h3>
//                 <ul className="list-disc pl-5">
//                   {selectedCard.tags.map((tag, i) => (
//                     <li key={i}>{tag}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <DialogFooter className="p-4 border-t border-neutral-200 dark:border-neutral-700">
//               <Button
//                 onClick={() => setShowDetails(false)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12 shadow-md hover:scale-105 transition-all duration-200"
//               >
//                 Close
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}

//       {/* Edit Modal */}
//       {showEdit && editFormData && (
//         <Dialog open={showEdit} onOpenChange={setShowEdit}>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
//             <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-4 px-6">
//               <DialogTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">Edit Card</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-type">Type</Label>
//                   <Select value={editFormData.type} onValueChange={(value) => setEditFormData({ ...editFormData, type: value })}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="home">Home</SelectItem>
//                       <SelectItem value="about">About</SelectItem>
//                       <SelectItem value="service">Service</SelectItem>
//                       <SelectItem value="insight">Insight</SelectItem>
//                       <SelectItem value="products">Products</SelectItem>
//                       <SelectItem value="contact">Contact</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-title">Title</Label>
//                   <Input
//                     id="edit-title"
//                     value={editFormData.title}
//                     onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3 md:col-span-2">
//                   <Label htmlFor="edit-description">Description</Label>
//                   <Input
//                     id="edit-description"
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-shortDescription">Short Description</Label>
//                   <Input
//                     id="edit-shortDescription"
//                     value={editFormData.shortDescription || ''}
//                     onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-image">Image URL</Label>
//                   <Input
//                     id="edit-image"
//                     value={editFormData.image}
//                     onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-icon">Icon</Label>
//                   <Input
//                     id="edit-icon"
//                     value={editFormData.icon}
//                     onChange={(e) => setEditFormData({ ...editFormData, icon: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-buttonText">Button Text</Label>
//                   <Input
//                     id="edit-buttonText"
//                     value={editFormData.buttonText}
//                     onChange={(e) => setEditFormData({ ...editFormData, buttonText: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-buttonLink">Button Link</Label>
//                   <Input
//                     id="edit-buttonLink"
//                     value={editFormData.buttonLink}
//                     onChange={(e) => setEditFormData({ ...editFormData, buttonLink: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-order">Order</Label>
//                   <Input
//                     id="edit-order"
//                     type="number"
//                     value={editFormData.order}
//                     onChange={(e) => setEditFormData({ ...editFormData, order: Number(e.target.value) })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-price">Price</Label>
//                   <Input
//                     id="edit-price"
//                     value={editFormData.price}
//                     onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="edit-duration">Duration</Label>
//                   <Input
//                     id="edit-duration"
//                     value={editFormData.duration}
//                     onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="edit-isActive"
//                     checked={editFormData.isActive}
//                     onCheckedChange={(checked) => setEditFormData({ ...editFormData, isActive: !!checked })}
//                     disabled={loading}
//                   />
//                   <Label htmlFor="edit-isActive">Is Active</Label>
//                 </div>
//               </div>
//               <div className="space-y-3 md:col-span-2">
//                 <Label>Features</Label>
//                 {editFormData.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <Input
//                       placeholder="Feature"
//                       value={feature}
//                       onChange={(e) => updateFeature(editFormData, setEditFormData, index, e.target.value)}
//                       disabled={loading}
//                     />
//                     <Button
//                       variant="ghost"
//                       onClick={() => removeFeature(editFormData, setEditFormData, index)}
//                       disabled={loading || editFormData.features.length === 1}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   onClick={() => addFeature(editFormData, setEditFormData)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
//                   disabled={loading}
//                 >
//                   <Plus className="h-4 w-4 mr-2" /> Add Feature
//                 </Button>
//               </div>
//               <div className="space-y-3 md:col-span-2">
//                 <Label>Tags</Label>
//                 {editFormData.tags.map((tag, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <Input
//                       placeholder="Tag"
//                       value={tag}
//                       onChange={(e) => updateTag(editFormData, setEditFormData, index, e.target.value)}
//                       disabled={loading}
//                     />
//                     <Button
//                       variant="ghost"
//                       onClick={() => removeTag(editFormData, setEditFormData, index)}
//                       disabled={loading || editFormData.tags.length === 1}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   onClick={() => addTag(editFormData, setEditFormData)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
//                   disabled={loading}
//                 >
//                   <Plus className="h-4 w-4 mr-2" /> Add Tag
//                 </Button>
//               </div>
//               <div className="flex justify-end gap-4 mt-6">
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={() => setShowEdit(false)}
//                   className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-12"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12 shadow-md hover:scale-105 transition-all duration-200"
//                   disabled={loading}
//                 >
//                   {loading ? 'Loading...' : 'Save Changes'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       )}
//     </section>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { authenticatedFetch } from '@/service/authenticator';

interface CardData {
  _id?: string;
  type: string;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  icon: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
  price: string;
  duration: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function CardsPageUpdater() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [formData, setFormData] = useState<CardData>({
    type: 'home',
    title: '',
    description: '',
    shortDescription: '',
    image: '',
    icon: '',
    features: [],
    buttonText: '',
    buttonLink: '',
    order: 0,
    isActive: true,
    price: '',
    duration: '',
    tags: [],
    createdAt: '',
    updatedAt: '',
  });
  const [editFormData, setEditFormData] = useState<CardData | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'order'>('order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch cards
  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards', {
        method: 'GET',
        headers: { 'Accept': '*/*' },
      });
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      } else {
        setError('Failed to fetch cards');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Fetch cards error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for creating card
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...formData,
      order: Number(formData.order),
      features: formData.features.filter(f => f.trim()),
      tags: formData.tags.filter(t => t.trim()),
    };

    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormData({
          type: 'home',
          title: '',
          description: '',
          shortDescription: '',
          image: '',
          icon: '',
          features: [],
          buttonText: '',
          buttonLink: '',
          order: 0,
          isActive: true,
          price: '',
          duration: '',
          tags: [],
          createdAt: '',
          updatedAt: '',
        });
        alert('Card created successfully!');
        setShowForm(false);
        fetchCards();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create card');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Create card error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!editFormData?._id) return;

    const payload = {
      ...editFormData,
      order: Number(editFormData.order),
      features: editFormData.features.filter(f => f.trim()),
      tags: editFormData.tags.filter(t => t.trim()),
    };

    try {
      const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards/${editFormData._id}`, {
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
        alert('Card updated successfully!');
        fetchCards();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update card');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Update card error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion
  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Are you sure you want to delete this card?')) return;

    setError(null);
    setLoading(true);
    try {
      const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/cards/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': '*/*' },
      });
      if (response.ok) {
        alert('Card deleted successfully!');
        fetchCards();
        if (cards.length <= itemsPerPage && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete card');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Delete card error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle opening details modal
  const handleOpenDetails = (card: CardData) => {
    setSelectedCard(card);
    setShowDetails(true);
  };

  // Handle opening edit modal
  const handleOpenEdit = (card: CardData) => {
    setEditFormData({ ...card });
    setShowEdit(true);
  };

  // Add/remove features and tags
  const addFeature = (data: CardData, setData: (d: CardData) => void) => {
    setData({ ...data, features: [...data.features, ''] });
  };

  const removeFeature = (data: CardData, setData: (d: CardData) => void, index: number) => {
    setData({ ...data, features: data.features.filter((_, i) => i !== index) });
  };

  const updateFeature = (data: CardData, setData: (d: CardData) => void, index: number, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = value;
    setData({ ...data, features: newFeatures });
  };

  const addTag = (data: CardData, setData: (d: CardData) => void) => {
    setData({ ...data, tags: [...data.tags, ''] });
  };

  const removeTag = (data: CardData, setData: (d: CardData) => void, index: number) => {
    setData({ ...data, tags: data.tags.filter((_, i) => i !== index) });
  };

  const updateTag = (data: CardData, setData: (d: CardData) => void, index: number, value: string) => {
    const newTags = [...data.tags];
    newTags[index] = value;
    setData({ ...data, tags: newTags });
  };

  // Filter and sort data
  const filteredData = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'title') {
      const valA = a.title.toLowerCase();
      const valB = b.title.toLowerCase();
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return sortOrder === 'asc' ? a.order - b.order : b.order - a.order;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <section className="w-full min-h-screen p-6 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
      <Card className="max-w-7xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
        <CardHeader className="text-center py-8 border-b border-neutral-200 dark:border-neutral-700">
          <CardTitle className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            {showForm ? 'Create Card' : 'Manage Cards'}
          </CardTitle>
          <p className="text-neutral-600 dark:text-neutral-300 mt-2">Professional dashboard for card management</p>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
              <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 h-12 shadow-md hover:scale-105 transition-all duration-200"
              disabled={loading}
            >
              {showForm ? 'View Cards' : 'Create New Card'}
            </Button>
            {!showForm && (
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: 'title' | 'order') => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="order">Order</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full py-3 h-12"
                  disabled={loading}
                >
                  {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
          {!showForm && (
            <div className="relative max-w-md mx-auto mb-6">
              <Input
                placeholder="Search by title or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 pl-10"
                disabled={loading}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
          )}
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="insight">Insight</SelectItem>
                      <SelectItem value="products">Products</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription || ''}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                    disabled={loading}
                  />
                  <Label htmlFor="isActive">Is Active</Label>
                </div>
              </div>
              <div className="space-y-3 md:col-span-2">
                <Label>Features</Label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Feature"
                      value={feature}
                      onChange={(e) => updateFeature(formData, setFormData, index, e.target.value)}
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeFeature(formData, setFormData, index)}
                      disabled={loading || formData.features.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addFeature(formData, setFormData)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Feature
                </Button>
              </div>
              <div className="space-y-3 md:col-span-2">
                <Label>Tags</Label>
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Tag"
                      value={tag}
                      onChange={(e) => updateTag(formData, setFormData, index, e.target.value)}
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeTag(formData, setFormData, index)}
                      disabled={loading || formData.tags.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addTag(formData, setFormData)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Tag
                </Button>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
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
                  {loading ? 'Loading...' : 'Create Card'}
                </Button>
              </div>
            </form>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-neutral-50 dark:bg-neutral-800">
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Type</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Title</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Order</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Created At</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((card) => (
                      <TableRow key={card._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">{card.type}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{card.title}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{card.order}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{new Date(card.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400">...</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                              <DropdownMenuItem onClick={() => handleOpenDetails(card)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenEdit(card)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(card._id)} className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50">
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
                        {loading ? 'Loading...' : 'No cards found.'}
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
                    disabled={currentPage <= 1}
                    className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10 flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full h-10 flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      {showDetails && selectedCard && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
            <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-4 px-6">
              <DialogTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{selectedCard.title}</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Type</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.type}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Description</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.description}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Short Description</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.shortDescription}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Image</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.image}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Icon</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.icon}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Button Text</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.buttonText}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Button Link</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.buttonLink}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Order</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.order}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Active</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.isActive ? 'Yes' : 'No'}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Price</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.price}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Duration</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{selectedCard.duration}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Features</h3>
                <ul className="list-disc pl-5">
                  {selectedCard.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Tags</h3>
                <ul className="list-disc pl-5">
                  {selectedCard.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                type="button"
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
              <DialogTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">Edit Card</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select value={editFormData.type} onValueChange={(value) => setEditFormData({ ...editFormData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="insight">Insight</SelectItem>
                      <SelectItem value="products">Products</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-shortDescription">Short Description</Label>
                  <Input
                    id="edit-shortDescription"
                    value={editFormData.shortDescription || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    value={editFormData.image}
                    onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-icon">Icon</Label>
                  <Input
                    id="edit-icon"
                    value={editFormData.icon}
                    onChange={(e) => setEditFormData({ ...editFormData, icon: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-buttonText">Button Text</Label>
                  <Input
                    id="edit-buttonText"
                    value={editFormData.buttonText}
                    onChange={(e) => setEditFormData({ ...editFormData, buttonText: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-buttonLink">Button Link</Label>
                  <Input
                    id="edit-buttonLink"
                    value={editFormData.buttonLink}
                    onChange={(e) => setEditFormData({ ...editFormData, buttonLink: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-order">Order</Label>
                  <Input
                    id="edit-order"
                    type="number"
                    value={editFormData.order}
                    onChange={(e) => setEditFormData({ ...editFormData, order: Number(e.target.value) })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-price">Price</Label>
                  <Input
                    id="edit-price"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input
                    id="edit-duration"
                    value={editFormData.duration}
                    onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-isActive"
                    checked={editFormData.isActive}
                    onCheckedChange={(checked) => setEditFormData({ ...editFormData, isActive: !!checked })}
                    disabled={loading}
                  />
                  <Label htmlFor="edit-isActive">Is Active</Label>
                </div>
              </div>
              <div className="space-y-3 md:col-span-2">
                <Label>Features</Label>
                {editFormData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Feature"
                      value={feature}
                      onChange={(e) => updateFeature(editFormData, setEditFormData, index, e.target.value)}
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeFeature(editFormData, setEditFormData, index)}
                      disabled={loading || editFormData.features.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addFeature(editFormData, setEditFormData)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Feature
                </Button>
              </div>
              <div className="space-y-3 md:col-span-2">
                <Label>Tags</Label>
                {editFormData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Tag"
                      value={tag}
                      onChange={(e) => updateTag(editFormData, setEditFormData, index, e.target.value)}
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeTag(editFormData, setEditFormData, index)}
                      disabled={loading || editFormData.tags.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addTag(editFormData, setEditFormData)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Tag
                </Button>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
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
                  {loading ? 'Loading...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}