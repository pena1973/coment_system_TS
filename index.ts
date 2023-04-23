import { FirstComent } from "./components/FirstComent.js";
import { SecondComent } from "./components/SecondComent.js";
import { NavigatorDOM } from "./components/NavigatorDOM.js";
import { InputDOM } from "./components/InputDOM.js";
import { myName, myFoto } from "./components/Const.js";


// сообщения
let firstComents: FirstComent[] = [];

// ответы на сообщения
let secondComents : SecondComent[]= [];

// колонка документа куда я собираю линейку коментариев
export const parent:HTMLElement | null = document.getElementById('parent');

const navigator:NavigatorDOM = new NavigatorDOM();
const input:InputDOM = new InputDOM(myName, myFoto);

function initBlock() : void {
    //   localStorage.clear();

    // навигация
    navigator.init();
    navigator.render();
    // форма ввода
    input.render(parent);
    // коменты

    // Первые    
    let firstComentsLength:number | string | null = localStorage.getItem('firstComents-length');
    firstComentsLength = (firstComentsLength == null) ? 0: Number(firstComentsLength); 
    for (let indF = 0; indF < firstComentsLength; indF++) {
        let coment_: string|null = localStorage.getItem("firstComent" + indF); 
        if (coment_ == null)  continue; 
        let jsonF = JSON.parse(coment_);
        let firstComent: FirstComent = new FirstComent(jsonF.userName, jsonF.msg, jsonF.foto, jsonF.rating, jsonF.favorite, jsonF.time, jsonF.id);
        firstComents.push(firstComent);
    }
    // подчиненные
    let secondComentsLength:number | string | null = localStorage.getItem('secondComents-length');
    secondComentsLength = (secondComentsLength == null) ? 0: Number(secondComentsLength); 
    for (let indS = 0; indS < secondComentsLength; indS++) {
        let coment__: string|null = localStorage.getItem("secondComent" + indS); 
        if (coment__ == null)  continue; 
        let jsonS = JSON.parse(coment__);
        let secondComent = new SecondComent(jsonS.firstComentid, jsonS.firstComentUserName, jsonS.userName, jsonS.msg, jsonS.foto, jsonS.rating, jsonS.favorite, jsonS.time, jsonS.id);
        secondComents.push(secondComent);
    }
    // прорисую
    renderComents();
};

// прорисовка массива коментариев
function renderComents(onlyFavorites = false) : void {
    firstComents.forEach(
        firstComent => {
            if (onlyFavorites && !firstComent.getJson().favorite) {
                // если включен отбор избранное
            } else {
                if(!parent) return; 
                let firstComentDOM: HTMLElement = <HTMLElement>firstComent.render(parent);
                let secondComentsOfFirst = secondComents.filter(secondComent => Number(secondComent.getJson().firstComentid) == Number(firstComent.getJson().id))
                secondComentsOfFirst.forEach(secondComent => {
                    if (onlyFavorites && !secondComent.getJson().favorite) { }
                    else secondComent.render(firstComentDOM);
                });
            }
        }
    );
}
// Удаление коментариев
function clearComents() : void {
    firstComents.forEach(firstComent => { firstComent.remove(); });
    secondComents.forEach(secondComent => { secondComent.remove(); });
}

// Действия
// нажатие на кнопку ответа
function answer(id:string|number) : void {
    let fcParent = document.getElementById('fc' + id);
    // форма ввода
    let inputAnswer = new InputDOM(myName, myFoto);
    inputAnswer.render(parent, fcParent);
};

// обработать изменение атрибутов комента
function processSetAtributes(id:string|number, action:string): void {

    let coment: FirstComent|SecondComent|undefined = firstComents.find(firstComent => +firstComent.getJson().id == id)
    if (!coment) { coment = secondComents.find(secondComent => +secondComent.getJson().id == id) }

    if (coment) {
        switch (action) {
            case 'favorites':
                coment.favorites();
                break;
            case 'plus':
                coment.plus();
                break;
            case 'minus':
                coment.minus();
                break;
            default:
                break;
        }
        coment.render(undefined, true);
        saveLocalStorage();
        return;
    }
};

