import { notification } from "antd";
import { statusChange } from "../../redux/actions";
import { store } from "../../redux/store";
import { getLocalStorage, setLocalStorage } from "../application";
import { distinct } from "../js/timeTool";

/**
 * 
 * @param {{ Event, object }} 增加音乐到音乐列表 播放一个个歌单的全部音乐 的逻辑方法
 */
export const addMusicListFn = ({ e, record, dataSource }) => {
  e?.stopPropagation();
  const localData = getLocalStorage('musicList');
  if (localData !== null) {
    record ? localData.unshift(record) : localData.unshift(...dataSource);
    // 数组中 对象 查重
    const newArr = distinct(localData);
    // 单曲名 歌手名 时长 id
    const dealMusicList = newArr.map(item => {
      if (item.id !== 6666666) {
        return {
          ...item,
          songName: item?.name,
          singer: item.song?.artists?.map(v => v.name).join(' / ') || item.ar?.map(v => v.name).join(' / ') || item.artists?.map(v => v.name).join(' / '),
          dt: item.song?.duration || item?.dt || item?.duration,
          picUrl: item.picUrl || item?.al?.picUrl || item?.album?.blurPicUrl
        };
      }
      return item;
    });

    setLocalStorage({ key: 'musicList', value: dealMusicList })

    if (newArr[0].id !== 6666666) {
      notification.success({
        message: '已成功添加到音乐列表'
      });
    }
  }
  store.dispatch(statusChange());
}
