let showOrder = [
    {
        Id : 1,
        Name : 'Order1',
        Status : 'Active',
        Requisition_Date : new Date(),
        Product_List : [
            {
                Name : 'Product 1',
                Quality : 10,
                Status : 'Active'
            },
            {
                Name : 'Product 2',
                Quality : 10,
                Status : 'Active'
            },
            {
                Name : 'Product 3',
                Quality : 10,
                Status : 'Active'
            },
        ],
    },
    {
        Id : 2,
        Name : 'Order3',
        Status : 'Active',
        Requisition_Date : new Date(),
        Product_List : [
            {
                Name : 'Product 13',
                Quality : 10,
                Status : 'Active'
            },
            {
                Name : 'Product 33',
                Quality : 10,
                Status : 'Active'
            }
        ],
    },
    {
        Id : 3,
        Name : 'Order2',
        Status : 'InActive',
        Requisition_Date : new Date(),
        Product_List : [
            {
                Name : 'Product 21',
                Quality : 10,
                Status : 'Active'
            }
        ],
    }
];

let productMap = new Map();
initailizeRelated = () => {
    showOrder.forEach((ele) =>{
        productMap.set(ele.Id,ele.Product_List);
    });
    salesOrder(showOrder);
}

showProducts = (salesOrderId) =>{
    let productsList = [];
    
    if(productMap.has(parseInt(salesOrderId))){
        productsList = productMap.get(parseInt(salesOrderId));
    }
    
    $('#salesOrderProduct').html('');
    if(productsList){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th> Name</th><th>Quantity</th><th>Status</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < productsList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        row1+='<td>'+(productsList[i].Name ? productsList[i].Name : '') +'</td>';
        row1+='<td>'+productsList[i].Quality+'</td>';
        row1+='<td>'+productsList[i].Status+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#salesOrderProduct').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Products Found!';
        temp += '</div>';
        $('#salesOrderProduct').prepend(temp);
    }
       
    
};

salesOrder = (salesOrderList) =>{
    $('#salesOrder').html('');
    if(salesOrderList&&salesOrderList.length>0){
        
    var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th>Status</th><th>Requisition Date</th>');
    trHead.append(tdHead);
    table.append(trHead);
    
    for(var i = 0; i < salesOrderList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td style="color:blue;" data-toggle="modal" data-target="#salesOrderModal" onclick=showProducts("'+salesOrderList[i].Id+'")>'+salesOrderList[i].Name+'</td>';
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        row1+='<td>'+salesOrderList[i].Status+'</td>';
        row1+='<td>'+new Date(salesOrderList[i].Requisition_Date).toLocaleDateString('en-US',options)+'</td>';
        
        row.append(row1);
        table.append(row);
    }
    $('#salesOrder').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Sales Order Found!';
        temp += '</div>';
        $('#salesOrder').prepend(temp);
    }  
};


   
      
initailizeRelated();
    
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};

hideLoader();

handlePageRedirect = (page) => {
    // if(page ==='Detail'){
    //     window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id='+accountRec.Id;
    // }
    // else if(page ==='Related'){
    //     window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id='+accountRec.Id;
    // }
    // else if(page ==='Home'){
    //     window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id;
    // }
    // else{

    // }
};