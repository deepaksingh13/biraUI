


showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};


handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id='+accountRec.Id;
    }
};