


// 'use client';

// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Calendar, Filter, BarChart3, ArrowRight, FileText } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Label } from '@/components/ui/label';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar as CalendarComponent } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { cn } from '@/lib/utils';

// // Simulated analytics data (dates without time)
// const analyticsData = [
//   { store: 'Store A', date: '2025-08-10', totalSales: 12000, orders: 150, visitors: 5000 },
//   { store: 'Store B', date: '2025-08-11', totalSales: 15000, orders: 200, visitors: 6000 },
//   { store: 'Store C', date: '2025-08-12', totalSales: 10000, orders: 120, visitors: 4500 },
//   { store: 'Store A', date: '2025-08-13', totalSales: 11000, orders: 140, visitors: 4800 },
//   { store: 'Store B', date: '2025-08-14', totalSales: 13000, orders: 170, visitors: 5200 },
//   { store: 'Store C', date: '2025-08-15', totalSales: 14000, orders: 190, visitors: 5500 },
// ];

// export default function AnalyticsPage() {
//   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
//   const [endDate, setEndDate] = useState<Date | undefined>(undefined);
//   const [storeName, setStoreName] = useState<string>('');

//   // Filter analytics data
//   const filteredAnalytics = analyticsData.filter((data) => {
//     const matchesStore = storeName ? data.store === storeName : true;
//     const dataDate = new Date(data.date);
    
//     let matchesDate = true;
//     if (startDate && endDate) {
//       matchesDate = dataDate >= startDate && dataDate <= endDate;
//     } else if (startDate) {
//       matchesDate = dataDate >= startDate;
//     } else if (endDate) {
//       matchesDate = dataDate <= endDate;
//     }
    
//     return matchesStore && matchesDate;
//   });

//   // Aggregate filtered data
//   const analytics = filteredAnalytics.reduce(
//     (acc, curr) => ({
//       totalSales: acc.totalSales + curr.totalSales,
//       orders: acc.orders + curr.orders,
//       visitors: acc.visitors + curr.visitors,
//     }),
//     { totalSales: 0, orders: 0, visitors: 0 }
//   );

//   // Prepare data for charts
//   const chartData = filteredAnalytics.map((data) => ({
//     store: data.store,
//     totalSales: data.totalSales,
//     orders: data.orders,
//     visitors: data.visitors,
//   }));

//   // Table rows for detailed analytics
//   const rows = filteredAnalytics.map((data, index) => (
//     <TableRow key={index}>
//       <TableCell className="font-medium">{data.store}</TableCell>
//       <TableCell>{data.date}</TableCell>
//       <TableCell>{data.totalSales.toLocaleString()} ETB</TableCell>
//       <TableCell>{data.orders}</TableCell>
//       <TableCell>{data.visitors.toLocaleString()}</TableCell>
//     </TableRow>
//   ));

//   const handleResetDates = () => {
//     setStartDate(undefined);
//     setEndDate(undefined);
//   };

//   const dashboardCards = [
//     {
//       title: 'Total Sales',
//       value: `${analytics.totalSales.toLocaleString()} ETB`,
//       description: 'Total sales across all stores',
//       icon: BarChart3,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       title: 'Total Orders',
//       value: analytics.orders.toString(),
//       description: 'Total orders placed',
//       icon: FileText,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50',
//     },
//     {
//       title: 'Total Visitors',
//       value: analytics.visitors.toLocaleString(),
//       description: 'Total store visitors',
//       icon: BarChart3,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50',
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
      
//       <div className="grid gap-4 md:grid-cols-3">
//         <div className="space-y-2">
//           <Label htmlFor="start-date">Start Date</Label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 className={cn(
//                   "w-full justify-start text-left font-normal",
//                   !startDate && "text-muted-foreground"
//                 )}
//                 id="start-date"
//               >
//                 <Calendar className="mr-2 h-4 w-4" />
//                 {startDate ? format(startDate, "PPP") : <span>Select start date</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <CalendarComponent
//                 mode="single"
//                 selected={startDate}
//                 onSelect={setStartDate}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//         </div>
        
//         <div className="space-y-2">
//           <Label htmlFor="end-date">End Date</Label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 className={cn(
//                   "w-full justify-start text-left font-normal",
//                   !endDate && "text-muted-foreground"
//                 )}
//                 id="end-date"
//               >
//                 <Calendar className="mr-2 h-4 w-4" />
//                 {endDate ? format(endDate, "PPP") : <span>Select end date</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <CalendarComponent
//                 mode="single"
//                 selected={endDate}
//                 onSelect={setEndDate}
//                 initialFocus
//                 disabled={(date) => startDate ? date < startDate : false}
//               />
//             </PopoverContent>
//           </Popover>
//         </div>
        
