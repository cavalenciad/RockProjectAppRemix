import type { Artist } from '~/services/api';

interface ArtistDetailsProps {
    artist: Artist | null;
}

export default function ArtistDetails({ artist }: ArtistDetailsProps) {
    if (!artist) {
        return (
            <div className="flex-1 flex items-center justify-center bg-white">
                <div className="text-center text-gray-500">
                    <h2 className="text-2xl font-semibold mb-2">Selecciona un artista</h2>
                    <p>Elige un artista del listado para ver sus detalles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-8">
                    {/* Artist Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={artist.imagen}
                            alt={artist.nombre}
                            className="w-64 h-64 object-cover rounded-2xl shadow-lg"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjggMTI4QzE0Ni4zMSAxMjggMTYxIDExMy4zMSAxNjEgOTVDMTYxIDc2LjY5IDE0Ni4zMSA2MiAxMjggNjJDMTA5LjY5IDYyIDk1IDc2LjY5IDk1IDk1Qzk1IDExMy4zMSAxMDkuNjkgMTI4IDEyOCAxMjhaIiBmaWxsPSIjOUNBM0FGII8+CjxwYXRoIGQ9Ik0xMjggMTQ2QzEwNC4zIDEzOSA4My43IDE1NS42IDc3IDE4MEMxMDEuMyAxODcgMTU0LjcgMTg3IDE3OSAxODBDMTcyLjMgMTU1LjYgMTUxLjcgMTM5IDEyOCAxNDZaIiBmaWxsPSIjOUNBM0FGII8+Cjwvc3ZnPgo=';
                            }}
                        />
                    </div>

                    {/* Artist Information */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{artist.nombre}</h1>
                            <p className="text-lg text-blue-600">@{artist.nombre.toLowerCase().replace(/\s+/g, '_')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Álbum Destacado
                                </h3>
                                <p className="text-lg text-gray-900">{artist.albumDestacado}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Canción Destacada
                                </h3>
                                <p className="text-lg text-gray-900">{artist.cancionDestacada}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Subgénero
                                </h3>
                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {artist.subgenero}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Reseña
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{artist.resena}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
