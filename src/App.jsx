import { Home, NotFound, Result, Schedule, Stage, ScoreBoard, TVscreen } from './pages';
import Layout from '@/components/layout';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { useEffect } from 'react';

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "result",
        element: <Result />,
      },
      {
        path: "schedule/:dateState",
        element: <Schedule />,
      },
      {
        path: "stage/:date/:id",
        element: <Stage />,
      },
      {
        path: "scoreboard",
        element: <ScoreBoard />,
      },
    ],
  },
  {
    path: "tv",
    element: <TVscreen />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];


function App() {

  const location = useLocation();
  const GAID = import.meta.env.VITE_GA_ID;

  // Initialize Google Analytics
  useEffect(() => {
    ReactGA.initialize(GAID);
  }, []);

  // Track page views on route change
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <Routes>
      {routes.map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children?.map(({ path: childPath, element: childElement }) => (
            <Route key={childPath} path={childPath} element={childElement} />
          ))}
        </Route>
      ))}
    </Routes>
  );
}

export default App;
