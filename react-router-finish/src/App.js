import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import Overview from './pages/Overview';
import Stats from './pages/Stats';
import UserProfile from './pages/UserProfile';
import UserDetails from './pages/UserDetails';
import UserSettings from './pages/UserSettings';
import UsersD from './data/UserData';

function App() {
const [isLoggedIn, setisLoggedIn] = useState(false);
const handleAuth = () => {
setisLoggedIn(!isLoggedIn);
};
return (
<Router>
<div className="App">
<nav className="topnav">
<div>
<ul>
<li>
<Link to="/">Home</Link>
</li>
<li>
<Link to="/about">About</Link>
</li>
<li>
<Link to="/contact">Contact</Link>
</li>
{isLoggedIn && (
<>
<li>
<Link to="/dashboard">Dashboard</Link>
</li>
<li>
<Link to="/user">User Profile</Link>
</li>
</>
)}
</ul>
<button onClick={handleAuth}>
{isLoggedIn ? 'Logout' : 'Login'}
</button>
</div>
</nav>
<Routes>
<Route path="/" element={<Home />} />

<Route path="/contact" element={<Contact />} />
<Route path="*" element={<PageNotFound />} />
<Route
path="/dashboard/*"
element={
<ProtectedRoute
element={<Dashboard />}
isAuthenticated={isLoggedIn}
/>
}>
<Route path="overview" element={<Overview />} />
<Route path="stats" element={<Stats />} />
</Route>
<Route
path="/about"
element={
<ProtectedRoute
element={<About />}
isAuthenticated={isLoggedIn}
/>
}
/>
<Route
path="/user/*"
element={
<ProtectedRoute
element={<UserProfile />}
isAuthenticated={isLoggedIn}
/>
}>
{/* <Route path="details/:userId/*" element={<UserDetails />} /> */}
<Route path="settings/:userId/*" element={<UserSettings />} />
</Route>
<Route
path="/user/details/:userId/*"
element={
<ProtectedRoute
element={<UserDetails />}
isAuthenticated={isLoggedIn}
/>
}></Route>
{/* Tambahkan rute login jika perlu */}
</Routes>
</div>
</Router>
);
}
export default App;