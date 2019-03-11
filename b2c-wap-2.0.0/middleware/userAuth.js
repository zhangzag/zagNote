import { getcookiesInServer, getcookiesInClient } from '~~/utils/utils'

export default function ({route, req, res, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  var token, path, memberId;

  //在服务端
  if (isServer) {
    let cookies = getcookiesInServer(req)
    path = req.originalUrl;
    // token = cookies.token ? cookies.token : ''
    token = cookies.memberId ? cookies.memberId : ''
    console.log('isServer: ', cookies)
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    // token = utils.getcookiesInClient('token')
    memberId = getcookiesInClient('memberId')
    path = route.path;
    console.log('isClient: ', memberId, path, req)
  }
  if (path) {
    redirectURL = '/login?ref=' + encodeURIComponent(path)
  }
  
  //需要进行权限判断的页面开头
  // if (!token) {
  //      redirect(redirectURL)
  // }
  if (!memberId) {
    redirect(redirectURL)
  }
}
