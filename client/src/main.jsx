import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Break from './components/Break';
import FriendsTest from './pages/friendsTest.jsx';
import Break from "./components/Break"// I dont think we need this one since its integrated on the timers page -H
import LandingPage from './pages/LandingPage'; 


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        element: <LandingPage />
      }, {
        path: '/home',
        element: <Home />,
      },
      {
        element: <Home />
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
        path: '/break',
        element: <Break />,
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
