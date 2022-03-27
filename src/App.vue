<template>
    <navbar></navbar>
    <div class="blog">
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar.vue";
export default {
    components: { Navbar },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.blog {
    margin: 15px;
}

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.page-wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
}
.page__current {
    border: 2px solid teal;
}
</style>