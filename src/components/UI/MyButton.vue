<template>
    <button class="blog__button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "my-button",
};
</script>

<style scoped>
.blog__button {
    background-color: transparent;
    border: 1px solid teal;
    padding: 10px 15px;
    color: teal;
    cursor: pointer;
}
</style>