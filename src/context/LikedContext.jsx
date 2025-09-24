import React, { createContext, useState } from "react";

export const LikedContext = createContext();

const LikedProvider = ({ children }) => {
  const [likedTracks, setLikedTracks] = useState(() => {
    const stored = localStorage.getItem("likedTracks");
    return stored ? JSON.parse(stored) : [];
  });

  const addLikedTrack = (track) => {
    setLikedTracks((prev) => {
      if (prev.find((t) => t.id === track.id)) return prev;
      const updated = [...prev, track];
      localStorage.setItem("likedTracks", JSON.stringify(updated));
      return updated;
    });
  };

  const removeLikedTrack = (trackId) => {
    setLikedTracks((prev) => {
      const updated = prev.filter((t) => t.id !== trackId);
      localStorage.setItem("likedTracks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <LikedContext.Provider value={{ likedTracks, addLikedTrack, removeLikedTrack }}>
      {children}
    </LikedContext.Provider>
  );
};

export default LikedProvider;
