import { getcookiesInServer, getcookiesInClient } from '~~/utils/utils'
// import { mapGetters } from 'vuex'

export default function ({route, req, res, redirect, app}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  var token, path, memberId;

  //在服务端
  if (isServer) {
    let cookies = getcookiesInServer(req)
    path = req.originalUrl;
    // token = cookies.token ? cookies.token : ''
    memberId = cookies._co_mem ? cookies._co_mem : ''
    // console.log('判断isServer: ', memberId)
  }
  
  //在客户端判读是否需要登陆
  if (isClient) {
    // token = utils.getcookiesInClient('token')
    // memberId = getcookiesInClient('memberId')
    // console.log('store: ', app.store.getters['userModule/memberId'])
    // console.log('getters: ', {...mapGetters('userModule',['memberId'])} )
    // let { memberId } = {...mapGetters(['memberId'])}
    // console.log('memberId: ', memberId.call(app))

    memberId = app.store.getters['userModule/memberId'];
    path = route.path;

    // console.log('判断isClient: ', memberId, path, req)
    // console.log('判断userMoudel: ', app.store.state.userModule)
  }
  if (path) {
    redirectURL = '/login?ref=' + encodeURIComponent(path)
  }
  
  //需要进行权限判断的页面开头
  // if (!token) {
  //      redirect(redirectURL)
  // }
  // console.log('是否有会员： ', memberId)
  if (!memberId) {
    redirect(redirectURL)
  }
}
