<template>
    <div>
        <h1>Лента</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button @click="showModal">Создать пост</my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            ></my-select>
        </div>
        <my-modal v-model:show="modalVisible">
            <post-form @create="createPost" />
        </my-modal>
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!postLoading"
        />
        <h2 v-else>Идет загрузка...</h2>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page-wrapper">
            <div
                class="page"
                v-for="pageNumber in totalPages"
                :key="pageNumber"
                @click="changePage(pageNumber)"
                :class="{
                    page__current: page === pageNumber,
                }"
            >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
    components: {
        PostForm,
        PostList,
        MyInput,
        MyButton,
    },
    data() {
        return {
            modalVisible: false,
        };
    },
    methods: {
        ...mapMutations({
            setPage: "post/setPage",
            setSearchQuery: "post/setSearchQuery",
            setSelectedSort: "post/setSelectedSort",
        }),
        ...mapActions({
            loadMorePosts: "post/loadMorePosts",
            fetchPosts: "post/fetchPosts",
        }),
        createPost(post) {
            if (post.title != "" && post.body != "") {
                this.posts.push(post);
                this.modalVisible = false;
            }
        },
        removePost(post) {
            this.posts = this.posts.filter((item) => item.id != post.id);
        },
        showModal() {
            this.modalVisible = true;
        },
    },
    computed: {
        ...mapState({
            posts: (state) => state.post.posts,
            postLoading: (state) => state.post.postLoading,
            selectedSort: (state) => state.post.selectedSort,
            searchQuery: (state) => state.post.searchQuery,
            page: (state) => state.post.page,
            limit: (state) => state.post.limit,
            totalPages: (state) => state.post.totalPages,
            sortOptions: (state) => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: "post/sortedPosts",
            sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
        }),
    },
    watch: {},
    mounted() {
        this.fetchPosts();
    },
};
</script>

<style scoped>
</style>