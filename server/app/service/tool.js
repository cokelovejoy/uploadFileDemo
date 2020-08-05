const {Service} = require('egg')
const nodeMailer = require('nodemailer')
const userEmail = 'cokelovejoy@126.com'
const transporter = nodeMailer.createTransport({
    service: "126",
    secureConnection: true,
    auth: {
        user: userEmail,
        pass: 'LVXYNHGAKUVOOUVN' // 邮箱授权码
    }
})
class ToolService extends Service{
    async sendMail(email, subject, text, html) {
        const mailOptions = {
            from: userEmail,
            cc: userEmail, // 抄送
            to: email,
            subject,
            text,
            html
        }
        try {
            await transporter.sendMail(mailOptions)
            return true
        } catch(e) {
            console.log('email error: ', e)
            return false
        }
    }
}

module.exports = ToolService