//         <div className="space-y-2">
//           <Label htmlFor="store">Store Name</Label>
//           <div className="flex gap-2">
//             <Select value={storeName} onValueChange={setStoreName}>
//               <SelectTrigger id="store" className="w-full">
//                 <SelectValue placeholder="Select store" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Stores</SelectItem>
//                 <SelectItem value="Store A">Store A</SelectItem>
//                 <SelectItem value="Store B">Store B</SelectItem>
//                 <SelectItem value="Store C">Store C</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button variant="outline" onClick={handleResetDates} className="whitespace-nowrap">
//               Reset Dates
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       <div className="grid gap-4 md:grid-cols-3">
//         {dashboardCards.map((card) => (
//           <Card key={card.title} className="hover:shadow-md transition-shadow cursor-pointer">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
//               <div className={`p-2 rounded-lg ${card.bgColor}`}>
//                 <card.icon className={`h-4 w-4 ${card.color}`} />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{card.value}</div>
//               <p className="text-xs text-muted-foreground flex items-center">
//                 {card.description}
//                 <ArrowRight className="h-3 w-3 ml-1" />
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Analytics by Store</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={chartData}
//                 margin={{
//                   top: 20,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="store" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => value.toLocaleString()} />
//                 <Legend />
//                 <Bar dataKey="totalSales" name="Total Sales" fill="#3b82f6" />
//                 <Bar dataKey="orders" name="Orders" fill="#10b981" />
//                 <Bar dataKey="visitors" name="Visitors" fill="#8b5cf6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Detailed Analytics</CardTitle>
//           <CardDescription>
//             Showing data for {storeName || "all stores"} 
//             {startDate && ` from ${format(startDate, "MMM d, yyyy")}`}
//             {endDate && ` to ${format(endDate, "MMM d, yyyy")}`}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Store</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Total Sales</TableHead>
//                 <TableHead>Orders</TableHead>
//                 <TableHead>Visitors</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {rows.length > 0 ? rows : (
//                 <TableRow>
//                   <TableCell colSpan={5} className="h-24 text-center">
//                     No results found with the selected filters.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, BarChart3, ArrowRight, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { authenticatedFetch } from '@/services/authenticator';
// import { setNavigation } from '@/services/authenticator';

// Simulated analytics data (dates without time)
const analyticsData = [
  { store: 'Store A', date: '2025-08-10', totalSales: 12000, orders: 150, visitors: 5000 },
  { store: 'Store B', date: '2025-08-11', totalSales: 15000, orders: 200, visitors: 6000 },
  { store: 'Store C', date: '2025-08-12', totalSales: 10000, orders: 120, visitors: 4500 },
  { store: 'Store A', date: '2025-08-13', totalSales: 11000, orders: 140, visitors: 4800 },
  { store: 'Store B', date: '2025-08-14', totalSales: 13000, orders: 170, visitors: 5200 },
  { store: 'Store C', date: '2025-08-15', totalSales: 14000, orders: 190, visitors: 5500 },
];

export default function AnalyticsPage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [storeName, setStoreName] = useState<string>('all');

  // useEffect(() => {
  //   setNavigation(router.push);
  //   // Optionally fetch analytics data from API
  //   /*
  //   const fetchAnalytics = async () => {
  //     try {
  //       const response = await authenticatedFetch('https://fashion-api.addispages.com/api/v1/analytics');
  //       const data = await response.json();
  //       // Update analyticsData state if using real API
  //       // setAnalyticsData(data);
  //     } catch (error) {
  //       console.error('Error fetching analytics:', error);
  //     }
  //   };
  //   fetchAnalytics();
  //   */
  // }, [router]);

  // Filter analytics data
  const filteredAnalytics = analyticsData.filter((data) => {
    const matchesStore = storeName && storeName !== 'all' ? data.store === storeName : true;
    const dataDate = new Date(data.date);
    
    let matchesDate = true;
    if (startDate && endDate) {
      matchesDate = dataDate >= startDate && dataDate <= endDate;
    } else if (startDate) {
      matchesDate = dataDate >= startDate;
    } else if (endDate) {
      matchesDate = dataDate <= endDate;
    }
    
    return matchesStore && matchesDate;
  });

  // Aggregate filtered data
  const analytics = filteredAnalytics.reduce(
    (acc, curr) => ({
      totalSales: acc.totalSales + curr.totalSales,
      orders: acc.orders + curr.orders,
      visitors: acc.visitors + curr.visitors,
    }),
    { totalSales: 0, orders: 0, visitors: 0 }
  );

  // Prepare data for charts
  const chartData = filteredAnalytics.map((data) => ({
    store: data.store,
    totalSales: data.totalSales,
    orders: data.orders,
    visitors: data.visitors,
  }));

  // Table rows for detailed analytics
  const rows = filteredAnalytics.map((data, index) => (
    <TableRow key={index}>
      <TableCell className="font-medium">{data.store}</TableCell>
      <TableCell>{data.date}</TableCell>
      <TableCell>{data.totalSales.toLocaleString()} ETB</TableCell>
      <TableCell>{data.orders}</TableCell>
      <TableCell>{data.visitors.toLocaleString()}</TableCell>
    </TableRow>
  ));

  const handleResetDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const dashboardCards = [
    {
      title: 'Total Sales',
      value: `${analytics.totalSales.toLocaleString()} ETB`,
      description: 'Total sales across all stores',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Orders',
      value: analytics.orders.toString(),
      description: 'Total orders placed',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Visitors',
      value: analytics.visitors.toLocaleString(),
      description: 'Total store visitors',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !startDate && 'text-muted-foreground'
                )}
                id="start-date"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP') : <span>Select start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !endDate && 'text-muted-foreground'
                )}
                id="end-date"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, 'PPP') : <span>Select end date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => (startDate ? date < startDate : false)}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="store">Store Name</Label>
          <div className="flex gap-2">
            <Select value={storeName} onValueChange={setStoreName}>
              <SelectTrigger id="store" className="w-full">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="Store A">Store A</SelectItem>
                <SelectItem value="Store B">Store B</SelectItem>
                <SelectItem value="Store C">Store C</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleResetDates} className="whitespace-nowrap">
              Reset Dates
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {card.description}
                <ArrowRight className="h-3 w-3 ml-1" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics by Store</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="store" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
                <Bar dataKey="totalSales" name="Total Sales" fill="#3b82f6" />
                <Bar dataKey="orders" name="Orders" fill="#10b981" />
                <Bar dataKey="visitors" name="Visitors" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>
            Showing data for {storeName === 'all' ? 'all stores' : storeName}
            {startDate && ` from ${format(startDate, 'MMM d, yyyy')}`}
            {endDate && ` to ${format(endDate, 'MMM d, yyyy')}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Visitors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? rows : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found with the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}