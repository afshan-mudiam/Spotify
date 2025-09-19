import React, { useEffect, useState } from "react";
import LoadingScreen from "../pages/LoadingScreen";
import Navbar from "../components/Navbar"; // Import Navbar

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://apis2.ccbp.in/spotify-clone/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const categoriesData = data?.categories?.items || [];
        setCategories(categoriesData);
        setFilteredCategories(categoriesData); // Initialize filtered list
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Search functionality for categories
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCategories(categories);
      return;
    }
    
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(query.toLowerCase()) ||
      category.id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
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
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition">
              <img
                src={cat.icons?.[0]?.url || "https://via.placeholder.com/150"}
                alt={cat.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="text-white font-semibold truncate">{cat.name}</h3>
              <p className="text-gray-400 text-sm truncate">{cat.name}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-8">
            <p>No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;