
let preInstallationForm = [
    
];



let kycDetail = {
    Shipping_City : null,
    Craft_Monthly_Premium_Volume__c : null,
    Tin_Vat_Certicate_File : null,
    GST : null
}



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



const createItemsWithQuantity = () =>{
    let item = '';

    for(let i of draftInstallation.items){
        item +=`
        <div class="showFormDetail">
            <div class="row">
                <div class="col-xs-8"><h5>${i.type}</h5></div>
                <div class="col-xs-4">${createToggleField(`${i.typeId}`,false)}</div>
            </div>
        `;
        let ctr = 0;
        for(let j of i.items){
            
            item +=`
            <div class="row ${i.typeId}" style="border-radius: 10px;margin:5px 0 10px;padding:10px 0; display: none;border:1px solid #ccc">
                <div class="col-xs-4">${j.ProductName}</div>
                <div class="col-xs-6">${createSelectOption(`${i.typeId}-${ctr}`,`${j.Missing_Damaged__c ? j.Missing_Damaged__c  : ''}`,['Missing','Damaged'])}</div>
                <div class="col-xs-2">${createImageCapture(`${i.typeId}+${ctr}`,draftInstallation[`${i.typeId}_${ctr}_File`] ?draftInstallation[`${i.typeId}_${ctr}_File`] : null)}</div>
                <div class="col-xs-4"></div>
                
                <div class="col-xs-8">${createQuantityInput(`${i.typeId}-${ctr}`,`${j.Quantity__c ? j.Quantity__c : 0}`)}</div>
            </div>
        `;
        ctr++;
        }

        item += '</div>';
    }

    return item;
};


const showSummarySection = () =>{
    let tmp = ``;
    $('#draftAdditionalSummary').html('');
  
    for(let i of draftInstallation.items){
        tmp +=`
        <div class="showSummary">
            <div class="row ${i.typeId}" style="display:none">
                <div class="col-xs-8"><h5>${i.type}</h5></div>
                </div>
        `;
  
        for(let j of i.items){
            if(j.Quantity__c > 0){
                setOfSummaryClass.add(i.typeId);
            tmp +=`
            <div class="row ${i.typeId}" style="margin-bottom:10px; display : none">
                <div class="col-xs-7">${j.ProductName}</div>
                <div class="col-xs-5">${j.Quantity__c}</div>
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
        <select class="form-control" onchange="handleSelectChange(this)" id="${id}">
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

const handleSelectChange =(ele) => {
    const typeId = $(ele).attr('id').split('-')[0];
    const index = $(ele).attr('id').split('-')[1];
    const value = $(ele).val();
    for(let i of draftInstallation.items){
        if(i.typeId===typeId){
            i.items[index].Missing_Damaged__c = value;
            break;
        }
    }
};




const createImageCapture = (id,value) =>{
    
    const newkey = id.split('+')[0]+'_'+id.split('+')[1];
    let tmp = '';

        tmp = `
        <div class="image-upload_NoInput form-group" >
            <div class="camera">
                <label for="${id}">
                    <i class="fa fa-camera ${newkey} ${id}" ${value ? 'style="color:#5cb85c"' : ''} aria-hidden="true"></i>                                    
                </label>
                <input id="${id}" onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
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
    
    const newKey = key.split('+')[0]+'_'+key.split('+')[1]+'_File';
    draftInstallation[newKey] =  await toBase64(fileInput);
    for(let i of draftInstallation.items){
        if(i.typeId===key.split('+')[0]){
            draftInstallation[newKey+'_Name'] = i.items[key.split('+')[1]].ProductName;
            break;
        }
    }
    fileAttachedBackgroundChange(key.split('+')[0]+'_'+key.split('+')[1]);
    
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
    draftInstallation[id] = value;
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
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      $n.val(value);
      for(let i of draftInstallation.items){
        if(i.typeId===fieldName){
            i.items[index].Quantity__c = value;
            break;
        }
    }
      showSummarySection();
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
    
    for(let i of draftInstallation.items){
        if(i.typeId===fieldName){
            i.items[index].Quantity__c = value;
            break;
        }
    }
    
    showSummarySection();
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
    for(let i of preInstallationForm){
        if(i.typeId===fieldName){
            i.items[index].Quantity__c = value;
            break;
        }
    }
    showSummarySection();
  };



  