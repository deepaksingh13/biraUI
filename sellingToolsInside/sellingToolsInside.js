let fileList = [
    {
        "Id" : 12345,
        "Name" : "Deepak.pdf",
        "File" : "",
        "Size" : "12 KB",
        "createdDate" : "2020-06-05T11:46:56.000Z",
        "base64" : "SWYgSSBoYWQgYSBuaWNrbGUgZm9yIGV2ZXJ5IHRpbWUgSSBoYWQgYSBuaWNrbGUsIEknZCBoYXZlIGVhdGVuIHR3aWNlIGFzIG1hbnkgcGlja2xlcy4="
    },
    {
        "Id" : 777345,
        "Name" : "Ajitesh.doc",
        "File" : "",
        "Size" : "3.5 KB",
        "createdDate" : "2020-06-04T11:46:56.000Z",
        "base64" : "SWYgSSBoYWQgYSBuaWNrbGUgZm9yIGV2ZXJ5IHRpbWUgSSBoYWQgYSBuaWNrbGUsIEknZCBoYXZlIGVhdGVuIHR3aWNlIGFzIG1hbnkgcGlja2xlcy4="
    },
    {
        "Id" : 98345,
        "Name" : "Audio.mp4",
        "File" : "",
        "Size" : "3.5 KB",
        "createdDate" : "2020-06-04T11:46:56.000Z",
         "base64" : "http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3"
    }
];

let fileListMaster = [];
let setOfExt = new Set();
let listOfFiles = [];

const initializeMethod = () =>{
    fileListMaster = fileList;
    fileListMaster.filter((ele) => {
        setOfExt.add(ele.Name.split('.')[1].toLowerCase());
    });

    createSelectOption(setOfExt);

    fileList = fileList.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
    showFileList(fileList);
    
};

const createSelectOption = (options) =>{
    $('#selectExt').html('');
    let tmp = '';
    console.log(options);
        
    tmp = '<option value="">Select Extension</option>';
    tmp += '<option value="">--None--</option>';

    options.forEach(option => {
        tmp +=`
            <option value="${option}">${option}</option>
        `;
    });
    
    $('#selectExt').append(tmp);
};

const showFileList = (fileList) =>{
    let tmp = '';
    const options = {
        weekday: "long",
        year: "numeric",
        month:"long",
        day:"numeric"
   };
    if(fileList.length>0)
    {
        $('#listOfFiles').html('');
        for(let i=0;i<fileList.length;i++)
        {
            let img = '';
            let ext = fileList[i].Name.split('.')[1].toLowerCase();
            if(fileList[i].Name.split('.')[1].toLowerCase() == 'pdf')
            {
                img = '../../media/images/pdf.jpg';
            }else if(fileList[i].Name.split('.')[1].toLowerCase() == 'doc')
            {
                img = '../../media/images/doc.jpg';
            }
            let base64 = fileList[i].base64; 
            tmp +=`
            <div class="media" onclick="showDocument('${base64}','${ext}','${fileList[i].Id}')">
                <div class="media-left">
                    <img src="${img}" class="media-object" style="width:60px">
                </div>
                <div class="media-body">
                    <h4 class="media-heading">${fileList[i].Name}</h4>
                    <p class="text-muted"><span>${fileList[i].Size}</span><span>${new Date(fileList[i].createdDate).toLocaleDateString('en-US',options)}</span></p>
                </div>
            </div>
            `;
        }
        $('#listOfFiles').append(tmp);
    }

};

const showDocument = (base64,ext,Id) =>{

    if(ext == 'pdf')
    {
        window.location.href = `/view/sellingToolsInside/files.html?type=${ext}&id=${Id}`;   
    }else if(ext == 'mp3')
    {
        $('#audioModal').modal('show');
        $('#audio').attr('src','');
        $('#audio').attr('src','data:audio/ogg;'+base64);
    }else if(ext == 'mp4')
    {   
        window.location.href = `/view/sellingToolsInside/files.html?type=${ext}&id=${Id}`;   
    }
}


const handleChangeFilter = () =>{
    let searchInput = $('#searchBox').val() ? $('#searchBox').val() : null;
    let selectEle = $('#selectExt').val() ? $('#selectExt').val() : null;


    
    fileList = fileListMaster.filter((ele) => {
        let isValid = true;
        if (ele.Name && searchInput) {
          if (ele.Name.toLowerCase().indexOf(searchInput.toLowerCase()) < 0) {
            isValid = false;
          }
        }

        if (ele.Name.split('.')[1] && selectEle) {
            if (ele.Name.split('.')[1].toLowerCase().indexOf(selectEle.toLowerCase()) < 0) {
              isValid = false;
            }
        }
        return isValid;
    });

    showFileList(fileList);
};


let clickCount = 0;
const sortFiles = (ele) =>{
    let id = $(ele).attr('id');

    clickCount++;

    if(clickCount % 2 == 0)
    {
        if(id == 'sortingDate')
        {
            fileList = fileList.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-down"></i> Date');
        }
        else{
            fileList = fileList.sort((a, b) => (a.color > b.color) ? 1 : -1);
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-down"></i> Name');
        }
    }else{
        if(id == 'sortingDate')
        {
            fileList = fileList.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-up"></i> Date');
        }
        else{
            fileList = fileList.sort((a, b) => (a.color < b.color) ? 1 : -1);
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-up"></i> Name');
        }
    }
    showFileList(fileList); 
};

initializeMethod();