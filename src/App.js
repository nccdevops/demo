
// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { DesignPad } from './components/DesignPad';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import About from './components/About';
import Login from './components/Login';
import FeedbackForm from './components/FeedbackForm';

const PrivateRoute = ({ children }) => {

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = '/workspace/demo/public/favicon.ico'; // Update this path
    document.head.appendChild(favicon);
  }, []);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/design"
          element={
            <PrivateRoute>
              <DesignPad />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <FeedbackForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;