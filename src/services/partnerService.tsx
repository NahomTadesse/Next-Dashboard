import axios from 'axios';

const API_BASE_URL = 'http://172.16.0.58:2082/api/user-resource';

interface Partner {
  id: string;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  realmRoles: string[];
  attributes?: {
    phone?: string[];
    location?: string[];
    services?: string[];
    type?: string[];
  };
}

interface Role {
  id: string;
  name: string;
  description: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}

interface PartnerResponse {
  status: boolean;
  statusDesc: string;
  data: Partner[];
  count: number;
}

interface RoleResponse {
  status: boolean;
  statusDesc: string;
  data: Role[];
  count: number;
}

interface RegisterPartnerData {
  username: string;
  password: string;
  email: string;
  roles: string[];
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  attributes?: Record<string, string[]>;
  groups?: string[];
  totp?: boolean;
}

interface UpdatePartnerData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  enabled: boolean;
  attributes?: Record<string, string[]>;
  groups?: string[];
  totp?: boolean;
  emailVerified: boolean;
  password?: string;
}

export const fetchPartners = async (
  page: number = 0,
  size: number = 10
): Promise<PartnerResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`, {
      params: { page, size },
      headers: { Accept: '*/*' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch partners');
  }
};

export const registerPartner = async (data: RegisterPartnerData): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/register`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed to register partner');
  }
};

export const fetchRoles = async (
  page: number = 0,
  size: number = 100
): Promise<RoleResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/all_roles`, {
      params: { page, size },
      headers: { Accept: '*/*' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch roles');
  }
};

export const deletePartner = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Accept: '*/*' },
    });
  } catch (error) {
    throw new Error('Failed to delete partner');
  }
};

export const updatePartner = async (data: UpdatePartnerData): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/update`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed to update partner');
  }
};

export const resetPartnerPassword = async (id: string, payload: { newPassword: string; temporary: boolean }) => {
  const response = await axios.post(`${API_BASE_URL}/user-resource/${id}/reset-password`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
  });
  return response.data;
};