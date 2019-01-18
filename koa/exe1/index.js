const Koa = require('koa2');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')

app.use(bodyParser());

// app.use( async (ctx) => {
     //01.
     // ctx.body = 'koko';

    
    //  //02. GET请求 - query和querystring区别
    //     //从request中获取GET请求
    //     let url = ctx.url;
    //     let request = ctx.request;
    //     let req_query = request.query;
    //     let req_querystring = request.querystring;

    //     //从上下文中直接获取
    //     let ctx_query = ctx.query;
    //     let ctx_querystring = ctx.querystring;

    //     ctx.body = {
    //         url,
    //         request,
    //         req_query,
    //         req_querystring,
    //         ctx_query,
    //         ctx_querystring
    //     };


    //  //03. POST请求
    //     if( ctx.url === '/' && ctx.method === 'GET' ){
    //         let html = `
    //             <h1>Koa2 request post demo</h1>
    //             <form method="POST"  action="/">
    //                 <p>userName</p>
    //                 <input name="userName" /> <br/>
    //                 <p>age</p>
    //                 <input name="age" /> <br/>
    //                 <p>webSite</p>
    //                 <input name='webSite' /><br/>
    //                 <button type="submit">submit</button>
    //             </form>
    //         `;

    //         ctx.body = html;
    //     }else if( ctx.url === '/' && ctx.method === 'POST' ){
    //         let pastData=await parsePostData(ctx);
            
    //         ctx.body=pastData;
    //     }else {
    //         ctx.body = '404';
    //     }
    //     //获取参数
    //     function parsePostData(ctx){
    //         return new Promise((resolve,reject)=>{
    //             try{
    //                 let postdata="";
    //                 ctx.req.on('data',(data)=>{
    //                     postdata += data
    //                 })
    //                 // addListener - 原生方法
    //                 ctx.req.addListener("end",function(){
    //                     let parseData = parseQueryStr( postdata )

    //                     resolve(parseData);
    //                 })
    //             }catch(error){
    //                 reject(error);
    //             }
    //         });
    //     }
    //     //格式化参数
    //     function parseQueryStr(queryStr){
    //         let queryData={};

    //         let queryStrList = queryStr.split('&');

    //         for( let [index,queryStr] of queryStrList.entries() ){
    //             let itemList = queryStr.split('=');
    //             console.log(itemList);
    //             queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    //         } 
    //         return queryData;
    //     }
    // } );


    //  //04. 中间件 - koa-bodyparser
    // if(ctx.url==='/' && ctx.method==='GET'){
    //     //显示表单页面
    //     let html=`
    //         <h1>JSPang Koa2 request POST</h1>
    //         <form method="POST" action="/">
    //             <p>userName</p>
    //             <input name="userName" /><br/>
    //             <p>age</p>
    //             <input name="age" /><br/>
    //             <p>website</p>
    //             <input name="webSite" /><br/>
    //             <button type="submit">submit</button>
    //         </form>
    //     `;
    //     ctx.body=html;
    // }else if(ctx.url==='/' && ctx.method==='POST'){
    //         let postData= ctx.request.body;
    //         ctx.body=postData;
    // }else{
    //     ctx.body='<h1>404!</h1>';
    // }
// });


//  //05. 中间件 - koa-router
// router
//     .get('/', (ctx, next)=>{
//         ctx.body = '首页哇';
// })
//     .get('/todo', (ctx, next)=>{
//         ctx.body = 'todoyemian';
//     });

// app
//     .use(router.routes())
//     .use(router.allowedMethods());


//  06.中间件 - koa-views
// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

app.use( async ( ctx ) => {
    let title = 'hello koa2'
    await ctx.render('index', {
        title
    })
})


// 07.中间件 - koa-static
// const staticPath = './static';

// app.use(static(
//     path.join( __dirname,  staticPath)
// ))
// app.use( async ( ctx ) => {
//     ctx.body = '<img src="/icon-js-2.png" />'
// })


app.listen(3001, ()=>{
    console.log('app is start at port 3001');
});
