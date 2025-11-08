

// import Cookies from 'js-cookie';

// export interface AuthData {
//   access_token: string;
//   refresh_token: string;
//   expires_in: number;
//   refresh_expires_in?: number;
//   token_type?: string;
//   session_state?: string;
//   scope?: string;
//   userId?: string;
//   username?: string;
//   phoneNumber?: string;
//   [key: string]: any;
// }

// class TokenService {
//   private static instance;
//   private tokenRefreshTimeout = null;
//   private readonly API_BASE_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api';

//   private constructor() {}

//   static getInstance() {
//     if (!TokenService.instance) {
//       TokenService.instance = new TokenService();
//     }
//     return TokenService.instance;
//   }

//   getAuthData() {
//     try {
//       const authData = Cookies.get('authData');
//       return authData ? JSON.parse(authData) : null;
//     } catch (error) {
//       console.error('Error parsing auth data:', error);
//       this.clearAuthData();
//       return null;
//     }
//   }

//   getAccessToken() {
//     const authData = this.getAuthData();
//     return authData?.access_token || null;
//   }

//   isTokenExpired(token) {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.exp * 1000 < Date.now();
//     } catch (error) {
//       console.error('Error checking token expiration:', error);
//       return true;
//     }
//   }

//   isRefreshTokenExpired() {
//     const authData = this.getAuthData();
//     if (!authData || !authData.refresh_token) return true;

//     try {
//       const issuedAt = Date.now() - (authData.expires_in * 1000);
//       const refreshExpiresIn = authData.refresh_expires_in || 604800;
//       return issuedAt + (refreshExpiresIn * 1000) < Date.now();
//     } catch (error) {
//       console.error('Error checking refresh token expiration:', error);
//       return true;
//     }
//   }

//   async refreshToken() {
//     const authData = this.getAuthData();
//     if (!authData || !authData.refresh_token) {
//       this.clearAuthData();
//       return null;
//     }

//     try {
//       const response = await fetch(`${this.API_BASE_URL}/users/refresh`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//           'grant_type': 'refresh_token',
//           'client_id': 'apigateway-client',
//           'client_secret': '3NukECkcpT8GZ92X6CYqTpwiDWyFQGbt',
//           'refresh_token': authData.refresh_token,
//         }).toString(),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to refresh token');
//       }

//       const newAuthData = await response.json();
//       this.setAuthData(newAuthData);
//       return newAuthData;
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//       this.clearAuthData();
//       return null;
//     }
//   }

//   setAuthData(authData) {
//     Cookies.set('authData', JSON.stringify(authData), {
//       expires: authData.expires_in ? new Date(Date.now() + authData.expires_in * 1000) : 1,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'Strict',
//     });

//     this.scheduleTokenRefresh(authData);
//   }

//   clearAuthData() {
//     Cookies.remove('authData');
//     if (this.tokenRefreshTimeout) {
//       clearTimeout(this.tokenRefreshTimeout);
//       this.tokenRefreshTimeout = null;
//     }
//   }

//   scheduleTokenRefresh(authData) {
//     if (this.tokenRefreshTimeout) {
//       clearTimeout(this.tokenRefreshTimeout);
//     }

//     const refreshTime = (authData.expires_in - 60) * 1000;

//     this.tokenRefreshTimeout = window.setTimeout(() => {
//       this.refreshToken();
//     }, refreshTime);
//   }

//   async getValidToken() {
//     const authData = this.getAuthData();

//     if (!authData) {
//       return null;
//     }

//     if (this.isTokenExpired(authData.access_token)) {
//       if (this.isRefreshTokenExpired()) {
//         this.clearAuthData();
//         return null;
//       }

//       const newAuthData = await this.refreshToken();
//       return newAuthData ? newAuthData.access_token : null;
//     }

//     return authData.access_token;
//   }
// }

// export default TokenService.getInstance();


import Cookies from 'js-cookie';

export interface AuthData {
  token: string;
  userId: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  [key: string]: any;
}

class TokenService {
  private static instance;
  private readonly API_BASE_URL = 'https://cms-b49ap16uw-kidus2s-projects.vercel.app/api';

  private constructor() {}

  static getInstance() {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  getAuthData() {
    try {
      const authData = Cookies.get('authData');
      return authData ? JSON.parse(authData) : null;
    } catch (error) {
      console.error('Error parsing auth data:', error);
      this.clearAuthData();
      return null;
    }
  }

  getAccessToken() {
    const authData = this.getAuthData();
    return authData?.token || null;
  }

  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  setAuthData(authData) {
    Cookies.set('authData', JSON.stringify(authData), {
      expires: 1, // Default to 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
  }

  clearAuthData() {
    Cookies.remove('authData');
  }

  async getValidToken() {
    const authData = this.getAuthData();

    if (!authData) {
      return null;
    }

    if (this.isTokenExpired(authData.token)) {
      this.clearAuthData();
      return null;
    }

    return authData.token;
  }
}

export default TokenService.getInstance();