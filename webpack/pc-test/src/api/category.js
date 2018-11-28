
export getCategoryOne (){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: webRoot + '/productType/getProductTypeList',
        })
        .success(res=>{
            
        })
        .error(err=>{
            reject(err);
        });
    });
};