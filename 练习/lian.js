const PAGE = {
  data:{
    todos: [{
      title:'跑步',
      completer: false
    },{
      title:'游泳',
      completer: false
    },{
      title:'背单词',
      completer: true
    }],
    filter: 1,
    filters: {
      1: '全部',
      2: '进行中',
      3: '已完成',
    }
    
  },
  init: function() {
    this.bind();
    // this.getTodos();
  },
  bind: function() {
    $("#top-input").on('keyup',this.addTodo);
    $("#body-center").on('click','.center-item-r',this.changeTodo);
    $("#body-center").on('click','.center-item-x',this.removeTodo);
    $("#bottom-center").on('click','.center-ter',this.filterTodo);
    // window.addEventListener('unload',this.savaTodos);
  },
  // onEventLister: function(parentNode,action,childClassName,callback) {
  //   parentNode.addEventListener(action,function(e){
  //     e.target.className.indexOf(childClassName) >= 0 && callback(e);
  //   })
  // },
  render: function() {
    let todos = this.data.todos;
    console.log(this, todos)
    let filter = this.data.filter;
    let filters = this.data.filters;
    todos.forEach((data,index) => data.index = index);
    console.log(todos)
    let showTodos;
    switch(filter) {
      case 2:
        showTodos = todos.filter( data => !data.completer );
        break;
      case 3:
        showTodos = todos.filter( data => data.completer );
        break;
      default:
        showTodos = todos;
        break;
    }
    console.log(showTodos)
    let todosElement = showTodos.map((data)=>{
      return `
        <div class="center-item ${data.completer ? 'active' : ''}" data-index="${data.index}">
        <div class="center-item-r"></div>
        <div class="center-item-w">${data.title}</div>
        <div class="center-item-x">x</div>
        </div>
      `
    }).join('');
    let filterElement = Object.keys(filters).map( key => {
      console.log(filter == key ,`<span class="center-ter ${filter == key ? 'active': ''}" data-id="${key}">${filters[key]}</span>`)
      return `<span class="center-ter ${filter == key ? 'active': ''}" data-id="${key}">${filters[key]}</span>`
    }).join('');

    $('#body-center').html(todosElement);
    $('#bottom-center').html(filterElement);
  },

  getTodos: function() {
    let todos = localStorage.getItem('todos');
    todos =JSON.parse(todos) || [];
    PAGE.data.todos = todos;
    this.render();
  },
  saveTodos: function() {
    let todos = PAGE.date.todos;
    let todosStr = JSON.stringify(todos);
    localStorage.setItem('todos',todosStr);
  },
  addTodo: function(e) {
    let value = this.value.trim();
    if (e.which !==13 || !value) {
      return;
    }
    let todos = PAGE.data.todos;
    todos.push({
      title: value,
      completer: false
    })
    this.value = '';
    PAGE.render();
  },
  changeTodo: function() {
    let index = $(this).parent().data('index');
    PAGE.data.todos[index].completer = !PAGE.data.todos[index].completer;
    PAGE.render();
  },
  removeTodo: function() {
    let index = $(this).parent().data('index');
    PAGE.data.todos.splice(index,1);
    PAGE.render();
  },
  filterTodo: function() {
    PAGE.data.filter = $(this).data('index');
    console.log($(this).data('index'), 123)
    PAGE.render();
  }
}


PAGE.init();