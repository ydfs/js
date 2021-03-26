const PAGE = {
  date: {
    todos: [{
      title:'跑步',
      completed: false
    },{
      title:'游泳',
      completed: false
    },{
      title:'背单词',
      completed: true
    }],
    filter: 1,
    filters: {
      1:'全部',
      2:'进行中',
      3:'已完成',
    }
  },
  init: function() {
    this.bind();
    this.render();
  },
  bind: function() {
    let input = document.getElementById('top-input');
    input.addEventListener('keyup',this.addTodo);
    let todoList =document.getElementById('body-center');
    this.onEventLister(todoList,'click','center-item-r',this.toggleTodo);
    this.onEventLister(todoList,'click','center-item-x',this.removeTodo);
    let todoFilter =document.getElementById('bottom-center');
    this.onEventLister(todoFilter,'click','center-ter',this.filterTodo);
  },

  onEventLister: function(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },

  render: function() {
    let todos = this.data.todos;
    console.log(this.data.todos)
    let filter = this.data.filter;
    let filters = this.data.filters;
    todos.forEach((data,index)=> data.index = index);
    let showTodos;
    switch (filter) {
      case 2:
        showTodos = todos.filter( data =>!data.completed );
        break;
      case 3:
        showTodos = todos.filter( data => data.completed );
        break;
      default:
        showTodos = todos;
        break    
    }
    let todosElement = showTodos.map((data)=>{
      return`
        <div class="center-item ${data.completed ? 'active' : ''}" data-index="${data.index}">
          <div class="center-item-r"></div>
          <div class="center-item-w">${data.title}</div>
          <div class="center-item-x">x</div>
        </div>
      `
    }).join('');
    let filterElement = Object.keys(filters).map( key =>{
      return`
        <span class="center-ter ${filter == key ? 'active' : ''}" data-id="${filters[key]}">${filters[key]}</span>
      `
    }).join('');
    let todoList = document.getElementById('body-center');
    let todoFilter = document.getElementById('bottom-center');
    todoList.innerHTML = todosElement;
    todoFilter.innerHTML = filterElement;
  },
  
  addTodo: function(e) {
    let value = this.value.trim();
    if (e.which !==13 || !value) {
      return;
    }
    let todos = PAGE.data.todos;
    todos.push({
      title: value,
      completed: false
    })
    PAGE.render();
    this.value = '';
  },
  toggleTodo: function(e) {
    let todos = PAGE.data.todos;
    let todoItem = $(this).parent();
    let index = todoItem.attr('data-index');
    todos[index].completed = !todos[index].completed;
    PAGE.render();
  },
  removeTodo: function(e) {
    let todos = PAGE.data.todos;
    let todoItem = $(this).parent();
    let index = todoItem.attr('data-index');
    todos.splice(index,1);
    PAGE.render();
  },
  filterTodo: function(e) {
    let filterItem = e.target;
    let filter = filterItem.dataset.id;
    PAGE.data.filter = Number(filter);
    PAGE.render();
  },
}

PAGE.init();