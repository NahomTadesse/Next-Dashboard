export const getActivities = async () => {
  try {
    const response = await fetch('http://172.16.0.58:2082/api/activities', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const addActivity = async (data: {
  name: string;
  description: string;
  category: string;
  basePrice: number;
  capacity: number;
 
  locationId: number;
  amenities: { id: number }[];
  media: { id: number }[];
  reviews: { id: number }[];
}) => {
  try {
    const response = await fetch('http://172.16.0.58:2082/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to add activity');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
};

export const updateActivity = async (id: number, data: {
  name: string;
  description: string;
  category: string;
  basePrice: number;
  capacity: number;

  locationId: number;
  amenities: { id: number }[];
  media: { id: number }[];
  reviews: { id: number }[];
}) => {
  try {
    const response = await fetch(`http://172.16.0.58:2082/api/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update activity');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
};

export const deleteActivity = async (id: number) => {
  try {
    const response = await fetch(`http://172.16.0.58:2082/api/activities/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete activity');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting activity:', error);
    throw error;
  }
};