import React, { useEffect, useState } from 'react';
import { Menu, Card, Image, Skeleton, Pagination, Row, Col, Typography, Tag } from 'antd';
import { UseCard } from '../../hooks';
import './index.css';

const { Meta } = Card;
const { Paragraph } = Typography;

const type = [
  { value: '全部' },
  { value: '欧美' },
  { value: '华语' },
  { value: '说唱' },
  { value: '流行' },
  { value: '摇滚' },
  { value: '民谣' },
  { value: '电子' },
  { value: '轻音乐' },
  { value: '影视原声' },
  { value: 'ACG' },
  { value: '怀旧' },
  { value: '治愈' },
  { value: '旅行' }
];

export default function PlayLists() {
  const [cat, setCat] = useState('全部');
  const [topData, setTopData] = useState({});
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);

  // 获取头部信息
  const getTopData = () => {
    React.$apis.topDatas(cat).then(val => {
      setTopData(val);
    });
  };
  // 获取歌单列表
  const getListData = () => {
    React.$apis.listDatas(page, cat).then(val => {
      setListData(val.playlists);
      setTotal(val.total);
    });
  };

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getTopData();
    getListData();
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  useEffect(() => {
    getTopData();
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="playlists" gutter={[0, 16]}>
      <Col span={24}>
        <Card>
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={<Image src={topData.coverImgUrl} style={{ width: 165, height: 165, borderRadius: 5 }} alt="加载失败请重试" />}
              title={topData.name}
              description={<Paragraph ellipsis={{ rows: 7, expandable: true, symbol: <Tag color="blue">展开</Tag> }}>{topData.description}</Paragraph>}
            />
          </Skeleton>
        </Card>
      </Col>
      <Col span={24}>
        <Menu
          mode="horizontal"
          selectedKeys={cat}
          onSelect={e => {
            setCat(e.key);
          }}
        >
          {type.map(item => (
            <Menu.Item key={item.value}>{item.value}</Menu.Item>
          ))}
        </Menu>
      </Col>
      <Col span={24}>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          {listData.map(item => (
            <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
              <UseCard id={item.id} picUrl={item.coverImgUrl} name={item.name} alg={item.creator?.nickname} />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Pagination
          current={page}
          total={total}
          showSizeChanger={false}
          onChange={current => {
            setPage(current);
          }}
        />
      </Col>
    </Row>
  );
}
