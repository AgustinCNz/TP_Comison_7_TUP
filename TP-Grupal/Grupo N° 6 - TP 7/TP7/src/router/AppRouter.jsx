// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from "../pages/dashboard/Dashboard";
import MiembrosPage from '../pages/MiembrosPage';
import ReportesPage from '../pages/ReportesPage';
import MainLayout from "../layout/MainLayOut.jsx";
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuthStore } from '../store/auth';

const AppRouter = () => {
  const token = useAuthStore(s => s.token);

  return (
    <Routes>
      {/* Si ya hay token, redirige a /dashboard; si no, muestra login */}
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="miembros" element={<MiembrosPage />} />
        <Route path="reportes" element={<ReportesPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
