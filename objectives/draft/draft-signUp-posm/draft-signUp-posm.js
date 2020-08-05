
let selectOption = new Map([
    ['Starter_Kit',['Yes','No','Applied']]
]);


let listOfItems = {
    Glassware : [
        {
            Item_Name : '330 ML Glass',
            Quantity : 0
        },
        {
            Item_Name : '500 ML Glass',
            Quantity : 0
        },
        {
            Item_Name : '100 ML Glass',
            Quantity : 0
        }
    ],
    Serviceware : [
        {
            Item_Name : '1.2 Ltr Pitcher',
            Quantity : 0
        },
        {
            Item_Name : 'Bira Sampling Tray',
            Quantity : 0
        },
        {
            Item_Name : 'Bira Bar Mat',
            Quantity : 0
        },
        {
            Item_Name : 'Limited Release Coaster',
            Quantity : 0
        }
    ],
    Signage : [
        {
            Item_Name : 'Make Play Signage',
            Quantity : 0
        },
        {
            Item_Name : 'LR Signage',
            Quantity : 0
        }
    ]
};

initialzileDraftPOSM = () =>{
   //createPOSMforPermanent();
   createTemporaryPOSM();
}

const createPOSMforPermanent = () =>{
    let tmp = '';
    $('#showPOSMDraft').html('');

    tmp = `
    <div class="row">
        <div class="col-xs-4">
            <label>Please Select Starter Kit</label>
        </div>
        <div class="col-xs-4 no-padd">
            ${createSelectOption('Starter_Kit',null,selectOption.get('Starter_Kit'))}
        </div>
        <div class="col-xs-4" style="margin-top: 11px;">
            ${createQuantityInput('Starter_Kit_Qty',0)}
        </div>
    </div>
    
    <div class="row">
        <div class="col-xs-8">
            <label>
                Displays List of Items and Respective Quantities in the Selected SKU
            </label>
        </div>
    </div>
    `;

    tmp += createItemsWithQuantity(listOfItems);

    $('#showPOSMDraft').append(tmp);

};


const createItemsWithQuantity = (itemList) =>{
    let item = '';

    for(let i in itemList){
        console.log(i,itemList[i]);
        item += `<div class="row">
                    <div class="col-xs-12"><h5>${i}</h5></div>     
                </div>`;
        for(let j= 0;j< itemList[i].length;j++){
        //    console.log(j,itemList[i][j])
            item += `
            <div class="row">
                <div class="col-xs-8">
                    ${itemList[i][j].Item_Name}
                </div>
                <div class="col-xs-4">
                    ${createQuantityInput(`${i}-${j}-${itemList[i][j].Quantity}`,0)}
                </div>
            </div>
        `;
        }
        
    }

    return item;
};

const createTemporaryPOSM = () =>{
    
let salesRequisitionField = ['Bar_Set_up','Number_of_Bars','Size_of_Bar','Back_drop_Required','Disposable_Glass','MakePlay_Signage',
                            'LR_Signage','Bottle_Opener','Bira91_Bar_Mats','Customized_Branding'];

let mapOfFieldLabel = new Map([
    ['Bar_Set_up','Bar Set-up'],
    ['Number_of_Bars','Number of Bars'],
    ['Size_of_Bar','Size of Bar'],
    ['Back_drop_Required', 'Back drop Required'],
    ['Disposable_Glass','Disposable Glass'],
    ['MakePlay_Signage','MakePlay Signage'],
    ['LR_Signage','LR Signage'],
    ['Bottle_Opener','Bottle Opener'],
    ['Bira91_Bar_Mats','Bira91 Bar Mats'],
    ['Customized_Branding','Customized Branding']
]);
$('#showPOSMDraft').html();

let tmp = '';
    tmp =`
        <div class="row">
            <div class="col-xs-12">
                <h5>Point of Sales Requisition</h5>
            </div>
        </div>
    `;

    for(let i=0;i<salesRequisitionField.length;i++){
        if(salesRequisitionField[i] !== 'Bar_Set_up' && salesRequisitionField[i] !== 'Customized_Branding')
       {
         tmp +=`
        <div class="row">
            <div class="col-xs-8">
                ${mapOfFieldLabel.get(salesRequisitionField[i])}
            </div>
            <div class="col-xs-4">
                ${createQuantityInput(salesRequisitionField[i],0)}
            </div>
        </div>
        `
    }else{

        tmp +=`
        <div class="row">
            <div class="col-xs-8">
                ${mapOfFieldLabel.get(salesRequisitionField[i])}
            </div>
            <div class="col-xs-4">
                ${createToggleField(salesRequisitionField[i],null)}
            </div>
        </div>
        `
      }
    }
    $('#showPOSMDraft').append(tmp);

}



const createQuantityInput = (id,value) =>{
    let tmp = `
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="${id}" name="qty" class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" type="button" value="+">+</button>
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


const createToggleField = (id,value) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};


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
    $n.val(value);
   };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
   
    if(val<0){
      $(ele).val(0);
      return;
    }
    if(val >999){
      $(ele).val(999);
    
      return;
    }
  };
  


initialzileDraftPOSM();