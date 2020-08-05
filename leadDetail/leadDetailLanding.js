

showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};
hideLoader();
showObjectivesV2();
handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/leadDetail/leadDetail.html';
    }
    else if(page ==='Related'){
        window.location.href ='/view/leadDetail/leadDetailRelated.html';
    }
    else if(page ==='Home'){
        window.location.href ='/view/leadDetail/leadDetailLanding.html';
    }
    else{
        window.location.href ='/view/leadDetail/leadDetailMedia.html';
    }
};