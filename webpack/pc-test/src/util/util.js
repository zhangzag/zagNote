const handlebars = require('handlebars');

export function renderHtml(template, data){
    //预编译模板
    let template = handlebars.compile(template);
    //匹配json内容
    let result = template(data);

    return result;
};

