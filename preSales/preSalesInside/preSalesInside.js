let varientName = ['Light','White','Blonde','Strong','Stout','IPA','Boom'];
let skuValues = ['330 ml','500 ml','650 ml'];
let preSalesType = ['Sampling','Tasting'];


const initializePreSales = () =>{
    createVarientOptions();
}

const createVarientOptions = () =>{
    let tmp = '';

    for(let i = 0;i<varientName.length;i++){
        tmp +=`
        <div class="preSalesrow">
            <div class="row" style="margin-bottom: 10px;">
                <div class="col-xs-7"><label>${varientName[i]}</label></div>
                <div class="col-xs-5" style="display:none">
                    <label>Liked</label>
                    ${createCheckBox(`LIKED-${varientName[i]}-${i}`,null,"handleCheckBox(this)",false)}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <label>SKU's</label>
                    ${createSelectOption(`SKU-${varientName[i]}-${i}`,null,skuValues,"handleSKUoption(this)")}</div>
                <div class="col-xs-4" style="display:none"><label>Types</label>${createSelectOption(`Type-${varientName[i]}-${i}`,null,preSalesType,"handleVarientoption(this)")}</div>
                <div class="col-xs-4" style="display:none"><label>Quantity</label>${createQuantityInput(i,0)}</div>
            </div>
        </div>    
        `;
    }

    $('#preSales').append(tmp);
};


const createFeedbackSection = (label) =>{
    let tmp = '';

    tmp +=`
    <div class="feedback ${label}">
        <label>${label}</label>
        <div class="row" style="margin-bottom: 10px">
            <div class="col-xs-8">Mouth Feel</div>
            <div class="col-xs-4">${createCheckBox(`Mouth_Feel-${label}`,null,"handleCheckBox(this)",false)}</div>
        </div>
        <div class="row" style="margin-bottom: 10px">
            <div class="col-xs-8">Aroma</div>
            <div class="col-xs-4">${createCheckBox(`Aroma-${label}`,null,"handleCheckBox(this)",false)}</div>
        </div>
        <div class="row" style="margin-bottom: 10px">
            <div class="col-xs-8">Bitterness</div>
            <div class="col-xs-4">${createCheckBox(`Bitterness-${label}`,null,"handleCheckBox(this)",false)}</div>
        </div>
        <div class="row">
            <div class="col-xs-6">Any Other Feedback</div>
            <div class="col-xs-6">
                <textarea class="form-control" rows="3" id="comment"></textarea>
            </div>
        </div>
    </div>    
    `;

    $('#feedbackPreSales').append(tmp);
}

const createQuantityInput = (index,quantity) =>{
    let tmp = '';

    tmp +=`
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)"  data-index="${index}" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="Qty-${index}" name="qty" class="qty" maxlength="3" data-index="${index}"  max="100" value="${quantity}" onkeyup="handleQuantityChange(this)" class="input-text qty" data-quantity="'+productList[i].Cases+'"  />
            <button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="${index}" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
}


const handleVarientoption = (ele) =>{
    let value = $(ele).val();
    let id = $(ele).attr('id').split('-')[1]+'-'+$(ele).attr('id').split('-')[2];
    let index = $(ele).attr('id').split('-')[2];
    console.log(id)
    if(value == 'Tasting'){
        $(`#LIKED-${id}`).parent().parent().parent().css('display','block');
        $(`#LIKED-${id}`).prop('checked',true);
    }else{
        $(`.${id}`).remove();
        $(`#LIKED-${id}`).parent().parent().parent().css('display','none');
    }

    if(value)
    {
        $(`#Qty-${index}`).parent().parent().css('display','block');
    }else{
        $(`#Qty-${index}`).parent().parent().css('display','none');
    }

    
};

const handleSKUoption = (ele) =>{
    let value = $(ele).val();
    let id = $(ele).attr('id').split('-')[1];
    let index = $(ele).attr('id').split('-')[2];

    if(value)
    {    
        $(`#Type-${id}-${index}`).parent().parent().css('display','block');
    }else{
        $(`#Type-${id}-${index}`).parent().parent().css('display','none');
        $(`#Qty-${index}`).parent().parent().css('display','none');
    }
};

const handleCheckBox = (ele) =>{
    let value = $(ele).prop('checked');
    let id = $(ele).attr('id').split('-')[1]+'-'+$(ele).attr('id').split('-')[2];
    let lastingVal = $(`#Type-${id}`).val();


    console.log(value,id,lastingVal);
    if(!value && lastingVal == 'Tasting'){
        createFeedbackSection(id);
    }else{
        $(`.${id}`).remove();
    }
}

incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $(ele).attr("id");
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
     let index = $n.attr('data-index');
      
      $n.val(value);
      
  };
  
  
  decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $(ele).attr("id");
    var qty = Number($n.val());
    if (qty > 0) {
      value = qty -1;
    }
    let index = $n.attr('data-index');
  
    $n.val(value);
  };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
     let index = $(ele).attr('data-index');
    if(val<0){
      $(ele).val(0);
     return;
    }
    if(val >999){
      $(ele).val(999);
      return;
    }
    
  };
  


initializePreSales();