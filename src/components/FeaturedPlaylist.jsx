import { useEffect, useState } from "react";
import LoadingScreen from "../pages/LoadingScreen";
import { useNavigate } from "react-router-dom";

const FeaturedPlaylist = ({ search }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("https://apis2.ccbp.in/spotify-clone/featured-playlists");
        if (!response.ok) throw new Error("Failed to fetch playlists");
        const data = await response.json();
        
        setPlaylists(data?.playlists?.items || []);
      } catch (err) {
        console.error("API fetch failed, using fallback:", err);
        
        try {
          const mockRes = await fetch("/playlists.json");
          const mockData = await mockRes.json();
          setPlaylists(
            mockData.map((item, idx) => ({
              id: `mock_${idx}`,
              name: item.name || `Mock Playlist ${idx+1}`,
              images: [{ url: item.image }],
              description: item.description,
            }))
          );
        } catch (mockErr) {
          console.error("Mock data fetch failed:", mockErr);
          setError("Failed to load playlists");
          setPlaylists([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  const filtered = playlists.filter(
    (playlist) =>
      playlist.name.toLowerCase().includes((search || "").toLowerCase()) ||
      playlist.description?.toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    // Updated margin top to account for navbar height and mobile sidebar
    <div className="grid grid-cols-2 mt-32 md:mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:ml-64 px-4">
      {filtered.map((playlist) => (
        <div
          key={playlist.id}
          className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition flex flex-col items-center w-full cursor-pointer"
          onClick={() => {
            console.log("Navigating to playlist:", playlist.id); // Debug log
            navigate(`/details/${playlist.id}`);
          }}
        >
          <img
            src={playlist.images?.[0]?.url || "https://via.placeholder.com/150"}
            alt={playlist.name}
            className="w-full h-32 object-cover rounded mb-3"
          />
          <h3 className="text-white font-semibold truncate mt-2 text-center w-full">{playlist.name}</h3>
          <p className="text-gray-400 text-sm text-center w-full line-clamp-2">{playlist.description || "No description"}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedPlaylist;