/* fonction d'affichage du labyrinthe en DOM.
 */
function print_maze(a, cell_sz) {
    var container = document.createElement('div');
    container.setAttribute('id','laby');
    container.setAttribute('class','maze');
    container.setAttribute('style',
        'width:'+parseInt(cell_sz * (parseInt(document.querySelector('#dimX').value) )+cell_sz*4) +
        'px; height:'+parseInt(cell_sz * (parseInt(document.querySelector('#dimY').value) )+cell_sz*4)+'px;'
    );

    var cells=[];
    for (var i = 0; i < a.length; i++) {
        var row = document.createElement('div');
        row.setAttribute('class','row');
        for (var j = 0; j < a[i].length; j++) {
            var cell = document.createElement('div');
            cell.setAttribute('id',i+'_'+j);
            cell.setAttribute('class','cell '+css_cell_code(a[i][j])+ ' '+document.querySelector('#cell_sz').options[document.querySelector('#cell_sz').selectedIndex].text);
            //cell.setAttribute('style', 'width:'+ 0.8 * cell_sz+'px; height:' + 0.8 * cell_sz + 'px;');
            //flow += " style='top:" + (cell_sz * i) + "; left:" + (cell_sz * j) + ";";
            //cell.innerHTML = a[i][j]; // i +'_'+ j +' <b>'+ a[i][j] + '</b>';
            cell.innerHTML='&nbsp';
            cells[cells.length]=cell;
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    document.querySelector('#display').appendChild(container);
    return cells;
}

function generate_display(){
    var a = new_2d_array(
        parseInt(document.querySelector('#dimX').value),
        parseInt(document.querySelector('#dimY').value)
    );
    var cell_sz = parseInt(document.querySelector('#cell_sz').options[document.querySelector('#cell_sz').selectedIndex].value) || 50;
    init_2d_array(a, 15);
    //random_init_maze(a);
    dig(a, 0, 0);
    //dig_ES(a);

    print_maze(a, cell_sz);
    return a;
}

function main(){
    document.querySelector('#bt-gen').addEventListener('click',function(){
        document.querySelector('#display').innerHTML = '';
        var a = generate_display();
        // premier pas en DOM : marquage de l'entrée et de la sortie :
        for (var i = 0; i < a.length && has_W_wall(a[i][0]); i++);
        console.log(document.querySelector('#'+i + "_0"));
        //.style.backgroundColor = "#99ff33";
        for (var i = 0; i < a.length && has_E_wall(a[i][a[0].length - 1]); i++);
        document.querySelector('#'+i + "_" + (a[0].length - 1)).style.backgroundColor = "#ff6666";
    });
}

main();