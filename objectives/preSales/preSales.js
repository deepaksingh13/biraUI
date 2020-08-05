
let btnId;

let selectedProductInterested = new Set();
let selectedProductSampling = new Set();
let items ;
let itemImages;
let backendItems;


checkBoxChangeHandler = () =>{
  if('interestCheck' === event.target.id){
    preSalesSampling.InterestedF = event.target.checked;
  }else{
    preSalesSampling.Sampling_DoneF = event.target.checked;
  }
  if(preSalesSampling.InterestedF){
    $('#interested-btn').css('display','block');
  }
  else{
    $('#interested-btn').css('display','none');
  }
  if(preSalesSampling.Sampling_DoneF){
    $('#sampling-btn').css('display','block');
  }
  else{
    $('#sampling-btn').css('display','none');
  }
};
let itemMap = new Map();
initializeProductsFrontEnd = (products,images) => {
  items = products;
  itemImages = images;
  backendItems = products;
  backendItems.forEach(ele => {
    itemMap.set(ele.Product__c,ele);
  });
};

showProductModal = () =>{
  let tmp = '';
 $('#productList').html('');
 $('.table').css('display','block');
 if(items.length>0){
  for(var i = 0; i < items.length; i++){
    if(selectedProductInterested.has(items[i].Id)){
      tmp += '<div class="product col-xs-12" style="padding:3%;background: antiquewhite;"  data-priceMasterId='+(items[i].Id)+' data-itemId='+(items[i].Product__c)+' data-name="'+(items[i].Product__c ? (items[i].Product__r.Display_Name__c) : '')+'" data-mrp='+(items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0)+'>';
    }
    else{
      tmp += '<div class="product col-xs-12" onclick="handleProductClicked(this)" style="padding:3%;"  data-priceMasterId='+(items[i].Id)+' data-itemId='+(items[i].Product__c)+' data-name="'+(items[i].Product__c ? (items[i].Product__r.Display_Name__c) : '')+'" data-mrp='+(items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0)+'>';
    }
    tmp += '<div class="media">';
    if(itemImages&&itemImages.has(items[i].Product__c)){
      tmp += '<div class="media-left"><a ><img class="media" style="width:4rem;height:9rem" src="data:image/png;base64, '+itemImages.get(items[i].Product__c)+'" alt="ProductImg"></a>' ;
    }
    else{
      tmp += '<div class="media-left"><a ><img class="media" style="width:4rem;height:9rem"  alt="ProductImg"></a>' ;
    }
    
    tmp += '</div>';
    tmp += '<div class="media-body">';
    tmp += '<h4 class="media-heading">'+(items[i].Product__c ? (items[i].Product__r.Display_Name__c) : '')+'</h4>';
    tmp +='<p>INR '+(items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0)+'</p>';
    tmp += '<p> '+(items[i].Product__c ? (items[i].Product__r.Size_ID__r ? (items[i].Product__r.Size_ID__r.UOM_of_Primary_Conversion__c) : '' ) : '' )+'</p>';
    tmp += '</div>';
    tmp += '</div>';
    tmp += '</div>';
   }
   $('#productList').append(tmp);
 }
 else{
  tmp = '<div class="text-center">No product found!</div>';
    $('#productList').html(tmp);
 }
   
  // $(".product").click(function(){
  //   if(selectedProduct.has($(this).attr('data-id'))){
  //     selectedProduct.delete($(this).attr('data-id'));
  //   }
  //   else{
  //     selectedProduct.add($(this).attr('data-id'));
  //   }

  //   if(btnId ==='interested-btn'){
  //     showInterestedProduct();
  //   }else{
  //     showSamplingProduct();
  //   }
    
  // });
};
handleProductClicked = (element) => {
  const itemId = $(element).attr('data-itemId');
  const priceMaster = $(element).attr('data-priceMasterId');
  // sampling-btn , interested-btn
  if(btnId==='sampling-btn'){
    if(selectedProductSampling.has(itemId)){
      selectedProductSampling.delete(itemId);
      $(element).css('background','transparent');
    }
    else{
      selectedProductSampling.add(itemId);
      $(element).css('background','antiquewhite');
    }
    
}
  else{
    if(selectedProductInterested.has(itemId)){
      selectedProductInterested.delete(itemId);
      $(element).css('background','transparent');
    }
    else{
      selectedProductInterested.add(itemId);
      $(element).css('background','antiquewhite');
    }
  }
  
};

