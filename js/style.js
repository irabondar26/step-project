"use strict";


// Services
const serviceList = document.querySelector(".service_list");
const arrServiceBtn = document.querySelectorAll(".service_item_button");
const arrServiceInfo = document.querySelectorAll(".service_info_item");

function removeClassBtnServices(){
    for (let i=0;i<arrServiceBtn.length;i++){
        arrServiceBtn[i].classList.remove("active_button");
    }
    for (let i=0;i<arrServiceInfo.length;i++){
        arrServiceInfo[i].classList.remove("active_service_info_item");
    }
}
function addingAndRemoveClassBtnServices(elem){
    removeClassBtnServices();
    elem.classList.add("active_button");
    for (let i=0;i<arrServiceInfo.length;i++) {
        if(elem.innerText === arrServiceInfo[i].dataset.text){
            arrServiceInfo[i].classList.add("active_service_info_item")
        }
    }
}

serviceList.addEventListener("click",(event)=>{
    const target = event.target;
    if(target.tagName === "BUTTON"){
        addingAndRemoveClassBtnServices(target)
    } else if(target.tagName === "H4"){
        addingAndRemoveClassBtnServices(target.parentNode)
    }
})







// Work
const workMenu = document.querySelector(".work_menu");
const arrWorkMenuButton = document.querySelectorAll(".work_menu_button");
const workBtnLoadmore = document.querySelector(".work_button_loadmore");
const arrHiddenBlockText = document.querySelectorAll(".hidden_block_text");
const loaderAnimationWork = document.querySelector(".loader_work");
const works = document.querySelector(".works");
const worksHtml = works.innerHTML;

let count =0;
workBtnLoadmore.addEventListener("click",(event)=>{
    const arrItemWorks = document.querySelectorAll(".item_works");
    const activeWorkMenuBtn = document.querySelector(".active_work_menu_button");
    const worlsHtml2 =worksHtml;
    count++;
    workBtnLoadmore.style.display = 'none';
    loaderAnimationWork.style.display = 'block';
    let timer = setTimeout(()=>{
        if(count===2){
            workBtnLoadmore.style.display = 'none';
        } else workBtnLoadmore.style.display = 'flex';
        loaderAnimationWork.style.display = 'none';
        works.innerHTML +=worlsHtml2;
        for (const item of arrItemWorks) {
            if(activeWorkMenuBtn.textContent===item.dataset.type){
                displayNoneItemWorks(item.dataset.type);
            } else if(activeWorkMenuBtn.textContent==="All"){
                item.style.display="block";
            }
        }
    },3000)
});



function removeClassWork(){
    for (const item of arrWorkMenuButton) {
        item.classList.remove("active_work_menu_button");
    }
}
function displayNoneItemWorks(type){
    const arrItemWorks = document.querySelectorAll(".item_works");
    for (const elem of arrItemWorks) {
        if(elem.dataset.type!==type){
            elem.style.display="none";
        }else{
            elem.style.display="block";
        }
    }
}

workMenu.addEventListener("click",(event)=>{
    const arrItemWorks = document.querySelectorAll(".item_works");
    const target = event.target;
    if(target.tagName==="BUTTON"){
        removeClassWork();
        target.classList.add("active_work_menu_button");
        for (const item of arrItemWorks) {
            if(target.textContent===item.dataset.type){
                displayNoneItemWorks(item.dataset.type);
            } else if(target.textContent==="All"){
                item.style.display="block";
            }
        }
    }
})











//Clients

const clientsList = document.querySelector(".clients_list");
const arrClientsItemBtn = document.querySelectorAll(".client_item_button");

function removeClassClients(){
    for (let i=0;i<arrClientsItemBtn.length;i++){
        arrClientsItemBtn[i].classList.remove("active_client_button");
    }
}

function addingAndRemoveClassClients(elem){
    removeClassClients();
    elem.classList.add("active_client_button");
    for (let i=0;i<arrServiceInfo.length;i++) {
        if(elem.innerText === arrServiceInfo[i].dataset.text){
            arrServiceInfo[i].classList.add("active_service_info_item")
        }
    }
}


