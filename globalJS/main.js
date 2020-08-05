function openNav() {
    document.getElementById("sideNav").style.left = "0px";
    document.getElementById("sideNav").style.boxShadow = "rgb(0, 0, 0) 0 0 13px 6px";
    document.getElementById("backdraw").style.left = "0";
}


var sideNav = document.getElementById("backdraw");

window.onclick = function (event) {
    var navBar = document.getElementById("sideNav");
    if (event.target == sideNav) {
        navBar.style.left = "-250px";
        navBar.style.boxShadow = "0px 0px 0px 0px #000000";
        document.getElementById("backdraw").style.left = "-100%";
    }
};


$(document).ready(function(){
    let $a = $(".sidenav a");
    for (var i = 0; i < 5; i += 6) {
        var $div = $("<div/>", {
            class: 'inside-nav'
        });
        $a.slice(i, i + 5).wrapAll($div);
    }
});

showNotification = (data) =>{
    if(!$('#notification').length)
    {
        let tmp = `
            <div id='notification' style="display: block;">
                <span></span>
                <a href="#" class="close-notify">X</a>
            </div>
        `;

        $('body').append(tmp);
    }
    $("#notification").fadeIn("slow");
    $("#notification span").html(data.message);
    $("#notification a.close-notify").click(function() {
        $("#notification").fadeOut("slow");
        return false;
    });
    setTimeout(() => {
        $("#notification").fadeOut("slow");
    },3000);
};

createLoader = () =>{
    if($('#loader-main').length === 0){
    
    let tmp = '';
    tmp +='<div id="loader-main">';
    tmp +='<div class="loader1" >Loading...</div>';
    tmp +='</div>';    

    $('#app').append(tmp);
    }
};


createModalPopUp = () =>{
    let tmp = '';

    
    tmp +='<div id="logoutModal" class="modal fade" role="dialog">';
    tmp +='     <div class="modal-dialog">';
    tmp +='         <div class="modal-content">';
    tmp +='             <div class="modal-header">';
    tmp +='                 <button type="button" class="close" data-dismiss="modal">&times;</button>';
    tmp +='             </div>';
    tmp +='             <div class="modal-body text-center">';
    tmp +='                 <h5>Are you sure you want to log out? All un-synced data will be lost.</h5>';
    tmp +='             </div>';
    tmp +='             <div class="modal-footer text-center">';
    tmp +='                 <button type="button" onclick="clearAll()" class="btn btn-danger">Yes</button>';
    tmp +='                 <button type="button" class="btn btn-success" data-dismiss="modal">No</button>';
    tmp +='             </div>';
    tmp +='         </div>';
    tmp +='     </div>';
    tmp +='</div>';


    $('#app').append(tmp);
};

createModalPopUp();

const fetchCurrentDateIdStr = () => {
    return (new Date().toDateString());
};



const checkErrorGeolocation = (e) => {
    switch(e.code) {
        case 1:
          alert('User denied the request for Geolocation.');
          //x.innerHTML = "User denied the request for Geolocation."
          //Display notification using above message;
          break;
        case 2:
          alert('Location information is unavailable.');
          //x.innerHTML = "Location information is unavailable."
          //Display notification using above message;
          break;
        case 3:
          alert('The request to get user location timed out.');
          //x.innerHTML = "The request to get user location timed out."
          //Display notification using above message;
          break;
        default:
          alert('An unknown error occurred.');
          //x.innerHTML = "An unknown error occurred."
          //Display notification using above message;
          break;
      }
      
      hideLoader();
      initializeObjectives();
  
  //return false;// Display custom error message on front page 
};


const getCurrentLocationHelper = ()=> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 6000,
            maximumAge: 0
        });
    });
};


let listOfAccount = [
    {
        Average_Velocity_of_Kegs__c: 298,
BIRA_ID__c: "2929",
Beacon_Flag__c: false,
BillingCountry: "India",
BillingState: "Delhi",
Channel__c: "On-Premise",
Corporation_Outlet__c: false,
Direct_Billing_Flag__c: false,
Draft_Ready__c: false,
Draft_Status__c: false,
Email__c: "k@gmail.com",
Flag_for_Customer_on_Hold_Finance_Hold__c: false,
Group_Account_Flag__c: false,
Hold_Status__c: false,
Id: "0015D00000c2HHTQA2",
Imported_Brands__c: false,
IsDeleted: false,
KYC_Done__c: true,
L3M_Billed_Liquids__c: "Blonde",
L3M_Sales_Avg_Premium__c: 180,
L3M_Sales_Avg__c: 225,
Last_Keg_Order_Date__c: "2019-12-18T00:00:00.000Z",
Liquor_Available__c: true,
MTD_Sales_Premium__c: 0,
MTD_Sales__c: 0,
Minibar_Available__c: false,
Name: "A Warehouse",
Neighbourhood__c: "Delhi",
Never_Billed_Liquids__c: "Strong, IPA, LIQUID, Stout, White, test Liquid  7/01/2020, Boom, Light",
Other_Entertainment__c: "Wine Led",
Outdoor_Seating__c: false,
POSM_ready__c: false,
ParentId: "0015D00000c2HHSQA2",
Phone: "8656456732",
Pool_Side__c: false,
Premium_Brands__c: false,
QCO_Flag__c: false,
QTD_Sales__c: 0
    },
    {
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
Cluster__c: "a0d1s000000NYqzAAG",
Contacts: {done: true, records: Array(59), size: 59},
Corporation_Outlet__c: false,
Cuisine__c: "Barbeque",
Direct_Billing_Flag__c: false,
Draft_Ready__c: true,
Draft_Status__c: false,
Estimated_Monthly_Premium_Mass_Sales__c: "4.65237643278E11",
Flag_for_Customer_on_Hold_Finance_Hold__c: false,
GST__c: "GST NUmber",
Group_Account_Flag__c: false,
Hold_Status__c: false,
Id: "0015D00000cDkdjQAC",
Imported_Brands__c: false,
Industry_Segment__c: "P4",
IsDeleted: false,
KYC_Done__c: false,
L3M_Sales_Avg_Premium__c: 0,
L3M_Sales_Avg__c: 1520,
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
Recent_Activity_Comments__c: "test cheeckout comments",
Recent_Activity_Date_Time__c: "2020-06-23T03:31:48.000Z",
Recent_Retail_Depletion__c: "2020-02-02T00:00:00.000Z",
Sales_Type__c: "Secondary",
ShippingCountry: "India",
Star_Rating__c: "2",
Sub_Channel__c: "Hotel",
Type__c: "Hostels",
VAT_Registration_Number__c: "0",
YTD_Sales__c: 60,
Zomato_Cost_for_2__c: "Luxury",
    }
];

