import { useRoutes } from 'react-router-dom'
import Router from './router/index.js'
import './App.css'

export default function App() {
  const elements = useRoutes(Router)
  return elements
}
