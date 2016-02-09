
/* fonction d'affichage du labyrinthe en DOM.
 */
function print_maze(a, cell_sz) {
    var container = document.createElement('table');
    container.setAttribute('id','laby');
    container.setAttribute('class','maze');
    var width, height;
    if (document.querySelector('#dimX')) {
        width = parseInt(cell_sz * (parseInt(document.querySelector('#dimX').value) )+cell_sz*4);
        height = parseInt(cell_sz * (parseInt(document.querySelector('#dimY').value) )+cell_sz*4);
    }
    else {
        width = cell_sz * 14;
        height = cell_sz * 14;
    }
    container.setAttribute('style','width:'+width+'px; height:'+height+'px;');
    for (var i = 0; i < a.length; i++) {
        var row = document.createElement('tr');
        row.setAttribute('class','row');
        for (var j = 0; j < a[i].length; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('id',i+'_'+j);
            cell.setAttribute('class','cell '+css_cell_code(a[i][j]));//+ ' '+document.querySelector('#cell_sz').options[document.querySelector('#cell_sz').selectedIndex].text);
            //cell.setAttribute('style', 'width:'+ 0.8 * cell_sz+'px; height:' + 0.8 * cell_sz + 'px;');
            //flow += " style='top:" + (cell_sz * i) + "; left:" + (cell_sz * j) + ";";
            //cell.innerHTML = a[i][j]; // i +'_'+ j +' <b>'+ a[i][j] + '</b>';
            cell.innerHTML='&nbsp';
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    document.querySelector('#display').appendChild(container);
}

function main(a){
   print_maze(a,50);
}