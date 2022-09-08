import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircleTwoTone } from '@ant-design/icons';

export default function UseCard(props) {
  const { id, picUrl, name, alg } = props;

  const navigate = useNavigate();

  return (
    <div
      className="item cursor"
      key={id}
      onClick={() => {
        navigate(`/home/playlist/${id}`);
      }}
    >
      <div className="posterImg" style={{ position: 'relative' }}>
        <img src={picUrl} alt="出错了 刷新试试" style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }} />
        <PlayCircleTwoTone
          className="hover1"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, fontSize: '1.65rem' }}
        />
      </div>
      <div className="text" style={{ marginTop: '.5rem' }}>
        <div className="title wordbreak" style={{ fontSize: '15px' }}>
          {name}
        </div>
        <div className="info wordbreak" style={{ fontSize: '.75rem', opacity: 0.6, marginTop: '.125rem' }}>
          {alg}
        </div>
      </div>
    </div>
  );
}
