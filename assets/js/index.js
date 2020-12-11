function func(habitsObj, index) {
     console.log('after');
    habitsObj = JSON.stringify(habitsObj);
    window.location = '/change-status/?status=' +habitsObj+ '&index=' +index;
}
