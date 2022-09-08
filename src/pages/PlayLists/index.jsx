import React, { useEffect, useState } from 'react';
import { Menu, Card, Image, Skeleton, Pagination } from 'antd';
import { UseCard } from '../../hooks';
import './index.css';

const { Meta } = Card;

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
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
    setLoading(true);
    setTimeout(() => {
      getTopData();
      setLoading(false);
    }, 700);
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="playlists">
      <div className="header">
        <Card>
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={<Image src={topData.coverImgUrl} style={{ width: 165, height: 165, borderRadius: 5 }} alt="加载失败请重试" />}
              title={topData.name}
              description={topData.description}
            />
          </Skeleton>
        </Card>
      </div>
      <div className="navigate">
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
      </div>
      <div className="items">
        {listData.map(item => (
          <div key={item.id}>
            <UseCard id={item.id} picUrl={item.coverImgUrl} name={item.name} alg={item.creator?.nickname} />
          </div>
        ))}
      </div>
      <div className="page">
        <Pagination
          current={page}
          total={total}
          showSizeChanger={false}
          onChange={current => {
            setPage(current);
          }}
        />
      </div>
    </div>
  );
}
