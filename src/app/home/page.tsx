"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePlaylist } from "../context/PlaylistContext";

type Playlist = {
  id: string;
  name: string;
  images: { url: string }[];
  uri: string;
};

export default function HomePage() {
  const { setPlaylistId } = usePlaylist();
  const route = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch("/api/spotify/playlists");
        if (!res.ok) {
          throw new Error("Erro ao buscar playlists");
        }
        const data = await res.json();
        setPlaylists(data.items || []);
      } catch (err) {
        setError(
          `Falha ao carregar playlists. Faça login novamente. [erro]: ${err}`
        );
      }
    }

    fetchPlaylists();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Minhas Playlists</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div
            onClick={() => {
              setPlaylistId(playlist.id);
              route.push(`/playlist/${playlist.id}`);
            }}
            key={playlist.id}
            className="border p-2 rounded-lg flex flex-col max-w-[200px] max-h-[400px] hover:bg-popover-foreground"
          >
            <div className="rounded-md overflow-hidden">
              <Image
                width={300}
                height={300}
                src={playlist.images[0]?.url}
                alt={playlist.name}
                className="w-full h-[150px] object-cover"
              />
            </div>
            <p className="w-full line-clamp-2 text-wrap mt-2 font-sans font-semibold text-[#a8a8a8]">
              {playlist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
