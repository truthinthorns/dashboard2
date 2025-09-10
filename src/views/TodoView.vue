<template>
  <div>
    <h1>Todo List</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="editTodo(todo)">Edit</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <input v-model="newTodoText" placeholder="Add new todo" />
    <button @click="addTodo">Add</button>

    <div v-if="editingTodo">
      <h2>Edit Todo</h2>
      <input v-model="editingTodo.text" />
      <button @click="updateTodo">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodoText: '',
      editingTodo: null,
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      // In a real application, this would fetch data from an API
      this.todos = [
        { id: 1, text: 'Learn Vue 3' },
        { id: 2, text: 'Build a Todo App' },
      ];
    },
    addTodo() {
      if (this.newTodoText.trim()) {
        const newTodo = {
          id: Date.now(), // Simple ID generation
          text: this.newTodoText.trim(),
        };
        this.todos.push(newTodo);
        this.newTodoText = '';
      }
    },
    editTodo(todo) {
      this.editingTodo = { ...todo }; // Create a copy to avoid modifying the original directly
    },
    updateTodo() {
      const index = this.todos.findIndex(todo => todo.id === this.editingTodo.id);
      if (index !== -1) {
        this.$set(this.todos, index, this.editingTodo);
        this.cancelEdit();
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    cancelEdit() {
      this.editingTodo = null;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
