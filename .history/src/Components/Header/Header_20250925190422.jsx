import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import "./header.css"
import TopHeader from '../TopFooter/TopHeader';
import Notifications from '../Notifications/Notifications';
import ConnectionStatus from '../ConnectionStatus/ConnectionStatus';
import { API_BASE, isDevelopment } from '../../config';
import { requestJson } from '../../lib/api';
function Header() {
  const location = useLocation()
  const navigate = useNavigate();
  const [token, setToken] = React.useState(() => localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = React.useState(() => localStorage.getItem('isAdmin') === 'true');
  const [userEmail, setUserEmail] = React.useState(null);

  React.useEffect(() => {
    const onStorage = () => {
      setToken(localStorage.getItem('token'));
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, [location.pathname]);

  React.useEffect(() => {
    if (token) {
      loadUserInfo();
    } else {
      setUserEmail(null);
    }
  }, [token]);

  async function loadUserInfo() {
    const response = await requestJson(`${API_BASE}/api/auth/me`);
    if (response.ok) {
      setUserEmail(response.data.user.email);
    }
  }

  function logout() {
    try { localStorage.removeItem('token'); localStorage.removeItem('isAdmin'); } catch {}
    setToken(null);
    setIsAdmin(false);
    navigate('/');
  }

  const links = token ? (isAdmin ? nav_data_admin : nav_data_logged_in) : nav_data_logged_out;

  return (
    <header>
        <TopHeader />
        <hr />
        <div className="container">
            <nav>
                <div className="logo">
                    <Link to={"/"} className='hiii'>
                        <img src="/Images/White Logo.png" height="105px" width="105px" alt="AndMI Logo"/>
                    </Link>
                    <h1><span>ASTI</span> Interactive Services</h1>
                </div>
                <ul>
                    {
                        links.map((item,index)=>(
                            <li className={location.pathname == item.url ? 'active_link' : ""} key={index}><NavLink  to={item.url}>{item.name}</NavLink></li>
                        ))
                    }
                    <li>
                      <ConnectionStatus />
                    </li>
                    {isDevelopment && (
                      <li>
                        <Link to="/test" style={{ color: '#ffcc00', fontSize: '12px' }}>
                          🔧 Test
                        </Link>
                      </li>
                    )}
                    {token && !isAdmin && (
                      <li>
                        <Notifications userEmail={userEmail} />
                      </li>
                    )}
                    {token && (
                      <li>
                        <button className="logout-btn" onClick={logout}>Chiqish</button>
                      </li>
                    )}
                </ul>
            </nav>
        </div>
    </header>
  )
}
export default Header
const nav_data_logged_out = [
    {
        id:1,
        name:'Asosiy',
        url:'/'
    },
    {
        id:2,
        name:'Biz haqimizda',
        url:'/about'
    },
    
    {
        id:3,
        name:'Xizmatlar',
        url:'/services'
    },
    {
        id:4,
        name:'Yangiliklar',
        url:'/news'
    },
    {
        id:5,
        name:'Aloqa',
        url:'/contact'
    },
    {
        id:6,
        name:"Ro'yxatdan o'tish",
        url:'/register'
    },
    {
        id:7,
        name:'Kirish',
        url:'/login'
    },
]

const nav_data_logged_in = [
    {
        id:1,
        name:'Asosiy',
        url:'/'
    },
    {
        id:2,
        name:'Biz haqimizda',
        url:'/about'
    },
    {
        id:3,
        name:'Xizmatlar',
        url:'/services'
    },
    {
        id:4,
        name:'Yangiliklar',
        url:'/news'
    },
    {
        id:5,
        name:'Aloqa',
        url:'/contact'
    },
    {
        id:8,
        name:'Profil',
        url:'/profile'
    }
]

const nav_data_admin = [
    {
        id:1,
        name:'Asosiy',
        url:'/'
    },
    {
        id:2,
        name:'Xizmatlar',
        url:'/services'
    },
    {
        id:3,
        name:'Admin panel',
        url:'/admin'
    }
]