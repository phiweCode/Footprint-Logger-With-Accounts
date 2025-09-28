import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

export const backendApi = axios.create({
  baseURL: BACKEND_URL,
}) 

backendApi.accessToken = null; 

backendApi.interceptors.response.use(res=>res, 
  async (err)=>{ 

     if (!err.response) {
      return Promise.reject(err);
    }

    const originalRequest = err.config; 

    if(err.response?.status == 401 && !originalRequest._retry){

      originalRequest._retry = true

      const refreshResponse = await axios(`${BACKEND_URL}auth/refresh`, {withCredentials: true}); 
      
      const {accessToken} = refreshResponse.data; 



      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; 

      backendApi.accessToken = accessToken; 



      return backendApi(originalRequest); 
    }

    if(err.response?.status === 401) 

    return Promise.reject(err); 
  }
)

export const getUserId = async () => {
    try {

      const res = await backendApi(`auth/check`, {
        withCredentials: true
      });
      const data = res.data

      if (data?.ok) return
    } catch (error) {
        return null
    }
}

export const buildAreaChart = (data) => {
  const dataSets = [];

  if(data)
  {
      const categories = [...new Set(data.map(i => i.category))];

  categories.forEach(category => {
    const filtered = data.filter(i => i.category === category);
    const labels = filtered.map(i => i.activity);

    const setup = {
      labels,
      datasets: [
        {
          label: category,
          data: filtered.map(i => i.quantity),
          backgroundColor: [
        "rgb(85, 107, 47)",
        "rgb(143, 163, 30)",
        "rgb(198, 216, 112)",
        "rgb(239, 245, 210)",
        "rgb(120, 200, 65)",
        "rgb(180, 229, 13)",
        "rgb(255, 155, 47)",
        "rgb(251, 65, 65)",
          ],
        },
      ],

      options: {
        responsive: true,
        plugins: { legend: { position: "top" } },
        scales: { r: { ticks: { beginAtZero: true } } },
      },
    };

    dataSets.push(setup);
  });
  }

  return dataSets || [];
};
