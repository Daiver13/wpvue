<template>
  <div class="container">
    <a href="/">Back home</a>
    <img v-if="post[0].better_featured_image" :src="post[0].better_featured_image.source_url">
    <h2>{{ post[0].title.rendered }}</h2>
    <div class="content" v-html="post[0].content.rendered"></div>
  </div>
</template>


<script>
  export default {
    name: 'Single',
    data: function () {
      return {
        msg: 'Welcome to Your Vue.js App',
        post: [],
      }
    },
    mounted: function(){
      this.$http.get('wp/v2/posts/73').then(response => {
        this.post.push(response.data)
      },
        (error) => { 
          alert ('error') 
        }
      )
    }
  }
</script>
