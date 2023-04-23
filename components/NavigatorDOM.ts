// Верхнее меню которое изменяется внешне когда на него жмешь

export class NavigatorDOM {

    #DOM:HTMLElement|null = null;
    #numberComents:number = 0;
    #curentSort:string = "";
    #blockNavigation:string= "";
    #blocSortDropDown:string = "";
    #onlyFavorites:boolean = false;
  
    constructor() {}
   
    // это типа гетера только в json виде
    getJson(){
        let json = {
            numberComents: this.#numberComents,
            onlyFavorites: this.#onlyFavorites,
            curentSort: this.#curentSort            
        };
        return json;
    }

    // Создание Элемента ДОМ
    #createDom() {
        this.#blocSortDropDown = ` 
    <div class="menu-item-sort-list">
        <button class="menu-item-btn" data-action="sortData">
           ${this.#curentSort == 'По дате' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortData">' : '&nbsp  &nbsp'}
            <span class="dropdown-item font-menu-small" data-action="sortData" >По дате</span>
        </button>
        <button class="menu-item-btn" data-action="sortEsteeme">
            ${this.#curentSort == 'По количеству оценок' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortEsteeme">' : '&nbsp  &nbsp'} 
            <span class="dropdown-item font-menu-small" data-action="sortEsteeme">По количеству оценок</span>
        </button>
        <button class="menu-item-btn" data-action="sortActual">
            ${this.#curentSort == 'По актуальности' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortActual">' : '&nbsp  &nbsp'}             
            <span class="dropdown-item font-menu-small" data-action="sortActual">По актуальности</span>
        </button>
        <button class="menu-item-btn" data-action="sortNumberAnsver">
            ${this.#curentSort == 'По количеству ответов' ? '<img src="./images/label.svg" alt="label.svg" data-action="sortNumberAnsver" >' : '&nbsp  &nbsp'}                         
            <span class="dropdown-item font-menu-small" data-action="sortNumberAnsver" >По количеству ответов</span>
        </button>
    </div>`;

        this.#blockNavigation = `
    <button id ="numberComents" class="menu-item-btn menu-item-coments">
        <span class="font-menu-big-active">Комментарии &nbsp</span>
        <span class="font-menu-big">${this.#numberComents}&nbsp </span>
    </button>
    <!-- здесь надо обьединить две кнопки фильтра -->    
    <div class="coments-navigation-sub">
        <div class="menu-item-sort">
            <button class="menu-item-btn" data-action="clickSort">
                <span class="font-menu-small" data-action="clickSort">${this.#curentSort} &nbsp</span>
                <img class="icon triangle" src="./images/triangle.svg" alt="triangle.svg" data-action="clickSort">
            </button>                 
        </div>
        ${this.#blocSortDropDown}
        <button class="menu-item-btn menu-item-favorites" data-action="clicFavorites">
            <span class=" font-menu-small" data-action="clicFavorites">Избранное &nbsp</span>
            <img class="icon circle-hard" src="./images/circle-hard-white.svg" alt="circle-hard.svg" data-action="clicFavorites">
        </button>
    </div>`;
    }
    // Инициализация навигации
    init(){        
        this.#curentSort = 'По дате';
        try { this.#numberComents = Number(localStorage.getItem('firstComents-length'))}
        catch (e) { this.#numberComents = 0; }
        this.#createDom();
    }

    // изобразить на форме навигацию
    render() {
        this.#DOM = document.querySelector(".coments-navigation");
        if (this.#DOM) this.#DOM.innerHTML = this.#blockNavigation;
    }
    
    // работа выпадающего меню
    clickSort():void {
        let dropDownList:HTMLElement|null = document.querySelector(".menu-item-sort-list");
        if (!dropDownList) return
        if (dropDownList.style.display == 'flex') dropDownList.style.display = 'none';
        else dropDownList.style.display = 'flex';

        let triangle:HTMLElement|null = document.querySelector(".triangle");
        if (!triangle) return
        if (triangle.style.transform == 'rotate(180deg)') triangle.style.transform = 'none';
        else triangle.style.transform = 'rotate(180deg)';
    }

    // функция увеличения количества коментов
    increaseNumberComents() {
        this.#numberComents += 1;        
        const numberComentsDOM = document.getElementById('numberComents');
        
        let innerHTML = 
        `<span class="font-menu-big-active">Комментарии &nbsp</span>
        <span class="font-menu-big">${this.#numberComents}&nbsp </span>`;
         if (numberComentsDOM) {        
            numberComentsDOM.innerHTML = innerHTML;
         }
    };
    
    // функция отображения сортировки в панели навигации
    setSort(action:string) {
        this.#curentSort = action;
        this.#createDom();
        this.render();
    }
    
    // функция отображения фильтра по избранному
    clicFavorites():void {             
        let imgDom:HTMLImageElement|null = document.querySelector(".circle-hard");
        if (!imgDom) return
        this.#onlyFavorites = !this.#onlyFavorites;
        imgDom.src=(this.#onlyFavorites) ? "./images/circle-hard.svg" : "./images/circle-hard-white.svg";         
    
    }
}
