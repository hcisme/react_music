import { SHOWCONTENT } from '../constant'

export function showReducer(preState = false, action) {
  const { type } = action

  switch (type) {
    case SHOWCONTENT:
      return action
    default:
      return preState
  }
}
