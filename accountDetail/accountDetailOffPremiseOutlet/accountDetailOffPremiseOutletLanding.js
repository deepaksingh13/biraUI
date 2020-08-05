
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};



handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id='+accountRec.Id;
    }
};