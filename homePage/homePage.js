slickSlider = () => {
    $('.silder').slick({
        centerMode: false,
        slidesToShow: 3,
        autoplay: false,
        dots: true,
        infinite: false,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2
                }
      },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1
                }
      }
    ]
    });
  };
  
  
  
  let accounts ;
  let accountRecBackend;
  showDropdown = () => {
      $("#searchElement").empty();
      let tmp = '';
      
      for (var i = 0; i < accounts.length; i++) {
    
          tmp += '<li class="account-card" onclick="handleAccountSearchClicked(this)" data-id="'+accounts[i].Id+'"><a>';
          tmp += '<img src="../../media/images/homePage/todays-visit.png"/>';
          tmp += '<div class="accountSearch">'+ accounts[i].Name+'<br/> <span>'+(accounts[i].Channel__c ? accounts[i].Channel__c : '')+'</span>';
          tmp += '</div>';
          tmp += '</a></li>';
      }
    
      $("#searchElement").prepend(tmp);
    };
  
  
    $("#searchValue").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      
      accounts = accountRecBackend.filter(ele => {
        if(ele.Name&&(((ele.Name).toLowerCase()).indexOf(value)>-1)){
           return true;
        }
        return false;
      });
      
      showDropdown();
      if(value){
          
          $("#searchElement li").css('display','block');
      }
      else{
          $("#searchElement li").css('display','none');
      }
       
    });
  
    handleAccountSearchClicked = (accountInstance) => {
      const accountId = $(accountInstance).attr('data-id');
      let element ={
          dataset : {
              accountid : accountId
          }
      };
      handleAccountClicked(element);
    };
  // filterFunction = () => {
  //   var input, filter, ul;
  //   ul = document.getElementById("searchElement");
  //   input = document.getElementById("searchValue");
  //   filter = input.value.toUpperCase();
  //   li = ul.getElementsByTagName("li");
  
  //   for (var i = 0; i < accountRec.length; i++) {
  //       txtValue = li[i].textContent || li[i].innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1 && filter != '') {
  //           li[i].style.display = "block";
  //       } else {
  //           li[i].style.display = "none";
  //       }
  //   }
  
  // };
  
  
  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
  }
  
  const handleDashboardClick = async (event) => {
      let reportDataFetch = await getItemFromStore('utility','report');
      const idName = $(event).attr('id');
      console.log(idName);
      if(idName.indexOf('Range')>-1){
          window.location = 'https://salesforce.com/'+reportDataFetch['Range'];
      }   
      else{
          window.location = 'https://salesforce.com/'+reportDataFetch['Volume'];
      }
  
  };
  
  showSliderData = (targetnAchieved) => {
      let tmp = '';
      if (targetnAchieved) {
          for (var i = 0; i < targetnAchieved.length; i++) {
              const achievementValue = Math.round(parseFloat((targetnAchieved[i].achievement / (targetnAchieved[i].target === 0 ? 1 : targetnAchieved[i].target)) * 100).toFixed(2));
              tmp += '                   <div class="item" id="'+targetnAchieved[i].reportName+'" onclick="handleDashboardClick(this)" >';
              tmp += '                      <h4 class="text-center">' + targetnAchieved[i].reportName + '</h4>';
              tmp += '                      <div class="target-section">';
              tmp += '                        <div class="details">';           
              tmp += '                          <div class="achieved">';
              tmp += '                            <p>Achieved</p>';
              if(achievementValue>=85&&achievementValue<=100){
                  tmp += '                            <h3 style="color: #FFBF00;">' + Math.round(parseFloat(targetnAchieved[i].achievement).toFixed(2)) + '</h3>';    
              }
              else if(achievementValue>100){
                  tmp += '                            <h3 style="color:green;">' + Math.round(parseFloat(targetnAchieved[i].achievement).toFixed(2)) + '</h3>';    
              }
              else{
                  tmp += '                            <h3>' + Math.round(parseFloat(targetnAchieved[i].achievement).toFixed(2)) + '</h3>';    
              }
              
              
              
              tmp += '                          </div>';
              tmp += '                            <div  class="target">';
              tmp += '                            <p style="color:#696969;font-weight:600;">Target</p>';
              tmp += '                            <h3 style="color:#696969;font-weight:600;">' + Math.round(parseFloat(targetnAchieved[i].target).toFixed(2)) + '</h3>';
              tmp += '                          </div>';
              tmp += '                        </div>';
              tmp += '                        <div class="total">';
              
              if(achievementValue>=85&&achievementValue<=100){
                  tmp += '                          <h2 style="color: #FFBF00;">' +achievementValue + '%</h2>';
              }
              else if(achievementValue>100){
                  tmp += '                          <h2 style="color:green;">' + achievementValue + '%</h2>';
              }
              else{
                  tmp += '                          <h2>' + achievementValue + '%</h2>';    
              }
              tmp += '                        </div>';
              tmp += '                      </div>';
              tmp += '                    </div>';
          }
    
    
          $('#targetNAchieved').prepend(tmp);
  
          slickSlider();
          
      }
    
      
  
    };
    
    
    
    
  
  
    showTodaysVisit = (todaysVisit,currentCheckIn) => {
      var tmp = '';
      $('#todays-visit').html('');
      for (var i = 0; i < todaysVisit.length; i++) {
          
          tmp += '<li data-accountId='+todaysVisit[i].Id+' onclick=handleAccountClicked(this)>';
          tmp += '    <div class="main-head">';
          let eventStatus = ' <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>';
          
        if(currentCheckIn&&currentCheckIn.account.Id===todaysVisit[i].Id){
            eventStatus = '<img class="" src="/media/icons/accountSegmentation/inprogress.jpg" alt="">';
        }
        else if(todaysVisit[i].Completed__c){
            eventStatus = '<img class="" src="/media/icons/accountSegmentation/completed.jpg" alt="">';
          }
          tmp += '   '+eventStatus+'      <span class="accountName">' + todaysVisit[i].Name + '</span>  <br/>';
            tmp += '      <div class="heading">';

          //console.log(todaysVisit[i]);
        //   eventStatus = '<span style="display:none;" class="label label-default">Not Started</span>';
        //   if(todaysVisit[i].Completed__c){
        //     eventStatus = '<span style="display:none;" class="label label-success">Completed</span>';
        //   }
        //   else if(currentCheckIn&&currentCheckIn.Id===todaysVisit[i].eventId){
        //     eventStatus = '<span style="display:none;" class="label label-primary">In-Progress</span>';
        //   }
            // tmp += '       <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>   <span class="accountName">' + todaysVisit[i].Name + '</span>  <br/>';
          if((todaysVisit[i].Channel__c&&todaysVisit[i].Account_Status__c)){
            tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+'<span> | </span>' : 'NA');
            tmp += '         ' + (todaysVisit[i].Account_Status__c ? todaysVisit[i].Account_Status__c : '') + '</p>';
          }
          else{
              if(todaysVisit[i].Channel__c){
                tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+'</p> ' : 'NA');
              }
              if(todaysVisit[i].Account_Status__c){
                tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+' </p>' : 'NA');
              }
          }
          if ((todaysVisit[i].L3M_Billed_Liquids__c && todaysVisit[i].L1M_Billed_Liquids__c)) {
              tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].L1M_Billed_Liquids__c ? todaysVisit[i].L1M_Billed_Liquids__c + '<span class=""> , </span>' : 'NA');
              tmp += '         ' + (todaysVisit[i].L3M_Billed_Liquids__c ? todaysVisit[i].L3M_Billed_Liquids__c : '') + '</p>';
          }
          else {
              if (todaysVisit[i].L3M_Billed_Liquids__c) {
                  tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].L3M_Billed_Liquids__c ? todaysVisit[i].L3M_Billed_Liquids__c + '</p>' : 'NA');
              }
              if (todaysVisit[i].L1M_Billed_Liquids__c) {
                  tmp += '       <p style="margin-left:3%;">  ' + (todaysVisit[i].L1M_Billed_Liquids__c ? todaysVisit[i].L1M_Billed_Liquids__c : '') + '</p>';
              }
          }
         if(todaysVisit[i].Recent_Retail_Depletion__c){
            tmp += '       <p style="margin-left:3%;">Last Order : ' + (todaysVisit[i].Recent_Retail_Depletion__c? new Date(todaysVisit[i].Recent_Retail_Depletion__c).toLocaleString("en-IN", {
                day: 'numeric',
                month: 'short'
            })+'</p>' : '');
         }
         if(todaysVisit[i].Beer_Selection__c === "Boom"){
            tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/boom-led.png" alt=""></span>';
        }

        if(todaysVisit[i].Beer_Selection__c === "Premium"){
            
            tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/premium-led.png" alt=""></span>';
        }
          tmp += '      </div>';
          
          tmp += '       <div class="feat">';
          tmp += '         <div>';
          
          if(todaysVisit[i].Bira_Segment__c != null)
          {   
              if(todaysVisit[i].Bira_Segment__c === "A+"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a+.png" alt=""></span>';
              }else if(todaysVisit[i].Bira_Segment__c === "A"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a.png" alt=""></span>';
              }else if(todaysVisit[i].Bira_Segment__c === "B"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/b.png" alt=""></span>';
              }else {
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/c.png" alt=""></span>';
              }
             
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if(todaysVisit[i].Industry_Segment__c != null)
          {
              if(todaysVisit[i].Industry_Segment__c === "P0"){
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p0.png" alt=""></span>';
              }else if(todaysVisit[i].Industry_Segment__c === "P1"){
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p1.png" alt=""></span>';
              }else if(todaysVisit[i].Industry_Segment__c === "P2"){
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p2.png" alt=""></span>';
              }else {
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p3.png" alt=""></span>';
              }
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if(todaysVisit[i].Industry_Segment_Mass__c != null)
          {
              if(todaysVisit[i].Industry_Segment_Mass__c === "M0"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m0.png" alt=""></span>';
              }else if(todaysVisit[i].Industry_Segment_Mass__c === "M1"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m1.png" alt=""></span>';
              }else if(todaysVisit[i].Industry_Segment_Mass__c === "M2"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m2.png" alt=""></span>';
              }else {
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m3.png" alt=""></span>';
              }
              
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          tmp += '         </div>';
        tmp += '       <div >';
    
          if (todaysVisit[i].Beacon_Flag__c === true) {
              
              tmp += '         <span><img src="../../media/images/homePage/Icons-02.png" alt=""></span>';
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if (todaysVisit[i].Draft_Ready__c === true) {
              tmp += '         <span><img src="../../media/images/homePage/Icons-04.png" alt=""></span>';
              
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if (todaysVisit[i].QCO_Flag__c === true) {
              tmp += '         <span><img src="../../media/images/homePage/Icons-05.png" alt=""></span>';
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          tmp += '      </div>';
        //   tmp += eventStatus;
          tmp += '         </div>';
          tmp += '       </div>';
       
            
          
          tmp += '    </div>';
          tmp += '</li>';
      }
      if (todaysVisit.length == 0) {
          tmp += '<li>';
          tmp += '<p class="text-center"> No Visits for Today</p>';
          tmp += '</li>';
      }
      $('#todays-visit').prepend(tmp);
    };
    
  
  
  handleAccountClicked = async (element) => {
      let accountRec = await getItemFromStore('account',(element.dataset.accountid));
      const recordTypeName = accountRec.RecordType.DeveloperName;
      if(recordTypeName==='Distributor_Warehouse'){
          window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName==='Distributor'){
          window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='On_Premise_General'){
          window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Consumer'){
          window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Institutional_Off_Premise'){
          window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Institutional_On_Premise'){
          window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Non_beer_Warehouse'){
          window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Off_Premise_Outlet'){
          window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='On_Premise_Hotel'){
          window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Supplier'){
          window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Temporary_Event'){
          window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Wholesaler'){
          window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id='+accountRec.Id;
      }
  };

  
  const renderTodaysTasks = async() => {
    let tasks = await fetchTodaysTasks();
    let tmp = '';
    
    $('#todaysVisits').empty();
    if(tasks.length>0){
        tasks.forEach(ele => {
            tmp +=`<div class="media">
            <div class="media-left" style="font-size:29px;">
            <i class="fas fa-tasks"></i>
            
            </div>
            <div class="media-body">
              <h4 class="media-heading"><div style="float:left;">${ele.Subject}</div>
              <div style="text-align:right;"> ${ele.Status==='Open' ? `<i onclick="handleCompleteTask('${ele.Unique_Identifier__c}')" class="fas fa-clipboard-check"></i>` : '<i style="color:green;" class="fas fa-check-square"></i>' }</div>
              </h4>
              <h4><small>Related To : ${accountDetailsMap.has(ele.WhatId)?accountDetailsMap.get(ele.WhatId).Name : '' } <br/> Description : ${ele.Description ?ele.Description : '' } <br/>
                Priority : ${ele.Priority ? ele.Priority : ''}
            </small></h4>
            </div>
          </div>`;
        });
    }
    else{
        tmp += `
        <div class="alert alert-info" style="text-align:center;">
          <strong>Info!</strong> No Task Found!
        </div>`;
    }
    $('#todaysVisits').append(tmp);
  };
  
  
  handleCompleteTask =async (ele) => {
    let resp = confirm('Are you sure you want to complete the task ?');
    if(resp){
        let taskRecord = await getItemFromStore('taskOriginal',ele);
        if(taskRecord){
            taskRecord.Status = 'Completed';
        await writeData('taskOriginal',taskRecord);
        await writeData('taskSync',taskRecord);
        renderTodaysTasks();
        }
        
    }

  };    

