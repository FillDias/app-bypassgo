import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { motorcycleService, getMakeName } from '../../services/motorcycleApi';

// 🔥 BUSCAR MOTOS DE MOTOCROSS (OFF-ROAD)
export const fetchMotocrossBikes = createAsyncThunk(
  'products/fetchMotocrossBikes',
  async (makeId, { rejectWithValue }) => {
    try {
      console.log('🔍 Buscando motos para makeId:', makeId);
      const data = await motorcycleService.getMotocrossBikes(makeId);
      console.log('✅ Dados recebidos da API:', data);

      // Retorna dados com o makeId para usar no reducer
      return { bikes: data || [], makeId };
    } catch (error) {
      console.error('❌ Erro no fetchMotocrossBikes:', error);
      return rejectWithValue(error.message);
    }
  }
);

/* ============================
   THUNKS (API)
============================ */

// Buscar todas as marcas
export const fetchAllMakes = createAsyncThunk(
  'products/fetchAllMakes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await motorcycleService.getAllMakes();
      return data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Buscar modelos por marca
export const fetchModelsByMake = createAsyncThunk(
  'products/fetchModelsByMake',
  async (make, { rejectWithValue }) => {
    try {
      const data = await motorcycleService.getModelsByMake(make);
      return data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Buscar especificações da moto
export const fetchMotorcycleSpecs = createAsyncThunk(
  'products/fetchMotorcycleSpecs',
  async ({ year, make, model }, { rejectWithValue }) => {
    try {
      const data = await motorcycleService.getSpecifications(year, make, model);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Buscar categorias
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await motorcycleService.getAllCategories();
      return data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ============================
   INITIAL STATE
============================ */

const initialState = {
  motorcycles: [],
  equipment: [],
  filteredItems: [],
  makes: [],
  categories: [],
  selectedMake: null,
  selectedCategory: 'Todos',
  viewMode: 'motorcycles',
  loading: false,
  error: null,
};

/* ============================
   SLICE
============================ */

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
      state.filteredItems = [];
      state.selectedCategory = 'Todos';
    },

    filterByCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;

      const sourceItems =
        state.viewMode === 'motorcycles'
          ? state.motorcycles
          : state.equipment;

      if (category === 'Todos') {
        state.filteredItems = [];
      } else {
        state.filteredItems = sourceItems.filter(
          item => item.category === category
        );
      }
    },

    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();

      const sourceItems =
        state.viewMode === 'motorcycles'
          ? state.motorcycles
          : state.equipment;

      state.filteredItems = sourceItems.filter(item =>
        item.name?.toLowerCase().includes(searchTerm)
      );
    },

    setSelectedMake: (state, action) => {
      state.selectedMake = action.payload;
    },

    addMotorcycleForRent: (state, action) => {
      const motorcycle = {
        ...action.payload,
        pricePerDay: 350,
        available: true,
        minDays: 1,
        maxDays: 30,
        deposit: 1000,
      };
      state.motorcycles.push(motorcycle);
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔥 FETCH MOTOCROSS BIKES
      .addCase(fetchMotocrossBikes.pending, (state) => {
        console.log('⏳ Carregando motos...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMotocrossBikes.fulfilled, (state, action) => {
        console.log('✅ Motos carregadas com sucesso:', action.payload);
        state.loading = false;

        const { bikes, makeId } = action.payload;
        const makeName = getMakeName(makeId);

        // Helper para gerar imagem de moto usando Unsplash
        const getMotorcycleImage = (bike, index) => {
          // Lista de termos de busca baseados na categoria
          const categoryImageMap = {
            'motocross': 'motocross,dirt-bike',
            'enduro': 'enduro,motorcycle,offroad',
            'trail': 'trail-bike,motorcycle',
            'dual sport': 'dual-sport,adventure-bike',
            'adventure': 'adventure-motorcycle,touring',
            'sport': 'sport-bike,motorcycle',
            'offroad': 'offroad-motorcycle,dirt-bike',
            'off-road': 'offroad-motorcycle,dirt-bike',
          };

          const category = (bike.categoryName || bike.category || '').toLowerCase();
          let searchTerm = 'motorcycle,motocross';

          // Encontra o termo de busca mais específico
          for (const [key, value] of Object.entries(categoryImageMap)) {
            if (category.includes(key)) {
              searchTerm = value;
              break;
            }
          }

          // Usa Unsplash com termo de busca específico + seed para consistência
          return `https://source.unsplash.com/400x300/?${searchTerm}&sig=${bike.modelId || index}`;
        };

        // Mapeia os dados da API para o formato do app
        state.motorcycles = bikes.map((bike, index) => {
          // Gera ID único combinando múltiplos campos para evitar duplicatas
          const uniqueId = bike.id ||
                          `${bike.make_id || makeId}-${bike.model_id || bike.modelId || index}-${bike.year || bike.yearName || ''}` ||
                          `bike-${makeId}-${index}`;

          return {
            id: uniqueId,
            name: bike.model || bike.modelName || 'Moto sem nome',
            brand: makeName,
            category: bike.category || bike.categoryName || 'Off-road',
            year: bike.year || bike.yearName || 2024,
            image: getMotorcycleImage(bike, index),
            description: `${bike.model || bike.modelName} ${bike.year || bike.yearName} - Moto ${bike.category || bike.categoryName || 'off-road'} ideal para trilhas e motocross. Equipada com tecnologia de ponta e perfeita para aventuras off-road.`,
            pricePerDay: 350,
            available: true,
            minDays: 1,
            maxDays: 30,
            deposit: 1000,
            rating: 4.5,
            stock: 3,
            // Mantém os dados originais da API
            modelId: bike.modelId,
            articleId: bike.articleId,
            originalData: bike,
          };
        });

        state.filteredItems = [];
        console.log('📊 Total de motos mapeadas:', state.motorcycles.length);
        if (state.motorcycles.length > 0) {
          console.log('📊 Primeira moto mapeada:', state.motorcycles[0]);
        }
      })
      .addCase(fetchMotocrossBikes.rejected, (state, action) => {
        console.error('❌ Erro ao carregar motos:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Makes
      .addCase(fetchAllMakes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMakes.fulfilled, (state, action) => {
        state.loading = false;
        state.makes = action.payload;
      })
      .addCase(fetchAllMakes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Models by Make
      .addCase(fetchModelsByMake.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModelsByMake.fulfilled, (state, action) => {
        state.loading = false;
        state.motorcycles = action.payload;
        state.filteredItems = [];
      })
      .addCase(fetchModelsByMake.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Motorcycle Specs
      .addCase(fetchMotorcycleSpecs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMotorcycleSpecs.fulfilled, (state, action) => {
        state.loading = false;
        const motorcycle = {
          ...action.payload,
          pricePerDay: 350,
          available: true,
          minDays: 1,
          maxDays: 30,
          deposit: 1000,
        };
        state.motorcycles = [motorcycle];
        state.filteredItems = [];
      })
      .addCase(fetchMotorcycleSpecs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ============================
   EXPORTS
============================ */

export const {
  setViewMode,
  filterByCategory,
  searchProducts,
  setSelectedMake,
  addMotorcycleForRent,
} = productsSlice.actions;

export default productsSlice.reducer;