import axios from 'axios';

const api = axios.create({
  /* Se houver uma URL definida no ambiente (Docker/Produção), usa ela.
     Se não houver (seu PC local), usa '/api' para ativar o Proxy do Vite.
  */
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

export default api;