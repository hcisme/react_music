import React from 'react'
import Top from '../Top'
import Main from '../Main'
import UseMusic from '../../hooks/UseMusic'

export default function Home() {
  return (
    <div className="home">
      <Top></Top>
      <Main></Main>
      <UseMusic></UseMusic>
    </div>
  )
}
