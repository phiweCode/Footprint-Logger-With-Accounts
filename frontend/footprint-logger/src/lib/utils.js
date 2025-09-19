import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserId = async () => {
    try {
        const res = await axios.post(`${BACKEND_URL}auth/refresh`, null, {
            withCredentials: true
        });
        const data = res.data
        if (data?.ok) return data.userId;
        return null;
    } catch (error) {
        return null
    }
}

export const buildAreaChart = (data) => {
  const dataSets = [];
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
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
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

  return dataSets;
};
