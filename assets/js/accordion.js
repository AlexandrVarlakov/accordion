class accordion extends EventTarget{
    constructor( accordionId, options ){
        super();
        
        this.onlyOneActive = ( options.onlyOneActive === true ) ? options.onlyOneActive : false;
        console.log(this.onlyOneActive);
        
        this.accordion = document.getElementById(accordionId);


        let itemsList = this.accordion.querySelectorAll('.item');

        itemsList.forEach( (item) => {
            let titleT = item.querySelector('.title');
            let contentT = item.querySelector('.content');

            let title = document.createElement('div');
            title.classList.add('item__title');
            title.innerHTML = titleT.innerHTML;

            let content = document.createElement('div');
            content.classList.add('item__content');

            let contentWrap =  document.createElement('div');
            contentWrap.classList.add('item__content-wrap');

            let contentInner =  document.createElement('div');
            contentInner.classList.add('item__content-inner');
            contentInner.innerHTML = contentT.innerHTML;

            contentWrap.append(contentInner);
            content.append(contentWrap);

            titleT.remove();
            contentT.remove();

            item.append(title);
            item.append(content);


        } )


        this.itemsList = this.accordion.querySelectorAll('.item');
        this.itemsList.forEach( (item) => {
            let self = this;
            let title  = item.querySelector('.item__title');
            item.setAttribute('data-state', 'rolled');
            let inner = item.querySelector('.item__content-inner');
            let outer = item.querySelector('.item__content-wrap');
            let height = getComputedStyle(inner).height;
            
            title.onclick = ()=>{
                this.clickOnTitle(item, title, outer, height);
            }
        } );
    }

    append(_title, _content){

        let self = this;
        let item = this.createItem(_title, _content);
        this.accordion.prepend(item);

        this.accordion.append(item);

        let title = item.querySelector('.item__title');
        let inner = item.querySelector('.item__content-inner');
        let outer = item.querySelector('.item__content-wrap');
        let height = getComputedStyle(inner).height;
        
        title.onclick = ()=>{
            this.clickOnTitle(item, title, outer, height);
        }

    }

    prepend(_title, _content){
        let self = this;
        let item = this.createItem(_title, _content);
        this.accordion.prepend(item);

        let title = item.querySelector('.item__title');
        let inner = item.querySelector('.item__content-inner');
        let outer = item.querySelector('.item__content-wrap');
        let height = getComputedStyle(inner).height;
        
        
        title.onclick = ()=>{
            this.clickOnTitle(item, title, outer, height);
        }

                
           
        
    }
    createItem(_title, _content){
        let item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('data-state', 'rolled');

        let title = document.createElement('div');
        title.classList.add('item__title');
        title.innerHTML = _title;

        let content = document.createElement('div');
        content.classList.add('item__content');

        let contentWrap =  document.createElement('div');
        contentWrap.classList.add('item__content-wrap');

        let contentInner =  document.createElement('div');
        contentInner.classList.add('item__content-inner');
        contentInner.innerHTML = _content;

        contentWrap.append(contentInner);
        content.append(contentWrap);

        item.append(title);
        item.append(content);

        return item;
    }

    clickOnTitle(_item, _title, _outer, _height) {
        let self = this;
        if ( self.onlyOneActive ){
            if ( _item.classList.contains('item_active') ){
                _item.classList.remove('item_active');    
                _item.setAttribute('data-state', 'rolled');
                _outer.style.height = '';

            } else {
                let active = self.accordion.querySelector('.item_active');
                
                if ( active != null){
                    
                    let activeOuter = active.querySelector('.item__content-wrap');
                    
                    activeOuter.style.height = ''
                    active.classList.remove('item_active');
                    active.setAttribute('data-state', 'rolled');
                    _item.classList.add('item_active');
                    _item.setAttribute('data-state', 'deployed');
                    _outer.style.height = _height;
                } else{
                    
                    _item.classList.add('item_active');
                    _item.setAttribute('data-state', 'deployed');
                    _outer.style.height = _height;
                }
                
            }

        } else{
            let active = self.accordion.querySelector( '.item_active' );
            if ( _item.classList.contains('item_active') ){
                _item.classList.remove('item_active');
                _outer.style.height = '';
            } else{
                _item.classList.add('item_active');
                _outer.style.height = _height;
            }
        }
    
    }

    getItemOfIndex( index ){
        let itemsList = this.accordion.querySelectorAll('.item');
        if ( ( itemsList.length > index) && ( index >= 0 ) && ( isNaN( index ) === false ) )
            if ( itemsList[index] !== null && itemsList[index] !== undefined) {
                return itemsList[index]
            } else {
                return false;
            }
                
                    
    }

    removeItem( item ){
        
        if ( item != false && item !== null && item !== undefined) {
            item.remove();
            return true;
        } else{
            return false;
        } 
                    
    }

    insertBefore( index, _title, _content ){
        let itemList = this.accordion.querySelectorAll('.item');
        if ( ( index < itemList.length ) && ( index >= 0 ) ){
            
            let self = this;
            let item = this.createItem(_title, _content);
            this.accordion.prepend(item);

            itemList[index].before(item)
            
            let title = item.querySelector('.item__title');
            let inner = item.querySelector('.item__content-inner');
            let outer = item.querySelector('.item__content-wrap');
            let height = getComputedStyle(inner).height;
        
            title.onclick = ()=>{
                this.clickOnTitle(item, title, outer, height);
            }

            return true;
        } else{
            return false;
        }
    }

    insertAfter( index, _title, _content ){
        let itemList = this.accordion.querySelectorAll('.item');
        if ( ( index < itemList.length ) && ( index >= 0 ) ){
            
            let self = this;
            let item = this.createItem(_title, _content);
            this.accordion.prepend(item);

            itemList[index].after(item)
            
            let title = item.querySelector('.item__title');
            let inner = item.querySelector('.item__content-inner');
            let outer = item.querySelector('.item__content-wrap');
            let height = getComputedStyle(inner).height;
        
            title.onclick = ()=>{
                this.clickOnTitle(item, title, outer, height);
            }

            return true;
        } else{
            return false;
        }
    }

}

let options = {
    onlyOneActive: true,
}

let a = new accordion('acc', options);

let inp = document.getElementById('input');
let inp2 = document.getElementById('input2');
let text = document.getElementById('textarea');
let text2 = document.getElementById('textarea2');
let append = document.getElementById('append');
let prepend = document.getElementById('prepend');

let before = document.getElementById('before');
let after = document.getElementById('after');

let num = document.getElementById('number');
let num2 = document.getElementById('number2');
let card = document.getElementById('card');
let copy = document.getElementById('copytobuf')

let card2 = document.getElementById('card2');
let copy2 = document.getElementById('copytobuf2')

let del = document.getElementById('delete');
append.onclick = function(){
    
    a.append(inp.value, textarea.value);
}

prepend.onclick = function(){
    a.prepend(inp.value, textarea.value);
}


before.onclick = function(){
    a.insertBefore(+num.value, inp2.value, textarea2.value);
}

after.onclick = function(){
    a.insertAfter(+num.value, inp2.value, textarea2.value);
}

del.onclick =  function(){
    console.log(+num2.value);
    a.removeItem( a.getItemOfIndex(+num2.value) );
}
copy.onclick = function(){
    navigator.clipboard.writeText(card.innerHTML)
        .then(() => {
            console.log('Скопировано');
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
     
}

copy2.onclick = function(){
    navigator.clipboard.writeText(card2.innerHTML)
        .then(() => {
            console.log('Скопировано');
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
     
}