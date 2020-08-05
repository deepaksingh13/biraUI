let listOfProduct = [
    {
        Id : 1,
        Name : '37 cl Glass 6 x 330 ml',
        Price : 200,
        Category : 'Category1'
    },
    {
        Id : 2,
        Name : '50 cl Glass 12 x 600 ml',
        Price : 500,
        Category : 'Category2'
    },
    {
        Id : 3,
        Name : 'Bucket',
        Price : 800,
        Category : 'Category3'
    },
    {
        Id : 4,
        Name : '500 cl Glass 12 x 600 ml',
        Price : 500,
        Category : 'Category2'
    },
    {
        Id : 5,
        Name : 'Bucket Glass',
        Price : 800,
        Category : 'Category3'
    }
];
let isReadOnly = true

let masterProduct = [];
let setOfSelectedProd = new Set();
let totalSelectedProd = new Set();
let mapOfProdNId = new Map();

let orderedProduct = [];

initializePOSM = () =>{
    let tmp = '<option value="">--None--</option>'
    masterProduct = listOfProduct;
    listOfProduct.forEach(ele => {
        mapOfProdNId.set(ele.Id, ele);
        tmp +=`
        <option value="${ele.Category}">${ele.Category}</option>
        `;
    });
    showModalProducts(listOfProduct);
    $('#kycModal').modal('show');
    $('#categories').append(tmp);

};


const showModalProducts = (listOfProduct) =>{
    let tmp = '';

    $('#productList').html('');
    if(listOfProduct.length > 0)
    {
        for(let i = 0;i<listOfProduct.length;i++)
        {
            tmp +=`
                <div class="row product" id="${listOfProduct[i].Id}" onclick="selectProduct(this)">
                    <div class="col-xs-3 no-padd"><img src="" alt="No Image"/></div>
                    <div class="col-xs-9">
                        <p>${listOfProduct[i].Name}</p>
                        <p>${listOfProduct[i].Price}</p>
                    </div>
                </div>
            `;
        }
    }else{
        tmp = `<div class="alert alert-info" role="alert">
                    No Products found
               </div>`;
    }

    $('#productList').append(tmp);
};

const showOrderProducts = () =>{
    let tmp = '';
    $('#listOfOrderedPOSM').html('');
    for(let i=0;i<orderedProduct.length;i++)
    {
        tmp +=`
        <div class="row" id="${i}">
            <div class="col-xs-2 no-padd"><img src="" alt="No Image"/></div>
            <div class="col-xs-4">
                <p>${orderedProduct[i].Name}</p>
                <p>${orderedProduct[i].Price}</p>
            </div>
            <div class="col-xs-6">
                <div class="button-container" style="margin-top:17%;">
                    <button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)" ${isReadOnly ? 'disabled' : ''}  data-index="${i}" value="-">-</button>
                    <input type="number" pattern="[0-9]*" id="cases" name="qty" class="qty" maxlength="3" data-index="${i}"  max="100" value="${orderedProduct[i].Quantity}" onkeyup="handleQuantityChange(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="input-text qty" data-quantity="'+productList[i].Cases+'"  />
                    <button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="${i}" ${isReadOnly ? 'disabled' : ''} type="button" value="+">+</button>
                </div>
            </div>
        </div>
        `;
    }

    $('#listOfOrderedPOSM').append(tmp);
    
}

const selectProduct = (ele) =>{
    let prodId = $(ele).attr('id');

    if(setOfSelectedProd.has(prodId))
    {
        setOfSelectedProd.delete(prodId);
        $(`#${prodId}`).css('background','');
    }
    else{
        setOfSelectedProd.add(prodId);
        $(`#${prodId}`).css('background','antiquewhite');
    }
};


handleSelectedProducts = () =>{
        
    setOfSelectedProd.forEach(id => {
        if(!totalSelectedProd.has(id))
        {
            let item = mapOfProdNId.get(parseInt(id));
            let product = {
                Name : item.Name,
                Price : item.Price,
                Quantity : 0 
            }

            orderedProduct.push(product);

            totalSelectedProd.add(id);
        }
    });
    setOfSelectedProd.clear();

    showOrderProducts();
};


