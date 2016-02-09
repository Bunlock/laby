function Maze(){};

// Modèle de données : chaque cellule est entourée de 0, 1, 2, 3 ou 4 murs.
// On code la présence de chaque mur par un chiffre binaire distinct :
// 1 pour le mur N, 10 (2) pour le mur E, 100 (4) pour le mur S, 1000 (8) pour le mur W.
// La valeur de chaque cellule est codée par simple somme de ces valeurs selon les murs présents ou pas.


// retourne un tableau de n lignes par m colonnes
Maze.prototype.new_2d_array = function(n, m) {
    if (!(n && m)) return;
    var a = new Array(n);
    for (var i = 0; i < a.length; i++) a[i] = new Array(m);
    return a;
};

// initialise le tableau a en affectant à toutes ses cellules la valeur v
Maze.prototype.init_2d_array = function(a, v) {
    for (var i = 0; i < a.length; i++)
        for (var j = 0; j < a[i].length; j++)
            a[i][j] = v;
};

// initialise le tableau a en affectant à toutes ses cellules la valeur v
Maze.prototype.random_init_maze = function(a) {
    for (var i = 0; i < a.length; i++)
        for (var j = 0; j < a[i].length; j++)
            a[i][j] = Math.floor(Math.random() * 16);
};


// affiche un tableau 2D
Maze.prototype.print_2d_array = function(a) {
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a[i].length; j++) {
            document.write(a[i][j] + " ");
        }
        document.write("<br/>");
    }
};

// fournir un corrigé de ce qui était demandé au TP 1
Maze.prototype.has_N_wall = function(v) { return (v & 1) == 1; }; // retourne vrai ssi le mur N existe
Maze.prototype.has_E_wall = function(v) { return (v & 2) == 2; };
Maze.prototype.has_S_wall = function(v) { return (v & 4) == 4; };
Maze.prototype.has_W_wall = function(v)  { return (v & 8) == 8; };

Maze.prototype.css_cell_code = function(v) {
    return (this.has_N_wall(v) ? "N " : "")
        + (this.has_E_wall(v) ? "E " : "")
        + (this.has_S_wall(v) ? "S " : "")
        + (this.has_W_wall(v) ? "W " : "");
};

// creusement de galeries
// toutes les cellules sont fermées (4 murs => valeur 15)
// on démarre par exemple par la cellule NW et on tire alétoirement l'une des 4 directions possibles
// en prenant soin d'éliminer celles qui mènes soit en dehors du tableau, soit vers une position déjà visitée
// on marque la position de départ comme visitée.
// on se déplace alors vers la position suivante, en faisant sauter une 'cloison'
// on recommence : tirage d'une direction parmi celles qui n'ont pas été déjà visitées.
// etc.. déjà fait - retrouver.
// si toutes les possibilités sont fermées, on revient en arrière (backtracking) jusqu'à la dernière position
// d'où pertaient plusieurs choix
// => A concevoir sur papier + réaliser et teste
// finalement : on se donne un point d'entrée et un point de sortie en désignant deux côtés
//


// une cellule a été explorée ssi elle n'a plus ses 4 murs (i.e. son code diffère de 15)
// donne la liste des cellules adjacentes à la cellule i, j qui n'ont pas encore été visitées
Maze.prototype.explorable = function(laby, i, j) {
    var a = []; // création d'un tableau vide
    var k = 0;
    if (i > 0)                  if (laby[i - 1][j] == 15) a[k++] = 1;
    if (j < laby[0].length - 1) if (laby[i][j + 1] == 15) a[k++] = 2;
    if (i < laby.length - 1)    if (laby[i + 1][j] == 15) a[k++] = 4;
    if (j > 0)                  if (laby[i][j - 1] == 15) a[k++] = 8;
    return a;
};

// tirage aléatoire d'une direction parmi les 1, 2, 3 ou 4 fournies
Maze.prototype.dig = function(laby, i, j) {
    //console.log("dig(" + i + ", " + j + ")");
    var a = this.explorable(laby, i, j); // on récupère celles des 4 cellules adjacentes qui n'ont pas encore été explorées
    // s'il n'en existe aucune, on ne poursuit pas et on retourne 0 (aucun mur na été creusé)
    if (a.length == 0) return 0;
    // s'il en existe au moins une, on effectue un tirage aléatoire pour choisir l'une d'entre elles
    var dir = Math.floor(Math.random() * a.length);
    // on fait tomber la cloison qui sépare la cellule courante de la cellule adjacente choisie
    laby[i][j] -= a[dir];
    // et on relance récursivement l'algorithme sur la cellule adjacente sélectionnée
    switch (a[dir]) {
        case 1 : laby[i - 1][j] -= 4; this.dig(laby, i - 1, j); break;
        case 2 : laby[i][j + 1] -= 8; this.dig(laby, i, j + 1); break;
        case 4 : laby[i + 1][j] -= 1; this.dig(laby, i + 1, j); break;
        case 8 : laby[i][j - 1] -= 2; this.dig(laby, i, j - 1); break;
    }
    // l'algorithme se relance sur la cellule courante (backtracking) au cas où il lui resterait des voisines à explorer
    this.dig(laby, i, j);
};

// creuse une entrée et une sortie
Maze.prototype.dig_ES = function (a) {
    return [a[Math.floor(Math.random() * a.length)][0] -= 8, a[Math.floor(Math.random() * a.length)][a[0].length - 1] -= 2];
};

module.exports = Maze;