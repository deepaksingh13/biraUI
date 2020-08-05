let products = [
    {
        item : 'White',
        Appearance_Freshness : null,
        Aroma : null,
        Particles : null,
        Temperature : null,
        Taste : null,
        Installation_Date : '2020-07-02T06:42:07.107Z',
        Manufacturing_Date : '2020-07-02T06:42:07.107Z',
        Expiry_Date : '2020-07-02T06:42:07.107Z',
        Batch_Number : 2,
        Kegs_in_stock : 5,
        Empty_Kegs : 7
    },
    {
        item : 'Blonde',
        Appearance_Freshness : 2,
        Aroma : 1,
        Particles : 1,
        Temperature : 3,
        Taste : 2,
        Installation_Date : '2020-07-02T06:42:07.107Z',
        Manufacturing_Date : '2020-07-02T06:42:07.107Z',
        Expiry_Date : '2020-07-02T06:42:07.107Z',
        Batch_Number : 2,
        Kegs_in_stock : 5,
        Empty_Kegs : 7
    }
];

let fieldMap = new Map([
    ['Appearance_Freshness','Appearance Freshness'],
    ['Aroma','Aroma'],
    ['Particles','Particles'],
    ['Temperature','Temperature'],
    ['Taste','Taste'],
    ['Installation_Date','Installation Date'],
    ['Manufacturing_Date','Manufacturing Date'],
    ['Expiry_Date','Expiry Date'],
    ['Batch_Number','Batch Number'],
    ['Kegs_in_stock','Kegs in stock'],
    ['Empty_Kegs','Empty Kegs']
]);

initailizeDraftSanitization = () =>{
    createProductDetails();
};

const createProductDetails = () =>{
    let tmp ='';
    $('#productDetails').html('');

    for(let i = 0;i< products.length;i++){
        tmp += `
            <div class="row">
                <div class="col-xs-12"><h5>${products[i].item}</h5></div>`;

        for(let j in products[i]){
            
            if(j === 'Appearance_Freshness' || j === 'Aroma'
            || j === 'Particles' || j === 'Temperature' || j === 'Taste'){
                tmp +=`<div class="row">
                    <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                    <div class="col-xs-6">${createRating(`${i}-${j}`,products[i][j])}</div>
                </div>`;
            }else if(j === 'Installation_Date' || j === 'Manufacturing_Date'){
                tmp +=`<div class="row">
                    <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                    <div class="col-xs-6">${createDateField(`${i}-${j}`,products[i][j])}</div>
                </div>`;
            }else if(j === 'Expiry_Date' || j === 'Batch_Number'){
                tmp +=`<div class="row">
                    <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                    <div class="col-xs-6">${createInputField(`${i}-${j}`,products[i][j])}</div>
                </div>`;
            }else if(j === 'Kegs_in_stock' || j === 'Empty_Kegs'){
                tmp +=`<div class="row">
                    <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                    <div class="col-xs-6">${createQuantityInput(`${i}-${j}`,products[i][j])}</div>
                </div>`;
            }
            tmp +='</div>';
        }   
    }


    $('#productDetails').append(tmp);
}


const createInputField = (id,value) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input class="form-control" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};



const createDateField = (id,value) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input type="date" class="form-control" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};

const createQuantityInput = (id,value) =>{
    let tmp = `
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="${id}" name="qty" class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};


const createRating = (id,rate) =>{
    let rateStar = rate ? parseInt(rate) : 0;
    let tmp = `
        
        <div class="rating" id=${id}>
            <input type="radio" id="field1_star-3" name="rating" value="3" />
            <label class = "full ${rateStar === 3 ? 'rate' : ''}" data-id="star-3" for="field1_star-3" onclick="handleRating(this)"></label>

            <input type="radio" id="field1_star-2" name="rating" value="2" />
            <label class = "full ${rateStar === 3 || rateStar === 2 ? 'rate' : ''}" data-id="star-2" for="field1_star-2" onclick="handleRating(this)"></label>

            <input type="radio" id="field1_star-1" name="rating" value="1" />
            <label class = "full ${rateStar === 1 || rateStar === 2 || rateStar === 3 ? 'rate' : ''}" data-id="star-1" for="field1_star-1" onclick="handleRating(this)"></label>
        </div>
    `;

    return tmp;
};



const handleRating = (ele) =>{
   
    let index = $(ele).attr('for').split('-')[1];
    $(ele).parent().find('label').removeClass('rate');

    for(let i = 1;i<=parseInt(index); i++){
        $(ele).parent().find(`[data-id = star-${i}]`).addClass('rate')
    }
    console.log($(ele).parent().attr('id'));
    let prodIndex = $(ele).parent().attr('id').split('-')[0];
    let prodField = $(ele).parent().attr('id').split('-')[1];

    let parentDiv = $(ele).parent().attr('id');
    let rating  = $(`#${parentDiv} .rate`).length
    products[prodIndex][prodField] = rating;

    console.log(products);
};


incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $(ele).attr("id");
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      $n.val(value);
     };
  
  
  decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $(ele).attr("id");
    var qty = Number($n.val());
    if (qty > 0) {
      value = qty -1;
    }
    $n.val(value);
   };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
   
    if(val<0){
      $(ele).val(0);
      return;
    }
    if(val >999){
      $(ele).val(999);
    
      return;
    }
  };

  const submitDraftSanitization = () =>{
      console.log(products);
  }
  
  initailizeDraftSanitization();