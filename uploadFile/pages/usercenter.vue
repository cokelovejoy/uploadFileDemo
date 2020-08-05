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
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null
    };
  },
  async mounted() {
    const ret = await this.$http.get("/user/info");
    console.log(ret);
  },
  methods: {
    bindEvent() {
      const drag = thi.$refs.drag
      drag.addEventListener('dragover', e => {
        drag.style.borderColor = 'red'
        e.preventDefault()
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
    async uploadFile() {
      const form = new FormData(); // 文件为二进制，放到formdata中
      form.append("name", "file");
      form.append("file", this.file);
      const ret = await this.$http.post("/uploadfile", form);
    },
    handleFileChange(e) {
      console.log(e);
      const [file] = e.target.files;
      if (!file) return;
      this.file = file;
    }
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