import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../pages/LoadingScreen";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching details for ID:", id);
        
        if (id.startsWith("mock_")) {
          await handleMockData();
        } else {
          await handleAPIData();
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError(err.message);
        // Try fallback to mock data
        try {
          await handleMockData();
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
          setNotFound();
        }
      } finally {
        setLoading(false);
      }
    };

    const handleMockData = async () => {
      const mockRes = await fetch("/playlists.json");
      if (!mockRes.ok) {
        throw new Error("Failed to fetch mock data");
      }
      
      const mockData = await mockRes.json();
      const idx = parseInt(id.replace("mock_", ""), 10);
      const mockItem = mockData[idx];
      
      if (!mockItem) {
        throw new Error("Mock item not found");
      }
      
      setItem({
        name: mockItem.name,
        images: [{ url: mockItem.image }],
        description: mockItem.description || "No description available",
      });
      
      setTracks([
        {
          id: "track1",
          name: "Sample Track 1",
          album: {
            name: "Mock Album",
            images: [{ url: mockItem.image }],
          },
          artists: [{ name: "Mock Artist" }],
          duration_ms: 180000,
          preview_url: "",
        },
        {
          id: "track2",
          name: "Sample Track 2",
          album: {
            name: "Mock Album",
            images: [{ url: mockItem.image }],
          },
          artists: [{ name: "Mock Artist" }],
          duration_ms: 200000,
          preview_url: "",
        },
      ]);
      
      console.log("Mock data loaded successfully");
    };

    const handleAPIData = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const playlistRes = await fetch(
        `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!playlistRes.ok) {
        throw new Error(`Failed to fetch playlist details: ${playlistRes.status} ${playlistRes.statusText}`);
      }

      const playlistData = await playlistRes.json();
      console.log("API Response:", playlistData);

      if (!playlistData) {
        throw new Error("No data received from API");
      }

      // Handle different possible API response structures
      const playlist = playlistData.playlist || playlistData;
      
      if (!playlist) {
        throw new Error("No playlist data found in response");
      }

      setItem({
        name: playlist.name || "Unknown Playlist",
        images: playlist.images || [],
        description: playlist.description || "No description available",
      });

      // Handle tracks data - check multiple possible structures
      let tracksData = [];
      
      if (playlistData.tracks?.items) {
        // Spotify-style structure
        tracksData = playlistData.tracks.items
          .map(item => item.track || item)
          .filter(track => track && track.id);
      } else if (playlistData.tracks && Array.isArray(playlistData.tracks)) {
        // Direct array structure
        tracksData = playlistData.tracks.filter(track => track && track.id);
      } else if (playlist.tracks?.items) {
        // Nested in playlist object
        tracksData = playlist.tracks.items
          .map(item => item.track || item)
          .filter(track => track && track.id);
      } else if (playlist.tracks && Array.isArray(playlist.tracks)) {
        // Direct array in playlist
        tracksData = playlist.tracks.filter(track => track && track.id);
      }

      const processedTracks = tracksData.map(track => ({
        id: track.id,
        name: track.name || "Unknown Track",
        album: {
          name: track.album?.name || "Unknown Album",
          images: track.album?.images || [],
        },
        artists: Array.isArray(track.artists) ? track.artists : [{ name: "Unknown Artist" }],
        duration_ms: track.duration_ms || 0,
        preview_url: track.preview_url || "",
      }));

      setTracks(processedTracks);
      console.log("Processed tracks:", processedTracks);
    };

    const setNotFound = () => {
      setItem({
        name: "Playlist Not Found",
        images: [{
          url: "https://c8.alamy.com/comp/JRY983/icon-logo-spotify-music-streaming-service-music-streaming-macro-detail-JRY983.jpg",
        }],
        description: "The requested playlist could not be found.",
      });
      setTracks([]);
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const formatDuration = (ms) => {
    if (!ms) return "--:--";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAudioPlay = (audioElement) => {
    // Stop ALL other audio elements immediately
    const allAudioElements = document.querySelectorAll('audio');
    allAudioElements.forEach(audio => {
      if (audio !== audioElement && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    // Set the new playing audio
    setCurrentPlayingAudio(audioElement);
  };

  const handleAudioPause = () => {
    setCurrentPlayingAudio(null);
  };

  const handleAudioEnded = () => {
    setCurrentPlayingAudio(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!item) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-2 sm:p-6">
      <div className="bg-[#101820] rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-full sm:max-w-4xl lg:max-w-6xl relative flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white bg-green-500 hover:bg-green-400 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-2xl shadow-md transition z-10"
        >
          ×
        </button>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-2 sm:p-3 m-2 sm:m-4 text-red-200 text-xs sm:text-sm">
            Error: {error}
          </div>
        )}

        {/* Image and Info */}
        <div className="flex flex-col items-center pt-8 sm:pt-10 pb-3 sm:pb-4 px-3 sm:px-4">
          <img
            src={item.images?.[0]?.url || "https://via.placeholder.com/150"}
            alt={item.name}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl mb-3 sm:mb-4 border-2 border-gray-800 shadow-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
          <h2 className="text-white font-bold text-xl sm:text-2xl mb-2 text-center px-2">
            {item.name}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-2 text-center max-w-xl px-2">
            {item.description}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {tracks.length} track{tracks.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Track List */}
        <div className="px-2 sm:px-4 pb-4 sm:pb-6">
          {tracks.length > 0 ? (
            <ul className="space-y-3 sm:space-y-4">
              {tracks.map((track, idx) => (
                <li
                  key={track.id || idx}
                  className="flex flex-col bg-gradient-to-r from-[#1a1f2e] via-[#141922] to-[#1a1f2e] rounded-lg sm:rounded-xl p-3 sm:p-4 w-full shadow-lg border border-gray-800 hover:border-green-500 transition-all duration-300"
                >
                  {/* Mobile Layout - Stacked */}
                  <div className="flex items-center space-x-3 mb-3 sm:hidden">
                    <img
                      src={track.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                      alt={track.album?.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-800 shadow-md flex-shrink-0"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base leading-tight mb-1 truncate">
                        {track.name}
                      </h3>
                      <p className="text-gray-300 text-sm font-medium truncate">
                        {track.album?.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {track.artists?.map((artist) => artist.name).join(", ")}
                      </p>
                      <span className="text-green-400 text-xs mt-1 block">
                        Duration: {formatDuration(track.duration_ms)}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Layout - Horizontal Full Width */}
                  <div className="hidden sm:flex items-center space-x-4 w-full">
                    <img
                      src={track.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                      alt={track.album?.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-800 shadow-md flex-shrink-0"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    <div className="flex-1 min-w-0 mr-4">
                      <h3 className="text-white font-bold text-lg leading-tight mb-1 truncate">
                        {track.name}
                      </h3>
                      <p className="text-gray-300 text-sm font-medium truncate">
                        {track.album?.name}
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        {track.artists?.map((artist) => artist.name).join(", ")}
                      </p>
                      <span className="text-green-400 text-xs mt-1">
                        Duration: {formatDuration(track.duration_ms)}
                      </span>
                    </div>
                    
                    {/* Audio Player - Desktop Right Side */}
                    <div className="flex-shrink-0 w-80 lg:w-96 flex flex-col items-center">
                      {track.preview_url ? (
                        <div className="flex flex-col items-center w-full">
                          <audio
                            controls
                            src={track.preview_url}
                            className="w-full"
                            preload="none"
                            onPlay={(e) => handleAudioPlay(e.target)}
                            onPause={handleAudioPause}
                            onEnded={handleAudioEnded}
                          />
                          <span className="text-gray-400 text-xs mt-1">
                            Preview (30s)
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          No preview available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Audio Player - Full Width on Mobile Only */}
                  <div className="w-full flex flex-col items-center mt-2 sm:hidden">
                    {track.preview_url ? (
                      <div className="flex flex-col items-center w-full">
                        <audio
                          controls
                          src={track.preview_url}
                          className="w-full max-w-sm"
                          preload="none"
                          onPlay={(e) => handleAudioPlay(e.target)}
                          onPause={handleAudioPause}
                          onEnded={handleAudioEnded}
                        />
                        <span className="text-gray-400 text-xs mt-1">
                          Preview (30s)
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        No preview available
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 text-center mt-8 text-base sm:text-lg px-4">
              {loading ? "Loading tracks..." : "No tracks available"}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-800 py-3 sm:py-4 px-3 sm:px-4 mt-auto">
          <button className="text-white text-lg sm:text-xl hover:text-green-400 transition">
            ≡
          </button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify"
            className="h-5 sm:h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;