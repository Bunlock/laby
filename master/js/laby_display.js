// affiche un tableau 2D
function print_2d_array(a) {
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a[i].length; j++) {
            document.write(a[i][j] + " ");
        }
        document.write("<br/>");
    }
}

function generate_display(){
    /*
     <table id="maze">
     <tr>
     <td class="bN bW">&nbsp;</td>
     <td class="bN bE bS">&nbsp;</td>
     <td class="bN bW">&nbsp;</td>
     <td class="bN bS bE">&nbsp;</td>
     </tr>
     <tr>
     <td class="bW bE">&nbsp;</td>
     <td class="bN bW bS">&nbsp;</td>
     <td class="bE">&nbsp;</td>
     <td class="bW bE bN">&nbsp;</td>
     </tr>
     <tr>
     <td class="bW bS">&nbsp;</td>
     <td class="bN bE">&nbsp;</td>
     <td class="bE bW">&nbsp;</td>
     <td class="bW bE">&nbsp;</td>
     </tr>
     <tr>
     <td class="bN bS bW">&nbsp;</td>
     <td class="bS">&nbsp;</td>
     <td class="bS">&nbsp;</td>
     <td class="bS bE">&nbsp;</td>
     </tr>
     </table>
    */
    var display = document.querySelector('#display');
    var table = document.createElement('table')
    table.setAttribute('id','maze');
    for (var i = 0; i < document.querySelector('#dimX').value; i++){
        table.insertBefore(document.createElement('tr'), table.firstChild);
        for (var j = 0; j < document.querySelector('#dimY').value; j++){
            var td = document.createElement('td');
            table.firstChild.appendChild(td);
        }
    }
    display.appendChild(table);
}

function main(){
    document.querySelector('#bt-gen').addEventListener('click',function(){
        //var laby = new_2d_array(5, 10);
        //laby = 	generate(laby);
        //print_2d_array(laby);
        generate_display();
    });
}

main();