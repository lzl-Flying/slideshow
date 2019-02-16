(function() {
    var $wrapper = $('.wrapper'),
        $item = $('.item'),
        item_len = $item.length,
        radiouStr = '',
        btnStr = '',
        activeIndex = 0,   //当前li索引
        prevIndex,    //上一次li索引
        $left = $('.left'),
        $image = $('img'),
        sider_timer,
        key = true;

    if( item_len > 1 ) { 
        for(var i = 0;i < item_len;i++) {  //创建dom结构
            if(i == 0) {
                radiouStr += '<li class="active"></li>';
            }else {
                radiouStr += '<li></li>';
            } 
        }
        radiouStr = '<div class="radious"><div class="radious-box"><ul>' + radiouStr +'</ul></div></div>';
        btnStr = '<div class="btn"><div class="prev"></div><div class="next"></div></div>';
        $wrapper.append(btnStr).append(radiouStr); //插入到wrapper
    }

    var $prev = $('.prev'),  //只有dom结构创建完成，才能选中
        $next = $('.next'),
        $li = $('li');

    $prev.click(function() {  //点击--->上一张
        if(key) {
            key = false;
            getIndex('prev');
            change();
        }
    })

    $next.click(function() {  //点击--->下一张
        if(key) {
            key = false;
            getIndex('next');
            change();
        }
    })

    $li.click(function() {  //点击小圆点--->跳转
        if(key) {
            key = false;
            if(activeIndex !== $(this).index()) {
                getIndex($(this).index());  //传入当前li的索引
                change();
            }
        }    
    })

    function int() {
        if(item_len > 1){
            sider_timer = setTimeout(function() {
                getIndex('next');
                change();
            },6000)
        }
    }

    start();
    int();

     function getIndex (direction) {
        prevIndex = activeIndex;
        if(direction == 'prev' || direction == 'next'){
            if (direction == 'prev') {
                activeIndex = (activeIndex == 0 ? item_len - 1 : activeIndex - 1)
            }else{
                activeIndex = (activeIndex == item_len - 1 ? 0 : activeIndex + 1)
            }
        }else{
            activeIndex = direction;
        }
        // console.log(activeIndex);
    }

    $item.on('item_leve',function () {
        $item.eq(prevIndex).animate({opacity: 0}, 1000,function() {
            $item.eq(prevIndex).css({display: 'none'}).find($left).animate({top: 300},500);
            $item.eq(prevIndex).find($image).animate({width: '0%'},500);
            $item.eq(activeIndex).trigger('item_come');
        })
    })

    $item .on('item_come',function () {
        $item.eq(activeIndex).css({display: 'block'}).animate({opacity: 1}, 1000,function() {
            start();
        })
    });

    $li .on('changeClass',function () {  //改变className
        $li.eq(prevIndex).removeClass('active');
        $li.eq(activeIndex).addClass('active');
    })

    function change () {
        $li.eq(activeIndex).trigger('changeClass'); 
        $item.eq(prevIndex).trigger('item_leve');
        if(typeof(sider_timer) !== undefined){
            clearTimeout(sider_timer);
            int();
        }    
    }

    function start () {  //left、right运动函数
        $item.eq(activeIndex).find($left).animate({top: 100},500,function() {
            $item.eq(activeIndex).find($image).animate({width: '100%'},500,function() {
                key = true;
            })
        });
    }

}) ()