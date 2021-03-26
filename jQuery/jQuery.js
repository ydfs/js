const PAGE = {
  data:{
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
      1: '全部',
      2: '进行中',
      3: '已完成',
    }
    
  },
  init: function() {
    this.bind();
    this.getTodos();
  },
  bind: function() {
    $("#top-input").on('keyup',this.addTodo);
    $("#body-center").on('click','.center-item-r',this.toggleTodo);
    $("#body-center").on('click','.center-item-x',this.removeTodo);
    $("#bottom-center").on('click','.center-ter',this.filterTodo);
    window.addEventListener('unload',this.saveTodos);
  },
  getTodos: function() {
      let todos = localStorage.getItem('todos');
      todos = JSON.parse(todos) || [];
      PAGE.data.todos = todos;
      this.render();
  },
  saveTodos: function() {
      let todos = PAGE.data.todos;
      let todosStr = JSON.stringify(todos);
      localStorage.setItem('todos',todosStr);
  },
  onEventLister: function(parentNode,action,childClassName,callback) {
      parentNode.addEventListener(action,function(e){
        e.target.className.indexOf(childClassName) >= 0 && callback(e);
      })
  },
  render: function() {
      let todos = this.data.todos;
      let filters = this.data.filters;
      let filter = this.data.filter;
      todos.forEach((data,index)=> data.index = index);

      let todosLength = todos.length;
      $('.bottom-left').text(todosLength+'个项目');

      let showTodos;
      switch (filter) {
        case 2:
          showTodos = todos.filter( data => !data.completed );
          break;
        case 3:
          showTodos = todos.filter( data => data.completed );
          break;
        default:
          showTodos = todos;
          break
      }

      let todosElement = showTodos.map((data)=>{
        return `
          <div class="center-item ${data.completed ? 'active' : ''}" data-index="${data.index}">
            <div class="center-item-r"></div>
            <div class="center-item-w">${data.title}</div>
            <div class="center-item-x">x</div>
          </div>
        `
      }).join('');

      let filterElement = Object.keys(filters).map( key => {
        return `<span class="center-ter ${filter == key ? 'active' : ''}" data-id="${key}">${filters[key]}</span>`
      }).join('');

      $('#body-center').html(todosElement);
      $('#bottom-center').html(filterElement);
  },
  addTodo: function(e){
      let value = this.value.trim();
      if (e.which !== 13 || !value) {
        return;
      }
      let todos = PAGE.data.todos;
      todos.push({
        title: value,
        completed: false
      })
      this.value = '';
      PAGE.render();
  },
    toggleTodo: function() {
      let todos = PAGE.data.todos;
      let todoItem = $(this).parent();
      let index = todoItem.attr('data-index');
      todos[index].completed = !todos[index].completed;
      PAGE.render();
    },
    removeTodo: function(e) {
      let todos = PAGE.data.todos;
      let todoItem = e.target.parentNode;
      let index = todoItem.dataset.index;
      todos.splice(index,1);
      PAGE.render();
    },
    filterTodo: function(e) {
      let filterItem = e.target;
      let filter = filterItem.dataset.id;
      PAGE.data.filter = Number(filter);
      PAGE.render();
    }
}

PAGE.init();