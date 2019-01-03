// 功能: 
// 1.页面滚动时改变透明度
// 2.给秒杀底部,
// 3.京东倒计时,
// 4.京东快报,路奔波效果
// 5.京东轮播图
// 沙箱模式


// 无分号规范 有分号规范分号,或者忘记加分号都有可能导致报错
// 前面加上分号;闭合语句
// (1) 监听页面的滚动
// (2) 动态获取页面卷去的高度 scrollTop
// (3) 动态计算头部的透明度, 在0-600的区域内可以动态的修改透明度 超600就定死透明度0.9
// 透明度   区域
//    0     0
//   0.9    600
// 公式: scrollTop / 600 = 所求的透明度
// (4) 设置给头部

;(function () {
    var jd_header = document.querySelector('.jd_header');
    // console.log(jd_header);
    window.addEventListener('scroll', function () {
        // 获取页面卷去的高度
        // pc的写法
        // 移动端
        var scrollTop = window.pageYOffset;
        // console.log(scrollTop);
        var cc = 0;
        if (scrollTop > 600) {
            cc = 0.9;
        } else {
            cc = scrollTop / 600 * 0.9;
            // console.log(cc);
        }
        // console.dir(jd_header);
        jd_header.style.background = 'rgba(222, 24, 27,' + cc + ')';
    });
})();


// 功能2: 给秒杀底部,根据子元素的内容设置ul的宽度
// 思路
// 1. 获取ul,li以及子元素的个数
// 2. 获取每个li的宽度
// 3. 根据个数乘以宽度 算出ul的宽度
;
(function () {
    var ul = document.querySelector('.jd_seckill .content ul');
    // console.log(ul);
    var lis = document.querySelectorAll('.jd_seckill .content ul li');
    // console.log(lis);
    var liWidth = lis[0].offsetWidth; //获取每一个li的宽度
    var ulWidth = lis.length * liWidth; //li的宽度*li的个数

    // 设置给ul
    ul.style.width = ulWidth + 'px';
})();

// 功能3: 秒杀
// 思路: 秒杀的秒数要知道
// (1) 需要倒计时的时间 = 未来时间-现在的时间 注意单位是时分秒,需要转换成秒
// 注意点单位是毫秒,需要转成秒
// (2)得到的秒数准换成时分秒
// (3)将得到的时分秒,设置给页面
// (4)添加定时器,实现倒计时
;
(function () {
    var spans = document.querySelectorAll('.jd_seckill .title .time span:nth-child(odd)');
    // console.log(spans);

    setTime();
    var timer = setInterval(setTime,1000);
    // 设置定时器
        function setTime() {
        var now = new Date();
        // console.log(now);
        var future = new Date('2018/12/23 15:20');
        // console.log(future);
        var time = parseInt((future - now) / 1000);
        // console.log(time);
        var hours = Math.floor(time / 3600);
        // console.log(hours);
        var minutes = parseInt((time / 60) % 60);
        // console.log(minutes);
        var sec = time % 60;
        if(time <= 0){
            clearInterval( timer );
            time = 0;
        }
        // console.log(sec);
        // new Date() 不传参,当前时间
        // 1.可以直接传时间戳 new Date(1545537200125);
        // 短- ios不支持   (兼容性问题)
        // 2.可以传日期字符串 new Date("2018-12-23 12:50");
        // console.log(hours + ':' + minutes + ':' + sec);
        spans[0].innerText = addZero(hours);
        spans[1].innerText = addZero(minutes);
        spans[2].innerText = addZero(sec);

        function addZero(n) {
            return n < 10 ? '0' + n : n;
        }
    }
})();


// 京东快报轮播图部分
;( function(){
    var ul = document.querySelector('.jd_news ul');
    // console.log(ul);
    var lis = ul.querySelectorAll('.jd_news ul li');
    // console.log(lis);
    var liHeight = lis[0].offsetHeight;//获取高度
    // console.log(liHeight);

    //声明一个定时器
    // 让ul不停的动 ,添加一个定时器
    var index = 0;
    setInterval( function(){
        index++;
        ul.style.transform = "translateY(-" + liHeight*index + "px)";
        ul.style.transition = "all .5s";
        // 切换到第一张
        // ul.offsetWidth;
        if(index > lis.length - 1){
            // 没有过度效果 
            ul.style.transition = "none";
            ul.style.webkitTransition = "none";
            // 给index为0
            index = 0;
            ul.style.transform = "translateY(-" + liHeight*index + "px)";
        }
    },1000)
})();



// banner轮播图部分
;( function(){
    var ul = document.querySelector('.jd_banner ul');
    // console.log(ul);
    var lis = document.querySelectorAll('.jd_banner ul li');
    // console.log(lis);
    var liWidth = lis[0].offsetWidth;
    // console.log(liWidth);
    var olLis = document.querySelectorAll('.jd_banner ol li');
    // console.log(olLis);
    var index = 1;
    ul.style.transform = "translateX(-" + index*liWidth + "px)";
    // 开一个定时器
    // 轮播
    var timerId = setInterval( function(){
    index++;
    ul.style.transform = "translateX(-" + index*liWidth + "px)";
    addTransition()
    
    },1000);
    // 定时器结束

    // 封装的两个函数
    function addTransition() {
        ul.style.transition = "all .2s" ;
        ul.style.webkitTransition = "all .2s";       
    }
    function removeTransition() {
        ul.style.transition = "none";
        ul.style.webkitTransition = " csnone";
    }
    // transition监听当前动画的执行
    // 每次ul过渡动画完成,都会触发 transitioned
    ul.addEventListener('transitionend', function(){
        // 如果抵达最后一张假图的时候,瞬间切换
        // 小圆点
        // 需要排他
        if(index >= lis.length - 1){
            index = 1;
        removeTransition();
        ul.style.transform = "translateX(-" + index*liWidth + "px)"
        }
        if(index <= 0 ){
            index = lis.length-2;
            removeTransition();
            ul.style.transform = "translateX(-" + index*liWidth + "px)";
        }

        olLis.forEach( function(v,i){
            v.classList.remove("now");
        });
        // 复活自己
        olLis[ index - 1].classList.add("now");
})

  /*
  需求: 给ul添加滑动效果
  1. 让ul跟着手指左右滑动
  2. 松手时,根据滑动的方向,切换轮播图

  * 思路:
  *   1. 注册手指事件 touchstart, touchmove, touchend
  *   2. 在 touchstart 中, 记录开始滑动的位置, 清除定时器
  *   3. 在 touchmove 中, 求得手指坐标, 计算相对位移, 让 ul 移动
  *      在原有 ul 位移的基础上, 叠加上相对位移
  *   4. 在 touchend 中, 计算相对位移, 根据位移实现轮播切换
  *      (1) 如果往右滑动距离超过 1/3, 显示上一张, index--;
  *      (2) 如果向左滑动距离超过 1/3, 显示下一张, index++;
  *      (3) 如果滑动距离没超过 1/3, 显示当前张, index不变
  * */
    var startX; //初始位置
    var endX;
    var distanceX;
    var startTime;  //开始时间
    ul.addEventListener("touchstart", function( e ) {
        clearInterval( timerId );
        console.log(e.touches[0].clientX);
        startX = e.touches[0].clientX; //开始位置
        startTime = new Date();   //记录开始时间   
    });
    ul.addEventListener("touchmove", function( e ){
        var moveX = e.touches[0].clientX - startX;
        console.log( moveX);
    });
    ul.addEventListener("touchend", function( e ){
        endX = e.changedTouches[0].clientX;
        distanceX = endX - startX;
        console.log(distanceX);
    });
})();