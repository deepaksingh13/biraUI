
let hygieneAuditField = [
    "Pre_Rinse",
    "Chemical_Hold",
    "Chemical_Rinse_Till_Liquid_Clean",
    "Hot_Water_Step",
    "Hot_Water_Temperature",
    "Normal_Water_Rinsing",
    "Residual_Check_from_PH_Paper",
    "All_Necessary_Tools_available_with_Technician",
    "Cleaning_Brushes_Available",
    "Safety_Glasses_Available",
    "Safety_Surgical_Gloves_Available",
    "Technician_Name",
    "Service_Feedback",
];

let mapOfFieldLabel = new Map([
    ["Pre_Rinse","Pre Rinse- 10 Min"],
    ["Chemical_Hold","Chemical Hold- 20 Min"],
    ["Chemical_Rinse_Till_Liquid_Clean","Chemical Rinse Till Liquid Clean"],
    ["Hot_Water_Step","Hot Water Step"],
    ["Hot_Water_Temperature","Hot Water Temperature- 80-85degree"],
    ["Normal_Water_Rinsing","Normal Water Rinsing"],
    ["Residual_Check_from_PH_Paper","Residual Check from PH Paper"],
    ["All_Necessary_Tools_available_with_Technician","All Necessary Tools available with Technician"],
    ["Cleaning_Brushes_Available","Cleaning Brushes Available"],
    ["Safety_Glasses_Available","Safety Glasses Available"],
    ["Safety_Surgical_Gloves_Available","Safety Surgical Gloves Available?"],
    ["Technician_Name","Technician Name"],
    ["Service_Feedback","Service Feedback"]
]);

initializehygieneAudit = () =>{
    createHygieneAudit();
};

const createHygieneAudit = () =>{
    let tmp = '';

    $('#chemicalCIP').html('');
    for(let i = 0;i <hygieneAuditField.length; i++)
    {
        tmp += `
        
            <div class="col-xs-8">
                <label>${mapOfFieldLabel.get(hygieneAuditField[i])}</label>
            </div>
            <div class="col-xs-4">
                <label class="switch">
                    <input type="checkbox" value="" id="${hygieneAuditField[i]}" onchange="checkBoxChangeHandler(this)">
                    <span class="slider round"></span>
                </label>
            </div>
        `;
    }
    $('#chemicalCIP').append(tmp);
};

const checkBoxChangeHandler = () =>{}

initializehygieneAudit();