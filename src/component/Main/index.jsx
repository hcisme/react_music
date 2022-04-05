import React, { useEffect, useState, useCallback } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, BackTop } from 'antd'
import { SendOutlined, BgColorsOutlined, GithubOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import './index.css'

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  marginLeft: 90,
}

export default function Main() {
  let location = useLocation()
  let navigate = useNavigate()

  const [musicUrl, setMusicUrl] = useState(['https://chcmusic.cloud/images/%E6%98%A5%E5%A8%87%E4%B8%8E%E5%BF%97%E6%98%8E.mp3'])
  const [posterUrl, setPosterUrl] = useState('https://p2.music.126.net/0KC-cAFqdJHDomIl3dSv4Q==/109951166676094043.jpg')
  const [artistName, setArtistName] = useState('街道办GOC')
  const [name, setName] = useState('春娇与志明/街道办GDC')
  const [lyric, setLyric] = useState(
    '[00:00.000] 作词 : Aline\n[00:01.000] 作曲 : Aline\n[00:02.000] 编曲 : Aline\n[00:20.330]Jcool：\n[00:22.329]有个女仔令我思想变得大过\n[00:25.029]当初\n[00:25.879]我幼稚行为对你犯下大错\n[00:27.579]你话我唔识淋 用钱买无用饰品\n[00:30.329]你慢慢心淡觉得我对感情唔认真\n[00:33.330]要知道男人系天生的小朋友\n[00:36.329]小朋友弱点会忽略另一半感受\n[00:39.080]要改正好简单我只系欠调教\n[00:42.330]经历得多反而可以令到爱意浓厚\n[00:42.830]Vai：\n[00:44.581]志明的世界永远好动带着可爱\n[00:47.330]但有时间迷茫 爱情错过却唔可再\n[00:50.081]从开始走到结尾哪个不会变大个\n[00:53.081]但春娇想要那个你又有谁可以劝阻\n[00:55.831]等待 UFO 纵有变数\n[00:58.079]最普通慨佢哋世上遍布\n[01:01.576]爱漫春天散落每个季节慨消耗\n[01:04.325]看着花瓣跌落过程撑得过衰老\n[01:04.575]欧：\n[01:09.825]重新出发吗 huh 更渴望未来\n[01:12.825]以往这少年懂爱吗\n[01:16.328]仿佛不够\n[01:21.328]成长会进化吗 也信念自由\n[01:25.078]我爱这少年讽刺吗\n[01:28.021]这花开吗\n[01:28.521]留：\n[01:30.271]我爱你 你是唱将我做配合\n[01:32.521]但你予我这过程细致给我培训\n[01:35.524]情与爱 太过复杂 我要太多喘息\n[01:38.274]但你爱我慨以后不会太过忐忑\n[01:41.274]当拥有慨时候 又接近放手\n[01:44.024]循环播放剧情有多少个然后\n[01:46.524]如果系现实我会选择打破现实\n[01:49.274]喺你慨世界里面我会选择慢慢渐入\n[01:49.774]Vai：\n[01:52.527]志明慨世界永远好动带着可爱\n[01:55.024]佢冇时间迷茫 爱情错过却唔可再\n[01:57.774]从开始走到结尾哪个不会变大个\n[02:00.774]但春娇想要那个你又有谁可以劝阻\n[02:03.274]等待 UFO 纵有变数\n[02:06.027]最普通慨佢哋世上遍布\n[02:09.276]爱漫春天散落每个季节慨消耗\n[02:12.026]看着花瓣跌落过程撑得过衰老\n[02:13.026]欧：\n[02:18.026]重新出发吗 huh 更渴望未来\n[02:21.276]以往这少年懂爱吗\n[02:24.526]仿佛不够\n[02:29.027]成长会进化吗 也信念自由\n[02:32.777]我爱这少年讽刺吗\n[02:34.777]这花开吗\n[02:35.527]Garyu：\n[02:37.277]破碎婚姻里出身逼出佢慨硬净\n[02:40.027]佢再牺牲佢慨率真改变佢慨硬颈\n[02:42.780]戴眼镜慨佢明白波珠解决唔到逃避\n[02:45.780]要长大要负责任缩短两个人慨距离\n[02:49.479]美梦里学会感慨\n[02:51.229]你亦放肆你的爱\n[02:53.729]用力转载 越过比赛\n[02:58.729]为我掩盖 都因为爱\n[02:58.979]欧：\n[03:02.979]重新出发吗 huh 更渴望未来\n[03:06.729]以往这少年懂爱吗\n[03:09.479]仿佛不够\n[03:14.229]成长会进化吗 也信念自由\n[03:17.479]我爱这少年讽刺吗\n[03:19.223]这花开吗\n'
  )

  const getPubSubInfo = (ap) => {
    PubSub.subscribe('ids', async (msg, data) => {
      const { posterUrl, artistName, name, lyrc } = data
      setPosterUrl(posterUrl)
      setArtistName(artistName)
      setName(name)
      setLyric(lyrc)
      const val = await React.$apis.getMusicUrl(data.id)
      setMusicUrl(val[0].url)
    })
    ap.play()
  }

  useEffect(() => {
    const ap = new APlayer({
      container: document.getElementById('aplayer'),
      lrcType: 1,
      mini: false,
      autoplay: false,
      audio: [
        {
          name: name,
          artist: artistName,
          url: musicUrl,
          cover: posterUrl,
          lrc: lyric,
        },
      ],
    })
    getPubSubInfo(ap)
    return () => {
      PubSub.unsubscribe('ids')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicUrl])

  const handleClick = (e) => {
    navigate(e.key)
  }

  return (
    <div className="main">
      <div className="main-menu">
        <Menu
          onClick={(e) => {
            handleClick(e)
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

      <div id="aplayer"></div>

      <BackTop style={{ marginBottom: 40 }}>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  )
}
