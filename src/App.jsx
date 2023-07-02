import { useRoutes } from 'react-router-dom'
import Router from './router'
import RouterView from './router/router'
import './App.css'

export default function App() {
  const elements = useRoutes(Router)
  return elements
}
