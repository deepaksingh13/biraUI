let events = [
    {
        Account__r : {Id : 13344,Name : "Deepak",},
        Name : "Singh",
        Start_date_and_time__c : "2020-06-04T11:46:56.000Z" 
    },
    {
        Account__r : {Id : 13344,Name : "Durvesh",},
        Name : "Test",
        Start_date_and_time__c : "2020-06-05T11:46:56.000Z" 
    },

];

let tasks = [
    {
        Account__r : {Id : 13344,Name : "Ajitesh",},
        Name : "Singh",
        Start_date_and_time__c : "2020-06-04T11:46:56.000Z" 
    }
];
let calendar;
let reqDate;
let masterEvents;
let masterTasks;

const initializeCalenderData = (events) => {
    let calendarPanel = document.querySelector('#calendar');
    masterEvents = events;
    masterTasks= tasks;
    calendarPanel.innerHTML = '';
    let calenderData = [];
    events.forEach(ele => {
      //  console.log(ele.Start_date_and_time__c);
        const timeValue = new Date(ele.Start_date_and_time__c).toLocaleTimeString('en-IN',[], {timeStyle: 'short'});
        let tempObj = {
            accountId : ele.Account__r.Id,
            accountName : ele.Account__r.Name,
            eventName : ele.Name,
            calendar : 'Work',
            color : 'yellow',
            date : formatDate(ele.Start_date_and_time__c)
        };
        calenderData.push(tempObj);
    });

    tasks.forEach(ele => {
        //  console.log(ele.Start_date_and_time__c);
          const timeValue = new Date(ele.Start_date_and_time__c).toLocaleTimeString('en-IN',[], {timeStyle: 'short'});
          let tempObj = {
              accountId : ele.Account__r.Id,
              accountName : ele.Account__r.Name,
              eventName : ele.Name,
              calendar : 'Work',
              color : 'tasks',
              date : formatDate(ele.Start_date_and_time__c)
          };
          calenderData.push(tempObj);
      });

    calendar = new Calendar('#calendar', calenderData);
    
    reqDate = formatDate(new Date());
        
    showVisits(filterData(events,masterEvents,reqDate));
    showTasks(filterData(tasks,masterTasks,reqDate));

};

const getDate = (date) =>{
    reqDate = formatDate(new Date(date));
    
    showVisits(filterData(events,masterEvents,reqDate));
    showTasks(filterData(tasks,masterTasks,reqDate));
};

// $('.day').click(function(){
//     reqDate = formatDate(new Date(calendar.todaysDate));
    
//       showVisits(filterData(events,masterEvents,reqDate));
//       showTasks(filterData(tasks,masterTasks,reqDate));
// });


const filterData = (data,masterData,dateFilter) =>{
    
    data = masterData.filter((ele) => {
        let isValid = true;
        if (formatDate(new Date(ele.Start_date_and_time__c)) && dateFilter) {
          if (
            formatDate(new Date(ele.Start_date_and_time__c)).toLowerCase().indexOf(dateFilter.toLowerCase()) < 0
          ) {
            isValid = false;
          }
        }
        return isValid;
    });

    return data;
}

const showVisits = (events) =>{
    let tmp = '';
    $('#todaysVisit').html('');
    if(events.length > 0)
    {
        for(let i=0;i<events.length;i++)
        {
        //    console.log(formatDate(new Date(events[i].Start_date_and_time__c)));
        tmp +=`
            <div class="event" id="${events[i].Account__r.Id}">
                <img class="event-category" src="/media/images/homePage/todays-visit.png">
                <div class="wrapperDiv">
                    <p>${events[i].Account__r.Name}</p>
                    <p class="body">Subject : ${events[i].Name}</p>
                </div>
            </div>
            `;
        }
    }else{
        tmp +=`
            <div class="event">
                <div class="wrapperDiv">
                    <h4>No Events</h4>
                </div>
            </div>
            `;
    }

    $('#todaysVisit').append(tmp);
};

const showTasks = (tasks) =>{
    let tmp = '';
    $('#todaysTask').html('');
    if(tasks.length > 0)
    {
        for(let i=0;i<tasks.length;i++)
        {
            //console.log(formatDate(new Date(events[i].Start_date_and_time__c)));
        tmp +=`
            <div class="event" id="${tasks[i].Account__r.Id}">
                <img class="event-category" src="/media/images/homePage/todays-visit.png">
                <div class="wrapperDiv">
                    <p>${tasks[i].Account__r.Name}</p>
                    <p class="body">Subject : ${tasks[i].Name}</p>
                </div>
            </div>
            `;
        }
    }else{
        tmp +=`
            <div class="event">
                <div class="wrapperDiv">
                    <h4>No Events</h4>
                </div>
            </div>
            `;
    }

    $('#todaysTask').append(tmp);
};


const formatDate =(date) =>  {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
};




//initializeCalenderData(tasks,'Task');

initializeCalenderData(events);







  