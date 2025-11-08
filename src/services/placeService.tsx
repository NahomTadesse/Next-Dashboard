// // services/placeService.ts

// const API_BASE = 'http://172.16.0.58:2082/api/places';

// export const getPlaces = async () => {
//   const response = await fetch(API_BASE);
//   if (!response.ok) throw new Error('Failed to fetch places');
//   return response.json();
// };

// export const addPlace = async (data: any) => {
//   const response = await fetch(API_BASE, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error('Failed to add place');
//   return response.json();
// };

// export const updatePlace = async (placeId: number, data: any) => {
//   const response = await fetch(`${API_BASE}/${placeId}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error('Failed to update place');
//   return response.json();
// };

// export const deletePlace = async (placeId: number) => {
//   const response = await fetch(`${API_BASE}/${placeId}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) throw new Error('Failed to delete place');
//   return response.json();
// };


const API_BASE = 'http://172.16.0.58:2082/api/places';

export interface PlaceData {
  name: string;
  description: string;
  category: string;
  openingHours: string;
  entryFee: number;
  locationId?: number;
  amenities: { id: number }[];
  services: { id: number }[];
  contacts: { id: number }[];
  media: { id: number }[];
}

export const getPlaces = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to fetch places');
  return response.json();
};

export const addPlace = async (data: PlaceData) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add place');
  return response.json();
};

export async function uploadMedia(file: File, params: {
  description: string,
  subgroup: string,
  prefix: string,
  fileCategory: string,
  fileIndex: string
}) {
  const baseUrl = 'http://172.16.0.58:2081';
  const url = new URL(`${baseUrl}/v1/media`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const formData = new FormData();
  formData.append('file', file); // Matches the 'file' key in the curl command

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error uploading media:', err);
    throw err;
  }
}
export const updatePlace = async (placeId: number, data: Partial<PlaceData>) => {
  const response = await fetch(`${API_BASE}/${placeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update place');
  return response.json();
};

export const deletePlace = async (placeId: number) => {
  const response = await fetch(`${API_BASE}/${placeId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete place');
  return response.json();
};