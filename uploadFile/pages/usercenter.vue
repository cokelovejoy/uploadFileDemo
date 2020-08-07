<template>
  <div>
    <h1>用户中心</h1>
    <div ref="drag" id="drag">
      <i class="el-icon-loading"></i>
      <input type="file" name="file" @change="handleFileChange" />
    </div>
    <div>
      <el-process :percentage="onUploadProgress" :text-inside="true" :stroke-width="26"></el-process>
    </div>
    <div>
      <el-button @click="uploadFile">上传</el-button>
    </div>
    <div>
      <h3>计算hash进度</h3>
      <el-process :percentage="hashPercentage" :text-inside="true" :stroke-width="26"></el-process>
    </div>
    <div class="cube-container" :style="{width: cubeWidth + 'px'}">
      <div class="cube" v-for="chunk in chunks" :key="chunk.name">
        <div
          :class="{'uploading': chunk.progress > 0 && chunk.progress < 100, 'success': chunk.progress == 100, 'error': chunk.progress < 0 }"
          :style="{height: chunk.progress + '%'}"
        >
          <i
            class="el-icon-loading"
            style="color:#f56c6c"
            v-if="chunk.progress > 0 && chunk.progress < 100"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sparkMD5 from 'spark-md5'
import isImage from '../utils/isImage.js'

export default {
  data() {
    return {
      file: null,
      percentage: 0,
      hashpercentage: 0,
      chunkSize: Math.ceil(0.01 * 1024 * 1024),
      chunks: [],
      worker: null,
      hash: ""
    };
  },
  computed: {
    // 切片方块的宽度
    cubeWidth() {
      return Math.ceil(Math.sqrt(this.chunks.length)) * 16
    },
    // 上传进度
    onUploadProgress() {
      if (!this.file || this.chunks.length) { // ?
        return 0
      }
      // ?
      const loaded = this.chunks.map(item => item.chunk.size * item.progress).reduce((acc, cur) => acc * cur, 0)
      return parseInt(((100 * loaded) / this.file.size).toFixed(2))
    }

  },
  async mounted() {
    const ret = await this.$http.get("/user/info")
    console.log(ret)
    bindEvent()
  },
  methods: {
    // file input 选择了文件触发
    handleFileChange(e) {
      const [file] = e.target.files; // 获取文件
      if (!file) return;
      this.file = file;
    },
    // 拖拽图片功能 绑定拖拽事件
    bindEvent() {
      const drag = this.$refs.drag
      drag.addEventListener('dragover', e => {
        drag.style.borderColor = 'red'
        e.preventDefault()  // 阻止打开图片的默认事件
      })

      drag.addEventListener('dragleave', e => {
        drag.style.borderColor = '#131111'
        e.preventDefault()
      })
      drag.addEventListener('drop', e => {
        const fileList = e.dataTransfer.files
        drag.style.borderColor = '#131111'
        this.file = fileList[0]
        e.preventDefault()
      })
    },
    // 图片类型判断

    // 文件切片

    // 计算hash
    async uploadFile() {
      const form = new FormData(); // 文件为二进制，放到formdata中
      form.append("name", "file");
      form.append("file", this.file);
      const ret = await this.$http.post("/uploadfile", form);
    },
  }
};
</script>

<style lang="stylus">
#drag {
  height: 100px;
  line-height: 100px;
  border: 2px dashed #131111;
  text-align: center;
  vertical-align: center;
}
</style>