let mainListAcc;

initializeAccount = () =>{
    mainListAcc = listOfAccount;
    createAccountListModal();
}

const createAccountListModal = () =>{
    let tmp = `
    <div class="modal fade" id="bottomBarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 class="modal-title" id="exampleModalLabel">Back Order</h5>
                    
                </div>
                 <div class="modal-body">
                 <div id="startTripBtn">
                    <button type="button" class="btn start-trip-modal" onclick="handleSubmitData()">Start Trip</button>
                 </div>
                 <div id="showAccounts" style="display: none">
                   
                    <div class="input-icons">
                        <i class="fa fa-search"></i>
                        <input class="input-field" id="accountName"  type="text"  onkeyup="searchBackOrderAcc()" placeholder="Search Account" >
                    </div>
        
                        <div id="accountList">
        
        
                        </div>
                    </div>
                 </div>
                <div class="modal-footer" style="text-align: right">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;

    $('body').append(tmp);
};


const showAccounts = () => {
    let tmp = "";
    $("#accountList").html('');
        if (listOfAccount && listOfAccount.length > 0) {
            for (var i = 0; i < listOfAccount.length; i++) {
                tmp += '<li class="accountList2"  >';
                tmp += '    <div class="main-head" onclick=showAccountDetail("' + [i] + '")>';
                tmp += '        <span class="accountName">' + listOfAccount[i].Name + '</span> <br/>';
                tmp += '      <div class="heading">';
                // tmp += '        <span class="accountName">' + listOfAccount[i].Name + '</span> <br/>';
                if ((listOfAccount[i].Channel__c && listOfAccount[i].Account_Status__c)) {
                    tmp += '       <p style="margin-left:3%;">' + (listOfAccount[i].Channel__c ? listOfAccount[i].Channel__c + '<span class="division"> | </span>' : 'NA');
                    tmp += '         ' + (listOfAccount[i].Account_Status__c ? listOfAccount[i].Account_Status__c : '') + '</p>';
                }
                else {
                    if (listOfAccount[i].Channel__c) {
                        tmp += '       <p style="margin-left:3%;">' + (listOfAccount[i].Channel__c ? listOfAccount[i].Channel__c + '</p>' : 'NA');
                    }
                    if (listOfAccount[i].Account_Status__c) {
                        tmp += '       <p style="margin-left:3%;>  ' + (listOfAccount[i].Account_Status__c ? listOfAccount[i].Account_Status__c : '') + '</p>';
                    }
                }
                
                tmp += '      </div>';
                
              
                tmp += '    </div>';
                tmp += '</li>';
            }
            $("#accountList").append(tmp);
        }

};

const showAccountDetail = (id) =>{
    // redirect to detail page
}

const handleSubmitData = () => {
    $("#showAccounts").css('display','block');
    $('#startTripBtn').css('display','none');
    let height = window.innerHeight - 200;
    
    $('#backOrder .modal-body').css('height',`${height}px`)
    showAccounts();
};

const searchBackOrderAcc = () => {
    // let input = document.getElementById('accountName').value
    // input = input.toLowerCase();
    // let List = document.getElementById("accountList");
    // let x = document.getElementsByClassName('accountList2'); 
    // console.log(x.length);

    // for (let i = 0; i < x.length; i++) {
    //     if (!x[i].innerHTML.toLowerCase().includes(input)) {
    //         x[i].style.display = "none";
    //     }
    //     else {
    //         x[i].style.display = "block";
    //     }
    // }

    let accName = $('#accountName').val().toLowerCase();

    listOfAccount = mainListAcc.filter((ele, index) => {
        let isValid = true;
        if (ele.Name && accName) {
            if (ele.Name.toLowerCase().indexOf(accName.toLowerCase()) < 0) {
              isValid = false;
            }
          }
        return isValid;
      });
    showAccounts();
}

let nav = $('.nav-img').eq(0);

$(nav).click(function(){
    $('#bottomBarModal').modal('show');
});


const shiftModalToCenter = (id,value) =>{
        console.log('ffd');
        $(`#${id} .modal-dialog`).css('transform',`translate(0,${value}%)`);
    
};



initializeAccount();


//  shiftModalToCenter('backOrder',100);