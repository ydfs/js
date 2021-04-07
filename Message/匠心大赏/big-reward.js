const PAGE ={
  data: {
    backgrondColors: backgrondColors,
    defaultDatas: cardList,
    itemWidth: 100,
    itemHeight: 100,
    paddingOffset: 50,
    zIndex: 0,
    item: null,
    itemOffsetTop: null,
    itemOffsetLeft: null,
    pageX: null,
    pageY: null,
    isLock: true,
  },
  init: function () {
    this.render();
    this.bind();
  },
  bind: function () {

  },

  render: function () {
    let backgrondColors = PAGE.data.backgrondColors;
    let defaultDatas = PAGE.data.defaultDatas;
    let itemWidth = PAGE.data.itemWidth;
    let itemHeight = PAGE.data.itemHeight;
    data.map((data,index) =>{
      data.index = index;
    })
  }


}

PAGE.init();