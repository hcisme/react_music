import { HEARMUSICINFO } from '../constant'

export const deliverMusicInfo = (prevState = null, action) => {
  const { type } = action

  switch (type) {
    case HEARMUSICINFO:
      return action
    default:
      return prevState
  }
}