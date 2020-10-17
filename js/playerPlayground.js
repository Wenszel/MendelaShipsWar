var selectedShip 
var selectedShipSize
var selectedShipDirection = 0
var shipsTable = []
var shipsOnPlayground = []
var playerPlayground = document.getElementById("playerPlayground")
var playerPlaygroundTable = []
var usedPlayerPlaygroundSquers = []
var canBePlaced = true
var isGeneratedPlayerPlayground = false

function generatePlayerPlayground(){
    if(isGeneratedPlayerPlayground == false){
        var shipsMenu = document.getElementById("shipsMenu")
        for(i = 0; i<sizeX; i++){
            for(j= 0;j<sizeY;j++){
                var squer = document.createElement("div")
                squer.classList.add("squer")
                playerPlaygroundTable.push(squer)
                playerPlayground.appendChild(squer)
                squer.addEventListener("mouseenter",function(event){
                    if(selectedShip!=null){
                        var position = playerPlaygroundTable.findIndex(e => e==event.currentTarget)
                        canBePlaced = true
                        if(selectedShipDirection==0){
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,1)
                            if(canBePlaced){
                                changeColorOfSquers(position, "green",1)  
                            }else{
                                changeColorOfSquers(position, "red",1)  
                            }
                        }else{
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,10)
                            if(canBePlaced){
                                changeColorOfSquers(position, "green",10)  
                            }else{
                                changeColorOfSquers(position, "red",10)  
                            }
                        }               
                    }
                })

                squer.addEventListener("mouseleave",function(event){
                    if(selectedShip!=null){
                        var position = playerPlaygroundTable.findIndex(e => e==event.currentTarget)
                        if(selectedShipDirection==0){
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            changeColorOfSquers(position, "antiquewhite", 1)
                        }else{
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            changeColorOfSquers(position, "antiquewhite", 10)
                        }  
                    }
                    changeColorOfShipsToBlack()
                })

                squer.addEventListener("click",function(event) {

                    var position = playerPlaygroundTable.findIndex(e => e==event.target)
                    if(selectedShip!=null){
                        if(selectedShipDirection==0){
                            checkCanBePlaced(position, 1)
                            if(canBePlaced){   
                                position = checkIsSizeSuitable(position, selectedShipDirection)
                                placeShip(position, selectedShipSize, selectedShipDirection)
                                var tablica = []
                                for (i = 0; i<selectedShipSize;i++){
                                    tablica.push(playerPlaygroundTable[position+i])
                                }
                                shipsOnPlayground.push(tablica)
                                shipsMenu.removeChild(selectedShip)
                                selectedShip = null
                            }
                        }else{
                            checkCanBePlaced(position, 10)
                            if(canBePlaced){
                                position = checkIsSizeSuitable(position, selectedShipDirection)   
                                placeShip(position, selectedShipSize, selectedShipDirection)
                                var tablica = []
                                for (i = 0; i<selectedShipSize;i++){
                                    tablica.push(playerPlaygroundTable[position+(i*10)])
                                }
                                shipsOnPlayground.push(tablica)
                                shipsMenu.removeChild(selectedShip)
                                selectedShip = null
                            }
                        }
                        changeColorOfShipsToBlack()
                        
                    //jezeli nie ma zaznaczonego zadnego statku to mozna usuwac statek z planszy
                    }else{
                        //sprawdzamy dla wszystkich statkow ktory statek znajduje sie na kliknietej pozycji
                        shipsOnPlayground.forEach(function(ship){
                            if(ship.includes(playerPlaygroundTable[position])){
                                counter= ship.length
                                ship.forEach(function(shipSquer){
                                    shipSquer.style.backgroundColor= "antiquewhite"
                                })
                                generatePlayerShipMenu(counter)
                                //Ta czesc kodu odpowiada za usuniecie z usedSquers zajetych przez ten statek pozycji
                                var generatedShipPosition = playerPlaygroundTable.indexOf(ship[0])
                                var generatedShipDiretion 
                                if(playerPlaygroundTable.indexOf(ship[0])+10==playerPlaygroundTable.indexOf(ship[1])){
                                    generatedShipDiretion=1
                                }else{
                                    generatedShipDiretion=0
                                }
                                var generatedShipSize = counter

                                releaseUsedSquers(generatedShipPosition, generatedShipSize,generatedShipDiretion)
                                shipsOnPlayground.splice(shipsOnPlayground.indexOf(ship),1)
                            }
                        })
                }
                if(shipsOnPlayground.length==10){
                    document.getElementById("startGame").style.visibility="visible"
                }else{
                    document.getElementById("startGame").style.visibility="hidden" 
                }
                                    
                    
                }) 
                squer.addEventListener("contextmenu",function(event){
                    if(selectedShip!=null){
                        event.preventDefault()
                        var position =  playerPlaygroundTable.findIndex(e => e==event.target)
                        canBePlaced = true
                        if(selectedShipDirection==0){
                                selectedShipDirection=1
                            //to jest kod ktory zamienia kwadraty wokol statku przy obrocie na bialy
                            if(position%10+selectedShipSize<9){
                                changeColorOfSquers(position, "antiquewhite", 1)
                            }else{
                                for(i=0; i<selectedShipSize;i++){
                                    playerPlaygroundTable[position-(position%10)+9-i].style.backgroundColor="antiquewhite"
                                }
                            }
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,10)
                            if(canBePlaced){
                                changeColorOfSquers(position, "green", 10)
                            }else{
                                changeColorOfSquers(position, "red", 10)
                            }
                        }else{
                            selectedShipDirection=0
                            if(position+(((selectedShipSize-1)*10))<99){
                                changeColorOfSquers(position, "antiquewhite", 10)
                            }else{
                                for(i=0; i<selectedShipSize;i++){
                                    playerPlaygroundTable[((position%10)+90)-(i*10)].style.backgroundColor="antiquewhite"
                                }
                            }
                            
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,1)
                            if(canBePlaced){
                                changeColorOfSquers(position, "green", 1)
                            }else{
                                changeColorOfSquers(position, "red", 1)
                            }
                        }
                        changeColorOfShipsToBlack()
                }
                })      
        }
        var clearBoth = document.createElement("div")
        clearBoth.style.clear = "both"
        playerPlayground.appendChild(clearBoth)
    }
    ships.forEach(function(shipSize){
        generatePlayerShipMenu(shipSize)
    }
    )
    selectedShip = shipsTable[0]
    selectedShipSize=4
    selectedShip.style.backgroundColor="blue"
    isGeneratedPlayerPlayground = true
}

}
//funkcja odpowiadajaca za umieszczenie na mapie statku na podstawie jego pozycji rozmiaru i kierunku oraz dodanie do usedSquers elementow wokol niego
function placeShip(position, shipSize, direction){
    var pos = position
    if(direction==0){ //poziom
        //dla pierwszego rzedu
        for(i = 0; i<shipSize;i++){
            usedPlayerPlaygroundSquers.push(pos+i)
            playerPlaygroundTable[pos+i].style.backgroundColor= "black"
        }
        if(pos%100<10){
            if(pos%10==0){
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i+10)
                }
                usedPlayerPlaygroundSquers.push(pos+shipSize, pos+10+shipSize)
            }
            else if((pos+shipSize-1)%10==9){
                usedPlayerPlaygroundSquers.push(pos-1, pos+10-1)
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i+10)
                }             
            }else{
                usedPlayerPlaygroundSquers.push(pos-1, pos+10-1, pos+shipSize, pos+10+shipSize)
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i+10)
                }
            }
        //dla ostatniego rzedu
        }else if(pos%100>90){
            if(pos%10==0){
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i-10)
                }
                usedPlayerPlaygroundSquers.push(pos+shipSize, pos-10+shipSize)
                usedPlayerPlaygroundSquers.push()
            }
            else if((pos+shipSize-1)%10==9){
                usedPlayerPlaygroundSquers.push(pos-1, pos-10-1)
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i-10)
                }  
            }else{
                usedPlayerPlaygroundSquers.push(pos-1, pos-10-1, pos+shipSize, pos-10+shipSize)
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i-10)
                }
            }
        //dla srodkowych rzedow
        }else{
            if(pos%10==0){
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i-10)
                    usedPlayerPlaygroundSquers.push(pos+i+10)
                }
                usedPlayerPlaygroundSquers.push(pos+shipSize)
                usedPlayerPlaygroundSquers.push(pos-10+shipSize)
                usedPlayerPlaygroundSquers.push(pos+10+shipSize)
            }
            else if((pos+shipSize-1)%10==9){
                usedPlayerPlaygroundSquers.push(pos-1)
                usedPlayerPlaygroundSquers.push(pos-10-1)
                usedPlayerPlaygroundSquers.push(pos+10-1)
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i-10)
                    usedPlayerPlaygroundSquers.push(pos+i+10)
                }
                
            }else{
                usedPlayerPlaygroundSquers.push(pos-1)
                usedPlayerPlaygroundSquers.push(pos-10-1)
                usedPlayerPlaygroundSquers.push(pos+10-1)
                usedPlayerPlaygroundSquers.push(pos+shipSize)
                usedPlayerPlaygroundSquers.push(pos-10+shipSize)
                usedPlayerPlaygroundSquers.push(pos+10+shipSize)
                for(i=0;i<shipSize;i++){
                    usedPlayerPlaygroundSquers.push(pos+i-10)
                    usedPlayerPlaygroundSquers.push(pos+i+10)
                }
            }
        }
        
    }
    if(direction==1){ //pion
        for(i = 0;i<shipSize;i++){
            usedPlayerPlaygroundSquers.push(pos+(i*10))
            playerPlaygroundTable[pos+(i*10)].style.backgroundColor= "black"
        }
        if(pos%10==0){
            if(pos%100<10){
                for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
                    }
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10)+1, pos+(10*shipSize))
                }
                else if((pos+shipSize)%100>=90){
                    usedPlayerPlaygroundSquers.push(pos-10, pos-10+1)
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
                    }             
                }else{
                    usedPlayerPlaygroundSquers.push(pos-10, pos-10+1, pos+(10*shipSize), pos+(10*shipSize)+1)
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
                    }
                }
            //dla ostatniego rzedu
        }else if(pos%10==9){
                if(pos%100<10){
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                    }
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10), pos-1+(shipSize*10))
                }
                else if((pos+shipSize)%100>=90){
                    usedPlayerPlaygroundSquers.push(pos-10, pos-10-1)
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                    }  
                }else{
                    usedPlayerPlaygroundSquers.push(pos-10, pos-10-1, pos+(shipSize*10), pos-1+(shipSize*10))
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                    }
                }
            //dla srodkowych rzedow
            }else{
                if(pos%100<10){
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                        usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
                    }
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10)-1)
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10))
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10)+1)
                }
                else if((pos+shipSize)%100>=90){
                    usedPlayerPlaygroundSquers.push(pos-10-1)
                    usedPlayerPlaygroundSquers.push(pos-10)
                    usedPlayerPlaygroundSquers.push(pos-10+1)
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                        usedPlayerPlaygroundSquers.push(pos+(i+10)+1)
                    }                        
                }else{
                    usedPlayerPlaygroundSquers.push(pos-10-1)
                    usedPlayerPlaygroundSquers.push(pos-10)
                    usedPlayerPlaygroundSquers.push(pos-10+1)
                    for(i=0;i<shipSize;i++){
                        usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                        usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
                    }
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10)-1)
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10))
                    usedPlayerPlaygroundSquers.push(pos+(shipSize*10)+1)
                }
            }
        
    }            
}
//funkcja ktora generuje menu statkow obok planszy
function generatePlayerShipMenu(shipSize){
    //dodajemy statek
    var ship = document.createElement("div")
    ship.classList.add("ship")
        for(i = 0; i<shipSize; i++){
            var squer = document.createElement("div")
            squer.classList.add("squer")
            ship.appendChild(squer)
        }
    var clearBoth = document.createElement("div")
    clearBoth.style.clear = "both"
    ship.appendChild(clearBoth)
    //dodajemy listener onclick
    ship.addEventListener("click",function(){
        //ten warunek odpowiada za odznaczenie wybranego statku 
        if(selectedShip == this){
            //pobierane sa divy skladajace sie na statek i ich background color zmienia sie na zwykly
            selectedSquers = selectedShip.childNodes
            selectedSquers.forEach(function(i,j){
                selectedSquers[j].style.backgroundColor="antiquewhite"
            })   
            //wybrany statek ustawiany jest na null co pozwala wybrac nowy statek
            selectedShip = null
            selectedShipSize=-1
        //jezeli wybrany statek to nie ten statek:
        }else{
            if(selectedShip!=null){
                //zmieniamy kolor wczesniej wybranego statku na zwykly
                selectedSquers = selectedShip.childNodes
                selectedSquers.forEach(function(i,j){
                    selectedSquers[j].style.backgroundColor="antiquewhite"
                })   
            }
            //nastepnie ustawiamy jako statek ten ktory wybralismy
            selectedShipSize = -1
            squers = ship.childNodes
            squers.forEach(function(i,j){
                squers[j].style.backgroundColor="blue"
                selectedShipSize++
            })
            selectedShip = this
    }
        })
    //najechanie na statek sprawia ze jego elementy swieca sie na czerwono chyba ze jest wybrany
    ship.addEventListener("mouseenter",function(){
        if(selectedShip!=this){
            squers = ship.childNodes
            squers.forEach(function(i,j){
                squers[j].style.backgroundColor="red"
            })
        }
    })
    //zejscie ze statku sprawia ze zmienia sie kolor na zwykly
    ship.addEventListener("mouseleave",function(){
        if(selectedShip!=this){
            squers = ship.childNodes
            squers.forEach(function(i,j){
                squers[j].style.backgroundColor="antiquewhite"
            })
            
        }
    })
    //dodajemy do tablicy zawierajacej statki po lewej od playerplayground nasz statek
    shipsTable.push(ship)
    //i dodajemy do menu po lewej
    shipsMenu.appendChild(ship)
    //zwracamy nasz statek => jest to potrzebne do funkcji usuwajacej statek z planszy
    return ship;
}
//funkcja pomocnicza ktora na podstawie pozycji, koloru, mnoznika(ktory zalezy od kierunku statku poziom = 1 pion = 10) zmienia kolor na podany
function changeColorOfSquers(position, color, multiplier){
        for (i = 0; i<selectedShipSize;i++){
            playerPlaygroundTable[position+(i*multiplier)].style.backgroundColor=color;
        }     
}
//funkcja pomocnicza do okreslenia czy w danym miejscu dany statek nie bedzie zajmowal miejsc ktore zostaly juz uzyte
function checkCanBePlaced(position, multiplier){
    for(i=0;i <selectedShipSize;i++){
        if(usedPlayerPlaygroundSquers.includes(position+(i*multiplier))){
            canBePlaced = false
        }
    }
}
//funkcja pomocnicza do rozmieszczania na mapie statków => sprawdza czy dany statek pasuje na to miejsce czy bedzie wychodzil poza mape ze swoim rozmiarem
function checkIsSizeSuitable(position){
    if(selectedShipDirection==0){
        //jezeli jezeli reszta z dzielenia przez 10 pozycji + rozmiar statku jest mniejsza od samej pozycji to znaczy ze statek nie miesci sie w rzedzie
        if(((position+selectedShipSize)%10)<(position%10)){
            //w takim wypadku ustawiamy pozycje statku na ostatni pasujacy przez nia element w danym rzedzie
            position = (position%100)-(position%10)+10-(selectedShipSize)
        }
    }
    else{
        //jezeli pozycja statku + jego rozmiar jest wiekszy od 99 (czyli ostatniego indexu tablicy playerplayground) to zmieniamy pozycje na ostatnia pasujaca
        if(position+(selectedShipSize*10)>99){
            //ostatnia pasujaca pozycja jest 90+reszta dzielania z pozycji - rozmiar statku-1(-1 poniewaz pozycja juz jest pierwszym elementem statku)*10
            position = (90+(position%10))-((selectedShipSize-1)*10)
        }
    }
    return position
}
//funkcja pomocnicza do listenerów zmieniająca kolory squerów ze statkami na czarne
function changeColorOfShipsToBlack(){
    shipsOnPlayground.forEach(function(ship){
        ship.forEach(function(k){
            k.style.backgroundColor="black"
        })
        
    })
}
//funkcja zwalniajaca uzyte miejsca => wykonuje sie gdy jakis statek jest usuwany z mapy
function releaseUsedSquers(position,shipSize,direction){
    // funkcja działa na tej samej zasadzie co generateComputerShip
    if(direction==0){ 
        for(i = 0; i<shipSize;i++){
            releaseUsedSquer(position+i)
        }
        if(position%100<10){
            if(position%10==0){
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i+10)
                }
                releaseUsedSquer(position+shipSize)
                releaseUsedSquer(position+10+shipSize)
            }
            else if((position+shipSize-1)%10==9){
                releaseUsedSquer(position-1)
                releaseUsedSquer(position+10-1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i+10)
                }             
            }else{
                releaseUsedSquer(position-1)
                releaseUsedSquer(position+10-1)
                releaseUsedSquer(position+shipSize)
                releaseUsedSquer(position+10+shipSize)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i+10)
                }
            }
        }else if(position%100>90){
            if(position%10==0){
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i-10)
                }
                releaseUsedSquer(position+shipSize)
                releaseUsedSquer(position-10+shipSize)
            }
            else if((position+shipSize-1)%10==9){
                releaseUsedSquer(position-1)
                releaseUsedSquer(position-10-1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i-10)
                }  
            }else{
                releaseUsedSquer(position-1)
                releaseUsedSquer(position-10-1) 
                releaseUsedSquer(position+shipSize)
                releaseUsedSquer(position-10+shipSize)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i-10)
                }
            }
        }else{
            if(position%10==0){
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i-10)
                    releaseUsedSquer(position+i+10)
                }
                releaseUsedSquer(position+shipSize)
                releaseUsedSquer(position-10+shipSize)
                releaseUsedSquer(position+10+shipSize)
            }
            else if((position+shipSize-1)%10==9){
                releaseUsedSquer(position-1)
                releaseUsedSquer(position-10-1)
                releaseUsedSquer(position+10-1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i-10)
                    releaseUsedSquer(position+i+10)
                }
            }else{
                releaseUsedSquer(position-1)
                releaseUsedSquer(position-10-1)
                releaseUsedSquer(position+10-1)
                releaseUsedSquer(position+shipSize)
                releaseUsedSquer(position-10+shipSize)
                releaseUsedSquer(position+10+shipSize)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+i-10)
                    releaseUsedSquer(position+i+10)
                }
            }
        }    
    }
    if(direction==1){ 
        for(i = 0;i<shipSize;i++){
            releaseUsedSquer(position+(i*10))
        }
        if(position%10==0){
            if(position%100<10){
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)+1)
                }
                releaseUsedSquer(position+(shipSize*10)+1)
                releaseUsedSquer(position+(10*shipSize))
            }
            else if((position+shipSize)%100>=90){
                releaseUsedSquer(position-10)
                releaseUsedSquer(position-10+1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)+1)
                }             
            }else{
                releaseUsedSquer(position-10)
                releaseUsedSquer( position-10+1)
                releaseUsedSquer( position+(10*shipSize))
                releaseUsedSquer( position+(10*shipSize)+1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)+1)
                }
            }
        }else if(position%10==9){
            if(position%100<10){
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)-1)
                }
                releaseUsedSquer(position+(shipSize*10))
                releaseUsedSquer( position-1+(shipSize*10))
            }
            else if((position+shipSize)%100>=90){
                releaseUsedSquer(position-10)
                    releaseUsedSquer( position-10-1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)-1)
                }  
            }else{
                releaseUsedSquer(position-10)
                releaseUsedSquer(position-10-1)
                releaseUsedSquer(position+(shipSize*10))
                releaseUsedSquer(position-1+(shipSize*10))
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)-1)
                }
            }
        }else{
            if(position%100<10){
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)-1)
                    releaseUsedSquer(position+(i*10)+1)
                }
                releaseUsedSquer(position+(shipSize*10)-1)
                releaseUsedSquer(position+(shipSize*10))
                releaseUsedSquer(position+(shipSize*10)+1)
            }
            else if((position+shipSize)%100>=90){
                releaseUsedSquer(position-10-1)
                releaseUsedSquer(position-10)
                releaseUsedSquer(position-10+1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)-1)
                    releaseUsedSquer(position+(i+10)+1)
                }                        
            }else{
                releaseUsedSquer(position-10-1)
                releaseUsedSquer(position-10)
                releaseUsedSquer(position-10+1)
                for(i=0;i<shipSize;i++){
                    releaseUsedSquer(position+(i*10)-1)
                    releaseUsedSquer(position+(i*10)+1)
                }
                releaseUsedSquer(position+(shipSize*10)-1)
                releaseUsedSquer(position+(shipSize*10))
                releaseUsedSquer(position+(shipSize*10)+1)
            }
        }
    }            
}
//funkcja pomocnicza do funkcji usuwania used squerów
function releaseUsedSquer(position){
    //pobiera index squeru który chcemy usunac z usedsquers
    var index = usedPlayerPlaygroundSquers.indexOf(position)
    //usuwa ten squer
    usedPlayerPlaygroundSquers.splice(index,1)
}