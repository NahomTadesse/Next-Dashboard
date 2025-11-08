


// 'use client';

// import { useState, useEffect, FC } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
// import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
// import { authenticatedFetch } from '@/service/authenticator';
// import { format } from 'date-fns';
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
// import React from 'react';

// interface Address {
//   street: string | null;
//   city: string;
//   state: string | null;
//   zipCode: string | null;
//   country: string;
//   region: string;
//   zone: string | null;
//   woreda: string;
//   kebele: string | null;
//   additionalInfo: string;
//   district: string | null;
//   houseNumber: string;
//   subcity: string;
// }

// interface Store {
//   id: string;
//   name: string;
//   description: string;
//   approved: boolean;
//   individual: boolean;
//   ownerId: string;
//   ownerEmail: string;
//   status: string;
//   address: Address;
//   createdAt?: string;
// }

// const RegisterStorePage: FC = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showList, setShowList] = useState(false);
//   const [stores, setStores] = useState<Store[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [showDetailsForId, setShowDetailsForId] = useState<string | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedStore, setSelectedStore] = useState<Store | null>(null);
//   const storesPerPage = 7;
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     individual: false,
//     addressDTO: {
//       street: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       country: '',
//       region: '',
//       zone: '',
//       woreda: '',
//       kebele: '',
//       additionalInfo: '',
//       district: '',
//       houseNumber: '',
//       subcity: '',
//     },
//   });
//   const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [updateFormData, setUpdateFormData] = useState({
//     newName: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       country: '',
//       region: '',
//       zone: '',
//       woreda: '',
//       kebele: '',
//       additionalInfo: '',
//       district: '',
//       houseNumber: '',
//       subcity: '',
//     },
//   });

//   useEffect(() => {
//     if (showList) {
//       fetchStores();
//     }
//   }, [showList]);

//   const fetchStores = async () => {
//     setLoading(true);
//     try {
//       const response = await authenticatedFetch('https://fashion-api.addispages.com/api/v1/store/all-store', {
//         method: 'GET',
//         headers: { 'Accept': '*/*' },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setStores(Array.isArray(data.data) ? data.data : []);
//       } else {
//         setError('Failed to fetch stores');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Fetch stores error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     if (!formData.name) {
//       setError('Store name is required');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await authenticatedFetch('https://fashion-api.addispages.com/api/v1/store/register', {
//         method: 'POST',
//         headers: {
//           'Accept': '*/*',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           description: formData.description,
//           individual: formData.individual,
//           addressDTO: {
//             street: formData.addressDTO.street || null,
//             city: formData.addressDTO.city,
//             state: formData.addressDTO.state || null,
//             zipCode: formData.addressDTO.zipCode || null,
//             country: formData.addressDTO.country,
//             region: formData.addressDTO.region,
//             zone: formData.addressDTO.zone || null,
//             woreda: formData.addressDTO.woreda,
//             kebele: formData.addressDTO.kebele || null,
//             additionalInfo: formData.addressDTO.additionalInfo,
//             district: formData.addressDTO.district || null,
//             houseNumber: formData.addressDTO.houseNumber,
//             subcity: formData.addressDTO.subcity,
//           },
//         }),
//       });

//       if (response.ok) {
//         setFormData({
//           name: '',
//           description: '',
//           individual: false,
//           addressDTO: {
//             street: '',
//             city: '',
//             state: '',
//             zipCode: '',
//             country: '',
//             region: '',
//             zone: '',
//             woreda: '',
//             kebele: '',
//             additionalInfo: '',
//             district: '',
//             houseNumber: '',
//             subcity: '',
//           },
//         });
//         setError(null);
//         alert('Store registered successfully!');
//         setShowList(true);
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to register store');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Store registration error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async () => {
//     setError(null);
//     setLoading(true);

//     try {
//       if (updateFormData.newName && updateFormData.newName !== selectedStore?.name) {
//         const nameResponse = await authenticatedFetch('https://fashion-api.addispages.com/api/v1/store/update-name', {
//           method: 'POST',
//           headers: {
//             'Accept': '*/*',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             storeId: selectedStore?.id,
//             newName: updateFormData.newName,
//           }),
//         });

