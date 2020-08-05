
const mapOfRequisitionFieldLabel = new Map([
    ['Number_of_Tabs_Required__c','Number of Tabs Required'],
    ['Estimated_Monthly_Draft_Volume__c','Estimated Monthly Draft Volume (20 L Kegs)'],
    ['Reason_For_Asking_More_Tabs__c','Reason For Asking More Tabs'],
    ['Does_Outlet_Require_B9_Machine__c','Does Outlet Require B9 Machine'],
    ['Does_Outlet_Require_B9_Taps__c','Does Outlet Require B9 Taps'],
    ['Does_Outlet_Need_Mobile_Troley__c','Does Outlet Need Mobile Troley'],
    ['Recommended_Machine_Type__c','Recommended Machine Type'],
    ['Recommended_Tower_Type__c','Recommended Tower Type'],
    ['Over_The_Counter_Space_Required__c','Over The Counter Space Required'],
    ['Under_The_Counter_Space_Required__c','Under The Counter Space Required'],
    ['Location_of_Draft_Machine__c','Location of Draft Machine'],
    ['Confirmed_With_the_Outlet_Owner_for_Installation__c','Confirmed With the Outlet Owner for Installation'],

    ['Installation_Date__c','Installation Date'],
    ['Pullout_Date__c','Pullout Date'],
    ['Type_Of_Event__c','Type Of Event'],
    ['Number_Of_Attendees__c','Number Of Attendees'],
    ['Custom_Bar_Required__c','Custom Bar Required'],
    ['Size_Of_Bar__c','Size Of Bar'],
    ['Number_Of_Machine_Required__c','Number Of Machine Required'],
    ['Estimated_Draft_Volume__c','Estimated Draft Volume (20 L Kegs)'],
    ['Recommended_Machine_Type__c','Recommended Machine Type'],
    ['Recommended_Tower_Type__c','Recommended Tower Type'],
    ['Confirmed_With_the_Event_Head_for_Installation__c','Confirmed With the Event Head for Installation']
]);



let selectOptions = new Map([
    ['Reason_For_Asking_More_Tabs__c',['Image-led/ Beer-led outlet','High potential to grow','Outlet wants wide variety','New outlet']],
    ['Over_The_Counter_Space_Required__c',['Available','Not Available']],
    ['Under_The_Counter_Space_Required__c',['Available','Not Available']],
    ['Type_of_Event',['Yes','No','Applied']]
]);

initializeDraftHomePage = () =>{
    let tmp = `
        <div class="row">
            <div class="col-xs-7">
                <label>Temporary Requisition</label>
            </div>
            <div class="col-xs-5">
            ${createToggleField('Temporary_Requisition__c',false)}
            </div>
        </div>
    `;

    $('#temp-Req').append(tmp);

    if($('#Temporary_Requisition__c').prop('checked')){
        createTemporaryReq();
    }
   else{
    createPermanentReq();
   }
}


const disabledFields = () =>{
    $('input').attr('disabled', true);
    $('.cart-btn').attr('disabled',true);
    $('select').attr('disabled', true);
}


let Liquid_Type__c = {
    White : true,
    Light : false,
    IPA : false,
    Stout : true,
    Strong : true,
    Blonde : false,
    Boom : false
};

const createPermanentReq = () =>{
    let signUpFields = ['Liquid_Type__c','Number_of_Tabs_Required__c', 'Estimated_Monthly_Draft_Volume__c', 'Reason_For_Asking_More_Tabs__c',
        'Does_Outlet_Require_B9_Machine__c','Does_Outlet_Require_B9_Taps__c', 'Does_Outlet_Need_Mobile_Troley__c', 'Recommended_Machine_Type__c',
        'Recommended_Tower_Type__c', 'Over_The_Counter_Space_Required__c', 'Under_The_Counter_Space_Required__c',
        'Location_of_Draft_Machine__c', 'Confirmed_With_the_Outlet_Owner_for_Installation__c'];
    
    let tmp = '';
    $('#draft-signUp').html('');
    for(let i of signUpFields){

        if(i !== 'Liquid_Type__c' &&i !== 'Over_The_Counter_Space_Required__c' && i !== 'Under_The_Counter_Space_Required__c'){
            tmp +=`
            <div class="row show-panel">
                <div class="col-xs-7">
                    ${mapOfRequisitionFieldLabel.get(i)}
                </div>
                <div class="col-xs-5">
                    ${
                        (i === 'Number_of_Tabs_Required__c' || i === 'Recommended_Machine_Type__c' || i === 'Recommended_Tower_Type__c') ?
                        createInputField(i,null) : 
                        (i === 'Does_Outlet_Need_Mobile_Troley__c' || i === 'Does_Outlet_Require_B9_Machine__c' || i === 'Does_Outlet_Require_B9_Taps__c') ?
                        createRadioField(i,'Yes') :
                        (i === 'Estimated_Monthly_Draft_Volume__c') ? createQuantityInput(i,0) :
                        (i === 'Location_of_Draft_Machine__c') ? createTextArea(i,null) :
                        (i === 'Reason_For_Asking_More_Tabs__c') ? createSelectOption(i,null,selectOptions.get(i)) :
                        createToggleField(i,null)
                    }
                </div>
            </div>
        `
        }else if(i === 'Liquid_Type__c')
        {
            tmp += createLiquidType(Liquid_Type__c);
        }
        else{
            tmp += `
                <div class="row show-panel">
                    <div class="col-xs-3">${mapOfRequisitionFieldLabel.get(i)}</div>
                    <div class="col-xs-3 no-padd">
                        ${createInputField(i,null)}
                    </div>
                    <div class="col-xs-4 no-padd">
                        ${createSelectOption(i,null,selectOptions.get(i))}
                    </div>
                    <div class="col-xs-2">
                        ${createImageCapture(i,null)}
                    </div>
                </div>
            
            `;
        }
    }

    $('#draft-signUp').append(tmp);
    
    showPanel();
};


