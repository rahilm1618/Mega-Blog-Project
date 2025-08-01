import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import appwriteauth from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteauth.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({
          userData: userData
        }));
      }
      else {
        dispatch(logout());
      }
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {

    return <div className='h-screen flex items-center justify-center'>Loading...</div>
  }
  else {
    return (
      <div className='min-h-screen flex flex-wrap text-3xl font-bold text-center bg-gray-500 '>
        <div className='w-full p-4 block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
