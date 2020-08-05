

showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};


handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id='+accountRec.Id;
    }
};