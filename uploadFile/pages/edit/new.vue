<template>
<div>
    <div contenteditable="true">
        haha
    </div>
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
import highlight from 'highlight.js'
import hljs from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/monokai-sublime.css'

export default {
    data() {
        return {
            content: `# 开课吧
            * 上课
            * 睡觉
            * 吃饭
            \`\`\`javascript
                console.log('hello world')
            \`\`\`
            `
        }
    },
    mounted() {
        this.timer = null
        this.bindEvents()

        marked.setOption({
            rendered: new marked.Renderers(),
            highlight(code) {
                return hljs.highlightAuto(code).value
            }
        })
    },
    computed: {
        compiledContent() {
            return marked(this.content, {})
        }
    },
    methods: {
        bindEvents() {
            this.$refs.editor.addEventListener('paste', async e => {
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
        async submit() {
            // 文章列表，点赞，关注，草稿 
            // user ->article  一对多
            let ret = await this.$http.post('/article/create', {
                content: this.content, // selected:false
                compiledContent: this.compiledContent // 显示只读取这个
            })
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