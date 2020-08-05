
let hygieneAuditField = ["Clean_Tower","Clean_Faucet","Clean_Coupler","Clean_Drip_Tray",
"Clean_Liquid","Clean_Refrigeration_unit_and_its_working",
"Clean_Surroundings",
"Shrink_Wrapping_of_Uncoupled_Coupler",
"Co2_Pressure_Gauge_display_working",
"Kegs_Storage_Conditions",
"Clean_Dispensing_Area",
"Storage_Temperature",
];

let mapOfFieldLabel = new Map([
    ["Clean_Tower","Clean Tower"],
    ["Clean_Faucet","Clean Faucet"],
    ["Clean_Coupler","Clean Coupler"],
    ["Clean_Drip_Tray","Clean Drip Tray"],
    ["Clean_Liquid","Clean Liquid"],
    ["Clean_Refrigeration_unit_and_its_working","Clean Refrigeration unit & its working"],
    ["Clean_Surroundings","Clean Surroundings"],
    ["Shrink_Wrapping_of_Uncoupled_Coupler","Shrink Wrapping of Uncoupled Coupler"],
    ["Co2_Pressure_Gauge_display_working","Co2 Pressure Gauge display working"],
    ["Kegs_Storage_Conditions","Kegs Storage Conditions"],
    ["Clean_Dispensing_Area","Clean Dispensing Area"],
    ["Storage_Temperature","Storage Temperature"],
]);

initializehygieneAudit = () =>{
    createHygieneAudit();
};

const createHygieneAudit = () =>{
    let tmp = '';

    $('#hygieneAudit').html('');
    for(let i = 0;i <hygieneAuditField.length; i++)
    {
        tmp += `
        
            <div class="col-xs-6">
                <label>${mapOfFieldLabel.get(hygieneAuditField[i])}</label>
            </div>
            <div class="col-xs-6">
                <label class="switch">
                    <input type="checkbox" value="" id="${hygieneAuditField[i]}" onchange="checkBoxChangeHandler(this)">
                    <span class="slider round"></span>
                </label>
            </div>
        `;
    }
    $('#hygieneAudit').append(tmp);
};

const checkBoxChangeHandler = () =>{}

initializehygieneAudit();