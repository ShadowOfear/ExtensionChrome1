


/* FONCTION PRINCIPALE*/

function preTraitement(messageOrigine){

	var resultat
	resultat = supprimerTheme(messageOrigine);
	resultat = supprimerCadre(resultat);
	resultat = supprimerH2(resultat);
	resultat = supprimerDate(resultat);
	resultat = supprimerUL(resultat);

	resultat = supprimerBalise(resultat);
	resultat = supprimerOpinion(resultat);
	resultat = supprimerEInsecable(resultat);

	resultat = supprimerRelated(resultat);
	resultat = supprimerRetour(resultat);
	resultat = supprimerPonctuation(resultat);
	return resultat; //Renvoit un String :F
}

/*FIN FONCTION PRINCIPALE*/

/*SOUS-FONCTION*/


function supprimerBalise(messageOrigine){
	return messageOrigine.replace(/<\/?[^>]+>/g, "");
}
function supprimerPonctuation(messageOrigine){
	var enlevePonctu;
	enlevePonctu = messageOrigine.replace(/,/g,"");
	enlevePonctu = enlevePonctu.replace(/"/g,"");
	enlevePonctu = enlevePonctu.replace(/;/g,"");
	enlevePonctu = enlevePonctu.replace(/'/g," ");
	enlevePonctu = enlevePonctu.replace(/\*/g,"");
	enlevePonctu = enlevePonctu.replace(/'re/g,"");
	enlevePonctu = enlevePonctu.replace(/:/g,"");
	enlevePonctu = enlevePonctu.replace(/“/g,"");
	enlevePonctu = enlevePonctu.replace(/\(/g,"");
	enlevePonctu = enlevePonctu.replace(/\)/g,"");
	enlevePonctu = enlevePonctu.replace(/\[/g,"");
	enlevePonctu = enlevePonctu.replace(/\]/g,"");
	enlevePonctu = enlevePonctu.replace(/\{/g,"");
	enlevePonctu = enlevePonctu.replace(/\}/g,"");
	enlevePonctu = enlevePonctu.replace(/a\.m\./g,"");
	enlevePonctu = enlevePonctu.replace(/p\.m\./g,"");
	enlevePonctu = enlevePonctu.replace(/«/g,"");
	enlevePonctu = enlevePonctu.replace(/»/g,"");
	enlevePonctu = enlevePonctu.replace(/″/g,"");
	enlevePonctu = enlevePonctu.replace(/-/g," ");
	enlevePonctu = enlevePonctu.replace(/\//g,"");
	enlevePonctu = enlevePonctu.replace(/\.\.\.More articles here/g,"");
	enlevePonctu = enlevePonctu.replace(/([A-Z])+\./g,"");
	enlevePonctu = enlevePonctu.replace(/       /g," ");
	enlevePonctu = enlevePonctu.replace(/      /g," ");
	enlevePonctu = enlevePonctu.replace(/     /g," ");
	enlevePonctu = enlevePonctu.replace(/    /g," ");
	enlevePonctu = enlevePonctu.replace(/   /g," ");
	enlevePonctu = enlevePonctu.replace(/  /g," ");
	enlevePonctu = enlevePonctu.replace(/\*\n/g,"");
	enlevePonctu = enlevePonctu.replace(/\*\r/g,"");
	return enlevePonctu;
}



function supprimerH2(messageOrigine){
	return messageOrigine.replace(/<h2[^]+/g,'');
}

function supprimerUL(messageOrigine){
	return messageOrigine.replace(/<li[^]+<\/a><\/li>/g,'');
}

function supprimerDate(messageOrigine){
	return messageOrigine.replace(/id="publishDate"[^]+class="Z3988"/g,'');
}
function supprimerOpinion(messageOrigine){
	return messageOrigine.replace(/Have an opinion on this story\? Post it\!/g,'');
}
function supprimerEInsecable(messageOrigine){
	return messageOrigine.replace(/&nbsp;/g,'');
}
function supprimerTheme(messageOrigine){
	return messageOrigine.replace(/class="mw-redirect">[^]+<\/a><\/b><\/div/,'');
}
function supprimerRelated(messageOrigine){
	return messageOrigine.replace(/Related articles/g,'');
}

function supprimerRetour(messageOrigine){
	return messageOrigine.replace(/\n/g,' ');
}

function supprimerCadre(messageOrigine){
	return messageOrigine.replace(/<div style="background: #bce1ff[^]+div class="thumbcaption">/g,' ');
}


/* FONCTION DU STEMMER*/ 

var Stem = function(lng) {
	var testStemmer = new Snowball(lng);
	return function(word) {
		testStemmer.setCurrent(word);
		testStemmer.stem();
		return testStemmer.getCurrent();
	}
};

function Stemming(motTeste){
	var motStemme;
	motStemme = new Stem("english")(motTeste);		 
	return motStemme

}







/*FIN STEMMER*/

/* POS TAGGIN PHRASE PAR PHRASE*/

function POSTAG(StringTeste){


	var shortTestString = "This is some sample text. This text can contain multiple sentences.";
	var testWords = ["yellow"];

	var lexer = new Lexer();
	var tagger = new POSTagger();
	var start = new Date().getTime();
	var words = lexer.lex(StringTeste);
	var tags = tagger.tag(words);
	var end = new Date().getTime();
	difference = (end - start);
	var phrasePosTAGGED = "";
	for (j in tags) {
		var tag = tags[j];
		return (tag[1]);
	}


}






