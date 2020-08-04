'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const jwt = app.middleware.jwt({app})
  router.get('/', controller.home.index)
  // 验证码
  router.get('/captcha', controller.utils.captcha)

  router.get('/sendcode', controller.utils.sendcode)
  router.group({ name: 'user', prefix: '/user' }, router => {
    const { info, register, login, verify } = controller.user
    router.post('/register', register)
    router.post('/login', login)
    // 中间件 jwt先处理
    router.get('/info', jwt, info)
    router.get('/verify', verify)
  })
}