// кодбеки сортировки
// по дате
const sortData = (a:FirstComent, b:FirstComent) => {
    const idA = a.getJson().id;
    const idB = b.getJson().id;
    if (idA > idB) {
        return -1;
    }
    if (idA < idB) {
        return 1;
    }
    // names must be equal
    return 0;
}
// по рейтингу
const sortEsteeme = (a:FirstComent, b:FirstComent) => {
    const raitA = a.getJson().rating;
    const raitB = b.getJson().rating;
    if (raitA > raitB) {
        return -1;
    }
    if (raitA < raitB) {
        return 1;
    }
    // names must be equal
    return 0;
}
// по актуальности - тоесть  по дате последнего ответа
const sortActual = (a:FirstComent, b:FirstComent) => {
    // в id  - это дата в милисекундах
    let maxidA:number = 0;
    let maxidB:number = 0;
    let secondComentsOfFirstA = secondComents.filter(secondComent => secondComent.getJson().firstComentid == a.getJson().id)    
    secondComentsOfFirstA.forEach(secondComent => { maxidA = Math.max(maxidA, Number(secondComent.getJson().id))});

    let secondComentsOfFirstB = secondComents.filter(secondComent => secondComent.getJson().firstComentid == b.getJson().id)
    secondComentsOfFirstB.forEach(secondComent => { maxidB = Math.max(maxidB, Number(secondComent.getJson().id))});

    if (maxidA > maxidB) {
        return -1;
    }
    if (maxidA < maxidB) {
        return 1;
    }
    // names must be equal
    return 0;
}
// по количеству ответов
const sortNumberAnsver = (a:FirstComent, b:FirstComent) => {
    let maxA = secondComents.filter(secondComent => secondComent.getJson().firstComentid == a.getJson().id).length;
    let maxB = secondComents.filter(secondComent => secondComent.getJson().firstComentid == b.getJson().id).length;

    if (maxA > maxB) {
        return -1;
    }
    if (maxA < maxB) {
        return 1;
    }
    // names must be equal
    return 0;
}
// Запись в локал сторидж
function saveLocalStorage():void {
    // Запись в ЛокалСторидж
    localStorage.setItem('firstComents-length', String(firstComents.length));
    firstComents.forEach((firstComent, ind) => {
        localStorage.setItem("firstComent" + ind, JSON.stringify(firstComent.getJson()));
    });

    // Запись в ЛокалСторидж
    localStorage.setItem('secondComents-length', String(secondComents.length));
    secondComents.forEach((secondComent, ind) => {
        localStorage.setItem("secondComent" + ind, JSON.stringify(secondComent.getJson()));
    });
}

// функция добавления комента или ответа на комент
// id - это id комента  а само сообщение  -  это ответ на комент
// если нет id  то это новый комент
function addComent(msg:string, id:number|string = "") {
    
    if (id == "") {
        // создаем родительский комент                
        let coment = new FirstComent(myName, msg, myFoto);
        // сохраняем  родительский комент в базе    
        if (!firstComents) return;
        firstComents.push(coment);
        // рисуем родительский комент последовательно
        if(!parent) return
        coment.render(parent);
        navigator.increaseNumberComents();
        saveLocalStorage();

    }
    // иначе это подчиненный комент (second)
    else {
        // ищем родительский комент в базе
        let firstComent:FirstComent|undefined = firstComents.find(firstComent => +firstComent.getJson().id == id)
        if (!firstComent) return; // ничего не добавляем  -  но это нереальная ситуация
        if (msg != "") {
            // создаем подчиненный комент        
            let coment = new SecondComent(id, firstComent.getJson().userName, myName, msg, myFoto);
            // сохраняем  подчиненный комент в базе   
            if (!secondComents) return;
            secondComents.push(coment);

            // рисуем подчиненный комент  сразу за родительским
            let firstComentDom: HTMLElement | null = document.getElementById('fc' + id);
            if (!firstComentDom) return; // ничего не добавляем  -  но это нереальная ситуация при добавлении ответа исходныйкомент будет на сайте
            coment.render(firstComentDom);
        }
        // Убираем поле ввода родителя
        let inpDOM:HTMLElement|null = document.getElementById('input' + id);
        if (!inpDOM) return;
        inpDOM.remove();

        saveLocalStorage();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initBlock();
});

document.addEventListener("click", function (ev:MouseEvent|null) {
    //  localStorage.clear();
    if(!ev) return;
    let target: HTMLElement = <HTMLElement> ev.target;

    let action = "";
    if (target.dataset.action != undefined) { // если есть атрибут...
        action = target.dataset.action;
    }
    let idDOM = "";
    if (target.dataset.iddom != undefined) { // если есть атрибут...
        idDOM = target.dataset.iddom;
    }
    // Дальше обрабатываем кнопкки на вход ИД элемента 

    if (action == "addComent") {
        let inputElement:HTMLElement|null = target.parentElement;
       if (!inputElement) return; 
        for (let elem of inputElement.children) {
            if (elem.id == 'msg') {
                let inpEl:HTMLInputElement = <HTMLInputElement> elem;
                let msg = inpEl.value
                addComent(msg, idDOM)
                inpEl.value = '';
            }
        }
    }

    if (action == "answer") {
        answer(idDOM)
    }

    if (action == "favorites" || action == "plus" || action == "minus") {
        processSetAtributes(idDOM, action)
    }

    if (action == "clickSort") {
        navigator.clickSort();
    }
    if (action == "clicFavorites") {
        clearComents();
        navigator.clicFavorites();
        renderComents(navigator.getJson().onlyFavorites);
    }

    if (action == "sortData" || action == "sortEsteeme" || action == "sortActual" || action == "sortNumberAnsver") {
        switch (action) {
            case 'sortData':
                firstComents.sort(sortData);
                navigator.setSort('По дате');
                break;
            case 'sortEsteeme':
                firstComents.sort(sortEsteeme);
                navigator.setSort('По количеству оценок');
                break;
            case 'sortActual':
                firstComents.sort(sortActual);
                sortActual
                navigator.setSort('По актуальности');
                break;
            case 'sortNumberAnsver':
                firstComents.sort(sortNumberAnsver);
                navigator.setSort('По количеству ответов');
                break;
            default:
                break;
        }

        // Очищаем поле коментов и рисуем его заново в соответствие с сортировкой
        clearComents();
        renderComents();
    }

});