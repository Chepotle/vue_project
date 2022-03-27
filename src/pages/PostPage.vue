<template>
    <div>
        <h1>Лента</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
        <div class="app__btns">
            <my-button @click="showModal">Создать пост</my-button>
            <my-select
                v-model="selectedSort"
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

export default {
    components: {
        PostForm,
        PostList,
        MyInput,
    },
    data() {
        return {
            posts: [],
            modalVisible: false,
            postLoading: false,
            selectedSort: "",
            searchQuery: "",
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {
                    value: "title",
                    name: "По названию",
                },
                {
                    value: "body",
                    name: "По содержимому",
                },
            ],
        };
    },
    methods: {
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
        async fetchPosts() {
            try {
                this.postLoading = true;
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                );
                this.totalPages = Math.ceil(
                    response.headers["x-total-count"] / this.limit
                );
                this.posts = response.data;
            } catch (e) {
                alert("Ошибка");
            } finally {
                this.postLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                );
                this.totalPages = Math.ceil(
                    response.headers["x-total-count"] / this.limit
                );
                this.posts = [...this.posts, ...response.data];
            } catch (e) {
                alert("Ошибка");
            }
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // },
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(
                    post2[this.selectedSort]
                );
            });
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter((post) => {
                return post.title
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase());
            });
        },
    },
    watch: {
        // page() {
        //     this.fetchPosts();
        // },
        // selectedSort(newValue) {
        //     this.posts.sort(function (post1, post2) {
        //         return post1[newValue]?.localeCompare(post2[newValue]);
        //     });
        // },
    },
    mounted() {
        this.fetchPosts();
        // const options = {
        //     rootMargin: "0px",
        //     threshold: 1.0,
        // };
        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePosts();
        //     }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
    },
};
</script>

<style scoped>
</style>