/**
 * Created by  on 2018/12/21
 */
const koa = require('koa');
const app = new koa();

//配置中间件
app.use(async (ctx)=>{
  ctx.body = '哇哈哈哈哈';
});

app.listen(3000);