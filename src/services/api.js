// src/services/api.js
import axios from 'axios';

// Buat instance axios dengan baseURL backend kita
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // URL backend Go Anda
    headers: {
        'Content-Type': 'application/json',
    },
});

// Ekspor fungsi untuk setiap endpoint
export const getGenres = () => {
    return apiClient.get('/genres');
};
