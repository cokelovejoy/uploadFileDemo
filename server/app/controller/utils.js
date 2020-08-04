const svgCaptcha = require('svg-captcha') // 用于生成验证码
const BaseController = require('./base')


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
}
module.exports = UtilController
