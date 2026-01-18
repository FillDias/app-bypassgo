import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  motorcycles: [
    {
      id: 1,
      name: 'Honda CRF 450R',
      brand: 'Honda',
      pricePerDay: 350,
      image: 'https://images.unsplash.com/photo-1558980664-1db506751b7c?w=400',
      description: 'Moto de trilha profissional com motor de 450cc, suspensão ajustável e tecnologia de ponta. Ideal para trilhas extremas.',
      category: 'Competição',
      available: true,
      rating: 4.8,
      minDays: 1,
      maxDays: 30,
      deposit: 1000,
    },
    {
      id: 2,
      name: 'Yamaha YZ 250F',
      brand: 'Yamaha',
      pricePerDay: 320,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
      description: 'Excelente desempenho em trilhas com motor 4 tempos de 250cc e design aerodinâmico.',
      category: 'Competição',
      available: true,
      rating: 4.7,
      minDays: 1,
      maxDays: 30,
      deposit: 900,
    },
    {
      id: 3,
      name: 'KTM 350 EXC-F',
      brand: 'KTM',
      pricePerDay: 380,
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400',
      description: 'Perfeita para enduro com 350cc, leve e potente para qualquer terreno.',
      category: 'Enduro',
      available: true,
      rating: 4.9,
      minDays: 1,
      maxDays: 30,
      deposit: 1100,
    },
    {
      id: 4,
      name: 'Suzuki RM-Z 450',
      brand: 'Suzuki',
      pricePerDay: 330,
      image: 'https://images.unsplash.com/photo-1614332625905-1e8be6c79a6e?w=400',
      description: 'Alta performance em motocross com chassi leve e motor responsivo de 450cc.',
      category: 'Motocross',
      available: false,
      rating: 4.6,
      minDays: 1,
      maxDays: 30,
      deposit: 950,
    },
    {
      id: 5,
      name: 'Kawasaki KX 250',
      brand: 'Kawasaki',
      pricePerDay: 310,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
      description: 'Moto versátil para iniciantes e intermediários com ótimo custo-benefício.',
      category: 'Motocross',
      available: true,
      rating: 4.5,
      minDays: 1,
      maxDays: 30,
      deposit: 850,
    },
  ],
  equipment: [
    {
      id: 101,
      name: 'Capacete Fox V1',
      brand: 'Fox Racing',
      pricePerDay: 30,
      image: 'https://images.unsplash.com/photo-1558980664-1db506751b7c?w=400',
      description: 'Capacete de alta qualidade com proteção certificada.',
      category: 'Capacetes',
      available: true,
      stock: 15,
      rating: 4.7,
    },
    {
      id: 102,
      name: 'Conjunto Roupa Alpinestars',
      brand: 'Alpinestars',
      pricePerDay: 50,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
      description: 'Conjunto completo de calça e camisa para trilha.',
      category: 'Roupas',
      available: true,
      stock: 10,
      rating: 4.8,
    },
    {
      id: 103,
      name: 'Botas Gaerne SG-12',
      brand: 'Gaerne',
      pricePerDay: 40,
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400',
      description: 'Botas profissionais com máxima proteção e conforto.',
      category: 'Botas',
      available: true,
      stock: 8,
      rating: 4.9,
    },
    {
      id: 104,
      name: 'Óculos 100% Racecraft',
      brand: '100%',
      pricePerDay: 20,
      image: 'https://images.unsplash.com/photo-1614332625905-1e8be6c79a6e?w=400',
      description: 'Óculos de proteção com lente anti-embaçante.',
      category: 'Acessórios',
      available: true,
      stock: 20,
      rating: 4.6,
    },
  ],
  filteredItems: [],
  selectedCategory: 'Todos',
  viewMode: 'motorcycles', // 'motorcycles' ou 'equipment'
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
      state.selectedCategory = 'Todos';
      state.filteredItems = [];
    },

    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      const items = state.viewMode === 'motorcycles' ? state.motorcycles : state.equipment;

      if (action.payload === 'Todos') {
        state.filteredItems = items;
      } else {
        state.filteredItems = items.filter(item => item.category === action.payload);
      }
    },

    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      const items = state.viewMode === 'motorcycles' ? state.motorcycles : state.equipment;

      state.filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setViewMode, filterByCategory, searchProducts } = productsSlice.actions;
export default productsSlice.reducer;