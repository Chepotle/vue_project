<template>
    <div class="blog__post">
        <div>
            <div class="">{{ post.id }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="blog__post-btns">
            <my-button @click="$router.push(`/posts/${post.id}`)"
                >Открыть</my-button
            >
            <my-button @click="$emit('remove', post)">Удалить</my-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.blog__post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>