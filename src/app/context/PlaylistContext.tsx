"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Tracks = {
  track: {
    id: string;
    name: string;
    album: { images: { url: string }[]; name: string };
    artists: { name: string }[];
    uri: string;
  };
};

interface PlaylistContextType {
  playlistId: string | null;
  setPlaylistId: (id: string) => void;
  playlistTracks: Tracks[];
  error: string;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<Tracks[]>([]);
  const [error, setError] = useState("");

  console.log(playlistId);

  useEffect(() => {
    async function fetchPlaylists() {
      if (!playlistId) return;

      try {
        const res = await fetch(`/api/spotify/tracks/${playlistId}`);
        if (!res.ok) {
          throw new Error("Erro ao buscar músicas da playlist");
        }
        const data = await res.json();
        setPlaylistTracks(data.items || []);
      } catch (err) {
        setError(`Erro ao buscar músicas da playlist [erro]: ${err}`);
      }
    }

    fetchPlaylists();
  }, [playlistId]);

  return (
    <PlaylistContext.Provider
      value={{ playlistId, setPlaylistId, playlistTracks, error }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist deve ser usado dentro de um PlaylistProvider");
  }
  return context;
};
