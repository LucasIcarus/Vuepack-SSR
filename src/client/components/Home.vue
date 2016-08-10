<style lang="css">

.container-main {
    .logo-vue {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        .brief {
            text-align: center;
        }
    }
    .features {
        margin-top: 20px;
        display: flex;
        .left,
        .right {
            flex: 1;
        }
        .center {
            flex: 2;
        }
        ul {
            margin-left: -0.5em;
        }
    }
}

</style>

<template lang="html">

<div class="container-main">
    <section class="logo-vue">
        <div class="center">
            <img src="../assets/img/logo.png" alt="logo-vue" />
            <div class="brief">
                <strong>VuePack</strong> is a modern Vue.js Starter
                <br> which uses Vue2, Vuex, Vue-router and Webpack 2.
            </div>
        </div>
    </section>
    <section class="features">
        <div class="left">

        </div>
        <div class="center">
            <h2>Features</h2>
            <ul>
                <li>Vue2</li>
                <li>Latest version of Vuex/Router</li>
                <li>Webpack 2</li>
                <li>Babel 6</li>
                <li>Hot reloading</li>
                <li>Split vendor code from your app</li>
                <li>A boilerplate which is small and focusing on client-side apps</li>
            </ul>
        </div>
        <div class="right">

        </div>
    </section>
</div>

</template>
