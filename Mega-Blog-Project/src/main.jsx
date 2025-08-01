import Home from './components/pages/Home.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import { AuthLayout } from './components/AuthLayout.jsx'
import AllPost from './components/pages/AllPost.jsx'
import EditPost from './components/pages/EditPost.jsx'
import Post from './components/pages/Post.jsx'
import Signup from './components/pages/SignupP.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
      <Route path="/all-posts" element={<AuthLayout authentication>{" "}
        <AllPost />
      </AuthLayout>} />
      <Route path="/add-post" element={<AuthLayout authentication>{" "}
        <AddPost />
      </AuthLayout>} />
      <Route path="/edit-post/:slug" element={<AuthLayout authentication>{" "}
        <EditPost />
      </AuthLayout>} />
      <Route path="/post/:slug" element={
        <Post />
      } />


    </Route>

  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  ,
)
