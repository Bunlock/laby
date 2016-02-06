

/*
 0) Quid du labyrinthe parfait
 1) Modèle de données : les deux alternatives
 2) Algo de génération 1 : creusement de galeries
 3) Algo de génération 2 : fusion de zones
 */

// retourne un tableau de n lignes par m colonnes
function new_2d_array(n, m) {
    if (!(n && m)) return;
    var a = new Array(n);
    for (var i = 0; i < a.length; i++) a[i] = new Array(n);
    return a;
}

// Modèle de données : chaque cellule est entourée de 0, 1, 2, 3 ou 4 côtés.
// On code la présence de chaque coté par un chiffre binaire distinct
// Le masque est le suivant : 1 pour la présence du côté N, 10 (2) pour E, 100 (4) pour S, 1000 (8) pour W
// La valeur de chaque cellule est codée par simple somme de ces valeurs selon les côtés présents ou pas
// les tests de présence de côté sont simplifiés : on utilise un masque binaire pour déterminer si tel ou tel
// côté est présent

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
// => A concevoir sur papier + réaliser et tester
// finalement : on se donne un point d'entrée et un point de sortie en désignant deux côtés
//


// Etudiants => ecrire mail. + support transitionnel => corrigé (pas aux deux autres, pour qu'ils aient l'air con) sur le travail préparatoire à effectuer (tuto JS de la W3schools) + étudier les algos de laby + ce en quoi va consister le prochain TP + fournir un corrigé de ce qui était demandé au TP 1
function has_N_wall(laby, i, j) { return laby[i][j] & 1 == 1; } // retourne vrai ssi le mur N existe
function has_E_wall(laby, i, j) { return laby[i][j] & 2 == 2; }
function has_W_wall(laby, i, j) { return laby[i][j] & 4 == 4; }
function has_S_wall(laby, i, j) { return laby[i][j] & 8 == 8; }

// une cellule a été explorée ssi elle n'a plus ses 4 murs (i.e. son code diffère de 15)

// donne la liste des cellules adjacentes à la cellule i, j qui n'ont pas encore été visitées
function explorable(laby, i, j) {
    var k = 0;
    var a = []; // création d'un tableau vide
    if (i > 0)                  if (laby[i - 1][j] == 15) a[k++] = 1;
    if (j < laby[0].length - 1) if (laby[i][j + 1] == 15) a[k++] = 2;
    if (i < laby.length - 1)    if (laby[i + 1][j] == 15) a[k++] = 4;
    if (j > 0)                  if (laby[i][j - 1] == 15) a[k++] = 8;
    return a;
}

// tirage aléatoire d'une direction parmi les 1, 2, 3 ou 4 fournies
function dig(laby, i, j) {
    var a = explorable(laby, i, j); // on récupère celles des 4 cellules adjacentes qui n'ont pas encore été explorées
    if (a.length > 0) { // s'il en existe au moins une, on effectue un tirage aléatoire pour choisir l'une d'entre elles
        var dir = Math.floor(Math.random() * a.length);
        // on fait tomber la cloison qui sépare la cellule courante de la cellule adjacente choisie
        laby[i][j] -= a[dir];
        // et on relance récursivement l'algorithme sur la cellule adjacente sélectionnée
        switch (a[dir]) {
            case 1 : return dig(laby, i - 1, j);
            case 2 : return dig(laby, i, j + 1);
            case 4 : return dig(laby, i + 1, j);
            case 8 : return dig(laby, i, j - 1);
        }
    }
    // compléter demain en partant d'un dessin : bien gérer le backtracking
}

function generate(a) {
    return dig(laby, 0, 0);
}
/*var laby = new_2d_array(5, 10);
console.log(laby);
laby = 	generate(laby);
console.log(laby);
print_2d_array(
    laby
);*/
