<template>
    <div class="container">
        <div class="container-todos my-5">
            <div class="header-todos">
                <h2 class="text-header-todos">Form Todos</h2>
                <div class="form_header_todos">
                    <div class="form-floating d-flex">
                        <input type="text" class="form-control" id="todosInput" placeholder="Add Todos" 
                        v-model="textContent" v-on:keyup.enter="onEnter">
                        <label for="floatingInput">Add Todos</label>
                        <button class="btn btn-success" v-on:click="saveTodos">Submit</button>
                    </div>
                </div>
            </div>
            <div class="body-todos">
                <div class="item-todos" v-for="(todo, index) in todos" v-bind:key="index">
                    <div class="info-todos">
                        <input type="checkbox" name="completed_todos" id="check" class="form-check-input me-2" 
                            v-bind:checked="todo.todos_checked === 1" 
                            v-on:change="checkedTodo(index)" />
                        <span v-bind:class="{active:todo.todos_status === 1}">{{todo.todos_content}}</span> 
                    </div>
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn btn-warning btn-sm" 
                            v-on:click="showAlertEditTodo(todo.todos_content, todo.todos_id, todo.todos_status)"
                            :disabled="todo.todos_status === 1">
                            Edit
                        </button>
                        <button class="btn-close" aria-label="Close" v-on:click="deleteTodo(todo.todos_id)"></button>
                    </div>
                </div>
            </div>
            <div class="footer-todos">
                <div class="button_footer_todos">
                    <button class="btn btn-success" v-on:click="checkAllTodos">Check All</button>
                    <button class="btn btn-warning" v-on:click="UncheckAllTodos">Uncheck All</button>
                    <button class="btn btn-danger" v-on:click="DelAllTodos">Del All</button>
                    <button class="btn btn-success" v-on:click="DoneAllTodos">Done All</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'CompTodos',
    data(){
        return{
            todos:[],
            textContent:'',
        }
    },
    created(){
        axios.get('http://api.localhost/api/index')
            .then(response => {
                this.todos = response.data.data
            })
    },
    
    methods: {
        onEnter() {
            if(this.textContent.trim().length === 0){
                return false;
            }else{
                let params = { 
                    'todos_content': this.textContent, 'todos_status':0, 'todos_checked':0
                }

                axios.post('http://api.localhost/api/add-todos', params)
                    .then(response => {
                        this.todos = response.data.data
                    })
            }
            return this.textContent = ''
        },
        showAlertEditTodo(cont, id, sta){
            if(sta === 0){
                this.$swal({
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://sweetalert2.github.io/images/nyan-cat.gif")
                        left top
                        no-repeat
                    `,
                    title: 'Edit Todos '+id,
                    input: 'text',
                    inputPlaceholder: 'Enter todo content',
                    inputValue: cont,
                    inputValidator: (value) => {
                        if (!value) {
                            return 'You need to write something!'
                        }
                    }
                    }).then((result) => {
                    if (result.isConfirmed) {
                        if(result.value === cont){
                            this.$swal({
                                title: 'The information is duplicated with the old information',
                                icon: 'question'
                            })
                        }else{
                            let params = { 
                                'todos_content': result.value, 'todos_id': id
                            }
                            axios.post('http://api.localhost/api/edit-todos', params)
                                .then(response => {
                                    this.todos = response.data.data
                                })

                            this.$swal({
                                title: 'Edit Success',
                                text: result.value,
                                icon: 'success'
                            })
                        }
                    }
                });
            }else{
                this.$swal({
                    title: 'ERROR',
                    icon: 'error'
                })
            }
        },

        saveTodos(){ // Thêm Todos
            if(this.textContent.trim().length === 0){
                return false;
            }else{
                let params = { 
                    'todos_content': this.textContent, 'todos_status':0, 'todos_checked':0
                }

                axios.post('http://api.localhost/api/add-todos', params)
                    .then(response => {
                        this.todos = response.data.data
                    })
            }
            return this.textContent = ''
        }, //Thêm Todos

        deleteTodo(id) { //Xóa từng Todo
            if(confirm("Are you sure you want to delete")){ 
                axios.post('http://api.localhost/api/del-todos', {id: id})
                    .then(response => {
                        this.todos = response.data.data
                    })
            }
        },//Xóa từng Todo

        checkedTodo(k){ // Check Todos từng todos
            if(this.todos[k].todos_checked === 0){
                this.todos[k].todos_checked = 1
            }else{
                this.todos[k].todos_checked = 0
            }
        },// Check Todos từng todos

        checkAllTodos(){ //Check Tất cả Todos
            this.todos.forEach(todo => {
                if(todo.todos_status === 0){
                    todo.todos_checked = 1;
                }
            })
        },//Check Tất cả Todos

        UncheckAllTodos(){// Bỏ check Tất cả Todos
            this.todos.forEach(todo => {
                if(todo.todos_status === 0){
                    todo.todos_checked = 0;
                }
            })
        }, // Bỏ check Tất cả Todos

        DelAllTodos(){ //Xóa Tất cả Todos được chọn
            if(confirm("Are you sure you want to delete all todos?")){
                let params = this.todos
                axios.post('http://api.localhost/api/del-all-todos', {params})
                    .then(response => {
                        this.todos = response.data.data
                    })
            } 
        },// Xóa tất cả Todos được chọn

        DoneAllTodos(){ //Hoàn thành các Todos được chọn
            if(confirm("Are you sure you want to done all todos?")){
                let params = this.todos
                axios.post('http://api.localhost/api/done-all-todos', {params})
                    .then(response => {
                        this.todos = response.data.data
                    })
            }
        },//Hoàn thành tất cả các Todos được chọn
    },

}
</script>
