import Vue from 'vue'
import components from '../components/public/'


Object.keys( components ).forEach( (key) => {
	let name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写

	Vue.component(`com${name}`, components[key]);
} );