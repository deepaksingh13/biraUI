
let preInstallationForm = [
    {
        // type_Id : 'Couple_Type',
        Type : 'Couple Type',
        show_panel : false,
        show_item : [
            {
                Item_Name : 'Antoine (2JG)',
                Select_Value : 'Missing',
                Quantity : 0
            },
            {
                Item_Name : 'EP (Micromatic)',
                Select_Value : 'Damaged',
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
                Select_Value : 'Missing',
                Quantity : 0
            },
            {
                Item_Name : '15kg Co2',
                Select_Value : 'Missing',
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
            <div class="row ${i}-show_panel" style="border-radius: 10px;margin:5px 0 10px;padding:10px 0; display: none;border:1px solid #ccc">
                <div class="col-xs-4">${itemList[i].show_item[j].Item_Name}</div>
                <div class="col-xs-6">${createSelectOption(`${i}-${j}-select`,`${itemList[i].show_item[j].Select_Value}`,['Missing','Damaged'])}</div>
                <div class="col-xs-2">${createImageCapture(`${i}-${j}`,null)}</div>
                <div class="col-xs-4"></div>
                
                <div class="col-xs-8">${createQuantityInput(`${i}-${j}`,`${itemList[i].show_item[j].Quantity}`)}</div>
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
              <div class="col-xs-4">${itemList[i].show_item[j].Item_Name}</div>
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




const createImageCapture = (id,value) =>{

    let tmp = '';

        tmp = `
        <div class="image-upload_NoInput form-group" >
            <div class="camera">
                <label for="${id}-File">
                    <i class="fa fa-camera ${id}-File" aria-hidden="true"></i>                                    
                </label>
                <input id="${id}-File" onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div> `;
    return tmp;
};



const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


  const fileInput = async (event) => {
      console.log('file');
    const key = event.id;
    const fileInput = event.files[0];
    var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    const compressedFile = await imageCompression(fileInput, options);
    uploadBase64Value(key, compressedFile);
    
  };
  
  const uploadBase64Value = async (key, fileInput) => {
  
    await toBase64(fileInput);
    fileAttachedBackgroundChange(key);
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
  
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
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