handleKYCSubmission = () =>{
    let gst = $('#gstNumber').val();
    let outletAddress = $('#outletAddress').val();

    if(!gst){
        alert('GST & Outlet Address Mandatory');
        return false;
    }else if(!outletAddress){
        alert('GST & Outlet Address Mandatory');
        return false;
    }

   $('#kycModal').modal('hide');
}

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
     let index = $n.attr('data-index');
      
      orderedProduct[index][
        "Quantity" 
      ] = value;
      $n.val(value);
      
      showSummary();
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
    let index = $n.attr('data-index');
  
    orderedProduct[index]["Quantity"] = value;
    $n.val(value);
    showSummary();
  };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val().replace(/[^0-9]*/g,'');
    var inputName = $(ele).attr("id");
     let index = $(ele).attr('data-index');
    if(val<0){
      $(ele).val(0);
  
      orderedProduct[index]["Quantity"] = 0;
      return;
    }
    if(val >999){
      $(ele).val(999);
      orderedProduct[index]["Quantity"] = 999;
  
      return;
    }
    orderedProduct[index]["Quantity"] = val;

    showSummary();
  };
  

  const handleProductFilter = () => {
    let productName = $("#searchValue").val();
    let category = $('#categories').val();
    
    listOfProduct = masterProduct.filter((ele) => {
      let isValid = true;
      if (ele.Name && productName) {
        if (ele.Name.toLowerCase().indexOf(productName.toLowerCase()) < 0) {
          isValid = false;
        }
      }
      
      if (ele.Category && category) {
        
          for(let i=0;i<category.length;i++)
           {
            if (ele.Category.indexOf(category[i]) < 0) {
                isValid = false;
                break;
               console.log('in',ele.Category,category[i]);
            }
            console.log('out',ele.Category,category[i]);

          }
        
      }
      
      return isValid;
    });
    
    showModalProducts(listOfProduct);
  };

  showSummary = () => {
    $("#orderSummaryPage").empty();
    const productLength = orderedProduct.length;
    let tmp =
      '<h4 style="color:black">Cart <span class="price" style="color:black" ><i class="fa fa-shopping-cart"></i> <b >' +
      0 +
      "</b></span></h4>";
    let producttableConstruct = '';
    if (productLength === 0) {
      producttableConstruct += '<div class="text-center">No Products added!</div>';
    } else {
  
      let totalAmount = 0;
      let noOfProducts = 0;
      let totalNoOfQty = 0 ;
      orderedProduct.forEach(ele => {
        if (ele.Quantity && ele.Quantity > 0) {
          let amountValue = 0;
          let numQty = 0;
          if (ele.Quantity) {
            numQty = parseFloat(ele.Quantity);
          } else {
            numQty = 0;
          }
          totalNoOfQty += numQty;
          if (ele.Price) {
            const numAmount = parseFloat(ele.Price);
            amountValue = numAmount * numQty;
          }
          totalAmount += amountValue;
          producttableConstruct += `<p ><a style="width:80%;display:inline-block;">${ele.Name}</a><span class="text-right" style="width:20%;display:inline-block;color: grey;vertical-align:top;"> ${numQty}</span></p>`;
          noOfProducts++;
        }
      });
      if(noOfProducts===0){
        producttableConstruct += '<div class="text-center">No Products added!</div>';
      }
      else{
        tmp ='<h4 style="color:black">Cart <span class="price" style="color:black;float: right" ><i class="fa fa-shopping-cart"></i> <b >' +
        noOfProducts +
        "</b></span></h4>" ;
        
      }
      tmp += producttableConstruct;
      tmp += "<hr>";
      tmp += `<p><span style="width:80%;display:inline-block;">Total </span><span class="text-right" style="width:20%;color: grey;vertical-align:top;display:inline-block;"><b> ${totalNoOfQty}</b></span></p>`;
    }
  
    $("#orderSummaryPage").append(tmp);
  };


  $("#gstNumber").keyup(function () {    

    var inputvalues = $(this).val();   
    
    if(inputvalues){
      if(!gstValidator(inputvalues)){      
      $('.gstReq').css('display','block');  
        return ;    
        }    
    }     
    
      $('.gstReq').css('display','none');  
  }); 

const gstValidator = (g) => {
    let regTest = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(g);

    return regTest
};


initializePOSM();