// Это класс коментов на текст
// класс содержит инфу о коменте и сам себя может нарисовать
export class FirstComent {    
    _msg:string = "";
    _userName:string = "";
    _foto:string = "https://placekitten.com/50/50";
    _rating:number = 0;
    _favorite:boolean = false;
    _time:string = "";    
    _id:string|number = 0;    

    constructor(userName:string, 
        msg:string, 
        foto:string = "", 
        rating:number = 0, 
        favorite:boolean = false, 
        time:string = "", 
        id:string|number="" ) {
        
        this._msg = msg;
        this._userName = userName;
        this._foto = foto;
        this._rating = rating;
        this._favorite = favorite;
        this._id = (id == "") ? +new Date() : id;
        this._time = (time == "") ? new Date(this._id).toLocaleDateString() +' '+new Date(this._id).toLocaleTimeString() : time;        
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
            id: this._id
        };
        return json;
    }
    // + рейтинг
    plus() {
        this._rating += 1;
    }
    // - рейтинг
    minus() {
        if (this._rating>0)
        this._rating -= 1;
    }
    // добавление в Избранное
    favorites():void {
        this._favorite = !this._favorite;

    }

    // изобразить себя в html
    // parent  -  это колонка куда коменты добавляются последовательно в конец      
    // признак того что не добавляем в конец на форме подменяем уже этот сущенствующий дом
    // Ищем блок по id   формат - fc1681677684044 - для комента   sc1681677813684 - для ответа на комент
    render(parent:HTMLElement|undefined, replase:boolean = false):HTMLElement|void {
        let firstComentDom = document.createElement("DIV");
        firstComentDom.classList.add('first-coment');
        firstComentDom.id = 'fc'+this._id;
        let innerHTMLDOM =
        `
            <img class="none-mob foto" src="${this._foto}" alt="${this._foto}">
            
            <div id="first-coment-sub" class="first-coment-sub">
                <div class="first-coment-header">
                    <img class="none-web foto" src="${this._foto}" alt="${this._foto}">
    
                    <div class="first-coment-group">
                        <div class="first-coment-group-header">
                            <label class="font-name" for="msg">${this._userName}</label>
                            <span class="font-small-italic">${this._time}</label>
                        </div>
                    </div>
                </div>
    
                <p class="first-coment-txt font-msg">${this._msg}</p>
    
                <div class="first-coment-futter">
                    <div class="back" data-action="answer" data-iddom="${this._id}">
                        <img class="icon" src="./images/back.svg" alt="back.svg" data-action="answer" data-iddom="${this._id}">
                        <p class="back-answer font-btn" data-action="answer" data-iddom="${this._id}">Ответить</p>
                    </div> 
    
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
           
        firstComentDom.innerHTML = innerHTMLDOM;
        if (replase) {  
            let firstComentDomReplase =  document.getElementById('fc'+this._id);
            if (!firstComentDomReplase) return;    
            let parent = firstComentDomReplase.parentElement;                      
            if (!parent) return;
            parent.insertBefore(firstComentDom,firstComentDomReplase);
            parent.removeChild(firstComentDomReplase);        
        }
        if (!parent) return;
        else  parent.appendChild(firstComentDom);
        
        return firstComentDom;
    }        
     // удалить себя из html
    remove(){
        let firstComentDomReplase =  document.getElementById('fc'+this._id);
        if (!firstComentDomReplase) return;
              
        let parent = firstComentDomReplase.parentElement;    
        if (!parent) return;
        parent.removeChild(firstComentDomReplase);           
    }
}