//         if (!nameResponse.ok) {
//           const data = await nameResponse.json();
//           setError(data.message || 'Failed to update store name');
//           setLoading(false);
//           return;
//         }
//       }

//       const hasAddressChanges = Object.values(updateFormData.address).some(
//         (value) => value !== '' && value !== null
//       );
//       if (hasAddressChanges) {
//         const addressResponse = await authenticatedFetch('https://fashion-api.addispages.com/api/v1/store/update-address', {
//           method: 'POST',
//           headers: {
//             'Accept': '*/*',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             storeId: selectedStore?.id,
//             addressDTO: {
//               street: updateFormData.address.street || null,
//               city: updateFormData.address.city,
//               state: updateFormData.address.state || null,
//               zipCode: updateFormData.address.zipCode || null,
//               country: updateFormData.address.country,
//               region: updateFormData.address.region,
//               zone: updateFormData.address.zone || null,
//               woreda: updateFormData.address.woreda,
//               kebele: updateFormData.address.kebele || null,
//               additionalInfo: updateFormData.address.additionalInfo,
//               district: updateFormData.address.district || null,
//               houseNumber: updateFormData.address.houseNumber,
//               subcity: updateFormData.address.subcity,
//             },
//           }),
//         });

//         if (!addressResponse.ok) {
//           const data = await addressResponse.json();
//           setError(data.message || 'Failed to update store address');
//           setLoading(false);
//           return;
//         }
//       }

