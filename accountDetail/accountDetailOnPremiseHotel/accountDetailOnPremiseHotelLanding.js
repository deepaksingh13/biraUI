

showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};


handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id='+accountRec.Id;
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id='+accountRec.Id;
    }
};