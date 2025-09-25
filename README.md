# 🎵 Spotify-like Music Streaming Platform (Replica)

A React-based **Spotify-inspired web app** that allows users to browse playlists, play tracks, and manage personal playlists.  
The project demonstrates **authentication, global player state, search & filtering, and mock API integration** with React best practices.

---

## 🚀 Features

- **Authentication**
  - Login with JWT stored in `js-cookie`.
  - Authenticated sessions persist across routes.

- **Dashboard**
  - Displays featured playlists (mock API).
  - Clicking a playlist → navigates to `/details/:id`.

- **Playlist Page**
  - Renders list of tracks with name, duration, and play button.
  - Track-level state → play/pause icon updates only for the clicked track.

- **Player Component (Global)**
  - Fixed bottom audio player (visible across all routes).
  - Displays current track info.
  - Controls: play/pause, next/previous, and seek.

- **Search & Filtering**
  - Global search bar for tracks/playlists.
  - Filter logic implemented via local state for minimal complexity.

- **User Playlists**
  - Create, add, delete, and update tracks in custom playlists.
  - Data stored in **local state**.

- **API Integration**
  - Mock fetch API for playlists & tracks.
  - Handles **loading, success, and error** states gracefully.

---

## 🛠️ Tech Stack

- **Frontend:** React (Functional + Lifecycle Methods mix)  
- **Routing:** React Router (with dynamic params for playlist & track IDs)  
- **State Management:** Context API (global player + auth state)  
- **Styling:** Used tailwindCSS  
- **Icons & UI:** React Icons + custom styled elements
- **Auth & Cookies:** JWT + js-cookie  

---

## 📂 Project Structure
src/
├── components/ # Reusable UI components (Player, TrackCard, PlaylistCard)

├── context/ # Global contexts (Auth, Player, Playlists)

├── pages/ # Route-level pages (Dashboard, Playlist, Login, Register)

├── App.jsx # Routing setup

└── main.jsx # Entry point

## ⚙️ Installation & Setup

1. **Clone the repo**

git clone https://github.com/afshan-mudiam/Spotify.git

cd spotify-clone

##  Install dependencies

npm install


## Run the app

npm run dev


---

## 🔑 Demo Credentials

Use the following test accounts to log in:

| Username | Password   |
|----------|------------|
| rahul    | rahul@2021 |
| aakash   | sky@007    |
| advika   | world@5    |
| harshad  | joy@85     |
| agastya  | myth#789   |

---
