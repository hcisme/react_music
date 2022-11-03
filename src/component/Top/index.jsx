import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Avatar, Dropdown, Menu, message, Tooltip, Tabs, Col, Row, Space } from 'antd';
import { ImportOutlined, GithubOutlined } from '@ant-design/icons';
import './index.css';
import Search from './Search';
import LoginModal from './LoginModal';

const { TabPane } = Tabs;

export default function Top() {
  let navigate = useNavigate();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [displayText, setDisPlayText] = useState('block');
  const [displayAvatar, setDisPlayAvatar] = useState('none');
  const [userInfo, setUserInfo] = useState({});
  const [loginType, setLoginType] = useState('phone');

  const [qrurl, setQrUrl] = useState('https://p2.music.126.net/wjuaGcB2k4I6PqY-cPHCFQ==/109951166889767357.jpg');
  const [timer, SetTimer] = useState(null);
  const [text, SetText] = useState('等待扫码');
  const [code, SetCode] = useState(0);

  const getChildBool = val => {
    setIsLoginVisible(val);
  };

  const loginState = () => {
    React.$apis.loginStatus().then(val => {
      if (val.account === null || val.profile === null) {
        // 离线
        setDisPlayText('block');
        setDisPlayAvatar('none');
      } else {
        // 在线
        setUserInfo(val);
        setDisPlayText('none');
        setDisPlayAvatar('block');
        localStorage.setItem('id', val.account?.id);
      }
    });
  };

  const menu = (
    <Menu
      onClick={key => {
        handleCheck(key);
      }}
    >
      <Menu.Item key="userInfo">主页</Menu.Item>
      <Menu.Item key="logout" style={{ borderBottom: '1px solid #e8e8e8' }}>
        退出登录
      </Menu.Item>
      <Menu.Item key="github">
        <GithubOutlined />
        &nbsp; Github仓库
      </Menu.Item>
    </Menu>
  );

  const handleCheck = ({ key }) => {
    switch (key) {
      case 'userInfo':
        navigate(`/userinfo`);
        break;
      case 'logout':
        React.$axios.get('/logout');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        // 离线
        setDisPlayText('block');
        setDisPlayAvatar('none');
        message.success('已退出登录');
        break;
      case 'github':
        window.open('https://github.com/TristesAnima/react_music');
        break;
      default:
        break;
    }
  };

  const getQrKey = async () => {
    const { data: res } = await React.$apis.request('post', '/login/qr/key');
    const { data: result } = await React.$apis.request('get', '/login/qr/create', { key: res.unikey, qrimg: res.unikey });
    setQrUrl(result.qrimg);
    SetTimer(
      setInterval(async () => {
        const info = await React.$apis.request('get', '/login/qr/check', { key: res.unikey });
        SetCode(info.code);
        SetText(info.message);
      }, 1000)
    );
  };

  useEffect(() => {
    if (code === 803) {
      clearInterval(timer);
      setIsLoginVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    loginType === 'qr' && getQrKey();
    loginType === 'phone' && clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginType]);

  useEffect(() => {
    if (isLoginVisible === false) {
      clearInterval(timer);
      loginState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginVisible]);

  return (
    <Row align="middle" gutter={[8, 0]} className="top" wrap={false}>
      <Col span={1} offset={1}>
        <Tooltip title={<span style={{ fontSize: 12, fontWeight: 400 }}>点我返回首页</span>} color={'#2db7f5'} placement="bottomRight">
          <img
            src="http://chcblogs.com/lib/images/Cat.svg"
            alt=""
            onClick={() => navigate('/home/discovery')}
            style={{ cursor: 'pointer', width: '80%', height: '80%' }}
          />
        </Tooltip>
      </Col>

      {/* 前进后退路由 */}
      <Col span={2} offset={1} className="direction">
        <i
          className="iconfont icon-right"
          onClick={() => {
            window.history.go(-1);
          }}
        ></i>
        <i
          className="iconfont icon-tubiaozhizuo--"
          onClick={() => {
            window.history.go(1);
          }}
        ></i>
      </Col>

      <Col span={5}>
        <Search></Search>
      </Col>

      <Col
        flex={1}
        offset={12}
        className="login"
        onClick={() => {
          setIsLoginVisible(true);
        }}
        style={{ display: displayText }}
      >
        <span>登录 </span>
        <ImportOutlined />
      </Col>

      {/* 登录成功后显示的头像 */}
      <Col flex={1} offset={10} style={{ display: displayAvatar }}>
        <Space align="end">
          <Dropdown overlay={menu}>
            <Avatar size={'large'} src={userInfo.profile?.avatarUrl} />
          </Dropdown>
          <div className="chc-name">{userInfo.profile?.nickname}</div>
        </Space>
      </Col>

      {/* 登录模态框 */}
      <Modal
        title="登录"
        visible={isLoginVisible}
        onCancel={() => {
          setLoginType('phone');
          setIsLoginVisible(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <Tabs activeKey={loginType} onChange={key => setLoginType(key)}>
          <TabPane tab="手机号登录" key="phone">
            <LoginModal getBool={getChildBool} />
          </TabPane>
          <TabPane tab="二维码登录" key="qr">
            <Row justify="center">
              <Col span={24}>
                <Row align="middle" justify="center">
                  <img src={qrurl} alt="" style={{ width: 200 }} />
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="center">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>{text}</a>----
                  <span>请使用网易云App扫码登录</span>
                </Row>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Modal>
    </Row>
  );
}
