let warehouseAudit = {};

let warehouseAuditField = [
    "5S", "Warehouse_Safety", "Direct_Sunlight", "Stock_Location", "Warehouse_Lighting", "Pest_Control_Personnel_Visit",
 "Pest_Control_Device", "Pest_Evidence", "Pesticide_Spray","Warehouse_Buliding_And_Construction",
 "Any_Interior_Leakage", "Warehouse_Ventilation","Warehouse_Facilities","Warehouse_Doors_And_Shutters",
"Loading_And_Unloading_Loader","Warehouse_Stock_Age_Control","Non_confroming_Beer","Procedural_Repackaging",
"Finished_Product_Loading_Inspection","Finished_Product_Storage","Can_daily_inspection","Handle_loading",
"Can_Palleting","Verify_Package_Inspection","Vehicle_Requirement_And_Vehicle_Request","Vehicle_Inspection",
"Prevent_Mix_Loading_Management","Stacking_Height",];

let mapOfFieldLabel = new Map([
   ["5S","5S"],
   ["Warehouse_Safety","Warehouse Safety"],
   ["Direct_Sunlight","Direct Sunlight"],
   ["Stock_Location","Stock Location"],
   ["Warehouse_Lighting","Warehouse Lighting"],
   ["Pest_Control_Personnel_Visit","Pest Control Personnel Visit"],
   ["Pest_Control_Device","Pest Control Device"], 
   ["Pest_Evidence","Pest Evidence"],
   ["Pesticide_Spray","Pesticide Spray"],
   ["Warehouse_Buliding_And_Construction","Warehouse Buliding & Construction"],
   ["Any_Interior_Leakage","Any Interior Leakage"],
   ["Warehouse_Ventilation","Warehouse Ventilation"],
   ["Warehouse_Facilities","Warehouse Facilities"],
   ["Warehouse_Doors_And_Shutters","Warehouse Doors & Shutters"],
   ["Loading_And_Unloading_Loader","Loading & Unloading Loader"],
   ["Warehouse_Stock_Age_Control","Warehouse Stock Age Control"],
   ["Non_confroming_Beer","Non confroming Beer"],
   ["Procedural_Repackaging","Procedural Repackaging"],
   ["Finished_Product_Loading Inspection","Finished Product Loading Inspection"],
   ["Finished_Product_Storage","Finished Product Storage"],
   ["Can_daily_inspection","Can daily inspection"],
   ["Handle_loading","Handle loading"],
   ["Can_Palleting","Can Palleting"],
   ["Verify_Package_Inspection","Verify Package Inspection"],
   ["Vehicle_Requirement_And_Vehicle_Request","Vehicle Requirement & Vehicle Request"],
   ["Vehicle_Inspection","Vehicle Inspection"],
   ["Prevent_Mix_Loading_Management","Prevent Mix Loading Management"],
   ["Stacking_Height","Stacking Height"],
]);

initializeWarehouse = () =>{
    createWarehouseAudit();
};

const createWarehouseAudit = () =>{
    let tmp = '';

    $('#warehouse').html('');
    for(let i = 0;i <warehouseAuditField.length; i++)
    {
        tmp += `
        
            <div class="col-xs-6">
                <label>${mapOfFieldLabel.get(warehouseAuditField[i])}</label>
            </div>
            <div class="col-xs-6">
                <label class="switch">
                    <input type="checkbox" value="" id="${warehouseAuditField[i]}" onchange="checkBoxChangeHandler(this)">
                    <span class="slider round"></span>
                </label>
            </div>
        `;
    }
    $('#warehouse').append(tmp);
};

const checkBoxChangeHandler = () =>{}

initializeWarehouse();