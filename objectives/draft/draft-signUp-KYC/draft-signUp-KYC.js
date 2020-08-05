
let selectOptions = new Map([
    ['Type_of_Draft_License',['Active','InActive','Applied']],
    ['Draft_Excide_License_Status',['Yes','No','Applied']],
    ['Deposit_Amount',['Cheque','NEFT']]
]);


initializeDraftSignUp = () =>{
    createDraftSignUpKYC();
    createDraftSignUpSecurity();
    disabledFields();
}


const disabledFields = () =>{
    $('input').attr('disabled', true);
    $('.cart-btn').attr('disabled',true);
    $('select').attr('disabled', true);
}


const createDraftSignUpKYC = () =>{
    const mappingFieldLabel = new Map([
        ['GST','GST'],
        ['PAN','PAN'],
        ['TIN','TIN'],
        ['VAT','VAT'],
        ['Owner_Name','Owner Name'],
        ['Owner_Aadhaar','Owner Aadhaar'],
        ['Owner_Residentail_Address','Owner Residentail Address'],
        ['Excise_License_Number','Excise License Number'],
        ['Outlet_Shipping_Address','Outlet Shipping Address'],
        ['Outlet_Billing_Address','Outlet Billing Address'],
        ['Outlet_Name','Outlet Name'],
        ['Type_of_Draft_License','Type of Draft License'],
        ['Draft_Excide_License_Status','Draft Excide License Status'],
        ['Draft_License_Number','Draft License Number']
    ]);

    const draftField = ['GST','PAN','TIN','VAT','Owner_Name','Owner_Aadhaar','Owner_Residentail_Address',
                        'Excise_License_Number','Outlet_Shipping_Address','Outlet_Billing_Address','Outlet_Name',
                    'Type_of_Draft_License','Draft_Excide_License_Status','Draft_License_Number'];

    let tmp = '';
    for(let i of draftField){
        tmp +=`
            <div class="row">
                <div class="col-xs-6">
                    <label class="form-label ${i === 'PAN' || i === 'VAT' || i === 'TIN' || i === 'Owner_Aadhaar' ? '' : 'required'}">
                        ${mappingFieldLabel.get(i)}
                    </label>
                </div>
                <div class="col-xs-6">
                    ${i === 'Type_of_Draft_License' || i === 'Draft_Excide_License_Status' ?
                         createSelectOption(i,null,selectOptions.get(i)) :
                         createInputField(i)}
                </div>
            </div>
        `;
    }

    $('#kycInfo').append(tmp);
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
                    createInputField(i) +' '+createSelectOption(i,null,selectOptions.get(i)) : i === 'Request_Waiver' ?
                    createInputField(i,false) : createInputField(i)
                         }
                </div>
            </div>
        `;
    }

    $('#secInfo').append(tmp);
};



const createInputField = (id,value) =>{

    let tmp = '';
    
    if(id === 'Owner_Residentail_Address' || id === 'Outlet_Billing_Address' || id === 'Outlet_Shipping_Address'){
        tmp = `
        <div class="form-group">
            <textarea class="form-control" id="${id}" value="${value ? value : ''}"></textarea>
        </div>
        `;
    }else if(id === 'Draft_License_Number' || id === 'Number'){
        tmp = `
        <div class="image-upload_NoInput form-group" >
            <input class="form-control" id="${id}" value="${value ? value : ''}"/>

            <div class="camera">
                <label for="${id}-File">
                    <i class="fa fa-camera ${id}-File" aria-hidden="true"></i>                                    
                </label>
                <input id="${id}-File" onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div>
                                        
        `;
    } else if(id === 'Request_Waiver'){
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    }
    else{
        tmp = `
        <div class="form-group">
            <input class="form-control" id="${id}" value="${value ? value : ''}"/>
        </div>`;
    }
    

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

  initializeDraftSignUp();