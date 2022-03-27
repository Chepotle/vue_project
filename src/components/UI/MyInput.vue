<template>
    <input
        :value="modelValue"
        @input="updateInput"
        class="blog__input"
        type="text"
    />
</template>

<script>
export default {
    name: "my-input",
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(e) {
            this.$emit("update:modelValue", e.target.value);
        },
    },
};
</script>

<style scoped>
.blog__input {
    border: 1px solid teal;
    padding: 10px 15px;
    width: 100%;
    margin-top: 10px;
}
</style>