<template>
    <div>
        <CompHeader />
        <div class="container">
            <div class="text-center"><h3>MY TODOS</h3></div>
            <router-view />
        </div>
    </div>
</template>

<script>
import CompHeader from './components/share/CompHeader.vue'

export default {
    name: 'App',
    components:{
        CompHeader
    }
}
</script>

