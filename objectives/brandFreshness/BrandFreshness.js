function SaveClick() {

    var e = document.getElementById("brand-name");
    var brand_name= e.options[e.selectedIndex].value;
    
    e = document.getElementById("variant");
    var variant = e.options[e.selectedIndex].value;

    var batch_no=document.getElementById('batch-no').value

    e = document.getElementById("plant-name");
    var plant_name = e.options[e.selectedIndex].value;

    e = document.getElementById("shelf-life");
    var shelf_life = e.options[e.selectedIndex].value;


     
}