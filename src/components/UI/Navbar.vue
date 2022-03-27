<template>
    <div class="navbar">
        <div class="navbar__vue" @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Лента</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 20px"
                >О сайте</my-button
            >
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0px 15px;
}
.navbar__btns {
    margin-left: auto;
}
.navbar__vue {
    color: teal;
    cursor: pointer;
    font-weight: 600;
}
</style>