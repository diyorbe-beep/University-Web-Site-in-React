import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Services from './Pages/Services/Services';
import News from './Pages/News/News';
import Footer from './Components/Footer/Footer';
import BBB from './Components/BizBilanBog\'laning/BBB';
import GoogleMapComponent from './Components/GoogleMap/GoogleMap';
import Admin from './Pages/Admin';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <BBB />
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
