import api from './api';

// Mapeamento de IDs de marcas para nomes
const MAKE_ID_TO_NAME = {
  100: 'Honda',
  101: 'Yamaha',
  102: 'Kawasaki',
  103: 'Suzuki',
  104: 'KTM',
  105: 'Ducati',
  106: 'BMW',
  107: 'Harley-Davidson',
  108: 'Triumph',
  109: 'Aprilia',
};

export const getMakeName = (makeId) => {
  return MAKE_ID_TO_NAME[makeId] || 'Marca Desconhecida';
};

export const motorcycleService = {
  /**
   * Busca motos de motocross/off-road por marca
   * @param {number} makeId - ID da marca (100 = Honda, 101 = Yamaha, etc)
   * @returns {Array} Lista de motos
   */
  getMotocrossBikes: async (makeId) => {
    try {
      console.log('🔍 Buscando motos para marca ID:', makeId);

      // Como o endpoint /make/{makeId} não funciona, vamos usar múltiplas categorias
      // que sabemos que funcionam
      const categoriesToFetch = ['Sport', 'Touring', 'Naked', 'Adventure', 'Cruiser'];

      let allBikes = [];

      for (const category of categoriesToFetch) {
        try {
          console.log(`🔍 Buscando categoria: ${category}`);
          const response = await api.get(`/model/make-id/${makeId}/category/${category}`);

          if (Array.isArray(response.data) && response.data.length > 0) {
            console.log(`✅ ${category}: ${response.data.length} motos`);
            allBikes = [...allBikes, ...response.data];
          } else if (typeof response.data === 'string') {
            console.log(`⚠️ ${category}: ${response.data}`);
          }
        } catch (error) {
          console.log(`⚠️ Erro em ${category}:`, error.message);
        }
      }

      console.log('📊 Total de motos encontradas:', allBikes.length);

      if (allBikes.length === 0) {
        console.warn('⚠️ Nenhuma moto encontrada');
        return [];
      }

      // Extrai categorias únicas para debug
      const uniqueCategories = [...new Set(allBikes.map(bike => bike.categoryName))];
      console.log('📂 CATEGORIAS ENCONTRADAS:', uniqueCategories);
      console.log('📝 Estrutura da primeira moto:', allBikes[0]);

      // Filtra apenas motos de trilha/off-road
      const offRoadKeywords = [
        'off-road', 'offroad', 'off road',
        'motocross', 'enduro', 'trail',
        'cross', 'dual sport', 'adventure',
        'dirt', 'mx', 'scrambler'
      ];

      const offRoadBikes = allBikes.filter(bike => {
        const category = (bike.categoryName || bike.category || '').toLowerCase();
        const model = (bike.modelName || bike.model || '').toLowerCase();

        const matched = offRoadKeywords.some(keyword =>
          category.includes(keyword) || model.includes(keyword)
        );

        if (matched) {
          console.log(`✅ Moto de trilha: ${bike.modelName} - Categoria: ${category}`);
        }

        return matched;
      });

      console.log('🏍️ Motos de trilha encontradas:', offRoadBikes.length);

      if (offRoadBikes.length > 0) {
        console.log('✅ Primeiras 3 motos de trilha:', offRoadBikes.slice(0, 3));
        return offRoadBikes;
      }

      // Se não encontrar motos de trilha, retorna todas (fallback temporário)
      console.warn('⚠️ Nenhuma moto de trilha específica encontrada, retornando TODAS as motos');
      console.log('💡 Total:', allBikes.length, 'motos');
      return allBikes;

    } catch (error) {
      console.error('❌ Erro geral ao buscar motos:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        mensagem: error.message,
        dados: error.response?.data,
        url: error.config?.url
      });

      return [];
    }
  },

  /**
   * Busca motos por categoria específica
   * @param {number} makeId - ID da marca
   * @param {string} category - Categoria
   * @returns {Array} Lista de motos
   */
  getBikesByCategory: async (makeId, category) => {
    try {
      console.log(`🔍 Buscando motos ${category} para marca ID:`, makeId);

      const response = await api.get(
        `/model/make-id/${makeId}/category/${category}`
      );

      let bikes = response.data;

      if (typeof bikes === 'string') {
        console.warn(`⚠️ ${bikes}`);
        return [];
      }

      if (!Array.isArray(bikes)) {
        if (bikes && typeof bikes === 'object') {
          bikes = bikes.models || bikes.data || bikes.results || [];
        } else {
          bikes = [];
        }
      }

      console.log('✅ Motos encontradas:', bikes?.length || 0);
      return bikes || [];
    } catch (error) {
      console.error(`❌ Erro ao buscar motos ${category}:`, error.message);
      return [];
    }
  },

  /**
   * Busca todas as categorias disponíveis
   * @returns {Array} Lista de categorias
   */
  getAllCategories: async () => {
    try {
      console.log('🔍 Buscando categorias disponíveis...');
      const response = await api.get('/article-type');

      let categories = response.data;

      if (!Array.isArray(categories)) {
        if (categories && typeof categories === 'object') {
          categories = categories.categories || categories.data || categories.results || [];
        } else {
          categories = [];
        }
      }

      console.log('📂 Categorias encontradas:', categories);
      return categories || [];
    } catch (error) {
      console.error('❌ Erro ao buscar categorias:', error.message);
      return [];
    }
  },

  /**
   * Busca todas as marcas disponíveis
   * @returns {Array} Lista de marcas
   */
  getAllMakes: async () => {
    try {
      const response = await api.get('/make');
      let makes = response.data;

      if (!Array.isArray(makes)) {
        if (makes && typeof makes === 'object') {
          makes = makes.makes || makes.data || makes.results || [];
        } else {
          makes = [];
        }
      }

      console.log('📋 Marcas encontradas:', makes?.length || 0);
      return makes || [];
    } catch (error) {
      console.error('❌ Erro ao buscar marcas:', error.message);
      return [];
    }
  },

  /**
   * Busca modelos por marca (TODAS as motos da marca)
   * @param {string} makeId - ID da marca
   * @returns {Array} Lista de modelos
   */
  getModelsByMake: async (makeId) => {
    try {
      console.log('🔍 Buscando todos os modelos da marca:', makeId);
      const response = await api.get(`/make/${makeId}`);

      let models = response.data;

      if (!Array.isArray(models)) {
        models = [models];
      }

      console.log('🏍️ Modelos encontrados:', models?.length || 0);
      return models || [];
    } catch (error) {
      console.error('❌ Erro ao buscar modelos:', error.message);
      return [];
    }
  },

  /**
   * Busca especificações de uma moto específica
   * @param {number} year - Ano
   * @param {string} make - Marca
   * @param {string} model - Modelo
   * @returns {Object} Especificações da moto
   */
  getSpecifications: async (year, make, model) => {
    try {
      const response = await api.get(`/model/${make}/${model}/${year}`);
      console.log('📊 Especificações encontradas:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar especificações:', error.message);
      throw error;
    }
  },
};