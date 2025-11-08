import axios from 'axios';

const API_BASE_URL = 'http://172.16.0.58:2083/api/user-resource';

interface User {
  id: string;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  realmRoles: string[];
}

interface UserResponse {
  status: boolean;
  statusDesc: string;
  data: User[];
  count: number;
}

interface RegisterUserData {
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

interface UpdateUserData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  roles: string[];
  groups?: string[];
  attributes?: Record<string, string[]>;
}

export const fetchUsers = async (page: number = 0, size: number = 10): Promise<UserResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`, {
      params: { page, size },
      headers: { Accept: '*/*' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const registerUser = async (data: RegisterUserData): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/register`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

export const updateUser = async (data: UpdateUserData): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/update`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Accept: '*/*' },
    });
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

export const resetUserPassword = async (id: string, payload: { newPassword: string; temporary: boolean }) => {
  const response = await axios.post(`${API_BASE_URL}/user-resource/${id}/reset-password`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
  });
  return response.data;
};


interface Role {
  id: string;
  name: string;
  description: string;
  scopeParamRequired: boolean | null;
  composite: boolean;
  composites: any | null;
  clientRole: boolean;
  containerId: string;
  attributes: any | null;
}

interface User {
  id: string;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  realmRoles: string[];
}

interface RoleResponse {
  status: boolean;
  statusDesc: string;
  data: Role[];
  count: number;
}

interface UserResponse {
  status: boolean;
  statusDesc: string;
  data: User[];
  count: number;
}

interface RegisterRoleData {
  name: string;
  description: string;
  composite?: boolean;
  clientRole?: boolean;
  containerId: string;
}

export const fetchRoles = async (page: number = 0, size: number = 10): Promise<RoleResponse> => {
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

export const createRole = async (data: RegisterRoleData): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/register`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed to create role');
  }
};

export const updateRole = async (id: string, data: RegisterRoleData): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/update`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed to update role');
  }
};

export const deleteRole = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Accept: '*/*' },
    });
  } catch (error) {
    throw new Error('Failed to delete role');
  }
};