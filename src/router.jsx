import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import UserForm from "./views/UserForm.jsx";
import Todos from "./views/Todos.jsx";
import TodoForm from "./views/TodoForm.jsx";
import MoneyForm from "./views/MoneyForm.jsx";
import MoneyShow from "./views/MoneyShow.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },

      {
        path: '/science',
        element: <Todos/>
      },
      {
        path: '/science/:id',
        element: <TodoForm key="Todoupdate"/>
      },
      {
        path: '/science/new',
        element: <TodoForm key="TodoCreate"/>
      },

      {
        path: '/money',
        element: <MoneyShow key="showmonery" />
      },
      {
        path: '/money/:id',
        element: <MoneyForm key="editmoney" />
      },
      {
        path: '/money/new',
        element: <MoneyForm key="editmoney" />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup-dhruvishlathiya',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
