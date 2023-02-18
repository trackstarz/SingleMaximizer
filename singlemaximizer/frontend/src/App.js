import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import SinglesListPage from './pages/SinglesListPage'
import SinglePage from './pages/SinglePage'
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <Router>
      <div className="container light">
        <div className="app">
          <AuthProvider>
            <SideMenu />
          
            <Header />
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<SinglesListPage />}/>
              </Route>
              <Route path="/single/:id" element={<SinglePage />} />
              <Route path="/login/" element={<LoginPage />} />
              <Route path="/register/" element={<RegisterPage />} />
            
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