//       setUpdateDialogOpen(false);
//       setUpdateFormData({
//         newName: '',
//         address: {
//           street: '',
//           city: '',
//           state: '',
//           zipCode: '',
//           country: '',
//           region: '',
//           zone: '',
//           woreda: '',
//           kebele: '',
//           additionalInfo: '',
//           district: '',
//           houseNumber: '',
//           subcity: '',
//         },
//       });
//       alert('Store updated successfully!');
//       fetchStores();
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Update store error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await authenticatedFetch(`https://fashion-api.addispages.com/api/v1/store/${selectedStore?.id}`, {
//         method: 'DELETE',
//         headers: { 'Accept': '*/*' },
//       });

//       if (response.ok) {
//         setDeleteDialogOpen(false);
//         setSelectedStore(null);
//         alert('Store deleted successfully!');
//         fetchStores();
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to delete store');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Delete store error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openUpdateDialog = (store: Store) => {
//     setSelectedStore(store);
//     setUpdateFormData({
//       newName: store.name,
//       address: {
//         street: store.address.street || '',
//         city: store.address.city || '',
//         state: store.address.state || '',
//         zipCode: store.address.zipCode || '',
//         country: store.address.country || '',
//         region: store.address.region || '',
//         zone: store.address.zone || '',
//         woreda: store.address.woreda || '',
//         kebele: store.address.kebele || '',
//         additionalInfo: store.address.additionalInfo || '',
//         district: store.address.district || '',
//         houseNumber: store.address.houseNumber || '',
//         subcity: store.address.subcity || '',
//       },
//     });
//     setUpdateDialogOpen(true);
//   };

//   const openDeleteDialog = (store: Store) => {
//     setSelectedStore(store);
//     setDeleteDialogOpen(true);
//   };

//   const handleOpenDetails = (store: Store) => {
//     setSelectedStore(store);
//     setShowDetails(true);
//   };

//   const toggleDetails = (store: Store) => {
//     setSelectedStore(store);
//     setShowDetailsForId(showDetailsForId === store.id ? null : store.id);
//   };

//   const filteredStores = Array.isArray(stores)
//     ? stores.filter(
//         (store) =>
//           store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (store.description || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   const sortedStores = [...filteredStores].sort((a, b) => {
//     const nameA = a.name.toLowerCase();
//     const nameB = b.name.toLowerCase();
//     return sortOrder === 'asc' ? (nameA > nameB ? 1 : -1) : (nameA < nameB ? 1 : -1);
//   });

//   const totalPages = Math.ceil(sortedStores.length / storesPerPage);
//   const startIndex = (currentPage - 1) * storesPerPage;
//   const paginatedStores = sortedStores.slice(startIndex, startIndex + storesPerPage);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setShowDetailsForId(null);
//   };

//   return (
//     <Card className="shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-semibold text-gray-800">
//           {showList ? 'Manage Stores' : 'Register Store'}
//         </CardTitle>
//         <div className="flex flex-col space-y-4">
//           <div className="flex justify-between items-center">
//             <Button
//               onClick={() => setShowList(!showList)}
//               className="bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               {showList ? 'Add New Store' : 'View Stores'}
//             </Button>
//             {showList && (
//               <Button
//                 variant="outline"
//                 onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                 className="border-gray-300 text-gray-600 hover:bg-gray-100"
//               >
//                 Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
//               </Button>
//             )}
//           </div>
//           {showList && (
//             <div className="relative flex-1">
//               <Input
//                 placeholder="Search by name or description..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-gray-300 focus:ring-blue-500"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             </div>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         {error && (
//           <div className="mb-4 text-red-600">{error}</div>
//         )}
//         {loading && (
//           <div className="text-center">Loading...</div>
//         )}
//         {showList ? (
//           <>
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className="text-gray-600">Name</TableHead>
//                   <TableHead className="text-gray-600">Description</TableHead>
//                   <TableHead className="text-gray-600">Address</TableHead>
//                   <TableHead className="text-gray-600">Owner Email</TableHead>
//                   <TableHead className="text-gray-600">Status</TableHead>
//                   <TableHead className="text-gray-600">Details</TableHead>
//                   <TableHead className="text-gray-600">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginatedStores.length > 0 ? (
//                   paginatedStores.map((store) => (
//                     <React.Fragment key={store.id}>
//                       <TableRow className="hover:bg-gray-50">
//                         <TableCell className="font-medium">{store.name}</TableCell>
//                         <TableCell>{store.description || 'N/A'}</TableCell>
//                         <TableCell>
//                           {store.address.city || store.address.subcity || store.address.country
//                             ? `${store.address.city || ''} ${store.address.subcity || ''}, ${store.address.country || ''}`.trim()
//                             : 'N/A'}
//                         </TableCell>
//                         <TableCell>{store.ownerEmail || 'N/A'}</TableCell>
//                         <TableCell>{store.status}</TableCell>
//                         <TableCell>
//                           <Button
//                             variant="link"
//                             className="flex items-center gap-1 p-0 text-blue-600 hover:text-blue-800"
//                             onClick={() => toggleDetails(store)}
//                           >
//                             View Details
//                             {showDetailsForId === store.id ? (
//                               <ChevronUp className="h-4 w-4" />
//                             ) : (
//                               <ChevronDown className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </TableCell>
//                         <TableCell>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" className="text-gray-600 hover:text-gray-800">...</Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                               <DropdownMenuItem onClick={() => handleOpenDetails(store)}>
//                                 View Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => openUpdateDialog(store)}>
//                                 Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => openDeleteDialog(store)} className="text-red-600">
//                                 Delete
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                       {showDetailsForId === store.id && (
//                         <TableRow>
//                           <TableCell colSpan={7} className="bg-gray-50 p-4">
//                             <div className="space-y-4">
//                               <div>
//                                 <h3 className="font-medium text-gray-700">Description</h3>
//                                 <p className="text-gray-600">{store.description || 'None'}</p>
//                               </div>
//                               <div>
//                                 <h3 className="font-medium text-gray-700">Address</h3>
//                                 <p className="text-gray-600">
//                                   {store.address.city || store.address.subcity || store.address.country
//                                     ? `${store.address.city || ''} ${store.address.subcity || ''}, ${store.address.country || ''}`.trim()
//                                     : 'None'}
//                                 </p>
//                               </div>
//                               <div>
//                                 <h3 className="font-medium text-gray-700">Owner Email</h3>
//                                 <p className="text-gray-600">{store.ownerEmail || 'None'}</p>
//                               </div>
//                               <div>
//                                 <h3 className="font-medium text-gray-700">Individual Store</h3>
//                                 <p className="text-gray-600">{store.individual ? 'Yes' : 'No'}</p>
//                               </div>
//                               <div>
//                                 <h3 className="font-medium text-gray-700">Approved</h3>
//                                 <p className="text-gray-600">{store.approved ? 'Yes' : 'No'}</p>
//                               </div>
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </React.Fragment>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={7} className="h-24 text-center">
//                       {loading ? 'Loading...' : 'No stores found.'}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center gap-2 mt-6">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="border-gray-300 text-gray-600 hover:bg-gray-100"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <Button
//                     key={page}
//                     variant={currentPage === page ? 'default' : 'outline'}
//                     size="sm"
//                     onClick={() => handlePageChange(page)}
//                     className={currentPage === page ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}
//                   >
//                     {page}
//                   </Button>
//                 ))}
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="border-gray-300 text-gray-600 hover:bg-gray-100"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//                 <span className="text-sm text-gray-600">
//                   Page {currentPage} of {totalPages}
//                 </span>
//               </div>
//             )}
//           </>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Store Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="Enter store name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="border-gray-300 focus:ring-blue-500"
//                   required
//                   disabled={loading}
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Input
//                   id="description"
//                   placeholder="Enter description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="street">Street</Label>
//                 <Input
//                   id="street"
//                   placeholder="Enter street"
//                   value={formData.addressDTO.street}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, street: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="city">City</Label>
//                 <Input
//                   id="city"
//                   placeholder="Enter city"
//                   value={formData.addressDTO.city}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, city: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="state">State</Label>
//                 <Input
//                   id="state"
//                   placeholder="Enter state"
//                   value={formData.addressDTO.state}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, state: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="zipCode">Zip Code</Label>
//                 <Input
//                   id="zipCode"
//                   placeholder="Enter zip code"
//                   value={formData.addressDTO.zipCode}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, zipCode: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="country">Country</Label>
//                 <Input
//                   id="country"
//                   placeholder="Enter country"
//                   value={formData.addressDTO.country}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, country: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="region">Region</Label>
//                 <Input
//                   id="region"
//                   placeholder="Enter region"
//                   value={formData.addressDTO.region}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, region: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="zone">Zone</Label>
//                 <Input
//                   id="zone"
//                   placeholder="Enter zone"
//                   value={formData.addressDTO.zone}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, zone: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="woreda">Woreda</Label>
//                 <Input
//                   id="woreda"
//                   placeholder="Enter woreda"
//                   value={formData.addressDTO.woreda}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, woreda: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="kebele">Kebele</Label>
//                 <Input
//                   id="kebele"
//                   placeholder="Enter kebele"
//                   value={formData.addressDTO.kebele}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, kebele: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="additionalInfo">Additional Info</Label>
//                 <Input
//                   id="additionalInfo"
//                   placeholder="Enter additional info"
//                   value={formData.addressDTO.additionalInfo}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, additionalInfo: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="district">District</Label>
//                 <Input
//                   id="district"
//                   placeholder="Enter district"
//                   value={formData.addressDTO.district}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, district: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="houseNumber">House Number</Label>
//                 <Input
//                   id="houseNumber"
//                   placeholder="Enter house number"
//                   value={formData.addressDTO.houseNumber}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, houseNumber: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="subcity">Subcity</Label>
//                 <Input
//                   id="subcity"
//                   placeholder="Enter subcity"
//                   value={formData.addressDTO.subcity}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       addressDTO: { ...formData.addressDTO, subcity: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="individual"
//                   checked={formData.individual}
//                   onCheckedChange={(checked) => setFormData({ ...formData, individual: !!checked })}
//                   disabled={loading}
//                 />
//                 <Label htmlFor="individual">Individual Store</Label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button
//                 variant="outline"
//                 type="button"
//                 onClick={() => setShowList(true)}
//                 disabled={loading}
//                 className="border-gray-300 text-gray-600 hover:bg-gray-100"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {loading ? 'Registering...' : 'Register Store'}
//               </Button>
//             </div>
//           </form>
//         )}
//       </CardContent>

//       {/* Details Dialog */}
//       {showDetails && selectedStore && (
//         <Dialog open={showDetails} onOpenChange={setShowDetails}>
//           <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg">
//             <DialogHeader className="border-b border-gray-200 py-4 px-6">
//               <VisuallyHidden>
//                 <DialogTitle>Store Details: {selectedStore?.name}</DialogTitle>
//                 <DialogDescription>
//                   Detailed information about the store, including description, address, and ownership details.
//                 </DialogDescription>
//               </VisuallyHidden>
//               <h2 className="text-2xl font-semibold text-gray-900">{selectedStore?.name}</h2>
//             </DialogHeader>
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-700">Description</h3>
//                   <p className="text-gray-600 text-sm">{selectedStore?.description || 'None'}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-700">Address</h3>
//                   <p className="text-gray-600 text-sm">
//                     {selectedStore?.address.city || selectedStore?.address.subcity || selectedStore?.address.country
//                       ? `${selectedStore?.address.city || ''} ${selectedStore?.address.subcity || ''}, ${selectedStore?.address.country || ''}`.trim()
//                       : 'N/A'}
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-700">Owner Email</h3>
//                   <p className="text-gray-600 text-sm">{selectedStore?.ownerEmail || 'N/A'}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-700">Individual Store</h3>
//                   <p className="text-gray-600 text-sm">{selectedStore?.individual ? 'Yes' : 'No'}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-700">Approved</h3>
//                   <p className="text-gray-600 text-sm">{selectedStore?.approved ? 'Yes' : 'No'}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-700">Status</h3>
//                   <p className="text-gray-600 text-sm">{selectedStore?.status}</p>
//                 </div>
//               </div>
//             </div>
//             <DialogFooter className="p-4 border-t border-gray-200">
//               <Button
//                 onClick={() => setShowDetails(false)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
//               >
//                 Close
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}

//       {/* Update Dialog */}
//       <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
//         <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <VisuallyHidden>
//               <DialogTitle>Edit Store</DialogTitle>
//               <DialogDescription>Update the store's name and address details.</DialogDescription>
//             </VisuallyHidden>
//             <h2 className="text-xl font-semibold text-gray-900">Edit Store</h2>
//           </DialogHeader>
//           {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="newName">Store Name</Label>
//               <Input
//                 id="newName"
//                 placeholder="Enter new store name"
//                 value={updateFormData.newName}
//                 onChange={(e) => setUpdateFormData({ ...updateFormData, newName: e.target.value })}
//                 className="border-gray-300 focus:ring-blue-500"
//                 disabled={loading}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="street">Street</Label>
//                 <Input
//                   id="street"
//                   placeholder="Enter street"
//                   value={updateFormData.address.street}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, street: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="city">City</Label>
//                 <Input
//                   id="city"
//                   placeholder="Enter city"
//                   value={updateFormData.address.city}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, city: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="state">State</Label>
//                 <Input
//                   id="state"
//                   placeholder="Enter state"
//                   value={updateFormData.address.state}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, state: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="zipCode">Zip Code</Label>
//                 <Input
//                   id="zipCode"
//                   placeholder="Enter zip code"
//                   value={updateFormData.address.zipCode}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, zipCode: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="country">Country</Label>
//                 <Input
//                   id="country"
//                   placeholder="Enter country"
//                   value={updateFormData.address.country}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, country: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="region">Region</Label>
//                 <Input
//                   id="region"
//                   placeholder="Enter region"
//                   value={updateFormData.address.region}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, region: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="zone">Zone</Label>
//                 <Input
//                   id="zone"
//                   placeholder="Enter zone"
//                   value={updateFormData.address.zone}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, zone: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="woreda">Woreda</Label>
//                 <Input
//                   id="woreda"
//                   placeholder="Enter woreda"
//                   value={updateFormData.address.woreda}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, woreda: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="kebele">Kebele</Label>
//                 <Input
//                   id="kebele"
//                   placeholder="Enter kebele"
//                   value={updateFormData.address.kebele}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, kebele: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="additionalInfo">Additional Info</Label>
//                 <Input
//                   id="additionalInfo"
//                   placeholder="Enter additional info"
//                   value={updateFormData.address.additionalInfo}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, additionalInfo: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="district">District</Label>
//                 <Input
//                   id="district"
//                   placeholder="Enter district"
//                   value={updateFormData.address.district}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, district: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="houseNumber">House Number</Label>
//                 <Input
//                   id="houseNumber"
//                   placeholder="Enter house number"
//                   value={updateFormData.address.houseNumber}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, houseNumber: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="subcity">Subcity</Label>
//                 <Input
//                   id="subcity"
//                   placeholder="Enter subcity"
//                   value={updateFormData.address.subcity}
//                   onChange={(e) =>
//                     setUpdateFormData({
//                       ...updateFormData,
//                       address: { ...updateFormData.address, subcity: e.target.value },
//                     })
//                   }
//                   className="border-gray-300 focus:ring-blue-500"
//                   disabled={loading}
//                 />
//               </div>
//             </div>
//           </div>
//           <DialogFooter className="p-4 border-t border-gray-200">
//             <Button
//               variant="outline"
//               onClick={() => setUpdateDialogOpen(false)}
//               className="border-gray-300 text-gray-600 hover:bg-gray-100"
//               disabled={loading}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleUpdate}
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               {loading ? 'Updating...' : 'Save Changes'}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <VisuallyHidden>
//               <DialogTitle>Delete Store</DialogTitle>
//               <DialogDescription>Confirm deletion of the store.</DialogDescription>
//             </VisuallyHidden>
//             <h2 className="text-xl font-semibold text-gray-900">Delete Store</h2>
//           </DialogHeader>
//           <p className="text-gray-600">Are you sure you want to delete the store "{selectedStore?.name}"? This action cannot be undone.</p>
//           <DialogFooter className="p-4 border-t border-gray-200">
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//               className="border-gray-300 text-gray-600 hover:bg-gray-100"
//               disabled={loading}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleDelete}
//               disabled={loading}
//               className="bg-red-600 hover:bg-red-700 text-white"
//             >
//               {loading ? 'Deleting...' : 'Delete'}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default RegisterStorePage;


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

interface Author {
  _id: string;
  username: string;
}

interface Insight {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: string;
  tags: string[];
  readTime: number;
  isPublished: boolean;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

const InsightPage: FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: '',
    tags: [''],
    readTime: 0,
    metaTitle: '',
    metaDescription: '',
    isFeatured: true,
    isPublished: true,
  });
  const [editFormData, setEditFormData] = useState<Insight | null>(null);
  const insightsPerPage = 7;

  // Fetch insights
  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/insights', {
        method: 'GET',
        headers: { 'Accept': '*/*' },
      });
      if (response.ok) {
        const { data } = await response.json();
        setInsights(Array.isArray(data) ? data : []);
      } else {
        setError('Failed to fetch insights');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Fetch insights error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for creating an insight
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...formData,
      readTime: Number(formData.readTime),
      tags: formData.tags.filter(tag => tag.trim()),
    };

    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/insights', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          coverImage: '',
          category: '',
          tags: [''],
          readTime: 0,
          metaTitle: '',
          metaDescription: '',
          isFeatured: true,
          isPublished: true,
        });
        alert('Insight created successfully!');
        setShowForm(false);
        fetchInsights();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create insight');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Insight creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for editing an insight
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!editFormData) return;

    const payload = {
      ...editFormData,
      readTime: Number(editFormData.readTime),
      tags: editFormData.tags.filter(tag => tag.trim()),
    };

    try {
      const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/insights/${editFormData._id}`, {
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
        alert('Insight updated successfully!');
        fetchInsights();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update insight');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Insight update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle insight deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this insight?')) {
      setError(null);
      setLoading(true);
      try {
        const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/insights/${id}`, {
          method: 'DELETE',
          headers: { 'Accept': '*/*' },
        });
        if (response.ok) {
          alert('Insight deleted successfully!');
          fetchInsights();
          if (insights.length <= insightsPerPage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to delete insight');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
        console.error('Delete insight error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle opening details modal
  const handleOpenDetails = (insight: Insight) => {
    setSelectedInsight(insight);
    setShowDetails(true);
  };

  // Handle opening edit modal
  const handleOpenEdit = (insight: Insight) => {
    setEditFormData({ ...insight });
    setShowEdit(true);
  };

  // Handle dynamic tags
  const addTag = (isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      tags: [...prev.tags, ''],
    }));
  };

  const removeTag = (index: number, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const updateTag = (index: number, value: string, isUpdate: boolean = false) => {
    const setData = isUpdate ? setEditFormData : setFormData;
    setData(prev => ({
      ...prev,
      tags: prev.tags.map((t, i) => (i === index ? value : t)),
    }));
  };

  // Filter and sort insights
  const filteredInsights = insights.filter(insight =>
    insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInsights = [...filteredInsights].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return sortOrder === 'asc' ? (titleA > titleB ? 1 : -1) : (titleA < titleB ? 1 : -1);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedInsights.length / insightsPerPage);
  const paginatedInsights = sortedInsights.slice(
    (currentPage - 1) * insightsPerPage,
    currentPage * insightsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch insights on mount
  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <section className="w-full min-h-screen p-6 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
      <Card className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            {showForm ? 'Create Insight' : 'Manage Insights'}
          </CardTitle>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 h-12 shadow-md hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {showForm ? 'View Insights' : 'Add New Insight'}
              </Button>
              {!showForm && (
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full py-3 h-12"
                  disabled={loading}
                >
                  Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                  {sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>
            {!showForm && (
              <div className="relative max-w-md mx-auto">
                <Input
                  placeholder="Search by title or excerpt..."
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
                  <Label htmlFor="title" className="text-neutral-700 dark:text-neutral-200 font-semibold">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter insight title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="slug" className="text-neutral-700 dark:text-neutral-200 font-semibold">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="Enter insight slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="excerpt" className="text-neutral-700 dark:text-neutral-200 font-semibold">Excerpt</Label>
                  <Input
                    id="excerpt"
                    placeholder="Enter short excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="content" className="text-neutral-700 dark:text-neutral-200 font-semibold">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter full content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl"
                    rows={6}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="coverImage" className="text-neutral-700 dark:text-neutral-200 font-semibold">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    placeholder="Enter cover image URL"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-neutral-700 dark:text-neutral-200 font-semibold">Category</Label>
                  <Input
                    id="category"
                    placeholder="Enter category (e.g., technology)"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="readTime" className="text-neutral-700 dark:text-neutral-200 font-semibold">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    placeholder="Enter read time"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: Number(e.target.value) })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="metaTitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    placeholder="Enter meta title"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="metaDescription" className="text-neutral-700 dark:text-neutral-200 font-semibold">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Enter meta description"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl"
                    rows={4}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="isPublished" className="text-neutral-700 dark:text-neutral-200 font-semibold">Published</Label>
                  <select
                    id="isPublished"
                    value={formData.isPublished.toString()}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'true' })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 w-full px-3"
                    disabled={loading}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Tags</Label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Enter tag"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                        required
                        disabled={loading}
                      />
                      {formData.tags.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeTag(index)}
                          className="text-red-600 hover:text-red-700"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addTag()}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Tag
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
                    'Create Insight'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-neutral-50 dark:bg-neutral-800">
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Title</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Excerpt</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Category</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Status</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Published At</TableHead>
                    <TableHead className="text-neutral-700 dark:text-neutral-200 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInsights.length > 0 ? (
                    paginatedInsights.map((insight) => (
                      <TableRow key={insight._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">{insight.title}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{insight.excerpt}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{insight.category}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{insight.isPublished ? 'Published' : 'Draft'}</TableCell>
                        <TableCell className="text-neutral-900 dark:text-neutral-100">{new Date(insight.publishedAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400">...</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                              <DropdownMenuItem onClick={() => handleOpenDetails(insight)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenEdit(insight)} className="text-neutral-900 dark:text-neutral-100 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(insight._id)} className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-neutral-600 dark:text-neutral-300">
                        {loading ? 'Loading...' : 'No insights found.'}
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
      {showDetails && selectedInsight && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="w-[90vw] max-w-7xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
            <DialogHeader className="border-b border-neutral-200 dark:border-neutral-700 py-6 px-8">
              <DialogTitle className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{selectedInsight.title}</DialogTitle>
            </DialogHeader>
            <div className="p-8 space-y-8">
              <img
                src={selectedInsight.coverImage}
                alt={selectedInsight.title}
                className="w-full h-80 object-cover rounded-2xl shadow-md mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">ID</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight._id}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Title</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.title}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Slug</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.slug}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Excerpt</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.excerpt}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Content</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.content}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Category</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.category}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Cover Image</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 break-all">{selectedInsight.coverImage}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Author</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.author.username}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Read Time</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.readTime} minutes</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Published</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.isPublished ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Published At</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{new Date(selectedInsight.publishedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Meta Title</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.metaTitle}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Meta Description</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.metaDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Featured</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.isFeatured ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Views</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{selectedInsight.views}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Created At</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{new Date(selectedInsight.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Updated At</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{new Date(selectedInsight.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Tags</h3>
                <ul className="list-disc pl-4 text-neutral-600 dark:text-neutral-300">
                  {selectedInsight.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
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
              <DialogTitle className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">Edit Insight</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
                  <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="edit-title" className="text-neutral-700 dark:text-neutral-200 font-semibold">Title</Label>
                  <Input
                    id="edit-title"
                    placeholder="Enter insight title"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-slug" className="text-neutral-700 dark:text-neutral-200 font-semibold">Slug</Label>
                  <Input
                    id="edit-slug"
                    placeholder="Enter insight slug"
                    value={editFormData.slug}
                    onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-excerpt" className="text-neutral-700 dark:text-neutral-200 font-semibold">Excerpt</Label>
                  <Input
                    id="edit-excerpt"
                    placeholder="Enter short excerpt"
                    value={editFormData.excerpt}
                    onChange={(e) => setEditFormData({ ...editFormData, excerpt: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-content" className="text-neutral-700 dark:text-neutral-200 font-semibold">Content</Label>
                  <Textarea
                    id="edit-content"
                    placeholder="Enter full content"
                    value={editFormData.content}
                    onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl"
                    rows={6}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-coverImage" className="text-neutral-700 dark:text-neutral-200 font-semibold">Cover Image URL</Label>
                  <Input
                    id="edit-coverImage"
                    placeholder="Enter cover image URL"
                    value={editFormData.coverImage}
                    onChange={(e) => setEditFormData({ ...editFormData, coverImage: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-category" className="text-neutral-700 dark:text-neutral-200 font-semibold">Category</Label>
                  <Input
                    id="edit-category"
                    placeholder="Enter category (e.g., technology)"
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-readTime" className="text-neutral-700 dark:text-neutral-200 font-semibold">Read Time (minutes)</Label>
                  <Input
                    id="edit-readTime"
                    type="number"
                    placeholder="Enter read time"
                    value={editFormData.readTime}
                    onChange={(e) => setEditFormData({ ...editFormData, readTime: Number(e.target.value) })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-metaTitle" className="text-neutral-700 dark:text-neutral-200 font-semibold">Meta Title</Label>
                  <Input
                    id="edit-metaTitle"
                    placeholder="Enter meta title"
                    value={editFormData.metaTitle}
                    onChange={(e) => setEditFormData({ ...editFormData, metaTitle: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-metaDescription" className="text-neutral-700 dark:text-neutral-200 font-semibold">Meta Description</Label>
                  <Textarea
                    id="edit-metaDescription"
                    placeholder="Enter meta description"
                    value={editFormData.metaDescription}
                    onChange={(e) => setEditFormData({ ...editFormData, metaDescription: e.target.value })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl"
                    rows={4}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-isPublished" className="text-neutral-700 dark:text-neutral-200 font-semibold">Published</Label>
                  <select
                    id="edit-isPublished"
                    value={editFormData.isPublished.toString()}
                    onChange={(e) => setEditFormData({ ...editFormData, isPublished: e.target.value === 'true' })}
                    className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 w-full px-3"
                    disabled={loading}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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
                  <Label className="text-neutral-700 dark:text-neutral-200 font-semibold">Tags</Label>
                  {editFormData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Enter tag"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value, true)}
                        className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12"
                        required
                        disabled={loading}
                      />
                      {editFormData.tags.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeTag(index, true)}
                          className="text-red-600 hover:text-red-700"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addTag(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 mt-2"
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Tag
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

export default InsightPage;