import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import {
  artistService,
  type Artist,
  type CreateArtistRequest,
} from "~/services/api";
import ArtistSidebar from "~/components/ArtistSidebar";
import ArtistDetails from "~/components/ArtistDetails";

export const meta: MetaFunction = () => {
  return [
    { title: "Rock Project - Artist Manager" },
    { name: "description", content: "Manage your favorite rock artists" },
  ];
};

export default function Index() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      setLoading(true);
      const fetchedArtists = await artistService.getArtists();
      setArtists(fetchedArtists);
      setError(null);
    } catch (err) {
      setError("Failed to load artists. Please try again.");
      console.error("Error loading artists:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddArtist = async (newArtist: CreateArtistRequest) => {
    try {
      const createdArtist = await artistService.createArtist(newArtist);
      setArtists((prev) => [...prev, createdArtist]);
    } catch (err) {
      setError("Failed to add artist. Please try again.");
      console.error("Error adding artist:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading artists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-semibold">{error}</p>
          </div>
          <button
            onClick={loadArtists}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <ArtistSidebar
        artists={artists}
        selectedArtist={selectedArtist}
        onSelectArtist={setSelectedArtist}
        onAddArtist={handleAddArtist}
      />
      <ArtistDetails artist={selectedArtist} />
    </div>
  );
}
