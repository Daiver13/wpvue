<template>
  <div class="single">
    <transition name="overlay">
      <div class="overlay" v-if="show"></div>
    </transition>
    <transition name="overlay">
      <div v-if="loading">
        <div class="loading">Loading...</div>
      </div>
    </transition>
    <div class="post__list">
      <div v-for="post in posts" class="post__item">
        <div class="post__item-left" v-if="post.better_featured_image">
            <a v-on:click="getThePost(post.id)" >
              <img :src="post.better_featured_image.media_details.sizes.thumbnail.source_url">
            </a>
        </div>
        <div class="post__item-right">
          <a v-on:click="getThePost(post.id)" >
            <h2>{{ post.title.rendered }}</h2>
          </a>
          <div v-html="post.excerpt.rendered"></div>
          <div v-for="category in post.cats" class="category">
              <span>{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide"> 
        <div v-if="show" class="single-preview slide-transition">
          <div class="single-preview__content">
            <h2>{{ post[0][0].title.rendered }}</h2>
            <img v-if="post[0][0].better_featured_image" :src="post[0][0].better_featured_image.source_url">
            <div class="content" v-html="post[0][0].excerpt.rendered"></div>
            <router-link to="/single">Read more</router-link>
            <a v-if="post[0][0].next_post" v-on:click="getThePost(post[0][0].next_post)" class="post-next">></a>
            <a v-if="post[0][0].prev_post" v-on:click="getThePost(post[0][0].prev_post)" class="post-prev"><</a>
            <div class="close-button">
              <button class="close" @click="show = !show">&#215;</button>
            </div>
          </div>
        </div>
    </transition>

    <div class="pagination">
      <span>Page {{ currentPage }} of {{ allPages }}</span>
      <div class="pagination__container">
        <button class="btn" v-on:click="getPosts(prev_page)" :disabled="!prev_page">Prev page</button>
        <button class="btn" v-on:click="getPosts(next_page)" :disabled="!next_page">Next page</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App',
      posts: [],
      post: [],
      categoryFilter: '',
      show: false,
      allPages: '',
      currentPage: '',
      prev_page: '',
      next_page: '',
      loading: ''
    }
  },
  mounted: function () {
    this.getPosts(1);
  },
  methods: {
    getPosts: function (pageNumber) {
      this.$set(this, 'posts', [])
      let posts = 'wp/v2/posts?per_page=5&page=' + pageNumber

      this.currentPage = pageNumber

      this.$set(this, 'loading', true)

      this.$http.get(posts).then(response => {
        for(let post in response.data) {
          this.posts.push(response.data[post])
          this.makePagination(response)

          this.$set(this, 'loading', false)
        }
      },
        (error) => { 
          alert ('error') 
        }
      )
    },

    makePagination: function(data) {
      
      this.$set(this, 'allPages', data.headers.map['x-wp-totalpages'][0])

      // Prev page 
      if(this.currentPage > 1 ) {
        this.$set(this, 'prev_page', this.currentPage - 1)
      } else {
        this.$set(this, 'prev_page', null)
      }

      // Next page 
      if(this.currentPage == this.allPages ) {
        this.$set(this, 'next_page', null)
      } else {
        this.$set(this, 'next_page', this.currentPage + 1)
      }

    },

    getThePost: function (id) {
      this.post = []

      this.$set(this, 'show', true)
      var posts = this.posts

      function filterPosts(el) {
        return el.id == id
      }

      this.post.push(posts.filter(filterPosts))
    }
  }
}

</script>
