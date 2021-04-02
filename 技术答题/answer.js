const PAGE = {
  data: {
    lock: false,  //锁
    datas: [{
        id: 1,
        title: "4%2 的值为",
        options: [0,1,2,4],
        correct: 0,
      },
      {
        id: 2,
        title: "\"0\" == false 的值为",
        options: ["true","false"],
        correct: 0,
      },
      {
        id: 3,
        title: "不设置cookie设置过期时间，cookie的默认时间长度为",
        options: ["立刻过期","永不过期","cookie 无法设置","在浏览器会话结束时过期"],
        correct: 3,
      },
      {
        id: 4,
        title: "+new Array(042) 的值为",
        options: ["43","NaN","42","Error"],
        correct: 1,
      },
      {
        id: 5,
        title: "数组的方法中，哪些方法不能改变自身数组？",
        options: ["pop","splice","sort","concat"],
        correct: 3,
      },
      {
        id: 6,
        title: "Number(null); 的值为：",
        options: ["null",0,"undefined",1],
        correct: 1,
    }],
    currentPage: 1,
    us:[]  //数组
  },
  init: function () {
    this.render();
    $(".box").on('click','.option',this.key);
    // $(".box").on('click','.last',this.last);
    $(".box").on('click','.next',this.next);
    $(".body").on('click','.see',this.result);
  }, 

  onEventLister: function(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  render: function () {
    let datas = PAGE.data.datas;
    let pageSize = PAGE.data.pageSize;
    let currentPage = PAGE.data.currentPage;
    datas.map((data,index) => {
      data.index = index;
    })
    let topPage = datas.filter((data,index) => {
      return index === currentPage - 1;    //下标为0，所以减1。
    })[0];
    let options = topPage.options.map((data,index) => {
      return `<li class="option" data-index="${index}" href="javascript:;">${data}</li>`
    }).join('');                 //要有下标，用于选择
    let topPageStr =`
      <div class="id">
        <h1 class="title">${topPage.title}<p class="number">第${topPage.id}题</p></h1>
        <div class="options">${options}</div>
      </div>
      <div class="bottom">
        <button class="see">查看最终结果</bottom>
        <button class="next">下一题</button>
      </div>  `;
    $('.box').html(topPageStr);
  },
  
  key: function (e) {
    console.log(111)
    if(PAGE.data.lock) return
    let index = PAGE.data.currentPage - 1;   //下标为0，所以减1。
    let datas = PAGE.data.datas;
    let userselect = $(this).attr('data-index');   //用户选择；attr是属性。
    if(userselect == datas[index].correct){   //如果选择正确答案，则产生绿色，颜色在css加。
      $(e.target).addClass('green');  //向e.target添加一个类‘green’。
    }else{
      $(e.target).addClass('red');    //否则返回红色，且将正确的答案一同显现。
      $(`li[data-index=${datas[index].correct}]`).addClass('green');
    }
    let result = $('.option').hasClass('red')? false: true   //有红色表false，无表true。
    let us = PAGE.data.us;  //数组；与上面联系。
    us.push({
      id:index,
      answer:userselect,     //获取用户的点击选择
      result:result});
    console.log(us);
    PAGE.data.lock = true   //锁
    PAGE.next(); //点击后直接进入下一题。
  },

  lookOver: function () {
    let us = PAGE.data.us;
    let cn=us.filter((data)=>{     //过滤用户选择的正确答案。
      return data.result == true;  
    })
    let lookOver=`
    <div class="lookover">
      <h1 class="subject">共有${us.length}题</h1>
      <h2 class="correct">正确:${cn.length}题</h2>
      <h2 class="wrong">错误:${us.length - cn.length}题</h2>
    </div>`;
    $('.body').html(lookOver);
  },
  
  result: function () {
    let currentPage = PAGE.data.currentPage;
    if(currentPage == 6) {
      PAGE.lookOver();    //第六题后进入lookOver。
    }
  },

  next: function () {
    let currentPage = PAGE.data.currentPage;
    if(currentPage !==6){
      PAGE.data.lock = false   //锁
      PAGE.data.currentPage = currentPage + 1;
      PAGE.render();
    }else{
      PAGE.result();  //若删除，变为手动点击查看结果。
    }
  },
  
  // last: function () {
  //   let currentPage = PAGE.data.currentPage;
  //   if(currentPage == 1) {
  //     return;
  //   }else{
  //     PAGE.data.currentPage = currentPage - 1;
  //     PAGE.render();
  //   }
  // },
}

PAGE.init();
