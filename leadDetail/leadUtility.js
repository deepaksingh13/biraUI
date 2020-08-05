

// let accountRec;

const objectiveArray = ['Sales Order','Stock/Visibility Survey','Product Introduction Pre-Sales/Sampling','Competition Insights','KYC and Classification'];
let accountRec = {
        Account_Status__c: "Permanently Closed",
        Average_Velocity_of_Kegs__c: 0,
        BIRA_ID__c: "BI-147",
        Beacon_Flag__c: true,
        Beer_Selection__c: "Boom",
        BillingCity: "Temp",
        BillingCountry: "India",
        BillingPostalCode: "Temp",
        BillingState: "Delhi",
        BillingStreet: "Temp",
        Bira_Segment__c: "C",
        Channel__c: "On-Premise",
        Contacts: {done: true, records: Array(59), size: 59},
        Corporation_Outlet__c: false,
        Cuisine__c: "Barbeque",
        Direct_Billing_Flag__c: false,
        District__r: {Name: "Patiala District"},
        Draft_Ready__c: true,
        Draft_Status__c: false,
        Estimated_Monthly_Premium_Mass_Sales__c: "4.65237643278E11",
        Flag_for_Customer_on_Hold_Finance_Hold__c: false,
        GST__c: "GST NUmber",
        Geolocation__c: {latitude: 28.570297699999998, longitude: 28.570297699999998},
        Group_Account_Flag__c: false,
        Hold_Status__c: false,
        Id: "0015D00000cDkdjQAC",
        Imported_Brands__c: false,
        Industry_Segment__c: "P4",
        IsDeleted: false,
        KYC_Done__c: false,
        L3M_Sales_Avg_Premium__c: 0,
        L3M_Sales_Avg__c: 1320,
        License_Name__c: "Temp",
        License_Number__c: "2999299",
        License_Type__c: "ysyys",
        Liquor_Available__c: false,
        Location__c: "Residential Area",
        MTD_Sales_Premium__c: 0,
        MTD_Sales__c: 0,
        Minibar_Available__c: false,
        Name: "Country Inn & Suites, Satbari",
        Never_Billed_Liquids__c: "Strong, IPA, LIQUID, Stout, White, test Liquid  7/01/2020, Blonde, Boom, Light",
        No_of_Banquets__c: 20,
        Other_Entertainment__c: "Cocktail Led",
        Outdoor_Seating__c: false,
        PAN__c: "Temp",
        POSM_ready__c: false,
        Pool_Side__c: false,
        Premium_Brands__c: false,
        QCO_Flag__c: true,
        QTD_Sales__c: 0,
        Recent_Activity_Date_Time__c: "2020-05-13T11:46:56.000Z",
        Recent_Retail_Depletion__c: "2020-02-02T00:00:00.000Z",
        RecordType: { DeveloperName: "On_Premise_Hotel", Name: "On Premise Hotel"},
        Retail_Depletion1__r: {done: true, records: Array(1), size: 1},
        Sales_Type__c: "Secondary",
        ShippingCountry: "India",
        Star_Rating__c: "2",
        Sub_Channel__c: "Hotel",
        Tehsil__r: { Name: "Patiala Tehsil"},
        Type__c: "Hostels",
        VAT_Registration_Number__c: "0",
        YTD_Sales__c: 60,
        Zomato_Cost_for_2__c: "Luxury"
};
showAccount = () => {
    console.log('fds');
    var tmp = '';
        tmp += '<div class="accountList  '+(accountRec.Location__c ?accountRec.Location__c: '' )+' ' + (accountRec.Size_Format__c ?accountRec.Size_Format__c :'' ) +' ' + (accountRec.Industry_Segment__c ?accountRec.Industry_Segment__c : '' ) + ' ' + (accountRec.Sub_Channel__c? accountRec.Sub_Channel__c : '') + '" data-beacon="'+(accountRec.Beacon_Flag__c ? accountRec.Beacon_Flag__c : '')+'" data-status="'+(accountRec.Account_Status__c ? accountRec.Account_Status__c.charCodeAt() : '')+'" data-qco="'+(accountRec.QCO_Flag__c ?accountRec.QCO_Flag__c : '' )+'" data-segment="'+(accountRec.Bira_Segment__c ? accountRec.Bira_Segment__c.charCodeAt() : '' )+'">';
        tmp += '    <div class="main-head">';
        tmp += '      <div class="heading">';
        tmp += '<span>' + (accountRec.Name ?accountRec.Name : '' ) + '</span> <br/>';
        tmp += '<p> ';
        tmp += '         ' + (accountRec.Neighbourhood__c ? accountRec.Neighbourhood__c : '');
        tmp += '</p>';
        tmp += '      </div>';
        tmp += '       <div class="feat">';
        tmp += '         <div>';
        

        if(accountRec.Industry_Segment__c != null)
        {
            if(accountRec.Industry_Segment__c === "P0"){
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/p0.png" alt=""></span>';
            }else if(accountRec.Industry_Segment__c === "P1"){
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/p1.png" alt=""></span>';
            }else if(accountRec.Industry_Segment__c === "P2"){
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/p2.png" alt=""></span>';
            }else {
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/p3.png" alt=""></span>';
            }
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if(accountRec.Industry_Segment_Mass__c != null)
        {
            if(accountRec.Industry_Segment_Mass__c === "M0"){
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/m0.png" alt=""></span>';
            }else if(accountRec.Industry_Segment_Mass__c === "M1"){
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/m1.png" alt=""></span>';
            }else if(accountRec.Industry_Segment_Mass__c === "M2"){
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/m2.png" alt=""></span>';
            }else {
                tmp += '  <span class="name"><img src="../../../media/icons/accountSegmentation/m3.png" alt=""></span>';
            }
            
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        tmp += '         </div>';
        
        if (accountRec.QCO_Flag__c === true) {
            tmp += '         <span><img src="../../../media/images/homePage/Icons-05.png" alt=""></span>';
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        tmp += '       </div>';
        
        tmp += '    </div>';
        tmp += '</div>';
       
    $('#listOfAcc').prepend(tmp);
};

showObjectives = (objective,currentEventChecked) =>{

    if(objective){
        let objectiveSortArr = objective.Event_Objectives__r.records.map(ele => {
            ele.sNo = objectiveOrder.get(ele.Type__c);
            return ele;
        });
        objectiveSortArr.sort(compare);
        
        $('#listofEvent').html('');
        let disableOptions = false;
        if(currentEventChecked==='isCompleted' ||currentEventChecked==='differentEvent' ){
            $('.check-in').attr('disabled',true);
            $('.check-out').attr('disabled',true);
            disableOptions = true;
        }
        else if(currentEventChecked==='currentEvent'){
            $('.check-in').attr('disabled',true);
            
        }
        else if(currentEventChecked==='noEvent'){
            $('.check-out').attr('disabled',true);
            
            disableOptions = true;
        }
        var btn ='';
        for (var i = 0; i < objectiveSortArr.length; i++) {
            //console.log(objective.Event_Objectives__r.records[i]);
            btn+='<div class="event">';
            if(!functionalityDeveloped.get(objectiveSortArr[i].Type__c)&&!disableOptions){
                btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveSortArr[i].Type__c+'" data-objectiveId="'+objectiveSortArr[i].Id+'" class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveSortArr[i].Type__c);
            }
            else{
                btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveSortArr[i].Type__c+'" data-objectiveId="'+objectiveSortArr[i].Id+'" class="btn btn-default" '+(disableOptions ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveSortArr[i].Type__c);
            }
            btn+='  </button>';
            btn+='</div>';
        }
        
        $('#listofEvent').prepend(btn);
    }
    else{
        $('.check-in').html('');
        let temp = '<div style="text-align:center">';
        temp += 'No Objectives for today!';
        temp += '</div>';
        $('#listofEvent').html(temp);
        $('.check-out').html('');
    }
};

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.sNo;
    const bandB = b.sNo;
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
const showObjectivesV2 =async (checkedIn) => {
    if(checkedIn){
        $('.check-in').attr('disabled',true);
        $('.check-out').attr('disabled',false);
    }
    else{
        $('.check-in').attr('disabled',false);
        $('.check-out').attr('disabled',true);
    }
    $('#listofEvent').empty('');
    let btn = '';
    let isValid = true;//await checkedInEventCheck();
    if(!isValid){
        return;
    }
    for (var i = 0; i < objectiveArray.length; i++) {
        //console.log(objective.Event_Objectives__r.records[i]);
        btn+='<div class="event">';
        if(!functionalityDeveloped.get(objectiveArray[i])){
            btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'"  class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
        }
        else{
            if(!checkedIn&&(objectiveArray[i]==='Competition Insights' || objectiveArray[i]==='Stock/Visibility Survey')){
                btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
            }
            else{
                btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(false ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
            }
            
        }
        btn+='  </button>';
        btn+='</div>';
        
    }
    
    $('#listofEvent').prepend(btn);
   // activityDateCommentsRender();
};

// const activityDateCommentsRender = () => {
//     let options = { year: 'numeric', month: 'short', day: 'numeric', };
//     let btn = '';
//     btn += `<div style="margin-top: -47%;"><div class="form-group" >
//     <label class="control-label" for="activityDate">Recent Activity Date</label>
//     <input class="form-control" type="text" id="activityDate" disabled value="${accountRec.Recent_Activity_Date_Time__c ? (new Date(accountRec.Recent_Activity_Date_Time__c)).toLocaleDateString('en-IN',options) : ''}">
//   </div><div class="form-group" >
//   <label class="control-label" for="activityComments">Recent Activity Comments</label>
//   <textarea class="form-control" type="text" id="activityComments" disabled>${accountRec.Recent_Activity_Comments__c ? ((accountRec.Recent_Activity_Comments__c)) : ''}</textarea>
  
// </div></div>`;
//     $('.visitdateAndComment').prepend(btn);
// };

// const checkedInEventCheck = async() => {
//     let eventUtility = '';//await getItemFromStore('utility','event');
//     if(eventUtility&&accountRec.Id!==eventUtility.account.Id){
//         $('.check-in').attr('disabled',true);
//         $('.check-out').attr('disabled',true);
//         let tmp = '' ;
//         tmp += `<p class="text-center"> Your visit on <a data-accountRecordTypeName="${eventUtility.account.RecordType.DeveloperName}" data-accountId="${eventUtility.account.Id}" onclick="handleAccountLandingRedirect(this)">${eventUtility.account.Name}</a> is currently in-progress. </p>`;
//         $('#listofEvent').html(tmp);
//         return false;
//     }
//     return true;
// };


const objectiveOrder = new Map ([
    ['Sales Order',1],
    ['Stock/Visibility Survey',2],
    ['Product Introduction Pre-Sales/Sampling',3],
    ['Competition Insights',4],
    ['KYC and Classification',5]
]);
const objectiveLabel = new Map([
    ['Sales Order','Sales Order'],
    ['Stock/Visibility Survey','Stock & Visibility'],
    ['Product Introduction Pre-Sales/Sampling','Pre-Sales'],
    ['Competition Insights','Competition Insights'],
    ['KYC and Classification','KYC']
]);

const functionalityDeveloped = new Map([
    ['Sales Order',true],
    ['Stock/Visibility Survey',true],
    ['Product Introduction Pre-Sales/Sampling',false],
    ['Competition Insights',true],
    ['KYC and Classification',true]
]);




const checkBoxCreation = (key,label,eventListener,checked,disabled) => {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'form-group';
    let checkLabel = document.createElement('label');
    checkLabel.className = 'control-label switch';
    checkLabel.innerHTML = label;
    checkLabel.for = key;
    let checkInput = document.createElement('input');
    checkInput.type = 'checkbox';
    checkInput.id = key;
    checkInput.className = 'form-control';
    checkInput.checked = checked;
    checkInput.disabled = disabled;
    let checkSpan = document.createElement('span');
    checkSpan.className = 'slider round';

    if(eventListener){
        checkInput.addEventListener('change',eventListener); 
    }
    checkLabel.appendChild(checkInput);
    checkLabel.appendChild(checkSpan);
    outerDiv.appendChild(checkLabel);
   
    return outerDiv;
};

showAccount();