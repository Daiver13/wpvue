<template>
  <div class="category">
    <div v-for="post in posts">
      Category
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Category',
      category: []
    }
  },
  created: function () {
    this.$http.get('wp/v2/taxonomies').then(response => {
      for(let tax in response.data) {
        this.category.push(response.data[tax])
      }
    }, (error) => { 
      alert ('error') 
    })
  }
}
</script>
