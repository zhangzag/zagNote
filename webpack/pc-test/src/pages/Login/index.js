require('./style/login.scss');
require('./style/register_header.scss');

const zhang = 'zhang';

function aa(){
  return new Promise((resolve, reject)=>{
    resolve(1)
  })
}

function a(){
  aa().then(res=>{console.log('hahahha: ', res)});
}

a()

console.log('这是login', zhang)
console.log('99955959')
