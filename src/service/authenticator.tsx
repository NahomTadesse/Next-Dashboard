

// import TokenService from './TokenService';
// import { useRouter } from 'next/navigation';

// export const BASE_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api';
// export const FILE_UPLOAD_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/files/upload';
// export const FILE_READ_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/files/read';
// export const LOGIN_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/users/login';
// export const TOKEN_API_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/users';

// export const createAuthenticatedFetch = () => {
//   return async (url, options = {}) => {
//     let token = await TokenService.getValidToken();

//     if (!token) {
//       const newTokenData = await TokenService.refreshToken();
//       if (newTokenData && newTokenData.access_token) {
//         token = newTokenData.access_token;
//       } else {
//         TokenService.clearAuthData();
//         window.location.href = '/login';
//         throw new Error('No valid token available and refresh failed');
//       }
//     }

//     const headers = new Headers();
//     headers.append('Accept', 'application/json');
//     headers.append('Authorization', `Bearer ${token}`);

//     const optionHeaders = options.headers ? new Headers(options.headers) : new Headers();
//     const contentType = optionHeaders.get('Content-Type') || optionHeaders.get('content-type');

//     if (options.body && ['POST', 'PUT', 'PATCH'].includes(options.method || '') && !(options.body instanceof FormData)) {
//       if (contentType) {
//         headers.set('Content-Type', contentType);
//       } else {
//         headers.set('Content-Type', 'application/json');
//       }
//     }

//     if (options.headers) {
//       optionHeaders.forEach((value, key) => {
//         if (key.toLowerCase() !== 'content-type') {
//           headers.append(key, value);
//         }
//       });
//     }

//     const fetchOptions = {
//       ...options,
//       headers,
//     };

//     let response = await fetch(url, fetchOptions);

//     if (response.status === 401) {
//       console.log('Token expired, attempting refresh...');

//       const newTokenData = await TokenService.refreshToken();
//       if (newTokenData && newTokenData.access_token) {
//         headers.set('Authorization', `Bearer ${newTokenData.access_token}`);

//         response = await fetch(url, {
//           ...options,
//           headers,
//         });

//         if (response.status === 401) {
//           TokenService.clearAuthData();
//           window.location.href = '/login';
//           throw new Error('Authentication failed after token refresh');
//         }

//         return response;
//       } else {
//         TokenService.clearAuthData();
//         window.location.href = '/login';
//         throw new Error('Token refresh failed');
//       }
//     }

//     return response;
//   };
// };

// export const authenticatedFetch = createAuthenticatedFetch();


import TokenService from './TokenService';

export const BASE_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api';
export const FILE_UPLOAD_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/files/upload';
export const FILE_READ_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/files/read';
export const LOGIN_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/users/login';
export const TOKEN_API_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api/users';

export const createAuthenticatedFetch = () => {
  return async (url, options = {}) => {
    let token = await TokenService.getValidToken();

    if (!token) {
      TokenService.clearAuthData();
      window.location.href = '/login';
      throw new Error('No valid token available');
    }

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const optionHeaders = options.headers ? new Headers(options.headers) : new Headers();
    const contentType = optionHeaders.get('Content-Type') || optionHeaders.get('content-type');

    if (options.body && ['POST', 'PUT', 'PATCH'].includes(options.method || '') && !(options.body instanceof FormData)) {
      if (contentType) {
        headers.set('Content-Type', contentType);
      } else {
        headers.set('Content-Type', 'application/json');
      }
    }

    if (options.headers) {
      optionHeaders.forEach((value, key) => {
        if (key.toLowerCase() !== 'content-type') {
          headers.append(key, value);
        }
      });
    }

    const fetchOptions = {
      ...options,
      headers,
    };

    let response = await fetch(url, fetchOptions);

    if (response.status === 401) {
      TokenService.clearAuthData();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }

    return response;
  };
};

export const authenticatedFetch = createAuthenticatedFetch();