showInterestedProduct = () =>{
  $('#interestedProduct').html('');
  let tmp = '';
  for(let i = 0; i<interested.length ; i++){
    
      tmp +='  <div class="productDetail">';
      tmp += interested[i].displayName;
      tmp +='  </div>';
      tmp +='  <div class="productDetail"> Interested';
      tmp +='  </div>';
      tmp +='  <div class="productDetail">';
      tmp += createRodioInput('Low','Low',"interetedCheckboxHandler(this)",i+','+interested[i].SKU,(interested[i].Level_of_Interest ==='Low' ? true : false));
      tmp +='  </div>';
      tmp +='  <div class="productDetail">';
      tmp += createRodioInput('Medium','Medium',"interetedCheckboxHandler(this)",i+','+interested[i].SKU,(interested[i].Level_of_Interest ==='Medium' ? true : false));
      tmp +='  </div>';
      tmp +='  <div class="productDetail">';
      tmp += createRodioInput('High','High',"interetedCheckboxHandler(this)",i+','+interested[i].SKU,(interested[i].Level_of_Interest ==='High' ? true : false));
      tmp +='  </div>';
   
  }

  $('#interestedProduct').append(tmp);
};

interetedCheckboxHandler = (element) => {
  console.log(element);
  const key = $(element).attr('id');
  const name = $(element).attr('name');
  const index = name.split(',')[0];
  interested[index]['Level_of_Interest'] = key;
  
};


showSamplingProduct = () =>{
  $('#samplingProduct').html('');
  let tmp = '';
  for(let i = 0; i<samplingDone.length ; i++){
      tmp +='  <div class="row">';
      tmp +='  <div class="col-xs-6">';
      tmp += samplingDone[i].displayName;
      tmp +='  </div>';
      tmp +='  <div class="col-xs-4 text-left" style="padding:0"> Sample Liked';
      tmp +='  </div>';
      tmp +='  <div class="col-xs-2">';
      //('If_Sample_Liked','',null,samplingDone[i].SKU+',Sampling',samplingDone[i].If_Sample_Liked);
      tmp += createCheckBox(samplingDone[i].SKU+','+i,'',"samplingCheckboxHandler(this)",samplingDone[i].If_Sample_Liked);
      tmp +='  </div>';
      tmp +='  </div>';
  }
  $('#samplingProduct').append(tmp);
};

addProduct =(a) =>{
  btnId = $(a).parent().attr("id");
  filterProduct('');
};

filterProduct = (searchValue) => {
  if(btnId==='sampling-btn'){
    items = backendItems.filter(ele => {
      let isValid = true;
      const productName = (ele.Product__c ? (ele.Product__r.Display_Name__c) : '');
      if(searchValue&&productName.indexOf(searchValue) > -1){
        isValid = false;
      }
      if(selectedProductSampling.has(ele.Product__c)){
        isValid = false;
      }
      return isValid;
    });
  }
  else{
    items = backendItems.filter(ele => {
      let isValid = true;
      const productName = (ele.Product__c ? (ele.Product__r.Display_Name__c) : '');
      if(searchValue&&productName.indexOf(searchValue) > -1){
        isValid = false;
      }
      if(selectedProductInterested.has(ele.Product__c)){
        isValid = false;
      }
      return isValid;
    });
  }
  showProductModal();
};

handleSelectedProducts = () =>{
  if(btnId==='sampling-btn'){
    console.log(selectedProductSampling);
    for(let i of selectedProductSampling.values()){

      const product = itemMap.get((i));
      samplingDone.push({
        displayName : (product.Product__c ? (product.Product__r.Display_Name__c) : ''),
        If_Sample_Liked : false,
        SKU : product.Product__c
      });
    }
    showSamplingProduct();
  }
  else{
    for(let i of selectedProductInterested.values()){
      const product = itemMap.get((i));
      interested.push({
        displayName : (product.Product__c ? (product.Product__r.Display_Name__c) : ''),
        Level_of_Interest  :'Low',
        SKU : product.Product__c
        
      });
    }
    showInterestedProduct();
  }
  samplingCheckboxHandler = (element) => {
    console.log(element);
    const index = $(element).attr('id').split(',')[1];
    const value  = $(element).prop('checked');
    samplingDone[index]['If_Sample_Liked'] = value;
  };
};

handleFeedbackChange = (element) =>{
  const value = $(element).prop('value');
  preSalesSampling.Feedback = value;
};

