
// 需求:
// 1. 当手指滑动式, 让左侧内部的 ul 跟着 滑动
// 如果抵达临界值, 需要回弹

// 1.注册手指事件 touchstart touchmove touchend
// 2.让touchstart 中,记录手指开始的位置
// 3.在 touchmove 中, 计算手指的相对位移, 让ul在原有的位移的基础上,叠加上相对位移
;( function(){
    // 先获取 ul
    var ul = document.querySelector('.content_left ul');
    // console.log(ul);
    var content_left = document.querySelector('.content_left');
    // console.log(content_left);
    var startY;
    var totalY = 0;
    ul.addEventListener('touchstart', function( e ){
      startY = e.touches[0].clientY;  
    })
    ul.addEventListener('touchmove', function( e ){
        var moveY = e.touches[0].clientY - startY;
        ul.style.transform = "translateY(" + (moveY + totalY) +"px)";
        ul.style.transition = "none";
    })
    ul.addEventListener('touchend', function( e ){
        var distanceY = e.changedTouches[0].clientY - startY;
        console.log('每次滑动的距离:' + distanceY);
        totalY += distanceY;
        console.log('滑动距离的总和:' + totalY);
        ul.style.transform = "translateY(" + totalY +"px)";
        if(totalY > 0){
            totalY = 0;
            ul.style.transition = "all .2s";
            ul.style.transform = "translateY(0px)";
        }
        // 如果当前的transilateY 小于 minY 需要回弹

        var minY = -(ul.offsetHeight - content_left.offsetHeight);
        console.log(totalY);
        if( totalY < minY){
            console.log(minY);
            console.log('12');
            // totalY = minY;
            ul.style.transition = "all .5s";
            ul.style.transform = "translateY(" + minY +"px)";
            ul.offsetHeight;
        }
    });
})();