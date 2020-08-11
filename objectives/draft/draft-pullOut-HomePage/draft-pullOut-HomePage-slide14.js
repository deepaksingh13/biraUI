let mapOfFieldLabel = new Map([
    ['Machine_Type','Machine Type'],
    ['Asset_Id','Asset Id'],
    ['RGP_Number__c','RGP Number'],
    ['Pullout_Reason__c','Pullout Reason'],
    ['Pullout_Date__c','Pullout Date'],
    ['Machine_in_good_condition__c','Machine in good condition'],
    ['Tower_in_good_condition__c','Tower in good condition'],
    ['Number_of_Kegs_Filled_Empty__c','Number of Kegs(filled + empty)'],
    ['Security_Deposit','Security Deposit'],
    ['Amount','Amount']
]);

const selectOptions = new Map([
    ['Machine_Type',['A','B']],
    ['Pullout_Reason__c',['A','Damaged']]
]);

const createPullOutHomePage = () =>{
    let fieldName = ['Machine_Type','Asset_Id','RGP_Number__c','Pullout_Reason__c','Pullout_Date__c',
                    'Machine_in_good_condition__c','Tower_in_good_condition__c','Number_of_Kegs_Filled_Empty__c','Security_Deposit','Amount'];
    $('#pulloutForm').html('');
    let tmp = '<h4>Draft Pullout</h4>';

    for(let i of fieldName)
    {
        if(i === 'Machine_Type' || i === 'Pullout_Reason__c')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createSelectOption(i,null,selectOptions.get(i))}</div>
            </div>
            `;
        }else if(i === 'Asset_Id' || i ==='RGP_Number__c' || i ==='Amount')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createInputField(i,null,'number',true)}</div>
            </div>
            `;
        }else if(i ==='Machine_in_good_condition__c' || i === 'Tower_in_good_condition__c' || i === 'Security_Deposit')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createToggleField(i,false,)}</div>
            </div>
            `;
        }else if(i === 'Pullout_Date__c')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createInputField(i,null,'date',false)}</div>
            </div>
            `;
        }else
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createQuantityInput(i,0)}</div>
            </div>
            `;
        }
    }


    $('#pulloutForm').append(tmp);

    $('.slider').css('top','13px');
}

const createInputField = (id,value,type,disabled) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input type="${type}" ${disabled ? 'disabled' : ''} class="form-control" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};


const createToggleField = (id,value) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value === 'true' ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};


const createQuantityInput = (id,value) =>{
    let tmp = `
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" data-name="${id}" type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="${id}" name="qty" class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus" data-name="${id}" onclick="incrementQtn(this)" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};


const createSelectOption = (id,value,options) =>{
    let tmp =`
       <div class="form-group">
        <select class="form-control" id="${id}">
            <option value="">--None--</option>
    `;

    for(let i = 0;i<options.length;i++){
        tmp +=`
        <option value="${options[i]}" ${options[i] === value ? 'selected' : ''}>${options[i]}</option>
        `;
    }

    tmp += '</select></div>';

    return tmp;
};

const checkBoxChangeHandler = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).prop('checked');
};



incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let id = $(ele).attr('data-name');
      let fieldName = id.split('-')[0];
      let index = id.split('-')[1];
      
      let value = 0;
      var inputName = $(ele).attr("id");
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      $n.val(value);
};
  
  
decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      
      let id = $(ele).attr('data-name');
      let fieldName = id.split('-')[0];
      let index = id.split('-')[1];
      
      let value = 0;
      var inputName = $(ele).attr("id");
    var qty = Number($n.val());
    if (qty > 0) {
      value = qty -1;
    }
    $n.val(value);

};
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
    let fieldName = inputName.split('-')[0];
    let index = inputName.split('-')[1];
   
    if(val<0){
      $(ele).val(0);
      return;
    }
    if(val >999){
      $(ele).val(999);
    
      return;
    }

};

createPullOutHomePage();