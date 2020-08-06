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
};



let selectOptions1 = new Map([
    ['Type_of_Draft_License',['Active','InActive','Applied']],
    ['Draft_Excide_License_Status',['Yes','No','Applied']],
    ['Deposit_Amount',['Cheque','NEFT']]
]);


let selectOptions = ['A','B','C','D'];

let setOfSummaryClass = new Set();

initializePreInstalltion = () =>{
    createPreInstalltionSection();
    creatKYCSection();
    createDraftSignUpSecurity();
}

const createPreInstalltionSection = () =>{
    $('#preInstall').html('');

    let tmp = `
        <h4>Draft Sign-Up</h4>
        <div class="row">
            <div class="col-xs-5">Machine Type</div>
            <div class="col-xs-3 no-padd">${createInputField('Machine_Type_Model_Number',null,'number')}</div>
            <div class="col-xs-4">${createSelectOption('Machine_Type',null,selectOptions)}</div>
        </div>
        <div class="row">
            <div class="col-xs-5">Tower Type</div>
            <div class="col-xs-3 no-padd">${createInputField('Tower_Type_1',null,'text')}</div>
            <div class="col-xs-4">${createSelectOption('Tower_Type_2',null,selectOptions)}</div>
        </div>
        <div class="row">
            <div class="col-xs-5">Over the Counter Space Required</div>
            <div class="col-xs-3 no-padd">${createInputField('Over_Counter_Space',null,'text')}</div>
            <div class="col-xs-4">${createImageCapture('Over_Counter_Space',null)}</div>
        </div>
        <div class="row">
            <div class="col-xs-5">Under the Counter Space Required</div>
            <div class="col-xs-3 no-padd">${createInputField('Under_Counter_Space',null,'text')}</div>
            <div class="col-xs-4">${createImageCapture('Under_Counter_Space',null)}</div>
        </div>
        <div class="row">
            <div class="col-xs-6">Location of Machine</div>
            <div class="col-xs-6">${createInputField('Location_Of_Machine',null,'text')}</div>
        </div>
        <div class="row">
            <div class="col-xs-6">Reason for Change</div>
            <div class="col-xs-6">${createTextArea('Reason_For_Change',null)}</div>
        </div>
        <div class="row">
            <div class="col-xs-8">Confirmed with the outlet owner for installtion</div>
            <div class="col-xs-4">${createToggleField('Confirmed_Outlet',false)}</div>
        </div>
        <div class="row">
            <div class="col-xs-12"><h4 class="draft">Pre Installation Form</h4></div>
        </div>
    `;

    tmp += createItemsWithQuantity(preInstallationForm);

    $('#preInstall').append(tmp);
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
    $('#preInstallSummary').html('');
  
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

    $('#preInstallSummary').append(tmp);

    for(let i of setOfSummaryClass){
        $(`.${i}`).css('display','block');
    }
};



const createDraftSignUpSecurity = () =>{
    const mappingFieldLabel = new Map([
        ['Deposit_Amount','Deposit Amount'],
        ['Number','Number'],
        ['Request_Waiver','Request Waiver']
    ]);

    const draftField = ['Deposit_Amount','Number','Request_Waiver'];

    let tmp = '';
    for(let i of draftField){
        tmp +=`
            <div class="row">
                <div class="col-xs-6">
                    <label class="form-label">
                        ${mappingFieldLabel.get(i)}
                    </label>
                </div>
                <div class="col-xs-6">
                    ${i === 'Deposit_Amount' ?
                    createInputField(i) +' '+createSelectOption(i,null,selectOptions1.get(i)) : i === 'Request_Waiver' ?
                    createToggleField(i,false) : createInputField(i)+''+createImageCapture(`${i}-camera`,null)
                         }
                </div>
            </div>
        `;
    }

    $('#secInfo').append(tmp);
};




const creatKYCSection = () =>{
    for(let i in kycDetail){
        if(kycDetail[i] === null){
            $(`.${i}`).css('display','block');
        }
    }
}



const createInputField = (id,value,type) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input type="${type}" class="form-control" id="${id}" value="${value ? value : ''}"/>
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


const createTextArea = (id,value) =>{

    let tmp = '';
    
    tmp = `
        <div class="form-group">
            <textarea class="form-control" id="${id}" value="${value ? value : ''}"></textarea>
        </div>
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


  initializePreInstalltion();