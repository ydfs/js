class Swiper {
  constructor(prop) {
    this.state = {
      elIdParent: prop.swiper.elIdParent,
      elClassChild: prop.swiper.elClassChild,
      id: prop.id,
      duration: prop.duration,
      isLock: false,
      isActive: 0,
      index: 0,
      translateX: null,
      itemWidth: null,
      defaultLength: null,
      loop: prop.loop,
      loopTime: prop.loopTime,
    };
    this.pagination = {
      elClassParent: prop.pagination.elClassParent,
      elClassChild: prop.pagination.elClassChild,
      elChilActive: prop.pagination.elChilActive,
    }
    this.navigation = {
      nextEl: prop.navigation.nextEl,
      prevEl: prop.navigation.prevEl,
    }

    this._$ = selector => document.querySelector(selector);//用于选择DOM
    this._createElement = type => document.createElement(type);//用于创建DOM
    this._setContent = (elem, content) => elem.textContent = content;//用于文本赋值
    this._appendChild = (container, node) => container.appendChild(node);//用于增加子节点
    this._onEventListener = (parentNode, action, childClassName, callback) => {
      parentNode.addEventListener(action, function (e) {
          e.target.className === childClassName && callback(e)
      })
    }
    this.init();
  };
  init() {
    this._addHTML();
    this._clone();
    this._bind();
  };

  _bind() {
    let $ = this._$;
    let swiperContainer = $(`#${this.state.elIdParent}`).parentNode;

    var timer;
    if (this.state.loop) {
      timer = setInterval(() => this._nextArrow(), this.state.loopTime);
      swiperContainer.addEventListener('mouseover', () =>clearInterval(timer));
      swiperContainer.addEventListener('mouseout', ()=>{
        this._nextArrow();
        timer = setInterval(() => this._nextArrow(), this.state.loopTime)
      });
    }
    if (this.navigation.prevEl) {
      $(`.${this.navigation.prevEl}`).addEventListener('click', () => this._prevArrow());
    }
    if (this.navigation.nextEl){
      $(`.${this.navigation.nextEl}`).addEventListener('click', () => this._nextArrow());
    }
    if (!this.pagination.elClassParent) {
      return
    }
    let swiperPagination = $(`.${this.pagination.elClassParent}`);
    this._onEventListener(swiperPagination, 'click', this.pagination,elClassChild, (e) => {
      let index = Number(e.target.dataset.index);
      let defaultLength = this.state.defaultLength;
      let currentIndex = Number($(`.${this.pagination.elClassChild}.${this.pagination.elChilActive}`).dataset.index);
      if (currentIndex === defaultLength - 1 && index === 0) {
        index = defaultLength;
      }
      if (currentIndex === 0 && index === defaultLength -1) {
        index = - 1;
      }
      this._goIndex(index);
    });
  };

  _addHTML() {
    if(!this.pagination.elClassParent) {
      return
    }
    let $ = this._$;
    let swiperItem = $(`#${this.state.elIdParent}`).children;
    let swiperPagination = $(`.${this.pagination.elClassParent}`);
    for (let i = 0; i < swiperItem.length;i++) {
      let swiperPaginationSwitch = this._createElement('span');
      swiperPaginationSwitch.setAttribute('class',this.pagination.elClassChild);
      swiperPaginationSwitch.setAttribute('data-index', i);
      this._appendChild(swiperPagination, swiperPaginationSwitch);
    }
  };
  
  _clone() {
    let $ = this._$;
    let swiperList = $(`#${this.state.elIdParent}`);
    let swiperItem = document.getElementsByClassName(this.state.elClassChild);
    let containerWidth = swiperList.parentNode.offsetWidth;
    let swiperItemWidth = swiperItem[0].offsetWidth;
    let cloneNum = parseInt(containerWidth / swiperItemWidth);
    let swiperItemClone = [];
    for(let i = 0; i < swiperItem.length; i++){
      swiperItemClone.push(swiperItem[i].outerHTML);
    }

    let index = this.state.index;
    if (this.pagination.elClassParent) {
      let swiperSwitch = document.getElementsByClassName(this.parentNode.elClassChild);
      let swiperSwitchActive = swiperSwitch[index];
      swiperSwitchActive.classList.add(this.pagination.elChilActive);
    };
    this.state.defaultLength = swiperItem.length;
    this.state.itemWidth = swiperItemWidth;
    this.state.translateX = - swiperItemWidth * (index + cloneNum);
    swiperList.style.transform = `translateX(${this.state.translateX}px)`;
    swiperList.insertAdjacentHTML('afterbegin',swiperItemClone.slice(1).join(''));
    swiperList.insertAdjacentHTML('beforeend',swiperItemClone.slice(0,this.state.defaultLength - 1).join(''));
    
    this._goIndex(index);
  };

  _highLight(index) {
    let swiperSwitch = document.getElementsByClassName(this.pagination.elClassChild);
    [].forEach.call(swiperSwitch, swiperSwitch => swiperSwitch.classList.remove(this.pagination.elChilActive));
    let swiperSwitchActive = swiperSwitch[index];
    swiperSwitchActive.classList.add(`${this.pagination,elChilActive}`);
  };
  _goIndex(index) {
    let $ = this._$;
    let swiperList = $(`#${this.state.elIdParent}`);
    let swiperItem = document.getElementsByClassName(this.state.elClassChild);
    let containerWidth = swiperList.parentNode.offsetWidth;
    let swiperItemWidth = swiperItem[0].offsetWidth;
    let cloneNum = parseInt(containerWidth / swiperItemWidth);
    let duration = this.state.duration;
    let beginTranslateX = this.state.translateX;
    let itemWidth = this.state.itemWidth;
    let defaultLength = this.state.defaultLength;
    let endTranslateX = - itemWidth * (index + cloneNum);
    if (this.state.isLock) {
      return
    }
    this.state.isLock = true;

    this._animateTo(beginTranslateX,endTranslateX,duration, function (value) {
      swiperList.style.transform = `translateX(${value}px)`;
    }, value => {
      if (index === -1) {
        index = defaultLength -1;
        value = -itemWidth * (index + cloneNum);
      }
      if (index === defaultLength) {
        index = 0;
        value = - itemWidth * (index + cloneNum);
      }
      swiperList.style.transform = `translateX(${value}px)`;
      this.state.isLock = false;
      this.state.index = index;
      this.state.translateX = value;
      if (this.pagination.elClassParent) {
        this._highLight(index);
      }
    })
  };

  _animateTo(begin, end, duration, changeCallback, finishCallback) {
    var that = this;
    let startTime = Date.now();
    requestAnimationFrame(function update() {
      let currentTime = Date.now();
      let time = currentTime - startTime;
      let value = that._linear(begin, end, time, duration);
      typeof changeCallback === 'function' && changeCallback(value);
      if (startTime + duration > currentTime) {
        requestAnimationFrame(update);
      }else {
        typeof finishCallback === 'function' && finishCallback(end);
      }
    });
  };
  _linear(begin, end, time, duration) {
    return (end - begin) / duration * time + begin;
  };

  _prevArrow() {
    let index = this.state.index;
    this._goIndex(index - 1);
  };
  _nextArrow() {
    let index = this.state.index;
    this._goIndex(index + 1);
  };

}