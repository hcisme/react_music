import React, { useEffect } from 'react'
// import store from '../../redux/store';
import './index.css'

export default function MusicInfo() {
  useEffect(() => {
    // console.log(store.getState());
  })

  return (
    <div className="singermusicinfo">
      <div className='header'>
        <div className="picyrl" style={{ width: '14rem', height: '14rem', borderRadius: '50%', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://p2.music.126.net/0KC-cAFqdJHDomIl3dSv4Q==/109951166676094043.jpg" alt="" style={{ width: '10.125rem', height: '10.125rem', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  )
}
