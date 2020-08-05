
handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id='+accountRec.Id;
    }
};

   
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};
