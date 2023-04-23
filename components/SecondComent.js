// Это класс ответов на комент
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SecondComent_firstComentid, _SecondComent_firstComentUserName;
import { FirstComent } from "../components/FirstComent.js";
// ответ на комент много чего наследует но + добавляется отсылка на комент и его автора к которому привязан ответ
export class SecondComent extends FirstComent {
    constructor(firstComentid, firstComentUserName, userName, msg, foto = "", rating = 0, favorite = false, time = "", id = "") {
        let id1 = (id == "") ? +new Date() : id;
        let time1 = (time == "") ? new Date(id1).toLocaleDateString() + ' ' + new Date(id1).toLocaleTimeString() : time;
        super(userName, msg, foto, rating, favorite, time1, id1);
        _SecondComent_firstComentid.set(this, "");
        _SecondComent_firstComentUserName.set(this, "");
        __classPrivateFieldSet(this, _SecondComent_firstComentid, firstComentid, "f");
        __classPrivateFieldSet(this, _SecondComent_firstComentUserName, firstComentUserName, "f");
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
            firstComentid: __classPrivateFieldGet(this, _SecondComent_firstComentid, "f"),
            firstComentUserName: __classPrivateFieldGet(this, _SecondComent_firstComentUserName, "f")
        };
        return json;
    }
    // добавлено для тайпскрипта
    // + рейтинг
    plus() { super.plus(); }
    // - рейтинг
    minus() { super.minus(); }
    // добавление в Избранное
    favorites() { super.favorites(); }
    //  изобразить себя в html
    // previousComentDom  -  предыдущий дом (на форме блоки идут просто по порядку может быть фест может быть секонд)
    // ответ на комент всегда начинается не с начала, а с комента на который отвечаем
    // признак того что на previousComentDom не смотрим а просто на форме подменяем уже этот сущенствующий дом
    // Ищем блок по id   формат - fc1681677684044 - для комента   sc1681677813684 - для ответа на комент
    render(previousComentDom = undefined, replase = false) {
        let secondComentDom = document.createElement("DIV");
        secondComentDom.classList.add('second-coment');
        secondComentDom.id = 'sc' + this._id;
        let innerHTMLDOM = `<img class=" none-mob foto" src="${this._foto}" alt="${this._foto}">
        <div class="second-coment-sub">
            <div class="second-coment-header">
                <img class="none-web foto" src="${this._foto}" alt="${this._foto}">

                <div class="second-coment-group">

                    <div class="second-coment-group-header">
                        <div class="font-name">${this._userName}</div>
                        <img class="none-mob icon" src="./images/back.svg" alt="back.svg">
                        <p class="none-mob back-answer font-btn">${__classPrivateFieldGet(this, _SecondComent_firstComentUserName, "f")}</p>
                        <span class="font-small-italic">${this._time}</span>
                    </div>

                    <div class="none-web back">
                        <img class="none-web icon" src="./images/back.svg" alt="back.svg">
                        <p class="none-web back-answer font-btn">${__classPrivateFieldGet(this, _SecondComent_firstComentUserName, "f")}</p>
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
        </div>`;
        secondComentDom.innerHTML = innerHTMLDOM;
        if (replase) {
            let secondComentReplaseDom = document.getElementById('sc' + this._id);
            if (!secondComentReplaseDom)
                return;
            let parent = secondComentReplaseDom.parentElement;
            if (!parent)
                return;
            parent.insertBefore(secondComentDom, secondComentReplaseDom);
            parent.removeChild(secondComentReplaseDom);
        }
        else if (previousComentDom)
            previousComentDom.after(secondComentDom);
    }
    // удалить себя из html
    remove() {
        let secondComentReplaseDom = document.getElementById('sc' + this._id);
        if (!secondComentReplaseDom)
            return;
        let parent = secondComentReplaseDom.parentElement;
        if (!parent)
            return;
        parent.removeChild(secondComentReplaseDom);
    }
}
_SecondComent_firstComentid = new WeakMap(), _SecondComent_firstComentUserName = new WeakMap();
