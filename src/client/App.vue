<style>



body {
    background: #dddddd;
    margin: 0;
    font-size: 1.3rem;
    font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, helvetica, 'helvetica neue', Ubuntu, 'segoe ui', arial, sans-serif;
}

.page {
    text-align: center;
}

code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
}

a {
    text-decoration: none
}

</style>

<template>

<div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
</div>

</template>

<script>
    import Navbar from './components/Navbar.vue'

    export default {
        components: {
            Navbar,
        }
    }
</script>
