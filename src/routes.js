import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./contexts/AuthContext";
import MatchesPage from "./pages/MatchesPage";
import PlayersPage from "./pages/PlayersPage";
import TeamsPage from "./pages/TeamsPage";
import ForgotPassword from "./pages/ForgotPassword";
import MatchForm from "./pages/MatchForm";
import ProjectDetails from "./pages/ProjectDetails";
import Renovation from "./pages/Renovation";
import Residentials from "./pages/Residentials";
import Commercial from "./pages/Commercial";

const AppRoutes = () => {
  const { authenticated } = useAuth();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      {authenticated && (
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/matches/create" element={<MatchForm />} />{" "}
          <Route path="/matches/edit/:id" element={<MatchForm />} />{" "}
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/ProjectDetails" element={<ProjectDetails />} />
          <Route path="/Renovation" element={<Renovation />} />
          <Route path="/Residentials" element={<Residentials />} />
          <Route path="/Commercial" element={<Commercial />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
