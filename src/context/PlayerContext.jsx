import React, { createContext, useState, useCallback } from "react";

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  // Play a specific track
  const playTrack = useCallback((track, tracks = []) => {
    setCurrentTrack(track);
    setTrackList(tracks);
    setTrackIndex(tracks.findIndex(t => t.id === track.id));
    setIsPlaying(true);
    setCurrentTime(0);
  }, []);

  // Play/pause controls
  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);

  // Next/previous track
  const next = useCallback(() => {
    if (trackList.length > 0 && trackIndex < trackList.length - 1) {
      setTrackIndex(idx => {
        const nextIdx = idx + 1;
        setCurrentTrack(trackList[nextIdx]);
        setCurrentTime(0);
        return nextIdx;
      });
      setIsPlaying(true);
    }
  }, [trackList, trackIndex]);

  const prev = useCallback(() => {
    if (trackList.length > 0 && trackIndex > 0) {
      setTrackIndex(idx => {
        const prevIdx = idx - 1;
        setCurrentTrack(trackList[prevIdx]);
        setCurrentTime(0);
        return prevIdx;
      });
      setIsPlaying(true);
    }
  }, [trackList, trackIndex]);

  // Seek bar
  const setSeek = useCallback((value) => {
    setCurrentTime(value);
  }, []);

  // Context value
  const value = {
    currentTrack,
    isPlaying,
    play,
    pause,
    next,
    prev,
    playTrack,
    setSeek,
    seek: currentTime,
    volume,
    setVolume,
    duration,
    setDuration,
    setCurrentTime,
    currentTime,
    trackList,
    trackIndex,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export default PlayerProvider;
