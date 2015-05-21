<script type="text/javascript" src="preTraitement.js"></script> // ?

/* RECUPERAGE TITRE */

var titre = document.getElementById("firstHeading").innerHTML;
titre = titre + ". "


/* FIN RECUPERAGE TITRE */



/* DEBUT RECUPERAGE TEXTE ET PRETRAITEMENT*/

var texteBrut = titre + document.getElementById("mw-content-text").innerHTML;
var textePreTraite = preTraitement(texteBrut);
alert(textePreTraite);

/* SUPPRESSION DES MOTS DE UN OU DEUX CARACTRES */
var tableauSuppression;
var texteRaccourcis ="";
tableauSuppression = textePreTraite.split(' ');

for (var i = 0 ; i < tableauSuppression.length; i++){
	if ((tableauSuppression[i].length==1 ) || (tableauSuppression[i].length==2 ){
		tableauSuppression[i]="";
		texteRaccourcis = texteRaccourcis + " " + tableauSuppression[i];
	}
}

alert(texteRaccourcis);

/*STEMMER*/



/* POS TAGGIN */

