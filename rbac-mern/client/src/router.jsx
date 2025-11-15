import { createBrowserRouter } from 'react-router-dom';
import Guarded from './components/Guarded';
import Posts from './pages/Posts';
import PostEditor from './pages/PostEditor';
import AdminUsers from './pages/AdminUsers';
import Login from './pages/Login';
import NewPost from './pages/NewPost';

export const router = createBrowserRouter([
  { path: '/login', element: <Login/> },
  { path: '/', element: <Guarded><Posts/></Guarded> },
  { path: '/posts/new', element: <Guarded><NewPost/></Guarded> },
  { path: '/posts/:id', element: <Guarded><PostEditor/></Guarded> },
  { path: '/admin/users', element: <Guarded><AdminUsers/></Guarded> }
]);
