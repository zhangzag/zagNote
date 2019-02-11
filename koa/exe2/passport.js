// // passport.js
// const passport = require('koa-passport')
// var LocalStrategy = require('passport-local').Strategy


// // 序列化ctx.login()触发
// passport.serializeUser(function(user, done) {
// //   console.log('serializeUser: ', user)
//   console.log('serializeUser: ', 356)
//   done(null, 356)
// })
// // 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
// passport.deserializeUser(async function(id, done) {
//   console.log('deserializeUser: ', id)
//   var user = {id: 1, username: 'admin', password: '123456'}
//   done(null, user)
// })
// // 提交数据(策略)
// passport.use(new LocalStrategy({
//   // usernameField: 'email',
//   // passwordField: 'passwd'
// }, function(username, password, done) {
//   console.log('LocalStrategy', username, password)
//   var user = {id: 1, username: username, password: password}
//   done(null, user, {msg: 'this is a test'})
//   // done(err, user, info)
// }))


// module.exports = passport



// // 定义一个验证用户的策略，需要定义name作为标识
// const naiveStrategy = {
//     name: 'naive',
//     // 策略的主体就是authenticate(req)函数，在成功的时候返回用户身份，失败的时候返回错误
//     authenticate: function (req) {
//       let uid = req.query.uid
//       if (uid) {
//         // 策略很简单，就是从参数里获取uid，然后组装成一个user
//         let user = {id: parseInt(uid), name: 'user' + uid}
//         this.success(user)
//       } else {
//         // 如果找不到uid参数，认为鉴权失败
//         this.fail(401)
//       }
//     }
//   }
  
//   // 调用use()来为passport新增一个可用的策略
//   const passport = require('koa-passport')
// //   passport.use(naiveStrategy)
//   // 添加一个koa的中间件，使用naive策略来鉴权。这里暂不使用session
//   module.exports = passport

const passport = require('koa-passport')
//本地策略
let LocalStrategy = require('passport-local').Strategy
let curUser = ''

//序列号 ctx.login()触发
passport.serializeUser(function(user, done){
    console.log('serializeUser: ', user)
    curUser = user;
    done(null, user.id)
})

// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(id, done) {
    const processEnv = process.env;
    // console.log('111 222 processEnv: ')
    // console.log('111 processEnv: ', processEnv)
    // console.log('3333 processEnv: ', processEnv.NODE_ENV)

    // console.log('deserializeUser: ', id)
    // console.log('curUser111: ', curUser)

    var user = {id, username: curUser.username, password: curUser.password}
    done(null, user)
})

// 提交数据(策略)
// passport.use(new LocalStrategy({
//     // usernameField: 'email',
//     // passwordField: 'passwd'
//   }, function(username, password, done) {
//     console.log('LocalStrategy', username, password)
//     var user = {id: 1, username: username, password: password}
//     done(null, user, {msg: 'this is a test'})
//     // done(err, user, info)
//   }))
passport.use(new LocalStrategy(
    function(username, password, done) {
        // User.findOne({ username: username }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        //     if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        // });
        var user = {id: 1, username: username, password: password}
        console.log('LocalStrategy', username, password)
        done(null, user, {msg: 'this is a test'})
    }
));

module.exports = passport