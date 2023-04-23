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
var _InputDOM_DOM;
// инпут
export class InputDOM {
    constructor(userName, foto = "") {
        _InputDOM_DOM.set(this, document.createElement("DIV"));
        this.userName = "";
        this.foto = "https://placekitten.com/50/50";
        this.userName = userName;
        this.foto = foto;
    }
    // изобразить на форме на вход  -  родительский дом
    render(parent, firstComentDom = null) {
        let id = '';
        if (firstComentDom != null)
            id = firstComentDom.id.replace('fc', '');
        __classPrivateFieldSet(this, _InputDOM_DOM, document.createElement("DIV"), "f");
        __classPrivateFieldGet(this, _InputDOM_DOM, "f").classList.add('input');
        __classPrivateFieldGet(this, _InputDOM_DOM, "f").id = 'input' + id;
        let innerHTMLDOM = `    <img class="none-mob foto" src="${this.foto}" alt="foto_user1">
        
        <div class="input-sub">
            <div class="input-group-header">
                <img class="none-web foto" src="${this.foto}" alt="foto_user1">                
                <label class="font-name" for="msg">${this.userName}</label>
                <span class="none-mob left-orient font-small-italic">Макс. 1000 символов</span>                
            </div>
    
            <form action="form" class="none-mob form">
                <input class="inp font-btn" type="text" maxlength="1000" minlength="10" aria-multiline="true"
                    placeholder="      Введите текст сообщения..." id="msg" name="msg">
                <button class="btn font-btn" type="button" data-action="addComent" data-iddom="${id}">Отправить</button>
            </form>
    
    
            <span class="none-web left-orient font-small-italic">Макс. 1000 символов</span>
    
            <form action="form" class="none-web form">
                <input class="none-web inp font-btn" type="text" maxlength="1000" minlength="10" aria-multiline="true"
                    placeholder="      Введите текст сообщения..." id="msg" name="msg">    
                <button  class="none-web btn font-btn" type="button" data-action="addComent" data-iddom="${id}">Отправить</button>
            </form>
        </div>`;
        __classPrivateFieldGet(this, _InputDOM_DOM, "f").innerHTML = innerHTMLDOM;
        if (firstComentDom != null)
            firstComentDom.after(__classPrivateFieldGet(this, _InputDOM_DOM, "f"));
        else {
            if (!parent)
                return;
            parent.appendChild(__classPrivateFieldGet(this, _InputDOM_DOM, "f"));
        }
        ;
    }
}
_InputDOM_DOM = new WeakMap();
