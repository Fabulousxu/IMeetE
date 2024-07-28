// 定义节流函数：接收两个参数：绑定的处理函数和时间间隔，返回一个事件触发时真正要执行的已经有节流功能的处理函数
function throttle(fn, duration) {
	// 1. 上一次处理函数执行的时间戳。_throttleFn 函数引用了外部的 lastTime，形成了一个闭包，因此，lastTime 在内存中会被保存下来
	let lastTime = 0

	const _throttleFn = function() {
		// 2. 当前处理函数执行的时间戳
		const currTime = new Date().getTime()

		// 3. 判断当前处理函数执行的时间戳距离上一次处理函数执行的时间戳是否超过了 duration 设定的时间间隔。如果没超过，遵循不管触发了多少次事件，在一定的时间间隔内只执行一次处理函数的原则，什么也不做；如果超过了，就执行函数
		if (currTime - lastTime >= duration) {
			fn.call(this, ...arguments) //  // 给处理函数绑定正确的 this 和传参
			// 4. 更新处理函数执行的时间戳
			lastTime = currTime
		}
	}

	return _throttleFn
}
  
  /*函数防抖*/
  function debounce(fn, interval) {
    var timer;
    var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
    return function() {
      clearTimeout(timer);
      var context = this;
      var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
      timer = setTimeout(function() {
        fn.call(context,args);
      }, gapTime);
    };
  }
  
  export default {
    throttle,
    debounce
  };