function func(statusObj, index) {
    statusObj = JSON.stringify(statusObj);
    window.location = '/change-button-content/?status=' +statusObj+ '&index=' +index;
    console.log('after');
}
