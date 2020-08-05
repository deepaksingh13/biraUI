
const initializeHomePage = () =>{
    createmaintenanceVisits()
    createPendingInstall();
    createPendingPullout();
    createPendingComplaints();
}

// For Pending Installations
let pendingInstallation = ['Account 1','Account 2','Account 3'];
const createPendingInstall = () =>{

    $("#pending-installations").empty();
    let tmp = "";

    for(let i of pendingInstallation){
        tmp += `<div class="showItem">Account ` + i +`</div>
        
        `;
    }
    
    $("#pending-installations").append(tmp);
}



// For Pending Pullouts
let pendingPullOut = ['Account 1','Account 2','Account 3'];

const createPendingPullout = () =>{
    $("#pending-pullouts").empty();
    let tmp1 = "";

    for(let i of pendingPullOut){
        tmp1 += `<div class="showItem">Account ` + i +`</div>
        
        `;
    }

    $("#pending-pullouts").append(tmp1);
}

// For Pending Complaints
let pendingComplaints = ['Account 1','Account 2','Account 3'];

const createPendingComplaints = () =>{
    $("#pending-complaints").empty();
    let tmp2 = "";

    for(let i of pendingComplaints){
        tmp2 += `<div class="showItem">Account ` + i +`</div>
        
        `;
    }

    $("#pending-complaints").append(tmp2);
}



// For Maintenance Visits
let maintenanceVisits = ['Account 1','Account 2','Account 3'];

const createmaintenanceVisits = () =>{
    $("#maintenance-visits").empty();
    let tmp3 = "";

    for(let i of pendingComplaints){
        tmp3 += `<div class="showItem">Account ` + i +`</div>
        
        `;
    }

    $("#maintenance-visits").append(tmp3);
}

initializeHomePage();