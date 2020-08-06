const svgCaptcha = require('svg-captcha') // 用于生成验证码
const BaseController = require('./base')
const fse = require('fs-extra')


class UtilController extends BaseController {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 3,
    })
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'
    console.log(captcha.text)
    this.ctx.body = captcha.data
  }
  // 发送email code
  async sendcode() {
    const { ctx } = this
    const email = ctx.query.email
    let code = Math.random().toString().slice(2, 6)
    console.log('email' + email + 'code:' + code)
    ctx.session.emailcode = code

    const subject = '开课吧验证码'
    const text = ''
    const html = `<h2>小开社区</h2><a href="https://kaikeba.com"><span>${code}</span></a>`
    // 通过service发送 请求email code
    const hasSend = await this.service.tool.sendMail(email, subject, text, html)
    if (hasSend) {
      this.message('发送成功')
    } else {
      this.error('发送失败')
    }
  }

  async uploadfile() {
    const {ctx} = this
    const file = ctx.request.files[0]
    // const {name} = ctx.request.body
    // 将图片从暂存目录移动到 指定文件夹下
    await fse.move(file.filepath, this.config.UPLOAD_DIR+`/${file.filename}` )
    this.success({
      url: `/public/${file.filename}`
    })
  }
  // 检查文件是否存在
  // 文件hash名存在，文件碎片文件夹存在
  async checkfile() {

  }
  async getUploadedList() {
    
  }
}
module.exports = UtilController
