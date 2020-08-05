


handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id='+accountRec.Id;
    }
};

showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};
