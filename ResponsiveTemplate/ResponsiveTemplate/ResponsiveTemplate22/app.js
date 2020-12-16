//hide preloader
//All the images script links have finished loading



// window event list

eventListeners();
function eventListeners(){
const ui = new UI()

window.addEventListener('load', function(){
 ui.hidePreloader();
})
// Nav btn
document.querySelector('.navBtn').addEventListener('click', function(){
ui.showNav();
})
//control the video
document.querySelector('.video_switch').addEventListener('click', function(){
    ui.videoControls()
})

// submit the form
document.querySelector('.drink-form').addEventListener('submit', function(event){
  event.preventDefault();
  const name = document.querySelector('.input-name').value;
  const lastName = document.querySelector('.input-last-name').value;
  const email = document.querySelector('.input-email').value;

let value = ui.checkEmpty(name, lastName, email)

 if(value){
   let customer = new Customer(name, lastName, email)
    console.log(customer);
    ui.addCustomer(customer)
     ui.showFreedback('customer added to the list ', 'success')
     ui.clearFields()
    }else{
     ui.showFreedback('some form values empty', 'error')
 }

})

//display modal
const links = document.querySelectorAll('.work-item-icon');


links.forEach(function(item){
    item.addEventListener('click',function(event){
        ui.showModal(event)
    })
})

//hide modal
document.querySelector('.work-modal-close').addEventListener('click',
function(){
    ui.closeModal()
})

}

//constructor function
function UI(){

}
// hide preloader
UI.prototype.hidePreloader = function (){
    document.querySelector('.preloader').style.display = "none";
}
// show nav
UI.prototype.showNav = function (){
    document.querySelector('.nav').classList.toggle('nav--show')
}
// play/pause the video

UI.prototype.videoControls = function (){
    let btn = document.querySelector('.video_switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide')
        document.querySelector('.video_item').pause()
    }else{
        btn.classList.remove('btnSlide')
        document.querySelector('.video_item').play()

    }
}

// check for empty value

UI.prototype.checkEmpty = function(name,lastName,email){
    let result;
    if(name === '' || lastName === '' || email === ''){
        result = false;
    }
    else{
        result = true;
    }
    return result;
}

UI.prototype.showFreedback = function(text,type){
    if(type === 'success'){
        let freedback = document.querySelector('.drink-form-freedback');
        freedback.classList.add('success');
        freedback.innerHTML = text;
        this.removeAlert('success');
    }
    else if(type === 'error'){
        let freedback = document.querySelector('.drink-form-freedback');
        freedback.classList.add('error');
        freedback.innerHTML = text;
        this.removeAlert('error');
    }
}


// remove alert
UI.prototype.removeAlert = function(type){

    setTimeout(function(){
        document.querySelector('.drink-form-freedback').classList.remove(type)
    }, 5000)
}
// add customer
UI.prototype.addCustomer = function(customer){
    const images = [1,2,3,4,5];
    let random = Math.floor(Math.random()*images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="img/img${random}.jpg" alt="person"
    class="person-thumbnail">
    <h4 class="person-name">${customer.name}</h4>
    <h4 class="person-last-name">${customer.lastName}</h4>`

    document.querySelector('.drink-card-list').appendChild(div)
}

// clear fields

UI.prototype.clearFields = function(){
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-last-name').value = '';
    document.querySelector('.input-email').value = '';
  
}
// show modal
UI.prototype.showModal = function (event){
    event.preventDefault();
    if(event.target.parentElement.classList.contains('work-item-icon'));
    let id = event.target.parentElement.dataset.id

    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal-item');

    modal.classList.add('work-modal-show');
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
} 

//hide modal
UI.prototype.closeModal = function(){
    document.querySelector('.work-modal').classList.remove('work-modal-show')
}








function Customer(name , lastName , email){
    this.name = name,
    this.lastName = lastName,
    this.email = email;
}