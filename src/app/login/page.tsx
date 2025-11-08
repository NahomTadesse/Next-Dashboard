// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import Cookies from 'js-cookie';
// import { AuthData } from '@/service/TokenService';

// export default function LoginPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': '*/*',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.access_token) {
//           const authData = {
//             access_token: data.access_token,
//             refresh_token: data.refresh_token,
//             expires_in: data.expires_in || 86400,
//             refresh_expires_in: data.refresh_expires_in || 604800,
//             token_type: data.token_type || 'Bearer',
//             session_state: data.session_state,
//             scope: data.scope,
//             userId: data.userId,
//             username: data.username,
//             phoneNumber: data.phoneNumber,
//           };
//           Cookies.set('authData', JSON.stringify(authData), {
//             expires: authData.expires_in ? new Date(Date.now() + authData.expires_in * 1000) : 1,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'Strict',
//           });
//           router.push('/dashboard');
//         } else {
//           setError('Invalid response from server');
//         }
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Login failed. Please check your credentials.');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Login error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
//       <Card className="w-full max-w-md bg-white/90 dark:bg-neutral-900/90 rounded-2xl shadow-xl border border-transparent">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">Welcome Back</CardTitle>
//           <p className="text-neutral-600 dark:text-neutral-300 mt-2">Sign in to your account</p>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="username" className="text-neutral-700 dark:text-neutral-300">Username</Label>
//               <Input
//                 id="username"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-lg"
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-neutral-700 dark:text-neutral-300">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-lg"
//                 required
//                 disabled={loading}
//               />
//             </div>
//             {error && (
//               <Alert variant="destructive" className="bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-700">
//                 <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
//               </Alert>
//             )}
//             <Button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 shadow-md hover:scale-105 transition-all duration-200 disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? (
//                 <div className="flex items-center space-x-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   <span>Loading...</span>
//                 </div>
//               ) : (
//                 'Sign In'
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </section>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Cookies from 'js-cookie';
import { AuthData } from '@/service/TokenService';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.token) {
          const authData = {
            token: data.token,
            userId: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
            isActive: data.user.isActive,
            createdAt: data.user.createdAt,
          };
          Cookies.set('authData', JSON.stringify(authData), {
            expires: 1, // Default to 1 day since expires_in is not provided
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
          });
          router.push('/dashboard');
        } else {
          setError('Invalid response from server');
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
      <Card className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-blue-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
        <CardHeader className="text-center py-8">
          <CardTitle className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">Welcome Back</CardTitle>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-3">Sign in to access your account</p>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="username" className="text-neutral-700 dark:text-neutral-200 font-semibold">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-neutral-700 dark:text-neutral-200 font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 rounded-xl h-12 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <Alert variant="destructive" className="bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-700 rounded-xl">
                <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 h-12 shadow-md hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
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
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}