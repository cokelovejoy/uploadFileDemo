<template>
<div>
    <div class="write-btn">
        <el-button @click="submit" type="primary">提交</el-button>
    </div>
    <el-row>
        <el-col :span='12'>
            <textarea ref="editor" class="md-editor" :value="content" @input="update"></textarea>
        </el-col>
        <el-col :span="12">
            <div class="markdown-body" v-html="compiledContent"></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import marked from 'marked'
export default {
    data() {
        return {
            content: `# 开课吧
            * 上课
            * 睡觉
            * 吃饭
            `
        }
    },
    mounted() {
        this.timer = null
        this.bindEvents()
    },
    computed: {
        compiledContent() {
            return marked(this.content, {})
        }
    },
    methods: {
        bindEvents() {
            this.$refs.editor.addEventListener('ppaste', async e => {
                const files = e.clipboardData.files
                console.log(files)
                // 直接上传
            })
            this.$refs.editor.addEventListener('drop', async e => {
                const file = e.dataTransfer.files
                console.log('file', file)
                e.preventDefault();
            })
        },
        submit() {

        },
        // lodash /debounce 防抖
        update(e) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.content = e.target.value
            }, 350)
        }
    }
}
</script>

<style lang="stylus">
.md-editor
    width: 100%
    height: 100%
    outline: none 
.write-btn
    position fixed
    z-index 100
    right 30px
    top 10px

</style>