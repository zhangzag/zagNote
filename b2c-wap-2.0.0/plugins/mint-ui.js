// import Vue from 'vue'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'

// Vue.use(MintUI)

import Vue from 'vue'
import 'mint-ui/lib/style.css'

import { Button, Header, InfiniteScroll, Toast, MessageBox, Indicator, Lazyload, Spinner, Popup, Swipe, SwipeItem } from 'mint-ui';

Vue.component(Button.name, Button);
Vue.component(Spinner.name, Spinner);
Vue.component(Header.name, Header);
Vue.component(Popup.name, Popup);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//无限加载
Vue.use(InfiniteScroll);

//懒加载
import loadingImg from '../assets/images/ak_100x100.jpg';
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: loadingImg, // 加载失败显示图
  loading: loadingImg,// 加载显示图
  attempt: 1
});

Vue.prototype.$Toast = (data) =>{
    if(typeof data == "object"){
      Toast({
        message: data.message || '',
        position: data.position || 'center',
        duration: data.duration || 1500,
        iconClass: data.iconClass || '',
        className: data.className || '',
      });
    }else{
      Toast({
        message: data || '',
        position: 'center',
        duration: 1500,
      });
    }
  };
  Vue.prototype.$MsgBox = MessageBox;
  Vue.prototype.$Idc = Indicator;
