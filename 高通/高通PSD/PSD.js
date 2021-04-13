const PAGE ={
  data: {
    navigatorBarIdArr: ['navigation-1','navigation-2','navigation-3','navigation-4','navigation-5'],
    navigatorBarActiveId: '',
    navigatorBarFixed: false,
    navigatorBarFixedOffset: 430, 
    navigatorBarHeight: 70,
    index: 0,
    duration: 500,
    isLock: false,
    translateX: 0,
    defaultLenght: null,
    itemWidth: null
  },
  init: function () {
    this.clone();
    this.bind();
  },
  bind: function () {
    window.addEventListener('scroll',this.refreshNavigator);
    let pageFixed = document.getElementById('pageFixed');
    this.onEventLister(pageFixed,'click','navigator',this.goNavigator);

    let swiperPrev = document.getElementsByClassName('towards-left')[0];
    swiperPrev.addEventListener('click',this.swiperPrev);
    let swiperNext = document.getElementsByClassName('towards-right')[0];
    swiperNext.addEventListener('click',this.swiperNext);
  },
  onEventLister: function(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  refreshNavigator: function () {
    PAGE.fixedNavigator();
    PAGE.heightLightNavigator();
  },
  //导航滚动定位
  fixedNavigator: function () {
    let scrollTop = document.documentElement.scrollTop;
    //console.log(scrollTop);
    let navigatorBarTop = (PAGE.data.navigatorBarFixedOffset + PAGE.data.navigatorBarHeight);
    let navigatorBarFixed = scrollTop >= navigatorBarTop;
    if(PAGE.data.navigatorBarFixed !== navigatorBarFixed) {
      PAGE.data.navigatorBarFixed = navigatorBarFixed;
      let navigatorBar = document.getElementsByClassName('page-fixed')[0];
      if(navigatorBarFixed) {
        navigatorBar.className = 'page-fixed fixed-top'  //fixed-top有对应的css
      }else{
        navigatorBar.className = 'page-fixed'
      }
    }
  },
  //导航滚动高亮
  heightLightNavigator: function () {
    let scrollTop = document.documentElement.scrollTop;
    let filterNav = PAGE.data.navigatorBarIdArr.filter( data => {
      let offsetTop = document.getElementById(data).offsetTop;
      return scrollTop >= offsetTop - PAGE.data.navigatorBarHeight
    })
    let navigatorBarActiveId = filterNav.length ? filterNav[filterNav.length - 1] : '';
    if(PAGE.data.navigatorBarActiveId !== navigatorBarActiveId){
      PAGE.data.navigatorBarActiveId = navigatorBarActiveId;
      let navigatorBarItems = document.getElementsByClassName('navigator');
      for (let i = 0; i < navigatorBarItems.length; i++) {
        let navigatorBarItem = navigatorBarItems[i];
        let dataNav = navigatorBarItem.dataset.nav;
        if(dataNav === navigatorBarActiveId){
          navigatorBarItem.className = 'navigator show';   //show有对应的css
        }else{
          navigatorBarItem.className = 'navigator';
        }
      }
    }
  },
  //导航点击移动
  goNavigator: function (e) {
    let id = e.target.dataset.nav;
    let offsetTop = document.getElementById(id).offsetTop - PAGE.data.navigatorBarHeight;
    document.documentElement.scrollTop = offsetTop;
  },
  //1.克隆项目
  clone: function () {
    let swiperItem = document.getElementsByClassName('photo');
    let firstItem = swiperItem[0].cloneNode();
    let lastItem = swiperItem[swiperItem.length - 1].cloneNode();

    let swiperList = document.getElementsByClassName('photo-box')[0];
    let index = PAGE.data.index;
    let swiperItemWidth = swiperList.offsetWidth;
    PAGE.data.defaultLenght = swiperItem.length;
    PAGE.data.itemWidth = swiperItemWidth;
    PAGE.data.translateX = - (swiperItemWidth + swiperItemWidth * index);

    swiperList.appendChild(firstItem);
    swiperList.prepend(lastItem);
    PAGE.goIndex(index);
  },

  //3.创建滑动函数 Page.goIndex，接收一个参数，为滑动到第几项
  goIndex: function (index) {
    let swiperDuration = PAGE.data.duration;
    let swiperItemWidth = PAGE.data.itemWidth;
    let beginTranslateX = PAGE.data.translateX;
    let endTranslateX = - (swiperItemWidth + swiperItemWidth * index);
    let swiperList = document.getElementsByClassName('photo-box')[0];
    PAGE.animateTo(beginTranslateX,endTranslateX,swiperDuration,function(value){
      swiperList.style.transform = `translateX(${value}px)`;
    },function(value){
      swiperList.style.transform = `translateX(${value}px)`;
      PAGE.data.index = index;
      PAGE.data.translateX = value;
    })
  },
  //2.创建 Page.animateTo 动画函数和 linear 匀速函数
  animateTo: function(begin,end,duration,changeCallback,finishCallback) {
    let startTime = Date.now();
    requestAnimationFrame(function update() {
      let dataNow = Date.now();
      let time = dataNow - startTime;
      let value = PAGE.linear(time,begin,end,duration);
      typeof changeCallback === 'function' && changeCallback(value)
      if(startTime + duration > dataNow) {
        requestAnimationFrame(update)
      }else{
        typeof finishCallback === 'function' && changeCallback(end)
      }
    })
  },
  linear: function(time, begin, end, duration) {
    return (end - begin) * time / duration + begin;
  },
  //绑定上一项滑动事件
  swiperPrev: function() {
    let index = PAGE.data.index;
    PAGE.goIndex(index - 1);
  },
  //绑定下一项滑动事件
  swiperNext: function() {
    let index = PAGE.data.index;
    PAGE.goIndex(index + 1 );
  }
}

PAGE.init();