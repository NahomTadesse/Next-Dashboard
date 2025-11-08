// // routeService.ts

// export async function getRoutes() {
//   try {
//     const response = await fetch('http://172.16.0.58:2084/api/routes');
//     const data = await response.json();
//     return data.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// export async function getLocations() {
//   try {
//     const response = await fetch('http://172.16.0.58:2084/api/routes/location');
//     return await response.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// export async function addRoute(data: any) {
//   try {
//     const response = await fetch('http://172.16.0.58:2084/api/routes', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     return await response.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// export async function updateRoute(id: number, data: any) {
//   try {
//     const response = await fetch(`http://172.16.0.58:2084/api/routes/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     return await response.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// export async function deleteRoute(id: number) {
//   try {
//     const response = await fetch(`http://172.16.0.58:2084/api/routes/${id}`, {
//       method: 'DELETE',
//     });
//     return await response.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }



export async function getRoutes(page: number, size: number, search: string = '') {
  try {
    const response = await fetch(`http://172.16.0.58:2084/api/routes`);
    const data = await response.json();
    return {
      data: data.data,
      total_pages: data.total_pages,
      total: data.total
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getLocations() {
  try {
    const response = await fetch('http://172.16.0.58:2084/api/routes/location');
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function addRoute(data: any) {
  try {
    const response = await fetch('http://172.16.0.58:2084/api/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateRoute(id: number, data: any) {
  try {
    const response = await fetch(`http://172.16.0.58:2084/api/routes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteRoute(id: number) {
  try {
    const response = await fetch(`http://172.16.0.58:2084/api/routes/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}