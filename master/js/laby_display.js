/* fonction d'affichage du labyrinthe en DOM.
 */
function print_maze(a, cell_sz) {
    var container = document.createElement('div');
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
        var row = document.createElement('div');
        row.setAttribute('class','row');
        for (var j = 0; j < a[i].length; j++) {
            var cell = document.createElement('div');
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
function generate_display(x,y){
    var a;
    if (document.querySelector('#dimX') && document.querySelector('#dimY')) {
        a = new_2d_array(
            parseInt(document.querySelector('#dimX').value),
            parseInt(document.querySelector('#dimY').value)
        );
    } else a = new_2d_array(x,y);
    var cell_sz = 50;//parseInt(document.querySelector('#cell_sz').options[document.querySelector('#cell_sz').selectedIndex].value) || 50;
    init_2d_array(a, 15);
    //random_init_maze(a);
    dig(a, 0, 0);
    dig_ES(a);
    print_maze(a, cell_sz);
    localStorage.maze = JSON.stringify(a);
    return a;
}

function main(){
    pick_generated();
    if (document.querySelector('#bt-gen')){
            document.querySelector('#bt-gen').addEventListener('click',function(){
               document.querySelector('#display').innerHTML = '';
               generate_display();
            });
    }

}

function pick_generated(){
    var a;
    if (!localStorage.maze) a = new_2d_array(10,10);
    else {a = JSON.parse(localStorage.maze);}
    print_maze(a, 50);
}