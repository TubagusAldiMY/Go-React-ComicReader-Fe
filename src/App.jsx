// src/App.jsx
import { useState, useEffect } from 'react';
import { getGenres } from './services/api';

function App() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fungsi untuk mengambil data
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const response = await getGenres();
                setGenres(response.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch genres:", err);
                setError("Gagal memuat data genre. Pastikan server backend berjalan.");
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali saat komponen mount

    return (
        <div className="bg-gray-900 min-h-screen text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-cyan-400">TubsComic Genre List</h1>
                    <p className="text-gray-400 mt-2">Daftar genre yang diambil dari Backend Go!</p>
                </header>

                <main className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    {loading && <p className="text-yellow-400">Loading genres...</p>}
                    {error && <p className="text-red-500 font-bold">{error}</p>}

                    {!loading && !error && (
                        <ul className="space-y-3">
                            {genres.length > 0 ? (
                                genres.map(genre => (
                                    <li key={genre.id} className="bg-gray-700 p-4 rounded-md flex justify-between items-center transition hover:bg-gray-600">
                                        <div>
                                            <p className="font-semibold text-lg">{genre.name}</p>
                                            <p className="text-sm text-gray-400">Slug: {genre.slug}</p>
                                        </div>
                                        <span className="text-xs font-mono text-cyan-400 opacity-50 select-all" title="Genre ID">
                      {genre.id}
                    </span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">Tidak ada data genre. Coba tambahkan beberapa melalui API.</p>
                            )}
                        </ul>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;