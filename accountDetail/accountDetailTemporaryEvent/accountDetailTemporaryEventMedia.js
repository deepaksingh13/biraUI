

handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id='+accountRec.Id;
    }
};
   
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};
