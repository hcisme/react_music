import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('../component/Login'))
const Home = lazy(() => import('../component/Home'))
const Discovery = lazy(() => import('../pages/Discovery'))
const PlayLists = lazy(() => import('../pages/PlayLists'))
const NewSongs = lazy(() => import('../pages/NewSongs'))
const Mvs = lazy(() => import('../pages/Mvs'))
const PlayList = lazy(() => import('../pages/Playlist'))
const Mv = lazy(() => import('../pages/Mv'))

const router = [
  {
    path: '/',
    element: <Navigate to="home" />,
  },
  {
    path: 'home/*',
    element: <Home />,
    children: [
      { path: '', element: <Navigate to="discovery" /> },
      { path: 'discovery', element: <Discovery /> },
      { path: 'playlists', element: <PlayLists /> },
      { path: 'newsongs', element: <NewSongs /> },
      { path: 'mvs', element: <Mvs /> },
      { path: 'playlist/:id', element: <PlayList /> },
      { path: 'mv/:id', element: <Mv /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]

export default router
