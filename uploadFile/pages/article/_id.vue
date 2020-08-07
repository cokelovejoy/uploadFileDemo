<template>
    <div class="kkb-container">
        <user-display :user="article.author">
            <el-button v-if="isFollow" type="success" @click="cancelfollow">已关注</el-button>
            <el-button v-else @click="follow">关注</el-button>
        </user-display>
        <el-divider></el-divider>
        <div class="article" v-html="article.article_html"></div>
        <el-divider></el-divider>
        <el-button @click="likeAction" :type="likeStatus ? 'success': 'default'">
            <i class="el-icon-thumb">{{ article.like }}</i>
        </el-button>
    </div>
</template>
<script>
import UserDisplay from '../components/UserDisplay.vue'
export default {
    components: {
        UserDisplay
    },
    data() {
        return {
            isFollow: false,
            likeStatus: false,
            dislikeStatus: false,
            article: {
                title: '',
                author: {}
            }
        }
    },
    mounted() {
        let {id} = this.$route.params
        this.id = id
        this.getArticle()
        // 用户已登陆
        const token = localStorage.getItem('KKB_USER_TOKEN')
        this.token = token
    },
    methods: {
        async getLikeStatus() {
            // 修改likeStatus
            let ret = await this.$http.get('/user/article/' + this.id)
            if (ret.code == 0) {
                this.likeStatus = ret.data.likeStatus
                this.dislikeStatus = ret.data.dislike
            }
        },
        async likeAction() {
            // 点赞和取消
            let type = this.likeStatus ? 'delete' : 'put'
            let ret = await this.$http[type]('/user/likeArticle/' + this.id)
            if (ret.code == 0) {
                this.getArticle()
                this.$notify({
                    title: ret.message,
                    type: 'success'
                })
            }
        },
        async getArticle() {
            let ret = await this.$http.get('/article/' + this.id)
            this.article = ret.data
            if (this.token) {

            }
        }
    }

}
</script>