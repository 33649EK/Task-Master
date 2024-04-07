import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import FriendsTest from './pages/FriendsTest';
import LandingPage from './pages/LandingPage'; 


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },{
        path: '/home',
        element: <Home />,
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profiles/:profileId',
        element: <Profile />,
      },
      {
        path: '/me',
        element: <Profile />,
      },
      {
        path: '/friendsTest',
        element: <FriendsTest />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
