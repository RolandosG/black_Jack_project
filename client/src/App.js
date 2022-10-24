import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  GamePlay,
  GameHistory,
  Profile,
  Stats,
  SharedLayout,
  News,
  Instructions,
  Achievements
} from "./pages/dashboard";

import { Landing, Register, Error, ProtectedRoute } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="game-play" element={<GamePlay />}></Route>
          <Route path="game-history" element={<GameHistory />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="instructions" element={<Instructions />}></Route>
          <Route path="news" element={<News />}></Route>
          <Route path="achievements" element={<Achievements/>}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
