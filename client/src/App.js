
import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/routes/PrivateRoutes';
import PublicRoutes from './components/routes/PublicRoutes';

function App() {
  return (
    < >
    <ToastContainer/>
    <Routes>
        
        <Route path='/' element={<PublicRoutes><HomePage/></PublicRoutes>}/>
        <Route path='/login' element={<PublicRoutes><LoginPage/></PublicRoutes>}/>
        <Route path='/register' element={<PublicRoutes><RegisterPage/></PublicRoutes>}/>
        <Route path='/dashboard' element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
        <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    
    </>
  );
}

export default App;
