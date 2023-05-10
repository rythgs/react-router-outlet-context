import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useOutletContext,
} from "react-router-dom";

type ContextType = { setTitle: React.Dispatch<React.SetStateAction<string>> };

const useTitle = () => {
  return useOutletContext<ContextType>();
};

const Logo = ({ title }: { title: string }) => <h1>Sample: {title}</h1>;

const App = () => {
  const [title, setTitle] = useState("Home");
  return (
    <div className="app">
      <Logo title={title} />
      <main>
        <Outlet context={{ setTitle }} />
      </main>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/hoge">Hoge</Link>
        </li>
      </ul>
    </div>
  );
};

const Home = () => {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("🤔");
  }, [setTitle]);
  return <div>This is Home page.</div>;
};

const Hoge = () => {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("😜");
  }, [setTitle]);
  return <div>This is Hoge page.</div>;
};

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/hoge", element: <Hoge /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
