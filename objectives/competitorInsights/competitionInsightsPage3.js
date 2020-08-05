let promotionArray = [

];
const competitorArr =

  checkBoxChangeHandler = (a) => {
    let competitorName = $(a).attr('class');
    let index = competitorBuckets.indexOf(competitorName);
    if (index !== -1) {
      promotionArray[index][$(a).attr('Id')] = $(a).prop('checked');
      
      const idValue = $(a).attr('Id');
      const value = $(a).prop('checked');
      
      const competitorValue = competitorBuckets[index].split(' ').length>1 ?competitorBuckets[index].split(' ')[1] :  competitorBuckets[index];
      
      if(value){
        $(`.${competitorValue}-${idValue}`).css('display','block');
      }
      else{
        $(`.${competitorValue}-${idValue}`).css('display','none');
      }
      
    }
    // console.log(index);
    // promotionArray[index][$(a).attr("class")] = event.target.checked;
    // console.log(a);
  };

initializePromotionFrontEnd = (promotionArray) => {
  for (let i = 0; i < promotionArray.length; i++) {

    for (let j in promotionArray[i]) {

      if (typeof promotionArray[i][j] === "boolean") {
        //console.log(j);
        $('.' + promotionArray[i].Competitor_Name).each(function () {
          const key = $(this).attr("id");
          
          if (key === j) {
            $(this).prop('checked', promotionArray[i][j]);
          }
        });
        if(promotionArray[i][j]){
          $(`.${promotionArray[i].Competitor_Name}-${j}`).css('display','block');
        }
       
        
        //console.log($('.'+promotionArray[i].Competitor_Name).find('#'+j));
        //$('.'+promotionArray[i].Competitor_Name).find('#'+j).attr("checked",promotionArray[i][j]);
      }
      
      if(j.includes("File")){
        console.log(j);
        $(`.${i}-${j}`).css('color','#5cb85c');
      }

    }
  }

};


const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});


const fileInput = async (event) => {

  const key = $(event).attr('id').split('-')[1];
  const index = $(event).attr('id').split('-')[0];
  const fileInput = $(event).prop('files')[0];
  
  var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    
  const compressedFile = await imageCompression(fileInput, options);
  uploadBase64Value(index,key,compressedFile);    
};

const uploadBase64Value = async (index,key,fileInput) => {
  promotionArray[index][key] = await toBase64(fileInput);
  
  fileAttachedBackgroundChange(index,key);
};

const fileAttachedBackgroundChange = (index,key) => {
  let iconKey = key;
  let icon = $('.'+index+'-'+iconKey );
  icon.css('color','#5cb85c');
};

showPromotions = (promotionsFor) => {
  
  if (promotionsFor === 'Not_Applicable') {
    $('.On-Premise').css('display', 'none');
    $('.Off-Premise').css('display', 'none');
    $('#InsightPanel').html('');
    let tmp = '<div class="text-center alert alert-warning"> Competitor Visibility is not applicable for this account. Click Save & Next to proceed with Competitor Promotions ';
    $('#InsightPanel').html(tmp);
  }
  else if (promotionsFor === 'QCO' || promotionsFor === 'On-Premise') {
    $('.On-Premise').css('display', 'block');
    $('.Off-Premise').css('display', 'none');
  }
  else if (promotionsFor === 'Off-Premise') {
    $('.On-Premise').css('display', 'none');
    $('.Off-Premise').css('display', 'block');
  }

};


handlePageRedirect = async (value) => {
  if (accountRec.QCO_Flag__c) {
    competitorInsight.Promotions_QCO = promotionArray;
  }
  else if (accountRec.Channel__c === 'On-Premise') {
    competitorInsight.Promotions_On_Premise = promotionArray;
  }
  else if (accountRec.Channel__c === 'Off-Premise') {
    competitorInsight.Promotions_Off_Premise = promotionArray;
  }
  
  await writeData('competitorInsight', competitorInsight);
  const recordTypeName = accountRec.RecordType.DeveloperName;

  if (recordTypeName === 'Distributor_Warehouse') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Distributor') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'On_Premise_General') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Consumer') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id=' + accountRec.Id;
    }
  }
  else if (recordTypeName === 'Institutional_Off_Premise') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Institutional_On_Premise') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Non_beer_Warehouse') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Off_Premise_Outlet') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'On_Premise_Hotel') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Supplier') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Temporary_Event') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id=' + accountRec.Id;
    }
  }
  else if (recordTypeName === 'Wholesaler') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id=' + accountRec.Id;
    }

  }

  
};


