import React from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { SendOutlined, BgColorsOutlined } from '@ant-design/icons';

export default function MenuList() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={(e) => {
        handleClick(e);
      }}
      selectedKeys={[location.pathname]}
      mode="horizontal"
    >
      <Menu.Item key="/home/discovery" icon={<SendOutlined />}>
        发现首页
      </Menu.Item>
      <Menu.Item key="/home/playlists" icon={<BgColorsOutlined />}>
        推荐歌单
      </Menu.Item>
      <Menu.Item key="/home/newsongs" icon={<i className="iconfont icon-yinle" />}>
        最新音乐
      </Menu.Item>
      <Menu.Item key="/home/mvs" icon={<i className="iconfont icon-movie-line"></i>}>
        Mv
      </Menu.Item>
    </Menu>
  );
}
