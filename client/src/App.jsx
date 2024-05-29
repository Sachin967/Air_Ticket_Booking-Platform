import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import Home from './pages/Home';
import SearchResultsPage from './pages/SearchResultsPage';
import PrivateRoutesAdmin from './PrivateRouteAdmin';
import AdminHome from './pages/admin/AdminHome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Layout from './Layout';
import PrivateRoutesUser from './PrivateRoutesUser';
import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {
  return (
    <div className="bg-[#FFFFFF]">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route element={<PrivateRoutesUser />}>
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Route>
          </Route>
          <Route element={<PrivateRoutesAdmin />}>
            <Route path="/admin" element={<AdminHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
