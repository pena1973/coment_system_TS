// Это класс ответов на комент

import { FirstComent } from "../components/FirstComent.js";
// ответ на комент много чего наследует но + добавляется отсылка на комент и его автора к которому привязан ответ
export class SecondComent extends FirstComent {

    #firstComentid:string|number = "";
    #firstComentUserName:string = "";

    constructor(
        firstComentid:string|number, 
        firstComentUserName:string, 
        userName:string, 
        msg:string, 
        foto:string = "", 
        rating:number = 0, 
        favorite:boolean = false, 
        time:string = "", 
        id:string|number = "") {

        let id1:string|number = (id == "") ? +new Date() : id;
        let time1:string = (time == "") ? new Date(id1).toLocaleDateString() + ' ' + new Date(id1).toLocaleTimeString() : time;

        super(userName, msg, foto, rating, favorite, time1, id1);

        this.#firstComentid = firstComentid;
        this.#firstComentUserName = firstComentUserName;
    }

    // это типа гетера только в json виде
    getJson() {
        let json = {
            userName: this._userName,
            msg: this._msg,
            foto: this._foto,
            rating: this._rating,
            favorite: this._favorite,
            time: this._time,
            id: this._id,
            firstComentid: this.#firstComentid,
            firstComentUserName: this.#firstComentUserName
        };
        return json;
    }

    // добавлено для тайпскрипта
    // + рейтинг
    plus() {super.plus(); }
    // - рейтинг
    minus() {super.minus();}
    // добавление в Избранное
    favorites(): void {super.favorites();}


    //  изобразить себя в html
    // previousComentDom  -  предыдущий дом (на форме блоки идут просто по порядку может быть фест может быть секонд)
    // ответ на комент всегда начинается не с начала, а с комента на который отвечаем
    // признак того что на previousComentDom не смотрим а просто на форме подменяем уже этот сущенствующий дом
    // Ищем блок по id   формат - fc1681677684044 - для комента   sc1681677813684 - для ответа на комент
    render(previousComentDom:HTMLElement|undefined = undefined, replase:boolean = false): HTMLElement|void{

        let secondComentDom = document.createElement("DIV");
        secondComentDom.classList.add('second-coment');
        secondComentDom.id = 'sc' + this._id;

        let innerHTMLDOM =

        `<img class=" none-mob foto" src="${this._foto}" alt="${this._foto}">
        <div class="second-coment-sub">
            <div class="second-coment-header">
                <img class="none-web foto" src="${this._foto}" alt="${this._foto}">

                <div class="second-coment-group">

                    <div class="second-coment-group-header">
                        <div class="font-name">${this._userName}</div>
                        <img class="none-mob icon" src="./images/back.svg" alt="back.svg">
                        <p class="none-mob back-answer font-btn">${this.#firstComentUserName}</p>
                        <span class="font-small-italic">${this._time}</span>
                    </div>

                    <div class="none-web back">
                        <img class="none-web icon" src="./images/back.svg" alt="back.svg">
                        <p class="none-web back-answer font-btn">${this.#firstComentUserName}</p>
                    </div>

                </div>
            </div>

            <p class="second-coment-txt font-msg">${this._msg}</p>

            <div class="second-coment-futter">
                
                <div  class="favorites" data-action="favorites" data-iddom="${this._id}">
                    <img class="icon" src="${this._favorite ? "./images/gray_hard.svg" : "./images/white_hard.svg"}" alt="hard.svg" data-action="favorites" data-iddom="${this._id}">
                    <p class="favorites-in font-btn" data-action="favorites" data-iddom="${this._id}">${this._favorite ? "В избранном" : "В избранноe"}</p>
                </div>
            
                <div class="plus-minus">
                    <img  class="icon" src="./images/minus.svg" alt="minus.svg" data-action="minus" data-iddom="${this._id}">
                    <p class="plus-minus-count font-btn">${this._rating}</p>
                    <img  class="icon" src="./images/plus.svg" alt="plus.svg" data-action="plus" data-iddom="${this._id}">
                </div>
                
            </div>
        </div>`
        secondComentDom.innerHTML = innerHTMLDOM;

        if (replase) {
            let secondComentReplaseDom:HTMLElement | null = document.getElementById('sc' + this._id);
            if (!secondComentReplaseDom) return
            let parent = secondComentReplaseDom.parentElement;
            if (!parent) return
            parent.insertBefore(secondComentDom, secondComentReplaseDom);
            parent.removeChild(secondComentReplaseDom);
        }
        else

            if (previousComentDom) previousComentDom.after(secondComentDom);
    }
    // удалить себя из html
    remove() {
        let secondComentReplaseDom = document.getElementById('sc' + this._id);
        if (!secondComentReplaseDom) return;
        let parent = secondComentReplaseDom.parentElement;
        if (!parent) return  
        parent.removeChild(secondComentReplaseDom);
    }
}