const createTemporaryReq = () =>{
    let tempReqFields = ['Installation_Date__c','Pullout_Date__c','Type_Of_Event__c','Number_Of_Attendees__c',
                        'Custom_Bar_Required__c','Size_Of_Bar__c','Number_Of_Machine_Required__c',
                        'Does_Outlet_Need_Mobile_Troley__c', 'Estimated_Draft_Volume__c','Liquid_Type__c','Number_of_Tabs_Required__c',
                        'Recommended_Machine_Type__c','Recommended_Tower_Type__c','Confirmed_With_the_Event_Head_for_Installation__c'];

    $('#draft-signUp').html('');
    let tmp = '';
    for(let i of tempReqFields){
        if(i !== 'Liquid_Type__c' && i !== 'Custom_Bar_Required__c' && i !== 'Does_Outlet_Need_Mobile_Troley__c'){
            tmp +=`
                <div class="row show-panel">
                    <div class="col-xs-6">
                        ${mapOfRequisitionFieldLabel.get(i)}
                    </div>
                    <div class="col-xs-6">
                        ${
                            (i === 'Installation_Date__c' || i === 'Pullout_Date__c') ? 
                            createDateTimeField(i,new Date()) : 
                            (i === 'Types_Of_Event') ? createSelectOption(i,null,selectOptions(i)) :
                            (i === 'Number_Of_Attendees__c' || i === 'Size_Of_Bar__c' || i === 'Number_Of_Machine_Required__c' || i === 'Estimated_Draft_Volume__c') ? 
                            createQuantityInput(i,0) : 
                            (i === 'Number_of_Tabs_Required__c' || i === 'Recommended_Machine_Type__c' || i === 'Recommended_Tower_Type__c') ?
                            createInputField(i,null) : 
                            createToggleField(i,null)
                        }
                    </div>
                </div>
            `
        }else if(i === 'Liquid_Type__c')
        {
            tmp += createLiquidType(Liquid_Type__c);
        }else{
            tmp +=`
                <div class="row show-panel">
                    <div class="col-xs-4">
                        ${mapOfRequisitionFieldLabel.get(i)}
                    </div>
                    <div class="col-xs-3">
                        ${createToggleField(i,null)}
                    </div>
                    <div class="col-xs-5 ${i}-Qty" style="display: none; margin-top: 10px">${createQuantityInput(`${i}-Qty`,0)}</div>
                
                </div>
            `;
        }
    }

    $('#draft-signUp').append(tmp);

    $("#Installation_Date__c").on("keydown keyup",function(e){
        e.stopPropagation();
    });
    
   
    showPanel();
};

const createLiquidType = (liquidTypes) =>{
    let liq = '<div class="row text-center">';
    for(let i in liquidTypes){
        liq += `<button onClick="handleLiquidType(this)" data-name="${i}" class="btn-custom btn-secondary btn ${Liquid_Type__c[i] ? 'btn-selected' : ''}">${i}</button>`;
    }
    liq +='</div>'

    return liq;
}

const createRadioField = (id,value) =>{
    let tmp = `
            <div class="radio-group">
                <input type="radio" onchange="handleRadioBtn(this)" id="${id}-yes" ${value === 'Yes' ? 'checked' : ''} value="Yes" name="${id}">
                <label for="${id}-yes">Yes</label>
                <input type="radio" onchange="handleRadioBtn(this)" id="${id}-no" ${value === 'No' ? 'checked' : ''} value="No" name="${id}">
                <label for="${id}-no">No</label>
            </div>    
    `;

    return tmp;
}


const createInputField = (id,value) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input class="form-control" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};



const createDateTimeField = (id,value) =>{

    let tmp = '';
      
        tmp = `
        <div class="form-group">
        <div class='input-group date datetimepicker1' id=''>
            <input type='text' class="form-control" id="${id}" value="${value ? value : ''}"/>
            <span class="input-group-addon">
            <i class="fas fa-calendar-alt"></i>
            </span>
        </div>
    </div>
        `;

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

const checkBoxChangeHandler = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).prop('checked');


    if(value && (id === 'Custom_Bar_Required__c' || id === 'Does_Outlet_Need_Mobile_Troley__c')){
       
        $(`.${id}-Qty`).css('display','block');
    }else if(id === 'Custom_Bar_Required__c' || id === 'Does_Outlet_Need_Mobile_Troley__c'){
        $(`.${id}-Qty`).css('display','none');
    }

    if(value && id === 'Temporary_Requisition__c'){
        createTemporaryReq();
        callDateTimePicker();
        
    }else if(id === 'Temporary_Requisition__c'){
        createPermanentReq();
    }
};

const showPanel = () =>{  
    if($('.btn-selected').length > 0){
        $('.show-panel').css('display','block')
    }else{
        $('.show-panel').css('display','none')
    }
}


const handleLiquidType = (ele) =>{
    if(!$(ele).hasClass('btn-selected')){
        $(ele).addClass('btn-selected')
    }else{
        $(ele).removeClass('btn-selected')
    }

    showPanel();
};


const handleDateChange = (ele) =>{
    console.log($(ele).val())
}

const handleRadioBtn = (ele) =>{
    console.log($(ele).val());
}

const handleSubmit = () =>{
    if($('#Temporary_Requisition__c').prop('checked') === true){
        console.log($('#Installation_Date__c').val())
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

  initializeDraftHomePage();
  
const callDateTimePicker = () =>{
    console.log($('.datetimepicker1'))
    $(".datetimepicker1").datetimepicker();
}
disabledFields();