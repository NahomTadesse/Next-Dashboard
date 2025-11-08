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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { authenticatedFetch } from '@/service/authenticator';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface SocialMedia {
  website: string;
  linkedin: string;
  twitter: string;
  github: string;
  facebook: string;
  instagram: string;
}

interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface ContactInfo {
  _id?: string;
  address: Address;
  socialMedia: SocialMedia;
  businessHours: BusinessHours;
  companyName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  alternatePhone: string;
  fullAddress: string;
  whatsappNumber: string;
  skypeId: string;
  googleMapsLink: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Message {
  _id: string;
  type: string;
  status: string;
  priority: string;
  source: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
  companyInfo: {
    businessHours: BusinessHours;
    isActive: boolean;
  };
  submission: {
    name: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    subject: string;
    message: string;
    serviceInterest: string[];
    budget: string;
    timeline: string;
    privacyConsent: boolean;
  };
}

export default function ContactPageUpdater() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For Contact Info
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [infoFormData, setInfoFormData] = useState<ContactInfo>({
    address: { street: '', city: '', state: '', zipCode: '', country: '' },
    socialMedia: { website: '', linkedin: '', twitter: '', github: '', facebook: '', instagram: '' },
    businessHours: { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
    companyName: '',
    tagline: '',
    description: '',
    email: '',
    phone: '',
    alternatePhone: '',
    fullAddress: '',
    whatsappNumber: '',
    skypeId: '',
    googleMapsLink: '',
    isActive: true,
  });
  const [editInfoFormData, setEditInfoFormData] = useState<ContactInfo | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<ContactInfo | null>(null);
  const [showInfoDetails, setShowInfoDetails] = useState(false);
  const [showInfoEdit, setShowInfoEdit] = useState(false);
  const [infoSearchTerm, setInfoSearchTerm] = useState('');
  const [infoSortOrder, setInfoSortOrder] = useState<'asc' | 'desc'>('asc');
  const [infoCurrentPage, setInfoCurrentPage] = useState(1);
  const infoItemsPerPage = 7;

  // For Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageDetails, setShowMessageDetails] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const [messageSortOrder, setMessageSortOrder] = useState<'asc' | 'desc'>('desc'); // Default desc for createdAt
  const [messageCurrentPage, setMessageCurrentPage] = useState(1);
  const messageItemsPerPage = 10;

  // Fetch Contact Info
  const fetchContactInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/contacts/company', {
        method: 'GET',
        headers: { 'Accept': '*/*' },
      });
      if (response.ok) {
        const { data } = await response.json();
        setContactInfo(data ? [data] : []); // Wrap in array if exists
      } else {
        setError('Failed to fetch contact information');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Fetch contact info error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Messages
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/contacts/submissions', {
        method: 'GET',
        headers: { 'Accept': '*/*' },
      });
      if (response.ok) {
        const json = await response.json();
        setMessages(json.data || []);
      } else {
        setError('Failed to fetch messages');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle submit for contact info (create or update)
  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const method = contactInfo.length > 0 ? 'PUT' : 'POST';
    const url = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/contacts/company';

    try {
      const response = await authenticatedFetch(url, {
        method,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoFormData),
      });

      if (response.ok) {
        setInfoFormData({
          address: { street: '', city: '', state: '', zipCode: '', country: '' },
          socialMedia: { website: '', linkedin: '', twitter: '', github: '', facebook: '', instagram: '' },
          businessHours: { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
          companyName: '',
          tagline: '',
          description: '',
          email: '',
          phone: '',
          alternatePhone: '',
          fullAddress: '',
          whatsappNumber: '',
          skypeId: '',
          googleMapsLink: '',
          isActive: true,
        });
        alert(`Contact information ${method === 'POST' ? 'created' : 'updated'} successfully!`);
        setShowInfoForm(false);
        fetchContactInfo();
      } else {
        const data = await response.json();
        setError(data.message || `Failed to ${method.toLowerCase()} contact information`);
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Contact info submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit submit for contact info
  const handleInfoEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/contacts/company/${editInfoFormData._id}`, {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editInfoFormData),
      });

      if (response.ok) {
        setEditInfoFormData(null);
        setShowInfoEdit(false);
        alert('Contact information updated successfully!');
        fetchContactInfo();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update contact information');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Contact info update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete contact info
  const handleInfoDelete = async (id?: string) => {
    if (window.confirm('Are you sure you want to delete this contact information?')) {
      setError(null);
      setLoading(true);
      try {
        const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/contacts/company${id ? '/' + id : ''}`, {
          method: 'DELETE',
          headers: { 'Accept': '*/*' },
        });
        if (response.ok) {
          alert('Contact information deleted successfully!');
          fetchContactInfo();
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to delete contact information');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
        console.error('Delete contact info error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle delete message
  const handleMessageDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setError(null);
      setLoading(true);
      try {
        const response = await authenticatedFetch(`https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/contacts/submissions/${id}`, {
          method: 'DELETE',
          headers: { 'Accept': '*/*' },
        });
        if (response.ok) {
          alert('Message deleted successfully!');
          fetchMessages();
          if (messages.length <= messageItemsPerPage && messageCurrentPage > 1) {
            setMessageCurrentPage(messageCurrentPage - 1);
          }
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to delete message');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
        console.error('Delete message error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Open details for info
  const handleOpenInfoDetails = (info: ContactInfo) => {
    setSelectedInfo(info);
    setShowInfoDetails(true);
  };

  // Open edit for info
  const handleOpenInfoEdit = (info: ContactInfo) => {
    setEditInfoFormData({ ...info });
    setShowInfoEdit(true);
  };

  // Open details for message
  const handleOpenMessageDetails = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageDetails(true);
  };

  // Filter and sort for contact info (though single)
  const filteredInfo = contactInfo.filter(info =>
    info.companyName.toLowerCase().includes(infoSearchTerm.toLowerCase())
  );

  const sortedInfo = [...filteredInfo].sort((a, b) => {
    const nameA = a.companyName.toLowerCase();
    const nameB = b.companyName.toLowerCase();
    return infoSortOrder === 'asc' ? (nameA > nameB ? 1 : -1) : (nameA < nameB ? 1 : -1);
  });

  const infoTotalPages = Math.ceil(sortedInfo.length / infoItemsPerPage);
  const paginatedInfo = sortedInfo.slice(
    (infoCurrentPage - 1) * infoItemsPerPage,
    infoCurrentPage * infoItemsPerPage
  );

  // Filter and sort for messages
  const filteredMessages = messages.filter(msg =>
    msg.submission.name.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
    msg.submission.email.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
    msg.submission.subject.toLowerCase().includes(messageSearchTerm.toLowerCase())
  );

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return messageSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const messageTotalPages = Math.ceil(sortedMessages.length / messageItemsPerPage);
  const paginatedMessages = sortedMessages.slice(
    (messageCurrentPage - 1) * messageItemsPerPage,
    messageCurrentPage * messageItemsPerPage
  );

  // Handle page change
  const handleInfoPageChange = (page: number) => {
    if (page >= 1 && page <= infoTotalPages) {
      setInfoCurrentPage(page);
    }
  };

  const handleMessagePageChange = (page: number) => {
    if (page >= 1 && page <= messageTotalPages) {
      setMessageCurrentPage(page);
    }
  };

  // Fetch data on mount and tab change
  useEffect(() => {
    if (activeTab === 'info') {
      fetchContactInfo();
    } else if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  // Helper to update nested fields
  const updateNestedField = (obj: any, path: string[], value: string) => {
    const newObj = { ...obj };
    let current = newObj;
    path.slice(0, -1).forEach(key => {
      current = current[key] = { ...current[key] };
    });
    current[path[path.length - 1]] = value;
    return newObj;
  };

  return (
    <section className="w-full min-h-screen p-6 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
      <Card className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            Manage Contact Page
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <Tabs defaultValue="info" className="w-full" onValueChange={(value) => setActiveTab(value as 'info' | 'messages')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Contact Information</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => setShowInfoForm(!showInfoForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 h-12 shadow-md hover:scale-105 transition-all duration-200"
                    disabled={loading}
                  >
                    {showInfoForm ? 'View Contact Info' : (contactInfo.length > 0 ? 'Update Contact Info' : 'Create Contact Info')}
                  </Button>
                  {!showInfoForm && (
                    <Button
                      variant="outline"
                      onClick={() => setInfoSortOrder(infoSortOrder === 'asc' ? 'desc' : 'asc')}
                      className="border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full py-3 h-12"
                      disabled={loading}
                    >
                      Sort by Name ({infoSortOrder === 'asc' ? 'Ascending' : 'Descending'})
                      {infoSortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                  )}
                </div>
                {!showInfoForm && (
                  <div className="relative max-w-md mx-auto">
                    <Input
                      placeholder="Search by company name..."
                      value={infoSearchTerm}
                      onChange={(e) => setInfoSearchTerm(e.target.value)}
                      className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 pl-10"
                      disabled={loading}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  </div>
                )}
              </div>
              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
                  <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
                </Alert>
              )}
              {showInfoForm ? (
                <form onSubmit={handleInfoSubmit} className="space-y-6">
                  {/* Company Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={infoFormData.companyName}
                        onChange={(e) => setInfoFormData({ ...infoFormData, companyName: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        value={infoFormData.tagline}
                        onChange={(e) => setInfoFormData({ ...infoFormData, tagline: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={infoFormData.description}
                        onChange={(e) => setInfoFormData({ ...infoFormData, description: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={infoFormData.email}
                        onChange={(e) => setInfoFormData({ ...infoFormData, email: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={infoFormData.phone}
                        onChange={(e) => setInfoFormData({ ...infoFormData, phone: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="alternatePhone">Alternate Phone</Label>
                      <Input
                        id="alternatePhone"
                        value={infoFormData.alternatePhone}
                        onChange={(e) => setInfoFormData({ ...infoFormData, alternatePhone: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                      <Input
                        id="whatsappNumber"
                        value={infoFormData.whatsappNumber}
                        onChange={(e) => setInfoFormData({ ...infoFormData, whatsappNumber: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="skypeId">Skype ID</Label>
                      <Input
                        id="skypeId"
                        value={infoFormData.skypeId}
                        onChange={(e) => setInfoFormData({ ...infoFormData, skypeId: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="googleMapsLink">Google Maps Link</Label>
                      <Input
                        id="googleMapsLink"
                        value={infoFormData.googleMapsLink}
                        onChange={(e) => setInfoFormData({ ...infoFormData, googleMapsLink: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label htmlFor="fullAddress">Full Address</Label>
                      <Input
                        id="fullAddress"
                        value={infoFormData.fullAddress}
                        onChange={(e) => setInfoFormData({ ...infoFormData, fullAddress: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  {/* Address */}
                  <div className="space-y-3">
                    <Label>Address</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Street"
                        value={infoFormData.address.street}
                        onChange={(e) => setInfoFormData({ ...infoFormData, address: { ...infoFormData.address, street: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="City"
                        value={infoFormData.address.city}
                        onChange={(e) => setInfoFormData({ ...infoFormData, address: { ...infoFormData.address, city: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="State"
                        value={infoFormData.address.state}
                        onChange={(e) => setInfoFormData({ ...infoFormData, address: { ...infoFormData.address, state: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Zip Code"
                        value={infoFormData.address.zipCode}
                        onChange={(e) => setInfoFormData({ ...infoFormData, address: { ...infoFormData.address, zipCode: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Country"
                        value={infoFormData.address.country}
                        onChange={(e) => setInfoFormData({ ...infoFormData, address: { ...infoFormData.address, country: e.target.value } })}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  {/* Social Media */}
                  <div className="space-y-3">
                    <Label>Social Media</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Website"
                        value={infoFormData.socialMedia.website}
                        onChange={(e) => setInfoFormData({ ...infoFormData, socialMedia: { ...infoFormData.socialMedia, website: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="LinkedIn"
                        value={infoFormData.socialMedia.linkedin}
                        onChange={(e) => setInfoFormData({ ...infoFormData, socialMedia: { ...infoFormData.socialMedia, linkedin: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Twitter"
                        value={infoFormData.socialMedia.twitter}
                        onChange={(e) => setInfoFormData({ ...infoFormData, socialMedia: { ...infoFormData.socialMedia, twitter: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="GitHub"
                        value={infoFormData.socialMedia.github}
                        onChange={(e) => setInfoFormData({ ...infoFormData, socialMedia: { ...infoFormData.socialMedia, github: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Facebook"
                        value={infoFormData.socialMedia.facebook}
                        onChange={(e) => setInfoFormData({ ...infoFormData, socialMedia: { ...infoFormData.socialMedia, facebook: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Instagram"
                        value={infoFormData.socialMedia.instagram}
                        onChange={(e) => setInfoFormData({ ...infoFormData, socialMedia: { ...infoFormData.socialMedia, instagram: e.target.value } })}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  {/* Business Hours */}
                  <div className="space-y-3">
                    <Label>Business Hours</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Monday"
                        value={infoFormData.businessHours.monday}
                        onChange={(e) => setInfoFormData({ ...infoFormData, businessHours: { ...infoFormData.businessHours, monday: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Tuesday"
                        value={infoFormData.businessHours.tuesday}
                        onChange={(e) => setInfoFormData({ ...infoFormData, businessHours: { ...infoFormData.businessHours, tuesday: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Wednesday"
                        value={infoFormData.businessHours.wednesday}
                        onChange={(e) => setInfoFormData({ ...infoFormData, businessHours: { ...infoFormData.businessHours, wednesday: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Thursday"
                        value={infoFormData.businessHours.thursday}
                        onChange={(e) => setInfoFormData({ ...infoFormData, businessHours: { ...infoFormData.businessHours, thursday: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Friday"
                        value={infoFormData.businessHours.friday}
                        onChange={(e) => setInfoFormData({ ...infoFormData, businessHours: { ...infoFormData.businessHours, friday: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Saturday"
                        value={infoFormData.businessHours.saturday}
                        onChange={(e) => setInfoFormData({ ...infoFormData, businessHours: { ...infoFormData.businessHours, saturday: e.target.value } })}
                        disabled={loading}
                      />
                      <Input
                        placeholder="Sunday"
                        value={infoFormData.businessHours.sunday}
                        onChange={(e) => setInfoFormData({ ...infoFormData, businessHours: { ...infoFormData.businessHours, sunday: e.target.value } })}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setShowInfoForm(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : (contactInfo.length > 0 ? 'Update' : 'Create')}
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedInfo.length > 0 ? (
                        paginatedInfo.map((info) => (
                          <TableRow key={info._id}>
                            <TableCell>{info.companyName}</TableCell>
                            <TableCell>{info.email}</TableCell>
                            <TableCell>{info.phone}</TableCell>
                            <TableCell>{info.createdAt ? new Date(info.createdAt).toLocaleString() : ''}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost">...</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleOpenInfoDetails(info)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleOpenInfoEdit(info)}>
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleInfoDelete(info._id)}>
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            {loading ? 'Loading...' : 'No contact information found.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  {infoTotalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInfoPageChange(infoCurrentPage - 1)}
                        disabled={infoCurrentPage <= 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <span>Page {infoCurrentPage} of {infoTotalPages}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInfoPageChange(infoCurrentPage + 1)}
                        disabled={infoCurrentPage >= infoTotalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            <TabsContent value="messages">
              <div className="flex flex-col space-y-4 mt-4">
                <div className="relative max-w-md mx-auto">
                  <Input
                    placeholder="Search by name, email, or subject..."
                    value={messageSearchTerm}
                    onChange={(e) => setMessageSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={loading}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setMessageSortOrder(messageSortOrder === 'asc' ? 'desc' : 'asc')}
                  disabled={loading}
                >
                  Sort by Date ({messageSortOrder === 'asc' ? 'Ascending' : 'Descending'})
                  {messageSortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedMessages.length > 0 ? (
                    paginatedMessages.map((msg) => (
                      <TableRow key={msg._id}>
                        <TableCell>{msg.submission.name}</TableCell>
                        <TableCell>{msg.submission.email}</TableCell>
                        <TableCell>{msg.submission.subject}</TableCell>
                        <TableCell>{new Date(msg.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{msg.status}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost">...</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleOpenMessageDetails(msg)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMessageDelete(msg._id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        {loading ? 'Loading...' : 'No messages found.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {messageTotalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMessagePageChange(messageCurrentPage - 1)}
                    disabled={messageCurrentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span>Page {messageCurrentPage} of {messageTotalPages}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMessagePageChange(messageCurrentPage + 1)}
                    disabled={messageCurrentPage >= messageTotalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Info Details Modal */}
      {showInfoDetails && selectedInfo && (
        <Dialog open={showInfoDetails} onOpenChange={setShowInfoDetails}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedInfo.companyName}</DialogTitle>
            </DialogHeader>
            {/* Display all fields in a nice grid or sections */}
            <div className="space-y-4">
              <h3 className="font-semibold">Company Details</h3>
              <p>Tagline: {selectedInfo.tagline}</p>
              <p>Description: {selectedInfo.description}</p>
              <p>Email: {selectedInfo.email}</p>
              <p>Phone: {selectedInfo.phone}</p>
              <p>Alternate Phone: {selectedInfo.alternatePhone}</p>
              <p>WhatsApp: {selectedInfo.whatsappNumber}</p>
              <p>Skype: {selectedInfo.skypeId}</p>
              <p>Google Maps: {selectedInfo.googleMapsLink}</p>
              <p>Full Address: {selectedInfo.fullAddress}</p>
              <p>Active: {selectedInfo.isActive ? 'Yes' : 'No'}</p>
              <h3 className="font-semibold">Address</h3>
              <p>Street: {selectedInfo.address.street}</p>
              <p>City: {selectedInfo.address.city}</p>
              <p>State: {selectedInfo.address.state}</p>
              <p>Zip Code: {selectedInfo.address.zipCode}</p>
              <p>Country: {selectedInfo.address.country}</p>
              <h3 className="font-semibold">Social Media</h3>
              <p>Website: {selectedInfo.socialMedia.website}</p>
              <p>LinkedIn: {selectedInfo.socialMedia.linkedin}</p>
              <p>Twitter: {selectedInfo.socialMedia.twitter}</p>
              <p>GitHub: {selectedInfo.socialMedia.github}</p>
              <p>Facebook: {selectedInfo.socialMedia.facebook}</p>
              <p>Instagram: {selectedInfo.socialMedia.instagram}</p>
              <h3 className="font-semibold">Business Hours</h3>
              <p>Monday: {selectedInfo.businessHours.monday}</p>
              <p>Tuesday: {selectedInfo.businessHours.tuesday}</p>
              <p>Wednesday: {selectedInfo.businessHours.wednesday}</p>
              <p>Thursday: {selectedInfo.businessHours.thursday}</p>
              <p>Friday: {selectedInfo.businessHours.friday}</p>
              <p>Saturday: {selectedInfo.businessHours.saturday}</p>
              <p>Sunday: {selectedInfo.businessHours.sunday}</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowInfoDetails(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Info Edit Modal */}
      {showInfoEdit && editInfoFormData && (
        <Dialog open={showInfoEdit} onOpenChange={setShowInfoEdit}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Contact Information</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInfoEditSubmit} className="space-y-6">
              {/* Similar form as create, but with editInfoFormData and setEditInfoFormData */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="edit-companyName">Company Name</Label>
                  <Input
                    id="edit-companyName"
                    value={editInfoFormData.companyName}
                    onChange={(e) => setEditInfoFormData({ ...editInfoFormData, companyName: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                {/* ... Add all other fields similarly, using setEditInfoFormData with nested updates ... */}
                {/* For brevity, assume similar to create form, replace infoFormData with editInfoFormData, setInfoFormData with setEditInfoFormData */}
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setShowInfoEdit(false)} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Message Details Modal */}
      {showMessageDetails && selectedMessage && (
        <Dialog open={showMessageDetails} onOpenChange={setShowMessageDetails}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedMessage.submission.subject}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Name: {selectedMessage.submission.name}</p>
              <p>Email: {selectedMessage.submission.email}</p>
              <p>Phone: {selectedMessage.submission.phone}</p>
              <p>Company: {selectedMessage.submission.company}</p>
              <p>Position: {selectedMessage.submission.position}</p>
              <p>Message: {selectedMessage.submission.message}</p>
              <p>Service Interest: {selectedMessage.submission.serviceInterest.join(', ')}</p>
              <p>Budget: {selectedMessage.submission.budget}</p>
              <p>Timeline: {selectedMessage.submission.timeline}</p>
              <p>Privacy Consent: {selectedMessage.submission.privacyConsent ? 'Yes' : 'No'}</p>
              <p>Status: {selectedMessage.status}</p>
              <p>Priority: {selectedMessage.priority}</p>
              <p>Source: {selectedMessage.source}</p>
              <p>IP Address: {selectedMessage.ipAddress}</p>
              <p>User Agent: {selectedMessage.userAgent}</p>
              <p>Created At: {new Date(selectedMessage.createdAt).toLocaleString()}</p>
              {/* Business Hours if needed */}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowMessageDetails(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}