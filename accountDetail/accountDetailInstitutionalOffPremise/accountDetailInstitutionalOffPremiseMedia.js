

handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id='+accountRec.Id;
    }
};

   
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};
