let fieldMap = new Map([
    ['Equipment_in_working_condition','Equipment in working condition'],
    ['Tower_visibility_condition','Tower visibility condition'],
    ['Equipment_in_Original_position','Equipment in Original position'],
    ['All_Assets_in_Good_Condition','All Assets in Good Condition'],
    ['Is_Bira_91_Tap_Handle_in_good_condition','Is Bira 91 Tap Handle in good condition ?'],
    ['Is_Medallion_in_good_condition','Is Medallion in good condition ?'],
    ['Beer_pouring_happening_properly_or_not','Beer pouring happening properly or not?'],
    ['LED_Sign_Tower_being_lit','LED Sign/ Tower being lit?'],
    ['Machine_Exterior_clean_or_not','Machine Exterior clean or not?'],
    ['Beer_cold_or_not','Beer cold or not?'],
    ['Brand_Freshness_and_Taste','Brand Freshness and Taste'],
    ['Leakage','Leakage'],
    ['Is_Pitcher_in_stock','Is Pitcher in stock ?'],
    ['Is_Barmat_in_stock','Is Barmat in stock ?'],
    ['Are_Glasses_in_stock','Are Glasses in stock ?'],
    ['Signage_in_stock','Signage in stock ?'],
    ['Is_Sanitization_required','Is Sanitization required ?']
]);

initailizeSanitization = () =>{
    creatEquipmentCondition();
    createSalesVisibility();    
}

const creatEquipmentCondition = () =>{
    let field = ['Equipment_in_working_condition','Tower_visibility_condition','Equipment_in_Original_position','All_Assets_in_Good_Condition',
                'Is_Bira_91_Tap_Handle_in_good_condition','Is_Medallion_in_good_condition','Beer_pouring_happening_properly_or_not',
            'LED_Sign_Tower_being_lit','Machine_Exterior_clean_or_not','Beer_cold_or_not','Brand_Freshness_and_Taste','Leakage'];
    let tmp = '';
    $('#equipCondition').html('');
    
    for(let i of field){
        if(i === 'Equipment_in_working_condition' || i === 'Tower_visibility_condition' 
            || i === 'Is_Bira_91_Tap_Handle_in_good_condition' || i === 'Is_Medallion_in_good_condition'
            || i === 'Machine_Exterior_clean_or_not'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4">${createRating(`${i}-Rate`,null)}</div>
                        <div class="col-xs-3">${createImageCapture(`${i}`,null)}</div>
                    </div>
                `;
            }else if(i === 'Equipment_in_Original_position' || i === 'Leakage'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-7">${createToggleField(`${i}`,false)}</div>
                    </div>
                `;
            }else if(i === 'All_Assets_in_Good_Condition' || i === 'Beer_cold_or_not' || i === 'Brand_Freshness_and_Taste'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-7">${createRating(`${i}-Rate`,null)}</div>
                    </div>
                `;
            }else{
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4">${createToggleField(`${i}`,false)}</div>
                        <div class="col-xs-3">${createImageCapture(`${i}`,null)}</div>
                    </div>
                `;
            }
        
    }


    $('#equipCondition').append(tmp);
}


const createSalesVisibility = () =>{
    let tmp = '';
    let fields = ['Is_Pitcher_in_stock','Is_Barmat_in_stock','Are_Glasses_in_stock','Signage_in_stock','Is_Sanitization_required'];
    $('#salesVisibility').html('');

    for(let i of fields){
        if(i !== 'Is_Sanitization_required'){
            tmp +=`
                <div class="row">
                    <div class="col-xs-6">${fieldMap.get(i)}</div>
                    <div class="col-xs-3">${createToggleField(i,false)}</div>
                    <div class="col-xs-3">${createImageCapture(i,null)}</div>
                </div>
            `;
        }else{
            tmp +=`
                <div class="row">
                    <div class="col-xs-6">${fieldMap.get(i)}</div>
                    <div class="col-xs-6">${createRadioField(i,null)}</div>
                </div>
            `;
        }
    }
    $('#salesVisibility').append(tmp);
}

const createRating = (id,rating) =>{
    let tmp = `
        
        <div class="rating" id=${id}>
            <input type="radio" id="field1_star-3" name="rating" value="3" />
            <label class = "full" data-id="star-3" for="field1_star-3" onclick="handleRating(this)"></label>

            <input type="radio" id="field1_star-2" name="rating" value="2" />
            <label class = "full" data-id="star-2" for="field1_star-2" onclick="handleRating(this)"></label>

            <input type="radio" id="field1_star-1" name="rating" value="1" />
            <label class = "full" data-id="star-1" for="field1_star-1" onclick="handleRating(this)"></label>
        </div>
    `;

    return tmp;
};



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


const handleRadioBtn = (ele) =>{
    console.log($(ele).val());
}

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


const handleRating = (ele) =>{
   
    let index = $(ele).attr('for').split('-')[1];
    $(ele).parent().find('label').removeClass('rate');

    for(let i = 1;i<=parseInt(index); i++){
        $(ele).parent().find(`[data-id = star-${i}]`).addClass('rate')
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


initailizeSanitization();