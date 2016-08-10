<style lang="css">

.container {
    display: flex;
    height: 100%;
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
    .brief {
        li:nth-child(4) {
            list-style: none;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
}

</style>

<template lang="html">

<div class="container">
    <div class="left">

    </div>
    <div class="center">
        <section class="brief">
            <h2>About SSR Edition</h2>
            <ul>
                <li>Aggressive: Using babel-node (babel-cli) as dev tool</li>
                <li>Slow: Babel-cli, u konw, without breakpoint and slow</li>
                <li>Coupling: Using Express as server and using xtpl template</li>
                <li>But</li>
                <li>Convenient: Both Server and Clinet Side written by ES2015</li>
                <li>One-Stop: In dev, just run one npm script and with BrowserSync in it</li>
            </ul>
        </section>
        <section class="todos">
            <h2>TODOs</h2>
            <ul>
                <li>Lint</li>
                <li>Production Optimization</li>
                <li>Inline-CSS Loading Issue</li>
            </ul>
        </section>
    </div>
    <div class="right">

    </div>
</div>

</template>
