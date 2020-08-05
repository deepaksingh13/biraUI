


handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id='+accountRec.Id;
    }
};

showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};
