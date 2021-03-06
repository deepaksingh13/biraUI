
let pulloutForm = [
    {
        // type_Id : 'Couple_Type',
        Type : 'Couple Type',
        show_panel : false,
        show_item : [
            {
                Item_Name : 'Antoine (2JG)',
                Quantity : 0
            },
            {
                Item_Name : 'EP (Micromatic)',
                Quantity : 0
            },
        ]
        
    },
    {
        // type_Id : 'CO2_Cylinder_Type',
        Type : 'CO2 Cylinder Type',
        show_panel : false,
        show_item : [
            {
                Item_Name : '9kg Co2',
                Quantity : 0
            },
            {
                Item_Name : '15kg Co2',
                Quantity : 0
            },
        ]
    
    }
];

const selectOptions = new Map([
    ['Machine_Type',['A','B']],
    ['pulloutSelect',['Missing','Damaged']]
]);

const createPullOutHomePage = () =>{
    $('#pulloutForm').html('');

    let tmp = `
        <h4>Draft Pullout</h4>
        <div class="row">
            <div class="col-xs-6">Machine Type</div>
            <div class="col-xs-6">${createSelectOption('Machine_Type',null,selectOptions.get('Machine_Type'))}</div>
        </div>
        
        <div class="row">
            <div class="col-xs-12"><h4 class="draft">Pullout Form</h4></div>
        </div>
    `;

    tmp += createItemsWithQuantity(pulloutForm);

    $('#pulloutForm').append(tmp);
}



const createItemsWithQuantity = (itemList) =>{
    let item = '';

    for(let i in itemList){
        item +=`
        <div class="showFormDetail">
            <div class="row">
                <div class="col-xs-8"><label>${itemList[i].Type}</label></div>
                <div class="col-xs-4">${createToggleField(`${i}-show_panel`,`${itemList[i].show_panel}`)}</div>
            </div>
        `;

        for(let j=0;j<itemList[i].show_item.length;j++){
            item +=`
            <div class="row ${i}-show_panel" style="margin:10px 6px;padding:5px; display: none;border: 1px solid #ccc; border-radius:5px">
                <div class="col-xs-6">${itemList[i].show_item[j].Item_Name}</div>
                <div class="col-xs-6">${createInputField(`${i}-Quantity`,null,'number')}</div>  
                <div class="col-xs-6">${createSelectOption('Machine_Type',null,selectOptions.get('pulloutSelect'))}</div>
                
                <div class="col-xs-6">${createQuantityInput(`${i}-${j}`,`${itemList[i].show_item[j].Quantity}`)}</div>
            
            </div>
        `;
        }

        item += '</div>';
    }

    return item;
};

const createInputField = (id,value,type) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input type="${type}" disabled class="form-control" id="${id}" value="${value ? value : ''}"/>
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
   
    if(value){
        $(`.${id}`).css('display','block');
    }else{
        $(`.${id}`).css('display','none');
    }
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
      pulloutForm[fieldName]['show_item'][index].Quantity = value;
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
    
    pulloutForm[fieldName]['show_item'][index].Quantity = value;

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

    
    pulloutForm[fieldName]['show_item'][index].Quantity = value;

};

createPullOutHomePage();