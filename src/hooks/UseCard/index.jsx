import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Col, Image, Space } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';

const { Paragraph } = Typography;
const x = 200;
const y = 200;

export default function UseCard(props) {
  const { id, picUrl, name, alg } = props;

  const navigate = useNavigate();

  return (
    <Col
      span={24}
      className="item cursor"
      onClick={() => {
        navigate(`/home/playlist/${id}`);
      }}
    >
      <Space size="small" direction="vertical">
        <Col span={24} className="posterImg" style={{ position: 'relative' }}>
          <Image preview={false} src={`${picUrl}?param=${x}y${y}`} alt="出错了 刷新试试" style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }} />
          <PlayCircleTwoTone
            className="hover1"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, fontSize: '1.65rem' }}
          />
        </Col>
        <Col span={24} className="text">
          <Paragraph ellipsis={{ rows: 2, tooltip: <>{name}</> }}>{name}</Paragraph>
          <Paragraph ellipsis={{ rows: 1, tooltip: <>{alg}</> }} style={{ fontSize: '.75rem', opacity: 0.6 }}>
            {alg}
          </Paragraph>
        </Col>
      </Space>
    </Col>
  );
}
