import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('../component/Home'))
const Discovery = lazy(() => import('../pages/Discovery'))
const PlayLists = lazy(() => import('../pages/PlayLists'))
const NewSongs = lazy(() => import('../pages/NewSongs'))
const Mvs = lazy(() => import('../pages/Mvs'))
const PlayList = lazy(() => import('../pages/Playlist'))
const Mv = lazy(() => import('../pages/Mv'))
const Result = lazy(() => import('../pages/Result'))
const UserInfo = lazy(() => import('../pages/UserInfo'))

const NotFound = lazy(() => import('../pages/NotFound'))

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
      { path: 'result/:searchword', element: <Result /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '/userinfo', element: <UserInfo /> },
]

export default router
