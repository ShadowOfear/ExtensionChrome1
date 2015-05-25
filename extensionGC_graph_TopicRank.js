function GraphTopicR(tableauFinal) {

	var noeud = new Array;


	//Insertion de tous les mots dans le tableau noeud. pas de répétition de mot dans celui-ci.

	var bool =0;
	for(j in tableauFinal){

		for (var parcours = 2 ; parcours <= tableauFinal[j].length ; parcours +=3) { 

			if ((tableauFinal[j][parcours-1] == "NN") ||
					(tableauFinal[j][parcours-1] == "JJ") ||
					(tableauFinal[j][parcours-1] == "RB")  || 
					(tableauFinal[j][parcours-1] == "NNS") ||
					(tableauFinal[j][parcours-1] == "NNP")) {
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


	for(k in tableauFinal){	
		var longueurMin = 17;
		var longueurMax = tableauFinal[k].length -18;
		if(tableauFinal[k].length <17){
			longueurMin = tableauFinal[k].length;
			longueurMax = tableauFinal[k].length;
		}
		
		/* DEBUT PREMIERS MOT DE LA PHRASE */
		for(var i = 2; i<=longueurMin -3; i +=3){
			if(tableauFinal[k][i] in noeud){
				var motDebutDePhrase = tableauFinal[k][i];
				for(j=i -3; j>2; j = j-3){
					if ((tableauFinal[k][j-1] == "NN") || (tableauFinal[k][j-1] == "JJ")
						|| (tableauFinal[k][j-1] == "RB")
						|| (tableauFinal[k][j-1] == "NNS") || (tableauFinal[k][j-1] == "NNP")) {
						bool = 0;	
						for((tableauFinal[k][j]) in noeud[motDebutDePhrase]){
							bool = 1;
						}
						var leMot = tableauFinal[k][j];
						if(bool == 0){
							noeud[motDebutDePhrase].push(leMot);
							noeud[motDebutDePhrase][leMot] = 1;  
						} else {
							noeud[motDebutDePhrase][leMot] += 1;
						}
					}
				}
			}
		}
		
		for(var i = 2; i<=longueurMin -3; i +=3){
			if(tableauFinal[k][i] in noeud){
				var motDebutDePhrase = tableauFinal[k][i];
				for(j=i +3; j<=17 || j<=longueurMax; j = j+=3){
					if ((tableauFinal[k][j-1] == "NN") || (tableauFinal[k][j-1] == "JJ")
						|| (tableauFinal[k][j-1] == "RB")
						|| (tableauFinal[k][j-1] == "NNS") || (tableauFinal[k][j-1] == "NNP")) {
						bool = 0;	
						for((tableauFinal[k][j]) in noeud[motDebutDePhrase]){
							bool = 1;
						}
						var leMot = tableauFinal[k][j];
						if(bool == 0){
							noeud[motDebutDePhrase].push(leMot);
							noeud[motDebutDePhrase][leMot] = 1;  
						} else {
							noeud[motDebutDePhrase][leMot] += 1;
						}
					}
				}
			}
		}
		/* FIN PREMIER MOT DE LA PHRASE */


		/* DEBUT MOT MILIEU PHRASE */
		var indiceDernierMot = (tableauFinal[k].length)-1;
		var indiceAvantDernierMot = indiceDernierMot - 3;

		for(var i = longueurMin; i<=longueurMax; i +=3){
			if(tableauFinal[k][i] in noeud){
				var motActuel = tableauFinal[k][i];
				for(j=i -3; j>=17 || j>=(i-17); j = j-3){
					if ((tableauFinal[k][j-1] == "NN") || (tableauFinal[k][j-1] == "JJ") 
						||  (tableauFinal[k][j-1] == "RB")
						|| (tableauFinal[k][j-1] == "NNS") || (tableauFinal[k][j-1] == "NNP")) {
					bool = 0;	
						for((tableauFinal[k][j]) in noeud[motActuel]){
								bool = 1;
						}
						var leMot = tableauFinal[k][j];
						if(bool == 0){
							noeud[motActuel].push(leMot);
							noeud[motActuel][leMot] = 1;
						}else {
							noeud[motActuel][leMot] += 1;
						}
					}
				}
			for(l=i +3; l<longueurMax || l<(i+17); l = l+3){
				if ((tableauFinal[k][l-1] == "NN") || (tableauFinal[k][l-1]  == "JJ") 
						||  (tableauFinal[k][l-1]  == "RB")
						|| (tableauFinal[k][l-1]  == "NNS") || (tableauFinal[k][l-1]  == "NNP")) {
					bool = 0;
					for((tableauFinal[k][l]) in noeud[motActuel]){ 
							bool = 1;
					}
					var leMot = tableauFinal[k][l];
					if(bool == 0){
						noeud[motActuel].push(leMot);
						noeud[motActuel][leMot] = 1;
					} else {
						noeud[motActuel][leMot] += 1;

					}


				}
			}  
		}
	}
		/* FIN MOT MILIEU PHRASE */


		/* DEBUT DERNIER MOT */
	for(var i = longueurMax; i<=(tableauFinal[k].length -1); i +=3){
			if(tableauFinal[k][i] in noeud){
				var motFinDePhrase = tableauFinal[k][i];
				for(j=i -3; j>=(i-17) || j>= longueurMin; j = j-3){	
					var motFinDePhrase = tableauFinal[k][i];
					if(motFinDePhrase in noeud){
						if ((tableauFinal[k][j-1]  == "NN") || (tableauFinal[k][j-1]  == "JJ")
							|| (tableauFinal[k][j-1]  == "RB")  
							|| (tableauFinal[k][j-1]  == "NNS") || (tableauFinal[k][j-1]  == "NNP")) {
							bool = 0;	
							for((tableauFinal[k][j]) in noeud[motFinDePhrase]){  
								bool = 1;	
							}
							var leMot = tableauFinal[k][j];
							if(bool == 0){
								noeud[motFinDePhrase].push(leMot);
								noeud[motFinDePhrase][leMot] = 1;
							} else {
								noeud[motFinDePhrase][leMot] += 1;
							}
						}
					}
				}

				for(j=i +3; j<=(tableauFinal[k].length -1); j += 3){	
					var motFinDePhrase = tableauFinal[k][i];
					if(motFinDePhrase in noeud){
						if ((tableauFinal[k][j-1]  == "NN") || (tableauFinal[k][j-1]  == "JJ")
							|| (tableauFinal[k][j-1]  == "RB")  
							|| (tableauFinal[k][j-1]  == "NNS") || (tableauFinal[k][j-1]  == "NNP")) {
							bool = 0;	
							for((tableauFinal[k][j]) in noeud[motFinDePhrase]){  
								bool = 1;	
							}
							var leMot = tableauFinal[k][j];
							if(bool == 0){
								noeud[motFinDePhrase].push(leMot);
								noeud[motFinDePhrase][leMot] = 1;
							} else {
								noeud[motFinDePhrase][leMot] += 1;
							}
						}
					}
				} 
			}
		}
	}
	/* FIN DERNIER MOT */
	
	
	return noeud;
}