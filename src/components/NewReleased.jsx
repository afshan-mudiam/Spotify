import React, { useEffect, useState } from "react";
import LoadingScreen from "../pages/LoadingScreen";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const NewReleased = () => {
  const [releases, setReleases] = useState([]);
  const [filteredReleases, setFilteredReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch("https://apis2.ccbp.in/spotify-clone/new-releases");
        if (!response.ok) {
          throw new Error("Failed to fetch new releases");
        }
        const data = await response.json();
        const releasesData = data?.albums?.items || [];
        setReleases(releasesData);
        setFilteredReleases(releasesData); // Initialize filtered list
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReleases();
  }, []);

  // Search functionality for new releases
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredReleases(releases);
      return;
    }
    
    const filtered = releases.filter(album =>
      album.name.toLowerCase().includes(query.toLowerCase()) ||
      album.artists?.some(artist => 
        artist.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredReleases(filtered);
  };

  if (loading) return <LoadingScreen />;
  if (error) return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="pt-32 md:pt-20 md:ml-64 px-4">
        <p className="text-red-400">Error: {error}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="grid grid-cols-2 mt-32 md:mt-20 md:grid-cols-4 lg:grid-cols-5 gap-4 md:ml-64 px-4">
        {filteredReleases.length > 0 ? (
          filteredReleases.map((album) => (
            <div
              key={album.id}
              className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition flex flex-col items-center w-full cursor-pointer"
              onClick={() => navigate(`/details/${album.id}`)}
            >
              <img
                src={album.images?.[0]?.url || "https://via.placeholder.com/150"}
                alt={album.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="text-white font-semibold truncate mt-2 text-center w-full">{album.name}</h3>
              <p className="text-gray-400 text-sm truncate text-center w-full">
                {album.artists?.map(a => a.name).join(", ")}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-8">
            <p>No new releases found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewReleased;