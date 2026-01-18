import axios from 'axios';

const api = axios.create({
  baseURL: 'https://motorcycle-specs-database.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': 'd627fe4313msh031e67b6bc97496p12c587jsn8020c7fc4fb0',
    'x-rapidapi-host': 'motorcycle-specs-database.p.rapidapi.com',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para debug (pode remover em produção)
api.interceptors.request.use(
  (config) => {
    console.log('🌐 Fazendo requisição:', config.method.toUpperCase(), config.url);
    console.log('📋 Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', {
      status: response.status,
      quantidade: response.data?.length || 'sem array',
      primeiroItem: response.data?.[0]
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Erro na resposta da API:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      console.error('❌ Sem resposta do servidor:', error.message);
    } else {
      console.error('❌ Erro ao configurar requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;