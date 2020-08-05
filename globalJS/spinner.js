createLoader = () =>{
    if($('#loader-main').length === 1){
    let tmp = '';
    tmp +='<div id="loader-main">';
    tmp +='<div class="loader1" >Loading...</div>';
    tmp +='</div>';    

    $('#app').append(tmp);
    }
};