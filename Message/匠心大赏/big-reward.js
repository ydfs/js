$(function(){
  let cardList = [{username:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{username:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{username:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{username:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},{username:'小兔兔',userMessage:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'}];
  let backgroundColors = ['#FDFBE9','#F1FFF0','#DCEBD7','#EBD7D7','#F0F5ff'];
  const PAGE ={
    data: {
      backgroundColors: backgroundColors,
      defaultDatas: cardList,
      itemWidth: 320,
      itemHeight: 160,
      paddingOffset: 30,
      zIndex: 0,
      item: null,
      itemOffsetTop: null,
      itemOffsetLeft: null,
      pageX: null,
      pageY: null,
      isLock: true,
    },
    init: function () {  //单程，要按顺序执行。
      this.getData();
      this.bind();
    },
    bind: function () {
      $(".message-box").on('click','.button',this.addWord);
      $(".messages").on('click','.close',this.cutOut);
      let messages = document.getElementsByClassName('messages')[0];
      this.onEventLister(messages,'mousedown','sentence-box',this.handleMouseDown);
      window.addEventListener('mousemove',this.handleMouseMove);
      window.addEventListener('mouseup',this.handleMouseMoveUp);
    },
    onEventLister: function(parentNode,action,childClassName,callback) {
      parentNode.addEventListener(action,function(e){
        e.target.className.indexOf(childClassName) >= 0 && callback(e);
      })
    },
    handleMouseDown: function (e) {
      let item = e.target;
      item.style.zIndex = ++ PAGE.data.zIndex;

      PAGE.data.itemOffsetTop = item.offsetTop;
      PAGE.data.itemOffsetLeft = item.offsetLeft;
      PAGE.data.pageX = e.pageX;
      PAGE.data.pageY = e.pageY;

      PAGE.data.item = item;
      PAGE.data.isLock = false;
    },
    handleMouseMove: function (e) {
      if(!PAGE.data.isLock) {
        let messages = document.getElementsByClassName('messages')[0];
        let containerWidth = messages.offsetWidth;
        let containerHeight = messages.offsetHeight;
        let itemWidth = PAGE.data.itemWidth;
        let itemHeight = PAGE.data.itemHeight;
        let paddingOffset = PAGE.data.paddingOffset;

        let maxWidth = containerWidth - itemWidth - paddingOffset;
        let maxHeight = containerHeight - itemHeight - paddingOffset;
        let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
        let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop; 

        translateX = translateX > maxWidth ? maxWidth : translateX;
        translateY = translateY > maxHeight ? maxHeight : translateY;
        translateX = translateX < paddingOffset ? paddingOffset : translateX;
        translateY = translateY < paddingOffset ? paddingOffset : translateY;

        PAGE.data.item.style.left = translateX + 'px';
        PAGE.data.item.style.top = translateY + 'px';
      }
    },
    handleMouseMoveUp: function (e) {
      PAGE.data.isLock = true
    },
    getData: function(){
      PAGE.data.defaultDatas.map((data,index) =>{  //遍历一遍内容；defaultDatas: cardList
        PAGE.render(data,index);  //再渲染一遍，循环调用render（）。
      })
    },
    
    render: function (data,index) {
      let username = data.username;   //两种写法都可

      let messages = document.getElementsByClassName('messages')[0];
      let containerWidth = messages.offsetWidth;
      let containerHeight = messages.offsetHeight;
      
      let itemWidth = PAGE.data.itemWidth;
      let itemHeight = PAGE.data.itemHeight;
      let paddingOffset = PAGE.data.paddingOffset;

      let maxWidth = containerWidth - itemWidth - paddingOffset;
      let maxHeight = containerHeight - itemHeight - paddingOffset;

      let randomTop = PAGE.randomBetween(paddingOffset,maxHeight);
      let randomLeft = PAGE.randomBetween(paddingOffset,maxWidth);

      let zIndex = ++PAGE.data.zIndex;
      let backgroundColors = PAGE.data.backgroundColors;
      let backgroundColor = backgroundColors[zIndex%backgroundColors.length];
      data.index = index;
      // index = index>backgroundColors.length - 1? index=index%backgroundColors.length : index 
      // let backgroundColor = backgroundColors[index];
      console.log(backgroundColor);
      
      //newMessage为字符串，不能直接给予设定,可直接把style写入替换内。
      let newMessage = `<div class="sentence-box" data-id="${data.index}" 

                        style='background-color: ${backgroundColor};
                        z-index: ${zIndex};
                        top: ${randomTop}px;
                        left: ${randomLeft}px;'> 

                        <h3 class="name">${username}说：</h3>
                        <p class="sentence">${data.userMessage}</p>  
                        <img class="close" src="picture/关闭@2x.png"></div>`;
      $('.messages').append(newMessage);  //不用html（替换），用append（插入新内容）。
      console.log(randomLeft)
      console.log(newMessage);
    },
    randomBetween:function(min,max){
      return Math.floor(Math.random() * (max - min) + min);
    },

    //提交留言
    addWord: function (e) {  
      let textarea = $('.textarea').val();
      cardList.push({username:'小兔兔',userMessage:textarea});  //push用于数组，将内容输出。
      $('.textarea').val("");   //点击输入后文本框恢复原样
      $('.messages').html('');  //不重复产生let cardList数据，新messages为空。
      PAGE.getData();
      console.log(textarea);

      // let userMessage = e.target.parentNode.querySelector('.textarea').value;
      //   if(userMessage.length > 50){
      //       userMessage = userMessage.substring(0, 50);
      //   }
      //   let messages = document.getElementsByClassName('messages')[0];
      //   messages.innerHTML='';
      //   cardList.push({userName:'小兔兔',userMessage:userMessage},);
      //   PAGE.getData();
      //   e.target.parentNode.querySelector('.textarea').value='';
    },
    //删除留言
    cutOut: function (e) {
      let cardList = PAGE.data.defaultDatas;
      let dataItem = e.target.parentNode;
      let index=Number(dataItem.dataset.id);  //id对应上面的data-id="${data.index}" 。
      let dataList = document.getElementsByClassName('messages')[0];
      dataList.innerHTML='';
      cardList.splice(index,1);
      PAGE.getData();
      console.log(index);
    },
    
  }

  PAGE.init();
});