slickSlider = () => {
  $('.competitorDashboard').slick({
      centerMode: true,
      slidesToShow: 2,
      autoplay: false,
      dots: true,
      infinite: false,
      arrows: false,
      adaptiveHeight: true,
      autoplaySpeed: 2000,
      responsive: [
          {
              breakpoint: 769,
              settings: {
                  arrows: false,
                  centerMode: false,
                  slidesToShow: 1 
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


let dashboardPromotion = [
  {
    Competitor_Name: "UB",
    Food_Combo: false,
    Special_Price : true,
    Exclusive_Events : true,
    Gift_with_Purchase : true,
    Cocktail_Led_Promotion : false
  },
  {
    Competitor_Name: "Carlsberg",
    Food_Combo: true,
    Special_Price : false,
    Exclusive_Events : true,
    Gift_with_Purchase : false,
    Cocktail_Led_Promotion : false
  },
  {
    Competitor_Name: "ABI",
    Food_Combo: false,
    Special_Price : true,
    Exclusive_Events : false,
    Gift_with_Purchase : false,
    Cocktail_Led_Promotion : true
  },
  {
    Competitor_Name: "Craft",
    show_panel : true,
  },
  {
    Competitor_Name: "Craft1",
    Food_Combo: true,
    Special_Price : true,
    Exclusive_Events : false,
    Gift_with_Purchase : false,
    Cocktail_Led_Promotion : true
  },
  {
    Competitor_Name: "Craft2",
    Food_Combo: false,
    Special_Price : true,
    Exclusive_Events : false,
    Gift_with_Purchase : false,
    Cocktail_Led_Promotion : false
  },
  {
    Competitor_Name: "ABI",
    Food_Combo: true,
    Special_Price : false,
    Exclusive_Events : false,
    Gift_with_Purchase : false,
    Cocktail_Led_Promotion : true
  },
]; 


let mapOfElementLabels = new Map([
  ['Food_Combo', 'Food Combo'],
  ['Special_Price','Special Price'],
  ['Exclusive_Events','Exclusive Events'],
  ['Gift_with_Purchase','Gift with Purchase'],
  ['Cocktail_Led_Promotion','Cocktail Promotion']
]);

let setOfCraftVal = new Set();

const createPromotionDashboard = () =>{
  let tmp = '';
  $('#promotionDashboard').html('');

  let tableHead = `
  <div class="item">
  <h4 class="text-center">Top Promotions Dashboard</h4>
  <table class="contractedVolume visibility" border="1">
  <tr>
    <th></th>
    <th></th>
  </tr>
  `;
tmp = tableHead;

  for(let i=0;i<dashboardPromotion.length;i++)
  {
    if( i < 3){
      tmp +='<tr>';
      tmp +='<td class="contVolume">'+dashboardPromotion[i].Competitor_Name+'</td>';
      tmp +='<td class="values">';
      for(let j in dashboardPromotion[i])
      {
        if(dashboardPromotion[i][j] && mapOfElementLabels.has(j))
        {
          tmp+= mapOfElementLabels.get(j)+'<span> / </span>';
        }
      }
      tmp +='</td>';
      tmp +='</tr>';
    }
  }

  tmp += showCraftData();

  tmp +='</table>';
  tmp +='</div>';

  $('#promotionDashboard').append(tmp);
  
slickSlider();
};

const showCraftData = () =>{
  let tmp = '';
  
  for(let i=4;i<dashboardPromotion.length;i++)
  {
    for(let j in dashboardPromotion[i])
      {
        if(dashboardPromotion[i][j] && mapOfElementLabels.has(j))
        {
          setOfCraftVal.add(j);
        }
      }
  }

  if(setOfCraftVal.size>0)
  {
    tmp +='<tr>';
    tmp +='<td class="contVolume">Craft</td>';
    tmp +='<td class="values">';
    setOfCraftVal.forEach(craft => {
      tmp += mapOfElementLabels.get(craft)+'<span> / </span>';
    });
    tmp +='</td>';
    tmp +='</tr>';
  }  
  
  return tmp;
}

createPromotionDashboard();