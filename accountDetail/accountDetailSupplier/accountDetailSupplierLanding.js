

showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};



handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id='+accountRec.Id;
    }
};