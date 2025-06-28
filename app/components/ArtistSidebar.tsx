import { useState } from 'react';
import type { Artist, CreateArtistRequest } from '~/services/api';

interface ArtistSidebarProps {
    artists: Artist[];
    selectedArtist: Artist | null;
    onSelectArtist: (artist: Artist) => void;
    onAddArtist: (artist: CreateArtistRequest) => void;
}

export default function ArtistSidebar({
    artists,
    selectedArtist,
    onSelectArtist,
    onAddArtist
}: ArtistSidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<CreateArtistRequest>({
        nombre: '',
        albumDestacado: '',
        cancionDestacada: '',
        subgenero: '',
        resena: '',
        imagen: ''
    });

    const filteredArtists = artists.filter(artist =>
        artist.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddArtist(formData);
        setFormData({
            nombre: '',
            albumDestacado: '',
            cancionDestacada: '',
            subgenero: '',
            resena: '',
            imagen: ''
        });
        setShowAddForm(false);
    };

    return (
        <div className="w-80 bg-gray-50 h-screen flex flex-col border-r border-gray-200">
            {/* Search and Add Button */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 w-8 border bg-gray-200 text-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        New
                    </button>
                </div>

                {/* Add Artist Form */}
                {showAddForm && (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Álbum Destacado"
                            value={formData.albumDestacado}
                            onChange={(e) => setFormData({ ...formData, albumDestacado: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Canción Destacada"
                            value={formData.cancionDestacada}
                            onChange={(e) => setFormData({ ...formData, cancionDestacada: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Subgénero"
                            value={formData.subgenero}
                            onChange={(e) => setFormData({ ...formData, subgenero: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            placeholder="Reseña"
                            value={formData.resena}
                            onChange={(e) => setFormData({ ...formData, resena: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                            required
                        />
                        <input
                            type="url"
                            placeholder="URL de la imagen"
                            value={formData.imagen}
                            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Agregar
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Artists List */}
            <div className="flex-1 overflow-y-auto">
                {filteredArtists.map((artist) => (
                    <button
                        key={artist.id}
                        onClick={() => onSelectArtist(artist)}
                        className={`w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-100 transition-colors ${selectedArtist?.id === artist.id ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
                            }`}
                    >
                        <div className="font-medium text-gray-900">{artist.nombre}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
