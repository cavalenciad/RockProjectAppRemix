export interface Artist {
    id: number;
    nombre: string;
    albumDestacado: string;
    cancionDestacada: string;
    subgenero: string;
    resena: string;
    imagen: string;
}

export interface CreateArtistRequest {
    nombre: string;
    albumDestacado: string;
    cancionDestacada: string;
    subgenero: string;
    resena: string;
    imagen: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const artistService = {
    async getArtists(): Promise<Artist[]> {
        const response = await fetch(`${API_BASE_URL}/api/Artista`);
        if (!response.ok) {
            throw new Error('Failed to fetch artists');
        }
        return response.json();
    },

    async createArtist(artist: CreateArtistRequest): Promise<Artist> {
        const response = await fetch(`${API_BASE_URL}/api/Artista`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(artist),
        });
        if (!response.ok) {
            throw new Error('Failed to create artist');
        }
        return response.json();
    }
};