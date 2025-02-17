"use client";

import Image from "next/image";
import { usePlaylist } from "../../context/PlaylistContext";

const PlaylistPage = () => {
  const { playlistTracks, error } = usePlaylist();
  console.log(playlistTracks);

  return (
    <div>
      <button className="p-2 hover:scale-110 transition-transform px-4 bg-[#1ED760] duration-300 ease-out text-black font-bold rounded-full">
        Play Game
      </button>
      {error && <p>{error}</p>}
      <table className="w-full mt-4">
        <thead className="border-b-[1px] border-[#535353] text-sm">
          <tr>
            <th className="py-4 px-4 text-left">#</th>
            <th className="py-4 px-4 text-left">Title</th>
            <th className="py-4 px-4 text-left">Album</th>
          </tr>
        </thead>
        <tbody>
          {playlistTracks &&
            playlistTracks.map((track, index) => (
              <tr
                className="gap-2 p-4 w-full hover:bg-popover-foreground"
                key={index}
              >
                <td className="py-2 px-2 font-sans font-medium text-[#a8a8a8]">
                  {index + 1}
                </td>
                <td className="py-2 px-2 flex flex-row items-center gap-2">
                  <Image
                    width={40}
                    height={40}
                    src={track.track.album.images[0]?.url}
                    alt={track.track.name}
                    className="w-[30px] h-[30px] object-cover rounded-sm"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans font-medium leading-none">
                      {track.track.name}
                    </span>
                    <p className="font-sans text-sm text-[#a8a8a8] leading-none">
                      {track.track.artists[0].name}
                    </p>
                  </div>
                </td>
                <td className="py-2 px-2 font-sans text-sm text-[#a8a8a8]">
                  {track.track.album.name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistPage;
