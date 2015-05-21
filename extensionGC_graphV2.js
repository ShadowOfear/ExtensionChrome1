function GraphTR(tableauFinal) {

	var noeud = new Array;


	//Insertion de tous les mots dans le tableau noeud. pas de répétition de mot dans celui-ci.

	var bool =0;
	for(j in tableauFinal){


		for (var parcours = 2 ; parcours <= tableauFinal[j].length ; parcours +=3) { 

			if ((tableauFinal[j][parcours-1]== "NN") || (tableauFinal[j][parcours-1]== "JJ") || 
					(tableauFinal[j][parcours-1] == "CD") || 
					(tableauFinal[j][parcours-1] == "RB")  || 
					(tableauFinal[j][parcours-1] == "NNS") || (tableauFinal[j][parcours-1] == "NNP")) {
				motTesteNoeud= tableauFinal[j][parcours];

				bool = 0;

				for (var goFast = 0; goFast<noeud.length; goFast += 1){

					if (motTesteNoeud == noeud[goFast]) {   
						bool = 1;

					}
				}
				if(bool == 0){
					noeud.push(motTesteNoeud);
					var temp = motTesteNoeud
					noeud[temp] = []

				}
			}					
		}
	}

//	noeud["french"].push("gg");
//	noeud["french"].push("g5665565gg");
//	noeud["french"].push("ggggg");




	for(k in tableauFinal){	

		/* DEBUT PREMIER MOT DE LA PHRASE */

		if(tableauFinal[k][motDebutDePhrase] in noeud){
			var motDebutDePhrase = tableauFinal[k][2];	
			if ((tableauFinal[k][4] == "NN") || (tableauFinal[k][4] == "JJ")
					|| (tableauFinal[k][4] == "CD") || (tableauFinal[k][4] == "RB")
					|| (tableauFinal[k][4] == "NNS") || (tableauFinal[k][4] == "NNP")) {
				bool = 0;	
				for((tableauFinal[k][5]) in noeud[motDebutDePhrase]){
					//for (var goFast = 0; goFast<noeud[motDebutDePhrase].length; goFast += 1){
					//if ((tableauFinal[k][5]) == noeud[motDebutDePhrase][goFast]) {   
					bool = 1;
					//}
				}

				var leMot = tableauFinal[k][5];
				if(bool == 0){
					noeud[motDebutDePhrase].push(leMot);
					noeud[motDebutDePhrase][leMot] = 1;  
				} else {
					noeud[motDebutDePhrase][leMot] += 1;
				}
			}
		}

		/* FIN PREMIER MOT DE LA PHRASE */

		/* DEBUT MOT MILIEU PHRASE */
		var indiceDernierMot = (tableauFinal[k].length)-1;
		var indiceAvantDernierMot = indiceDernierMot - 3;


		for (var indiceActuel = 5 ; indiceActuel <= indiceAvantDernierMot ; indiceActuel +=3 ) {

			var motActuel = tableauFinal[k][indiceActuel];
			if(tableauFinal[k][indiceActuel] in noeud){

				if ((tableauFinal[k][indiceActuel-4] == "NN") || (tableauFinal[k][indiceActuel-4] == "JJ") 
						|| (tableauFinal[k][indiceActuel-4] == "CD")
						||  (tableauFinal[k][indiceActuel-4] == "RB")
						|| (tableauFinal[k][indiceActuel-4] == "NNS") || (tableauFinal[k][indiceActuel-4] == "NNP")) {
					if(tableauFinal[k][indiceActuel] == "helicopt"){

					}
					bool = 0;	
					//for((tableauFinal[k][indiceActuel-3]) in noeud[motActuel]){
					for (var goFast = 0; goFast<noeud[motActuel].length; goFast += 1){

						if ((tableauFinal[k][indiceActuel-3]) == noeud[motActuel][goFast]) { 
							bool = 1;	
						}
					}
					var leMot = tableauFinal[k][indiceActuel-3];
					if(bool == 0){
						noeud[motActuel].push(leMot);
						noeud[motActuel][leMot] = 1;

					}
					else {
						noeud[motActuel][leMot] += 1;
					}
				}

				if ((tableauFinal[k][indiceActuel+2] == "NN") || (tableauFinal[k][indiceActuel+2]  == "JJ") 
						|| (tableauFinal[k][indiceActuel+2]  == "CD") 
						||  (tableauFinal[k][indiceActuel+2]  == "RB")
						|| (tableauFinal[k][indiceActuel+2]  == "NNS") || (tableauFinal[k][indiceActuel+2]  == "NNP")) {


					bool = 0;	

					for (var goFast = 0; goFast<noeud[motActuel].length; goFast += 1){
						if ((tableauFinal[k][indiceActuel+3]) == noeud[motActuel][goFast]) { 
							bool = 1;	
						}
					}
					var leMot = tableauFinal[k][indiceActuel+3];
					if(bool == 0){
						noeud[motActuel].push(leMot);
						noeud[motActuel][leMot] = 1;
					} else {
						noeud[motActuel][leMot] += 1;

					}


				}
			}  
		}

		/* FIN MOT MILIEU PHRASE */


		/* DEBUT DERNIER MOT */

		var motFinDePhrase = tableauFinal[k][indiceDernierMot];



		if(motFinDePhrase in noeud){


			if ((tableauFinal[k][indiceDernierMot-4]  == "NN") || (tableauFinal[k][indiceDernierMot-4]  == "JJ")
					|| (tableauFinal[k][indiceDernierMot-4]  == "CD") 
					|| (tableauFinal[k][indiceDernierMot-4]  == "RB")  
					|| (tableauFinal[k][indiceDernierMot-4]  == "NNS") || (tableauFinal[k][indiceDernierMot-4]  == "NNP")) {

				bool = 0;	

				for (var goFast = 0; goFast<noeud[motFinDePhrase].length; goFast += 1){
					if ((tableauFinal[k][indiceDernierMot-3]) == noeud[motFinDePhrase][goFast]) { 
						bool = 1;	
					}
				}
				var leMot = tableauFinal[k][indiceDernierMot-3];
				if(bool == 0){
					noeud[motFinDePhrase].push(leMot);
					noeud[motFinDePhrase][leMot] = 1;
				} else {
					noeud[motFinDePhrase][leMot] += 1;
				}

			}
		}

	}				
	/* FIN DERNIER MOT */
	return noeud;
}