
$(document).ready(function(){
    let height = window.innerHeight/1.5;
    $('.draftbtn').css('top',`${height}px`)
});


const initailizeMethod = () =>{
    creatSectionForPartiallyDone();
    creatSectionForNotDone();
};

const creatSectionForPartiallyDone = () =>{
    let tmp = '';
    $('#partialContent').html('');
    tmp += createSelectOption('Partial-Select','Installation Partially Done',null,['A','B']);
    $('#partialContent').append(tmp);
};


const creatSectionForNotDone = () =>{
    let tmp = '';
    $('#notDoneContent').html('');
    tmp += createSelectOption('NotDone-Select','Installation Not Done',null,['A','B']);
    $('#notDoneContent').append(tmp);
};



const createSelectOption = (id,label,value,options) =>{
    let tmp =`
       <div class="form-group">
       <label>${label}</label>
        <select class="form-control" id="${id}">
            <option value="">--None--</option>
    `;

    for(let i = 0;i<options.length;i++){
        tmp +=`
        <option value="${options[i]}" ${options[i] === value ? 'selected' : ''}>${options[i]}</option>
        `;
    }

    tmp += '</select></div>';

    return tmp;
};

initailizeMethod();