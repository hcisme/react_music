import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

const App = lazy(() => import('../App'))
const Home = lazy(() => import('../component/Home'))
const Discovery = lazy(() => import('../pages/Discovery'))
const PlayLists = lazy(() => import('../pages/PlayLists'))
const NewSongs = lazy(()=> import('../pages/NewSongs'))
const Mvs = lazy(()=> import('../pages/Mvs'))
const Login = lazy(() => import('../component/Login'))

const router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOutlined />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home/*" element={<Home />}>
              <Route path="" element={<Navigate to="discovery" />} />
              <Route path="discovery" element={<Discovery />} />
              <Route path="playlists" element={<PlayLists />} />
              <Route path="newsongs" element={<NewSongs />} />
              <Route path="mvs" element={<Mvs />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default router
