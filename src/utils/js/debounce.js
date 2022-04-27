export const debounce = function (callback, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      callback()
    }, delay)
  }
}