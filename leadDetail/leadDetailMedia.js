
const displayMediaCard = (mediaArr) => {
    let temp = '';
    for(let i of mediaArr){
        temp = '<div class="col-sm-4 col-xs-6">';
        temp += '<div card="card"  >';
        temp += '<img  style="width:100%" src="data:image/png;base64, '+i.VersionData+'" alt="'+i.Title+'">';
        temp += '<div class="card-body">';
        temp += '<div class="card-text">'+i.Title+'</div>';
        temp += '</div>';
        temp += '</div>';
        temp += '</div>';
        $("#photosPanel").append(temp);
    }   
};

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

   
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};
