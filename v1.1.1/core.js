chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "start" ) {
			var mess = request.test;
			start();
             }
		if(request.message === "highlight") {
			var textH = request.text;
			highlight(textH);
		}
		
		if(request.message === "getText") {
		
			var returnText = [];
			returnText = mainText();
			
			sendResponse(returnText);
		}
		
		if(request.message === "getTopic") {
			
			var returnTopic = [];
			
			
			//A MODIFIER AVEC UN FUTUR mainTopic();
			returnTopic = mainTopic();
			
			
			sendResponse(returnTopic);
			
		}
		if(request.message === "reload") {
			location.reload();
		}
      }
    );
	
	function highlight(text)
	{
		document.getElementById("mw-content-text").innerHTML = document.getElementById("mw-content-text").innerHTML.replace(/<\/?[^>]+>/g, "");
		document.getElementById("mw-content-text").innerHTML = document.getElementById("mw-content-text").innerHTML.replace(
			new RegExp('('+text+')[\\w]*', 'g'),
			'<span style="background-color:#ff0;font-size:100%">$&</span>'
		);
	}









function mainText() {


			/* RECUPERAGE TITRE */
			
			var titre = document.getElementById("firstHeading").innerHTML;
			titre = titre + ". ";
			
			
			/* FIN RECUPERAGE TITRE */
			var trevzh = preTraitement(titre);
			
			/* DEBUT RECUPERAGE TEXTE ET PRETRAITEMENT*/
		
			var texteBrut = titre + document.getElementById("mw-content-text").innerHTML;
			var textePreTraite = preTraitement(texteBrut);

			
			
			/* SEPARTION EN PHRASE */
			
			var tableauDePhrase = textePreTraite.split(".");
			var longueur = tableauDePhrase.length;
			var tableauFinal = {};
			


			/* POSTAGG */
			var resultatPOSTAG ;
			var mot;
			var longueurTableauDeMot= 0;
			
			
			for (var level1  = 0 ; level1 < tableauDePhrase.length ; level1++){
			//for (level1 in tableauDePhrase){
					var  tableauDeMot = tableauDePhrase[level1].split(" ");
					longueurTableauDeMot = tableauDeMot.length;
					for (var m = 0 ; m<(longueurTableauDeMot); m++){
					
						mot = tableauDeMot[m];
						
						if(POSTAG(mot) != "NNP") {
						mot = mot.toLowerCase();
						}
						resultatPOSTAG = POSTAG(mot);
						tableauDeMot[m] = [];
						tableauDeMot[m][0] = mot;
						tableauDeMot[m][1] = resultatPOSTAG;
						tableauDeMot[m][2] = Stemming(mot);
					}	
					  tableauFinal[level1]= [];
					var boucle = 0; //pk ne pas déclarer boucle avant, evite les multiples variables
					for (var celluleMot = 0 ; celluleMot < longueurTableauDeMot; celluleMot ++){
						
						if(tableauDeMot[celluleMot][1] != "CD"){
						tableauFinal[level1][boucle] = tableauDeMot[celluleMot][0];
						tableauFinal[level1][boucle+1] = tableauDeMot[celluleMot][1];					
						tableauFinal[level1][boucle+2] = tableauDeMot[celluleMot][2];
						boucle+=3;
						}
					}
			}
			
			
			
	var noeud;
	noeud = GraphTR(tableauFinal);


	var topDIX = TextRank(noeud);


	//TOPDIX REPRESENTE LE TABLEAU FINAL DE CLASSEMENT
	
	
	
	return topDIX;

}




function mainTopic() {


			/* RECUPERAGE TITRE */
			
			var titre = document.getElementById("firstHeading").innerHTML;
			titre = titre + ". ";
			
			
			/* FIN RECUPERAGE TITRE */
			var trevzh = preTraitement(titre);
			
			/* DEBUT RECUPERAGE TEXTE ET PRETRAITEMENT*/
		
			var texteBrut = titre + document.getElementById("mw-content-text").innerHTML;
			var textePreTraite = preTraitement(texteBrut);

			
			
			/* SEPARTION EN PHRASE */
			
			var tableauDePhrase = textePreTraite.split(".");
			var longueur = tableauDePhrase.length;
			var tableauFinal = [];
			


			/* POSTAGG */
			var resultatPOSTAG ;
			var mot;
			var longueurTableauDeMot= 0;
			
			
			for (var level1  = 0 ; level1 < tableauDePhrase.length ; level1++){
			//for (level1 in tableauDePhrase){
					var  tableauDeMot = tableauDePhrase[level1].split(" ");
					longueurTableauDeMot = tableauDeMot.length;
					for (var m = 0 ; m<(longueurTableauDeMot); m++){
					
						mot = tableauDeMot[m];
						
						if(POSTAG(mot) != "NNP") {
						mot = mot.toLowerCase();
						}
						resultatPOSTAG = POSTAG(mot);
						tableauDeMot[m] = [];
						tableauDeMot[m][0] = mot;
						tableauDeMot[m][1] = resultatPOSTAG;
						tableauDeMot[m][2] = Stemming(mot);
					}	
					  tableauFinal[level1]= [];
					var boucle = 0; //pk ne pas déclarer boucle avant, evite les multiples variables
					for (var celluleMot = 0 ; celluleMot < longueurTableauDeMot; celluleMot ++){
						
						if(tableauDeMot[celluleMot][1] != "CD"){
						tableauFinal[level1][boucle] = tableauDeMot[celluleMot][0];
						tableauFinal[level1][boucle+1] = tableauDeMot[celluleMot][1];					
						tableauFinal[level1][boucle+2] = tableauDeMot[celluleMot][2];
						boucle+=3;
						}
					}
			}
			
			
			

	var topDIX = TopicRank(tableauFinal);

	//TOPDIX REPRESENTE LE TABLEAU FINAL DE CLASSEMENT
	
	
	
	return topDIX;

}







	
	function getText() {
		var toTestMatrice = [[]];
		toTestMatrice = [["fjiozbhc", "0"], ["vfzeacbi", "1"], ["nczebcej","5"]];
		return toTestMatrice;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	