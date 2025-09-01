import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import NewReleased from "../components/NewReleased";
import FeaturedPlaylist from "../components/FeaturedPlaylist";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "featured"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Save current section in localStorage whenever it changes
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  useEffect(() => {
    const showCategoriesHandler = () => setActiveSection("categories");
    const showNewReleasedHandler = () => setActiveSection("newReleases");
    const showHomePlaylistsHandler = () => setActiveSection("featured");

    window.addEventListener("show-categories", showCategoriesHandler);
    window.addEventListener("show-new-releases", showNewReleasedHandler);
    window.addEventListener("show-home-playlists", showHomePlaylistsHandler);

    return () => {
      window.removeEventListener("show-categories", showCategoriesHandler);
      window.removeEventListener("show-new-releases", showNewReleasedHandler);
      window.removeEventListener("show-home-playlists", showHomePlaylistsHandler);
    };
  }, []);

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar onSearch={setSearch} />

        <div className="p-6 pt-24 md:pt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white mt-3 md:ml-64 md:mt-10">
              Welcome to Spotify Remix
            </h2>
          </div>

          {activeSection === "categories" ? (
            <Categories search={search} />
          ) : activeSection === "newReleases" ? (
            <NewReleased search={search} />
          ) : (
            <FeaturedPlaylist search={search} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
