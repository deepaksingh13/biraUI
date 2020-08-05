
const initializeLoadingPage = async() => {
  if(navigator.onLine){
    let loginData = await loginDataFetch(); 
    await itemsFetch(loginData[0].username,loginData[0].password,loginData[0].syncDateTime);
    showNotification({message : 'Items sync complete!'});
    progressBarLoad(20);
    await objectivePushHelper(loginData[0].username,loginData[0].password,loginData[0].syncDateTime);
    showNotification({message : 'Objectives sync complete!'});
    progressBarLoad(30);
    await accountFetch(loginData[0].username,loginData[0].password,loginData[0].syncDateTime);
    showNotification({message : 'Account sync complete!'});
    progressBarLoad(60);
    await itemImagesFetch(loginData[0].username,loginData[0].password,loginData[0].syncDateTime);
    showNotification({message : 'Items Images sync complete!'});
    progressBarLoad(80);
    await eventsFetch(loginData[0].username,loginData[0].password);
    showNotification({message : 'Events sync complete!'});
    progressBarLoad(90);
    await reportFetch(loginData[0].username,loginData[0].password);
    showNotification({message : 'Reports sync complete!'});
    progressBarLoad(100);
    loginData[0].syncDateTime = new Date((new Date().setMinutes(new Date().getMinutes() - 10)));
    loginData[0].reminderDateTime = new Date((new Date().setMinutes(new Date().getMinutes() - 10)));
    await writeData('login',loginData[0]);
  }
  else{
    showNotification({message : 'Device offline cannot Sync!'});
  }
  setTimeout(() => {
    window.location.href = '/view/homePage/homePage.html';
  },1000);
  
};
showNotification = (data) =>{
  $("#notification").fadeIn("slow");
  $("#notification span").html(data.message);
  setTimeout(function(){ $("#notification").fadeOut("slow"); }, 3000);
};

const progressBarLoad = (percentage) => {
  
  let progressBar = document.querySelector('.progress-bar');
  progressBar.style.minWidth =`${percentage}%`;
  progressBar.innerHTML = `${percentage}%`;
};

initializeLoadingPage();

