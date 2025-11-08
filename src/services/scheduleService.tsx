import axios from 'axios';

const API_BASE_URL = 'http://172.16.0.58:2082/api/activities/schedule';

export const getSchedules = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching schedules:', err);
    throw err;
  }
};

export const addSchedule = async (data: {
  activityId: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}) => {
  try {
     await axios.post(API_BASE_URL, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error adding schedule:', err);
    throw err;
  }
};

export const updateSchedule = async (id: number, data: {
  activityId: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error updating schedule:', err);
    throw err;
  }
};

export const deleteSchedule = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (err) {
    console.error('Error deleting schedule:', err);
    throw err;
  }
};