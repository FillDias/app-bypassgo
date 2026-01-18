import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      name: 'Honda CRF 450R',
      brand: 'Honda',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1558980664-1db506751b7c?w=400',
      description: 'Moto de trilha profissional com motor de 450cc, suspensão ajustável e tecnologia de ponta.',
      category: 'Competição',
      inStock: true,
    },
    {
      id: 2,
      name: 'Yamaha YZ 250F',
      brand: 'Yamaha',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
      description: 'Excelente desempenho em trilhas com motor 4 tempos de 250cc e design aerodinâmico.',
      category: 'Competição',
      inStock: true,
    },
    {
      id: 3,
      name: 'KTM 350 EXC-F',
      brand: 'KTM',
      price: 48000,
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400',
      description: 'Perfeita para enduro com 350cc, leve e potente para qualquer terreno.',
      category: 'Enduro',
      inStock: true,
    },
    {
      id: 4,
      name: 'Suzuki RM-Z 450',
      brand: 'Suzuki',
      price: 43000,
      image: 'https://images.unsplash.com/photo-1614332625905-1e8be6c79a6e?w=400',
      description: 'Alta performance em motocross com chassi leve e motor responsivo de 450cc.',
      category: 'Motocross',
      inStock: false,
    },
    {
      id: 5,
      name: 'Kawasaki KX 250',
      brand: 'Kawasaki',
      price: 41000,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
      description: 'Moto versátil para iniciantes e intermediários com ótimo custo-benefício.',
      category: 'Motocross',
      inStock: true,
    },
    {
      id: 6,
      name: 'Husqvarna FC 450',
      brand: 'Husqvarna',
      price: 49000,
      image: 'https://images.unsplash.com/photo-1558980664-1db506751b7c?w=400',
      description: 'Design escandinavo com performance de elite, motor potente e suspensão WP.',
      category: 'Competição',
      inStock: true,
    },
  ],
  filteredItems: [],
  selectedCategory: 'Todos',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'Todos') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(item => item.category === action.payload);
      }
    },

    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { filterByCategory, searchProducts } = productsSlice.actions;
export default productsSlice.reducer;