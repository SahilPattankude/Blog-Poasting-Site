import React, { useState, createContext } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import EditPost from "./Components/EditPost";
import DeletePost from "./Components/DeletePost";
import CreatePost from "./Components/CreatePost";
import ErrorPage from "./Components/ErrorPage";
import Layout from "./pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import PostDetails from "./Components/PostDetails";
import HomePage from "./Components/HomePage";
import UserProfile from "./Components/UserProfile";
import Dashboard from "./Components/Dashboard";

// Create User Context
export const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Header will be in the Layout
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "create", element: <CreatePost /> },
      { path: "delete", element: <DeletePost /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "error", element: <ErrorPage /> },
      { path: "posts/:id", element: <PostDetails /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "myposts/:id", element: <Dashboard /> },
    ],
  },
]);

function App() {
  const [user, setUser] = useState({ username: "Guest" }); // Global state for user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
