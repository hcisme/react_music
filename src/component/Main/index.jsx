import React from 'react';
import { Outlet } from 'react-router-dom';
import { BackTop } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { UseMusic } from '../../hooks';
import MenuList from '../Menu';
import './index.css';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  marginLeft: 90
};

export default function Main() {
  return (
    <div className="main">
      <div className="main-menu">
        <MenuList />
      </div>
      <div className="mainArticle">
        <Outlet />

        <div className="thanks" style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
          <div>
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_black">
              辽ICP备2021010497号-2
            </a>
          </div>
          <div>
            <a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_black">
              感谢 <GithubOutlined />
              @binaryify
            </a>
          </div>
          <div>
            <a href="https://github.com/DIYgod/APlayer" target="_black">
              感谢 <GithubOutlined />
              @DIYgod
            </a>
          </div>
        </div>
      </div>

      <UseMusic />

      <BackTop style={{ marginBottom: 40 }}>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  );
}
