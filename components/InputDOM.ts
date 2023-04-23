
// инпут
export class InputDOM {
    #DOM = document.createElement("DIV");
    userName = ""
    foto = "https://placekitten.com/50/50";

    constructor(userName:string, foto:string = "") {
        this.userName = userName;
        this.foto = foto;
    }

    // изобразить на форме на вход  -  родительский дом
    render(parent:HTMLElement | null, firstComentDom:HTMLElement | null = null) {

        let id = '';
        if (firstComentDom != null)
            id = firstComentDom.id.replace('fc', '');


        this.#DOM = document.createElement("DIV");
        this.#DOM.classList.add('input');
        this.#DOM.id = 'input' + id;


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

        this.#DOM.innerHTML = innerHTMLDOM;

        if (firstComentDom != null)
            firstComentDom.after(this.#DOM);
        else {
            if (!parent) return;
            parent.appendChild(this.#DOM)
        };

    }

}
