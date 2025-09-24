import React, { useContext } from "react";
import { LikedContext } from "../context/LikedContext";
import { PlayerContext } from "../context/PlayerContext";
const Liked = ({ search = "" }) => {
  const { likedTracks, removeLikedTrack } = useContext(LikedContext);
  const searchTerm = search.toLowerCase();
  const filteredTracks = likedTracks.filter(track => {
    const name = track.name?.toLowerCase() || "";
    const artists = track.artists?.map(a => a.name.toLowerCase()).join(", ") || "";
    return name.includes(searchTerm) || artists.includes(searchTerm);
  });
  const { playTrack } = useContext(PlayerContext);

  return (
  <div className="flex flex-col mb-20 items-center justify-center min-h-screen md:ml-64 p-2 md:p-6 bg-[#161e2e] w-full ">
  <div className="w-full max-w-3xl px-2 md:px-0 mx-auto">
        <h2 className="text-3xl font-bold mt-10 mb-6 text-white text-center">Liked Tracks</h2>
        {filteredTracks.length === 0 ? (
          <p className="text-white text-center">No liked tracks found.</p>
        ) : (
          <div className="rounded-lg">
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            <ul className="space-y-6 hide-scrollbar">
              {filteredTracks.map((track) => (
                <li
                  key={track.id}
                  className="flex items-center bg-gray-800 rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-700 transition border border-gray-700"
                  onClick={() => playTrack(track, filteredTracks)}
                >
                  <img
                    src={track.album?.images?.[0]?.url || "https://via.placeholder.com/50"}
                    alt={track.name}
                    className="w-16 h-16 rounded mr-6"
                  />
                  <div className="flex-1">
                    <div className="text-white font-semibold text-xl">{track.name}</div>
                    <div className="text-gray-400 text-md">{track.artists?.map(a => a.name).join(", ")}</div>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeLikedTrack(track.id);
                    }}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    title="Remove from liked"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Liked;
