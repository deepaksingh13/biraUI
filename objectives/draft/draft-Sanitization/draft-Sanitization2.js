let fieldMap = new Map([
    ['Chiller_Body_Cleaned','Chiller Body Cleaned'],
    ['Tower_Cleaned','Tower Cleaned'],
    ['Sanitized_with_hot_water','Sanitized with hot water'],
    ['Check_Thermostat_Setting','Check Thermostat Setting'],
    ['Re_Circulation_Pump','Re-Circulation Pump'],
    ['Fan_Motor','Fan Motor'],
    ['Concendsor_Condition','Concendsor Condition'],
    ['Compressor_Gas','Compressor Gas'],
    ['Compressor_Head_Pressure','Compressor Head Pressure'],
    ['Chiller_Water_Quality','Chiller Water Quality'],
    ['Chiller_Water_Level','Chiller Water Level'],
    ['Ice_Bank_Formation','Ice Bank Formation'],

    ['Output_Pressure','Output Pressure'],
    ['Cylinder_Pressure','Cylinder Pressure'],
    ['Regulator_Gauges','Regulator Gauges'],
    ['Leakage','Leakage'],
    ['Regulator_Wrench','Regulator Wrench'],
    ['Washer','Washer'],
    ['Safely_Placement','Safely Placement'],
    ['O_Ring','O-Ring']
]);

initailizeSanitization = () =>{
    creatFlashChiller();
    createCo2Section();    
}

const creatFlashChiller = () =>{
    let field = ['Chiller_Body_Cleaned','Tower_Cleaned','Sanitized_with_hot_water','Check_Thermostat_Setting',
                'Re_Circulation_Pump','Fan_Motor','Concendsor_Condition','Compressor_Gas',
                'Compressor_Head_Pressure','Chiller_Water_Quality','Chiller_Water_Level','Ice_Bank_Formation'];
    let tmp = '';
    $('#flashChiller').html('');
    
    for(let i of field){
        if(i === 'Chiller_Body_Cleaned' || i === 'Tower_Cleaned' 
            || i === 'Concendsor_Condition' || i === 'Chiller_Water_Quality'
            || i === 'Chiller_Water_Level'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-8"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4">${createRating(`${i}-Rate`,null)}</div>
                    </div>
                `;
            }else{
                tmp +=`
                    <div class="row">
                        <div class="col-xs-8"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4">${createToggleField(`${i}`,false)}</div>
                    </div>
                `;
            }
        
    }


    $('#flashChiller').append(tmp);
}


const createCo2Section = () =>{
    let tmp = '';
    let fields = ['Output_Pressure','Cylinder_Pressure','Regulator_Gauges','Leakage','Regulator_Wrench','Washer','Safely_Placement','O_Ring'];
    $('#co2').html('');

    for(let i of fields){
        tmp +=`
                <div class="row">
                    <div class="col-xs-8">${fieldMap.get(i)}</div>
                    <div class="col-xs-4">${createToggleField(i,false)}</div>
                </div>
            `;
    }
    $('#co2').append(tmp);
    
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




const handleRating = (ele) =>{
   
    let index = $(ele).attr('for').split('-')[1];
    $(ele).parent().find('label').removeClass('rate');

    for(let i = 1;i<=parseInt(index); i++){
        $(ele).parent().find(`[data-id = star-${i}]`).addClass('rate')
    }
};



initailizeSanitization();