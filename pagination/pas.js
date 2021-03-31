const PAGE = {
  data : {
    datas: [{
      name:'maoabc',
      words:'这本书在介绍RN的时候同时涵盖并且分类了I0S和Android两个平台的使用，使读者可以根据自己的使用习惯有选择性的进行阅读。类似于HTML+CSS的排版以及使用JS进行开发，使原来使用java进行前端开发的读者更容易上手。这本书对于RN的介绍非常科学详尽，对于想尽快熟悉并使用RN框架进行开发的读者，是一本不可多得的参考书。希望jikexueyuan可以更多更新这些有关新技术的书籍，使更多读者受益',
      date:'2021年3月29日',
    },{
      name:'maoabc',
      words:'这本书在介绍RN的时候同时涵盖并且分类了I0S和Android两个平台的使用，使读者可以根据自己的使用习惯有选择性的进行阅读。类似于HTML+CSS的排版以及使用JS进行开发，使原来使用java进行前端开发的读者更容易上手。这本书对于RN的介绍非常科学详尽，对于想尽快熟悉并使用RN框架进行开发的读者，是一本不可多得的参考书。希望jikexueyuan可以更多更新这些有关新技术的书籍，使更多读者受益',
      date:'2021年3月29日',
    },{
      name:'maoabc',
      words:'这本书在介绍RN的时候同时涵盖并且分类了I0S和Android两个平台的使用，使读者可以根据自己的使用习惯有选择性的进行阅读。类似于HTML+CSS的排版以及使用JS进行开发，使原来使用java进行前端开发的读者更容易上手。这本书对于RN的介绍非常科学详尽，对于想尽快熟悉并使用RN框架进行开发的读者，是一本不可多得的参考书。希望可以更多更新这些有关新技术的书籍，使更多读者受益',
      date:'2021年3月29日',
    },{
      name:'maoabc',
      words:'这本书在介绍RN的时候同时涵盖并且分类了I0S和Android两个平台的使用，使读者可以根据自己的使用习惯有选择性的进行阅读。类似于HTML+CSS的排版以及使用JS进行开发，使原来使用java进行前端开发的读者更容易上手。这本书对于RN的介绍非常科学详尽，对于想尽快熟悉并使用RN框架进行开发的读者，是一本不可多得的参考书。希望可以更多更新这些有关新技术的书籍，使更多读者受益',
      date:'2021年3月29日',
    },{
      name:'maoabc',
      words:'这本书在介绍RN的时候同时涵盖并且分类了I0S和Android两个平台的使用，使读者可以根据自己的使用习惯有选择性的进行阅读。类似于HTML+CSS的排版以及使用JS进行开发，使原来使用java进行前端开发的读者更容易上手。这本书对于RN的介绍非常科学详尽，对于想尽快熟悉并使用RN框架进行开发的读者，是一本不可多得的参考书。希望jikexueyuan可以更多更新这些有关新技术的书籍，使更多读者受益',
      date:'2021年3月30日',
    }],
    // total: 5,
    pageSize: 2,
    currentPage: 1,
  },
  init: function () {
    this.render();
    this.pagnum();
    this.changePageClass();
    let pagecon = document.querySelector('.page-con');
    pagecon.addEventListener('click',this.pageUl);
    let skipInput = document.querySelector('.skip-page input');
    skipInput.addEventListener('keyup',this.skipPage);
    let clickLa=document.getElementsByClassName('last-page')[0];
    let clickNe=document.getElementsByClassName('next-page')[0];
    clickLa.addEventListener('click',this.clickLast);
    clickNe.addEventListener('click',this.clickNext);
  },
  render: function () {
    let datas = PAGE.data.datas;
    let pageSize = PAGE.data.pageSize;
    let currentPage = PAGE.data.currentPage;
    datas.map((item,index) => {
      item.index=index;
    })    //这段不太懂
    let showData = datas.filter((item,index) => {
      return index>=(currentPage - 1) * pageSize && index<currentPage * pageSize
    })
    console.log(showData);

    let showDataStr = showData.map((item, index) => {
      return `<div class="bady-page">
      <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=289237221,199580710&fm=26&gp=0.jpg">
      <div class="bady-center">
        <span class="name">${item.name}</span>
        <span class="words">${item.words}</span>
        <span class="date">${item.date}</span>
      </div>
      <span class="sort">#${item.index + 1}</span>
    </div>`
    }).join('');
    let whole = document.getElementsByClassName('whole')[0];
    whole.innerHTML = showDataStr;
  },

  pagnum: function () {
    let pageSize = PAGE.data.pageSize;
    let pagecon = document.querySelector('.page-con');
    let total = this.data.datas.length;
    let sumpag = Math.ceil(total/pageSize);
    for (let i=1; i<=sumpag; i++){
      pagecon.innerHTML += `<li class="number"><a href="javascript:;">${i}</a></li>`;
    }
    let pages = document.getElementsByClassName('pages')[0];
    pages.innerHTML += `<span class="pages">共 ${sumpag} 页</span>`;
    let skipPage = document.querySelector('.skip-page');
    skipPage.innerHTML += `<span class="skip-page">跳转至<input type="text" class="input-page">页</span>`;
  },

  changePageClass:function () {
    let pagecon = document.querySelector('.page-con');
    let asAll = pagecon.querySelectorAll('a');
    let currentPage = PAGE.data.currentPage;
    for (let j=0; j<asAll.length; j++) {
      asAll[j].classList.remove('active');
    }
  },

  pageUl:function (e) {
    currentPage=e.target.innerHTML;
    PAGE.data.currentPage=Number(currentPage);
    PAGE.render();
    PAGE.changePageClass();
  },

  skipPage:function (e) {
    let pagecon = document.querySelector('.page-con');
    let asAll = document.querySelectorAll('a');
    let skipInput = document.querySelector('.skip-page input');
    if (e.keyCode===13 && skipInput.value!==''){    //if开始不理解
      PAGE.changePageClass();
      currentPage=skipInput.value;
      PAGE.data.currentPage=Number(currentPage);
      if(currentPage>asAll.length||currentPage<=0){
        return;
      }
      PAGE.render();
      PAGE.changePageClass();
      skipInput.blur();
    }
  },
  clickLast: function () {   //上一页
    let currentPage = PAGE.data.currentPage;
    if(currentPage === 1) {
      return;
    }else{
      PAGE.data.currentPage=currentPage-1;
      PAGE.render();
    }
  },
  clickNext: function() {   //下一页
    let currentPage=PAGE.data.currentPage;
    if(currentPage === 3){
      return;
    }else{
      PAGE.data.currentPage=currentPage+1;
      PAGE.render();
    }
  },



}

PAGE.init();