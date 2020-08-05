// let preInstallationForm = {
//     Couple_Type : {
//         Type : 'Couple Type',
//         show_panel : false,
//         show_item : [
//             {
//                 Item_Name : 'Antoine (2JG)',
//                 Quantity : 0
//             },
//             {
//                 Item_Name : 'EP (Micromatic)',
//                 Quantity : 0
//             },
//         ]
//     },
//     CO2_Cylinder_Type : {
//         Type : 'CO2 Cylinder Type',
//         show_panel : false,
//         show_item : [
//             {
//                 Item_Name : '9kg Co2',
//                 Quantity : 0
//             },
//             {
//                 Item_Name : '15kg Co2',
//                 Quantity : 0
//             },
//         ]
//     },
// };


let preInstallationForm = [
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


let kycDetail = {
    Shipping_City : null,
    Craft_Monthly_Premium_Volume__c : null,
    Tin_Vat_Certicate_File : null,
    GST : null
}

let selectOptions = ['A','B','C','D'];

let setOfSummaryClass = new Set();

initializeDraftAdditional = () =>{
    createDraftAdditionalSection();
}

const createDraftAdditionalSection = () =>{
    $('#draftAdditional').html('');

    let tmp = `
        <h4>Draft Item Requisition</h4>
        <h5>Machine Type</h5>
    `;

    tmp += createItemsWithQuantity(preInstallationForm);

    $('#draftAdditional').append(tmp);
};



const createItemsWithQuantity = (itemList) =>{
    let item = '';

    for(let i in itemList){
        item +=`
        <div class="showFormDetail">
            <div class="row">
                <div class="col-xs-8"><h5>${itemList[i].Type}</h5></div>
                <div class="col-xs-4">${createToggleField(`${i}-show_panel`,`${itemList[i].show_panel}`)}</div>
            </div>
        `;

        for(let j=0;j<itemList[i].show_item.length;j++){
            item +=`
            <div class="row ${i}-show_panel" style="margin-bottom:10px; display: none">
                <div class="col-xs-7">${itemList[i].show_item[j].Item_Name}</div>
                <div class="col-xs-5">${createQuantityInput(`${i}-${j}`,`${itemList[i].show_item[j].Quantity}`)}</div>
            </div>
        `;
        }

        item += '</div>';
    }

    return item;
};


const showSummarySection = (itemList) =>{
    let tmp = ``;
    $('#draftAdditionalSummary').html('');
  
    for(let i in itemList){
      tmp +=`
      <div class="showSummary">
          <div class="row ${i}" style="display:none">
              <div class="col-xs-8"><h5>${itemList[i].Type}</h5></div>
              </div>
      `;

      for(let j=0;j<itemList[i].show_item.length;j++){
          if(itemList[i].show_item[j].Quantity > 0){
              setOfSummaryClass.add(i);
          tmp +=`
          <div class="row ${i}" style="margin-bottom:10px; display : none">
              <div class="col-xs-7">${itemList[i].show_item[j].Item_Name}</div>
              <div class="col-xs-5">${itemList[i].show_item[j].Quantity}</div>
          </div>
          `;
      
          }
      }

      tmp += '</div>';
  }

    $('#draftAdditionalSummary').append(tmp);

    for(let i of setOfSummaryClass){
        $(`.${i}`).css('display','block');
    }
}



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
      preInstallationForm[fieldName]['show_item'][index].Quantity = value;
      showSummarySection(preInstallationForm);
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
    
    preInstallationForm[fieldName]['show_item'][index].Quantity = value;
    //console.log(preInstallationForm);
    showSummarySection(preInstallationForm);
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

    
    preInstallationForm[fieldName]['show_item'][index].Quantity = value;
   // console.log(preInstallationForm);
   showSummarySection(preInstallationForm);
  };



  initializeDraftAdditional();