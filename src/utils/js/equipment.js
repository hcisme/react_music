/* 是否是android */
export function isAndroid() {
  var userAgent = window.navigator.userAgent
  if (/android/i.test(userAgent)) {
    return true
  }
  return false
}

/* 是否是IOS */
export function isIOS() {
  var userAgent = window.navigator.userAgent
  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return true
  }
  return false
}