function changeInfoClient(clientFeedback,clientName,clientJobTitle,clientsPhoto,imgWay,way){
    clientsPhoto.src = imgWay.src;
    clientJobTitle.textContent = way.querySelector(".clients_item_job").textContent;
    clientName.textContent = way.querySelector(".clients_item_name").textContent;
    clientFeedback.textContent =way.querySelector(".clients_item_feedback").textContent;
}



clientsList.addEventListener("click",(event)=>{
    const target = event.target;
    const clientsPhoto = target.closest(".clients_list").previousElementSibling;
    const clientJobTitle = clientsPhoto.previousElementSibling;
    const clientName = clientJobTitle.previousElementSibling;
    const clientFeedback = clientName.previousElementSibling;
    let nowActiveBtn;
    if(target.tagName === "BUTTON"&&target.className === "client_item_button"){
        addingAndRemoveClassClients(target);
        changeInfoClient(clientFeedback,clientName,clientJobTitle,clientsPhoto,target.firstElementChild,target.parentNode);
    } else if(target.tagName === "IMG"){
        addingAndRemoveClassClients(target.parentNode);
        changeInfoClient(clientFeedback,clientName,clientJobTitle,clientsPhoto,target,target.parentNode.parentNode)
    } else if(target.tagName === "BUTTON"&&target.classList.contains("button_clients_menu_left")||(target.tagName === "svg" && target.classList.contains("button_clients_img_left"))||(target.tagName === "path" && target.classList.contains("clients_img_left_path"))){
        const activeClientBtn = document.querySelector(".active_client_button");
        for (const child of clientsList.children) {
            if(child.contains(activeClientBtn)){
                activeClientBtn.classList.remove("active_client_button");
                if(child.previousElementSibling.classList.contains("client_previous_btn")){
                    nowActiveBtn = clientsList.lastElementChild.previousElementSibling.firstElementChild;
                    nowActiveBtn.classList.add("active_client_button");
                    changeInfoClient(clientFeedback,clientName,clientJobTitle,clientsPhoto,nowActiveBtn.firstElementChild,nowActiveBtn.parentNode);
                }else{
                    nowActiveBtn = child.previousElementSibling.firstElementChild;
                    nowActiveBtn.classList.add("active_client_button");
                    changeInfoClient(clientFeedback,clientName,clientJobTitle,clientsPhoto,nowActiveBtn.firstElementChild,nowActiveBtn.parentNode);
                }
            }
        }
    }else if((target.tagName === "BUTTON"&&target.classList.contains("button_clients_menu_right"))||(target.tagName === "svg"&&target.classList.contains("button_clients_img_right"))||(target.tagName === "path"&&target.classList.contains("clients_img_right_path"))){
        const activeClientBtn = document.querySelector(".active_client_button");
        for (const child of clientsList.children) {
            if(child.contains(activeClientBtn)){
                let nowActiveBtn;
                activeClientBtn.classList.remove("active_client_button");
                if(child.nextElementSibling.classList.contains("client_next_btn")){
                    nowActiveBtn = clientsList.firstElementChild.nextElementSibling.firstElementChild;
                    nowActiveBtn.classList.add("active_client_button");
                    changeInfoClient(clientFeedback,clientName,clientJobTitle,clientsPhoto,nowActiveBtn.firstElementChild,nowActiveBtn.parentNode);
                }else{
                    nowActiveBtn = child.nextElementSibling.firstElementChild;
                    nowActiveBtn.classList.add("active_client_button");
                    changeInfoClient(clientFeedback,clientName,clientJobTitle,clientsPhoto,nowActiveBtn.firstElementChild,nowActiveBtn.parentNode);
                }
            }
        }
    } 
})










// Galery


    let $grid=$(".galery_list").masonry({
        itemSelector:".galery_list_item",
        gutter:20,
        horizontalOrder: true,
    });
$(".galery_button_loadmore").on("click",()=>{
    $(".galery_button_loadmore").css("display" , 'none');
    $(".loader_galery").css("display",'block');
    let timerID = setTimeout(()=>{
        $(".loader_galery").css("display",'none');
        const elems = $(".galery_list").html();
        let $elems = $(elems);
        $grid.append($elems).masonry('appended',$elems);
        $(".galery_list").css("min-height", `${parseFloat($(".galery_list").css("height"))*1.9}px`);
    },3000)
})