<template>
  <div class="kkb-container">
    <virtual-list :listData="articles"></virtual-list>
    <div v-for="article in articles" :key="article.id">
      {{ article.title }}
       
   
    </div>
  </div>
</template>

<script>
import VirtualList from '../components/VirtualList.vue'
export default {
  data() {
    return {
      articles: []
    }
  },
  async mounted() {
    let ret = await this.$http.get('/article')
    if (ret.code ==0 ) {
      this.articles = ret.data
    }
  },
  components: {
    VirtualList
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
