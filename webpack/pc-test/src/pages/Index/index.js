// require('./style/index.css');
require('./style/index.scss');
import { renderHtml } from '@/util/util.js';
import source from './index.hbs';

// //模拟json数据
let data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

// let htmlString = _util.renderHtml(source, data);

// console.log('htmlString: ', htmlString)
let htmlString2 = renderHtml(source, data);

console.log('htmlString2: ', htmlString2)
console.log($)

