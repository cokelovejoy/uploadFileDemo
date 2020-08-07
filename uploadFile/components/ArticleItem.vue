<template>
  <div class="article-item">
    <h2 style="width:900px">
      <nuxt-link :to="/article/+ article._id">{{ article.title }}</nuxt-link>
    </h2>
    <p>
        <user-display :user="article.author"></user-display>
        <span class="action">
            <i class="el-icon-view">{{article.views}}</i>
        </span>
        <span class="action">
            <i class="el-icon-thumb">{{ article.like }}</i>
        </span>
    </p>
  </div>
</template>

<script>
import UserDisplay from './UserDisplay.vue'
export default {
    props: ['article'],
    components: {UserDisplay}
}
</script>

<style lang="scss">
.article-item {
    padding: 20px 15px;
    border-bottom: 2px solid #eee;
}
</style>