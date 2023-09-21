<template>
    <div class="hello">
        <h1>Todos List</h1>
        <template v-if="todos">
            <ul style="display: inline-grid;">
                <li v-for="todo in todos.data" :key="todo.id">
                    <p>
                        <strong>Title:</strong> {{ todo.title }}
                    </p>
                    <p>
                        <strong>Completed:</strong> <input type="checkbox" :checked="todo.completed" readonly>
                    </p>
                    <hr />
                </li>
            </ul>
        </template>
        <template v-else>
            Loading...
        </template>
    </div>
</template>

<script>
export default {
    name: 'TodosList',
    data() {
        return {
            todos: null,
        }
    },
    beforeMount() {
        this.getTodos();
    },
    methods: {
        getTodos() {
            fetch(`${this.$api_url}/todos`)
                .then((response) => response.json())
                .then((result) => {
                    this.todos = result
                })
        },
    },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
