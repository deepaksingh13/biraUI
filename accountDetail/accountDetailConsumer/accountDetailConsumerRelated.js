



 retailDepletion = (retailDepletionList) =>{
    $('#retailPanel').html('');
    if(retailDepletionList.length > 10){
        $('#countRetail').append(`(10+)`);
    }else{
        $('#countRetail').append(`(${retailDepletionList.length}+)`);
    }
    if(retailDepletionList){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Order Date</th><th>Item</th><th>Quantity</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < retailDepletionList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        row1+='<td>'+new Date(retailDepletionList[i].Date__c).toLocaleDateString('en-US',options)+'</td>';
        row1+='<td>'+(retailDepletionList[i].Item__c ?retailDepletionList[i].Item__c : '') +'</td>';
        row1+='<td>'+retailDepletionList[i].Physical_Cases__c+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#retailPanel').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Retail Depletion Found!';
        temp += '</div>';
        $('#retailPanel').prepend(temp);
    }
       
    
};



showContacts = (contactList) =>{
    if(contactList.length > 10){
        $('#countContact').append(`(10+)`);
    }else{
        $('#countContact').append(`(${contactList.length}+)`);
    }
    if(contactList){
        var table = $('<table class="table table-striped"></table>').addClass('foo');
        var trHead = $('<tr></tr>');
        
        var tdHead = $('<th>Name</th><th>Role</th><th>Mobile</th>');
        table.append(trHead);
        trHead.append(tdHead);
    
    for(var i = 0; i < contactList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        row1+=`<td><a href="/view/contactDetail/contactDetail.html?accountId=${accountRec.Id}&&contactId=${contactList[i].Id}" >${contactList[i].Name}</a></td>`;
        row1+='<td>'+(contactList[i].Role__c ?contactList[i].Role__c : '' )+'</td>';
        row1+='<td>'+(contactList[i].Phone ? contactList[i].Phone :'' )+'</td>';
        table.append(row);
        row.append(row1);
    }    
    $('#contactPanel').append(table);
    }
    else{
        let temp = '<div style="text-align:center">';
        temp += 'No Contacts Found!';
        temp += '</div>';
        $('#contactPanel').prepend(temp);
    }
};

showProducts = (salesOrder) =>{
    //productsList = JSON.parse(productsList);
    let productsList = [];
    if(productMap.has(salesOrder)){
        productsList = productMap.get(salesOrder);
    }
    $('#salesOrderProduct').html('');
    if(productsList){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Item Name</th><th>Cases</th><th>Amount</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < productsList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        row1+='<td>'+(productsList[i].Item_Name__c ? productsList[i].Item_Name__r.Name : '') +'</td>';
        row1+='<td>'+productsList[i].Cases__c+'</td>';
        row1+='<td>'+productsList[i].Amount__c+'</td>';
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

    if(salesOrderList.length > 10){
        $('#countOrder').append(`(10+)`);
    }else{
        $('#countOrder').append(`(${salesOrderList.length}+)`);
    }
    if(salesOrderList&&salesOrderList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th>Date</th><th>Amount</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < salesOrderList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td style="color:blue;" data-toggle="modal" data-target="#salesOrderModal" onclick=showProducts("'+salesOrderList[i].Id+'")>'+salesOrderList[i].Name+'</td>';
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        row1+='<td>'+new Date(salesOrderList[i].CreatedDate).toLocaleDateString('en-US',options)+'</td>';
        row1+='<td>'+salesOrderList[i].Total_Amount__c+'</td>';
        table.append(row);
        row.append(row1);
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


   
    
   
    
    
    
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};


handlePageRedirect = (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id;
    }
    else{

    }
};
let salesOrderList = []
hideLoader();
salesOrder(salesOrderList);
