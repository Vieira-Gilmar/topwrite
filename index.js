//   Aqui estamos possibilitando arrastar todas as flags que possuem a classe draggable.
//usando o 'interactjs plugin'.
//no html esse plugin está indicado por um CDN
interact('.draggable').draggable({

    onmove(event){
        // pegando o valor da posição.
        let target = event.target;
        let dataX = target.getAttribute('data-x');
        let dataY = target.getAttribute('data-y');
    
        let initialX = parseFloat(dataX) || 0;
        let initialY = parseFloat(dataY) || 0;
      
        // atualizando o valor com da posição com 'event.dx' e '.dy'
        let deltaX = event.dx;
        let deltaY = event.dy;

        // somando a posição inicial com a posição atualizada
        let newX = initialX + deltaX;
        let newY = initialY + deltaY;

        // atribuindo os novos valores de posição
        target.style.transform = `translate(${newX}px, ${newY}px)`;
        target.setAttribute('data-x', newX);
        target.setAttribute('data-y', newY);
        
    },

});

//Criando variáveis para interagir com os valores estipulados para cada 'tag'.
var input = Number(document.querySelector('input[name="valor"]').value);
var resultado = document.querySelector('input[name="resultado"]');         
let tag = document.querySelector('.tag');

//exportar o input para ser usado no render.js
// no projeto, render.js é um arquivo responsável para renderizar na tela alguns resultados
export{input};

// interact está interagindo com a classe '.first' apenas.
//essa interação vai permitir mover as tags para qualquer ponto no texto a ser corrigido.
interact('.first ').dropzone({
    
    ondragenter(event){    
        // deduzindo valor por cada erro.
        var newDraggable = document.createElement('div');
        newDraggable.setAttribute('class', 'draggable first');
        tag.insertBefore(newDraggable, tag.childNodes[0]);

        
        let newDrags = document.querySelectorAll('.draggable');
        
        newDrags.forEach(ns=>{
            
            if(ns.click && ns.style.cursor == 'move'){
                ns.classList.add('newFirst');
                event.target = 0.05;
                ns = 0
                ns+= event.target;
                input += ns;
            }
        })
        resultado.value = input.toFixed(2).toString().replace('.', ',');
    },

    ondragleave(event){
    
        event.target = 0.05;

        //Retornando valor em caso de correção indevida (tags adicionadas indevidamente). 
        document.addEventListener('click', (e)=>{
            e.stopPropagation();
            e.preventDefault();
            // acessando a classe do elemento criado acima para apagá-la e devolver valores deduzidos.
            let newDrags = document.querySelectorAll('.draggable');
            newDrags.forEach(ns=>{
                
                if(ns.style.cursor == 'move' && ns.classList.contains('newFirst')){     
                    input -= event.target;  
                    // Removendo a 'div' não mais necessária.
                    ns.remove();
                }          
            })
            resultado.value = input.toFixed(2).toString().replace('.',',');
        })  
    },
    overlap: 1,
});



