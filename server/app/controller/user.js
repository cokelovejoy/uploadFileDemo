const BaseController = require('./base')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const createRule = {
    email: { type: "email" },
    nickname: { type: "string" },
    passwd: { type: "string" },
    captcha: { type: "string" }
}
const HashSalt = ":kaikeba@good!@123"

class UserController extends BaseController {
    async login() {
        const { ctx, app } = this
        const { email, passwd, captcha, emailcode } = ctx.request.body
         // 校验验证码
         if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
            return this.error('验证码错误')
        }
        // 校验邮箱验证码
        // if (emailcode !== ctx.session.emailcode) {
        //     return this.error('邮箱验证码错误')
        // }
        // 从数据库找用户信息
        const user = await ctx.model.User.findOne({
            email,
            passwd: md5(passwd + HashSalt)
        })

        if (!user) {
            return this.error('用户名密码错误')
        }

        // 用户信息加密成token返回
        const token = jwt.sign(
            {
                email,
                _id: user._id
            },
            app.config.jwt.secret, 
            {
                expiresIn: "1h" // 过期时间
            }
        )
        this.success({token, email, nickname: user.nickname})
    }

    async register() {
        const { ctx } = this
        try {
            ctx.validate(createRule)
        } catch (err) {
            return this.error('参数校验失败', -1, err.error)
        }
        const { email, passwd, captcha, nickname } = ctx.request.body
        console.log({ email, passwd, captcha, nickname })
        // 校验验证码
        if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
            return this.error('验证码错误')
        }

        // 校验邮箱
        if (await this.checkEmail(email)) {
            this.error("邮箱重复啦")
        } else {
            const result = await ctx.model.User.create({
                email,
                nickname,
                passwd: md5(passwd + HashSalt)
            })
            if (result._id) {
                this.message('注册成功')
            }
        }

        // this.success({name: 'kkb'})
    }
    async verify() {
        // 校验用户名是否存在
    }
    async info() {
        const {ctx} = this
        // 解析token，从token中读取用户状态
        const {email} = ctx.state
        const user = await this.checkEmail(email)
        console.log('user', email)
        this.success(user)
    }
    async checkEmail(email) {
        const user = await this.ctx.model.User.findOne({ email })
        return user
    }
    async isfollow() {
        const {ctx} = this
        const me = await ctx.model.User.findById(ctx.state.userid)
        // 我的follow字段里有没有传来的这个用户id
        const isFollow = !!me.following.find(id => id.toString() === ctx.params.id)
        this.success({isFollow})
    }
    async follow() {
        const {ctx} = this
        const me = await ctx.model.User.findById(ctx.state.userid)
        // 我的follow字段里有没有传来的这个用户id
        const isFollow = !!me.following.find(id => id.toString() === ctx.params.id)
        if (!isFollow) {
            me.follow.push(ctx.params.id)
            me.save()
            this.message('关注成功')
        }
    }
    async cancelFollow() {
        const {ctx} = this
        const me = await ctx.model.User.findById(ctx.state.userid)
        // 把用户从我的following数组中删掉
        const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
        if (index > -1) {
            me.following.splice(index, 1)
            me.save()
            this.message('取消成功')
        }
    }
    async following() {
        const {ctx} = this
        const users = await ctx.model.User.findById(ctx.params.id).populate('following')
        this.success(users.following)
    }
    async followers() {
        const {ctx} = this
        const users = await ctx.model.Use.find({following: ctx.params.id})
        this.success(users)
    }
    async likeArticle() {
        const {ctx} = this
        const me = await ctx.model.User.findById(ctx.state.userid)
        if (!me.likeArticle.find(id => id.toString() === ctx.params.id)) {
            me.likeArticle.push(ctx.params.id)
            me.save()
            await ctx.model.Article.findByIdAndUpdate(ctx.params.id, {$inc: {like: 1}})
            return this.message('点赞成功')
        }
    }
    async cancelLikeArticle() {
        const { ctx } = this
        const me = await ctx.model.User.findById(ctx.state.userid)
        const index = me.likeArticle.map(id => id.toString()).indexOf(ctx.params.id)
        if (index > -1) {
            me.likeArticle.splice(index, 1)
            me.save()
            await ctx.model.Article.findByIdAndUpdate(ctx.params.id, { $inc: { like: -1 } })
            return this.message('取消点赞成功')
        }
    }
    async articleStatus() {
        const { ctx } = this
        const me = await ctx.model.User.findById(ctx.state.userid)
        console.log(me)
        const like = !!me.likeArticle.find(id => id.toString() === ctx.params.id)
        const dislike = !!me.disLikeArticle.find(id => id.toString() == ctx.params.id)
        this.success({
            like, dislike
        })
    }
}

module.exports = UserController