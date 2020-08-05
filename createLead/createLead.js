let clusterList = [
    {
        'cluster_name' : 'Test 1',
        'field' : 'despsdfghgf'
    },

    {
        'cluster_name' : 'Test 2',
        'field' : 'despsdfghgf'
    }
];


let channelMap = new Map([
    ["On-Premise", ["Hotel", "General"]],
    ["Off-Premise", ["Retail-Account", "Wholesaler"]],
    ["Institutional", ["Military", "Airlines", "Railways", "Cruise-Ships", "Stadiums", "Duty-Free"]],
    ["Temporary-Event", ["None"]]
]);


let subChannelMap = new Map([
    ["Hotel", ["Resorts", "Hostels", "Guesthouses", "Home-Stays", "Cottages", "Villas", "Bed-and-Breakfasts", "Luxury Hotels", "Business Hotels", "Economy Hotels"]],
    ["General", ["Restaurant", "Bar", "Club"]],
    ["Retail-Account", ["Modern-Trade", "Convenience-Store", "Gas-Station", "Drug-Store", "Liquor-Shop", "Wine-and-Beer-Shop", "Home-Distributor", "Diplomatic-Store"]],
    ["Wholesaler", ["Modern-Trade", "Convenience-Store", "Gas-Station", "Drug-Store", "Liquor-Shop", "Wine-and-Beer-Shop", "Home-Distributor", "Diplomatic-Store"]],
    ["Military", ["Canteen-Store-Department-On", "Canteen-Store-Department-Off"]],
    ["Airlines", ["Airlines"]],
    ["Railways", ["Railways"]],
    ["Cruise-Ships", ["Cruise-Ships"]],
    ["Stadiums", ["Stadiums"]],
    ["Duty-Free", ["Duty-Free"]],
    ["None",["Food Festival","Exhibition","Music Festival","Others"]]
]);

let clusterMaster;
initializeMethod = () =>{
    clusterMaster = clusterList;
    showCluster(clusterList);
    showStatesDropDown();
};

const showStatesDropDown = () =>{
    let state_arr = new Array("Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal");
    let tmp = '';
    $('#state').html('');
    tmp = '<option>--None--</option>'
    for(let i=0;i<state_arr.length;i++)
    {
        tmp +=`<option value="${state_arr[i]}">${state_arr[i]}</option>`;
    }

    $('#state').append(tmp);
};

const handleChannel = (ele) =>{
    let value = ele.value;
    let tmp = '';
    $('#sub_channel').html('');
    if(channelMap.has(value))
    {
        let subChannels = channelMap.get(value);
        tmp = '<option value="">--None--</option>'
        for(let i = 0;i<subChannels.length;i++)
        {
            tmp += `
                <option value="${subChannels[i]}">${subChannels[i]}</option>
            `;
        }

        $('#sub_channel').attr('disabled',false);
        $('#sub_channel').append(tmp);
        $('#Type__c').attr('disabled',true);
    }
    else{
        $('#sub_channel').attr('disabled',true);  
        $('#Type__c').attr('disabled',true);
    }
};

const handleSubChannel = (ele) =>{
    let value = ele.value;
    let tmp = '';
    $('#type').html('');
    if(subChannelMap.has(value))
    {
        let type = subChannelMap.get(value);
        tmp = '<option value="">--None--</option>'
        for(let i = 0;i<type.length;i++)
        {
            tmp += `
                <option value="${type[i]}">${type[i]}</option>
            `;
        }

        $('#type').attr('disabled',false);
        $('#type').append(tmp);
    }
    else{
        $('#type').attr('disabled',true);  
    }
};

const showCluster = (clusterList) =>{
    $('#listOfCluster').empty('');
    let tmp = '';
    for(let i=0;i<clusterList.length;i++)
    {
        tmp +=`
            <div class="cluster" onclick="selectCluster(this)" data-name="${clusterList[i].cluster_name}">
                <b>${clusterList[i].cluster_name}</b>
                <p class="text-muted">${clusterList[i].field}</p>
            </div>
        `;
    }

    $('#listOfCluster').append(tmp);
};

const selectCluster = (ele) =>{
    let value = $(ele).attr('data-name');
    $('#cluster').val(value);
    $('#showCluster').modal('hide');
};


const handleInputField = (ele) =>{
    let value = $(ele).val();
    let id = $(ele).attr('id');
    if(id == 'GST')
    {
        if(!gstValidator(value))
        {
            $('.gsterror').css('display','block');
        }else{
            $('.gsterror').css('display','none');
        }
    }

    if(id == 'email')
    {
        if(!validateEmail(value))
        {
            $('.emailerror').css('display','block');
        }else{
            $('.emailerror').css('display','none');
        }   
    }
};

const handleCheckbox =(ele) =>{
    let value = $(ele).prop('checked');
}

const gstValidator = (g) => {
    let regTest = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(g);

    return regTest
};

const validateEmail =(email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


const handleClusterSearch = (ele) =>{
    let value = $(ele).val();
    clusterList = clusterMaster.filter((ele) => {
        let isValid = true;
        if (ele.cluster_name && value) {
          if (ele.cluster_name.toLowerCase().indexOf(value.toLowerCase()) < 0) {
            isValid = false;
          }
        }
        return isValid;
    });

    showCluster(clusterList);
    
}

initializeMethod();
let data = {
    message : 'teer'
}

const resetInputs = () =>{
    $('#Name').val('');
    $('#Phone').val('');
    $('#Website').val('');
    $('#Beer_Selection__c').val('');
    $('#Channel__c').val('');
    $('#Sub_Channel__c').val('');
    $('#Type__c').val('');
    $('#Competitor_Non_Premium_Sales__c').val('');
    $('#Competitor_Premium_Sales__c').val('');
    $('#BillingStreet').val('');
    $('#Sales_District__c').val('');
    $('#Billing_State_Geo__c').val('');
    $('#Email__c').val('');
    $('#Excise_Code__c').val('');
    $('#GST__c').val('');
    $('#Local_Sales_Tax_Number__c').val('');
    $('#QCO_Flag__c').prop('ckecked',false);
    $('#MTD_Sales__c').val('');
    $('#QTD_Sales__c').val('');
    $('#Cluster__c').val('');
}
showNotification(data);
resetInputs();