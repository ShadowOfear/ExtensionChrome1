function TopicRank (tableauDePhrases){
	// IDENTIFICATION DES CANDIDATS
	var compteur = 1;
	var tableauPosition = [];

	var listeTCles = new Array;
	var parcoursListe = 0
			var tCles = "";
	for (i in tableauDePhrases){
		for (var parcours = 2 ; parcours <= tableauDePhrases[i].length ; parcours +=3) { 

			while ((tableauDePhrases[i][parcours-1] == "NN") || (tableauDePhrases[i][parcours-1] == "JJ") || (tableauDePhrases[i][parcours-1] == "NNP") || (tableauDePhrases[i][parcours-1] == "NNS")) {
				tCles+=(tableauDePhrases[i][parcours]+" ")
						parcours = parcours+3;
			}
			if(tCles!=""){
				listeTCles[parcoursListe] = [];
				listeTCles[parcoursListe][0] = [];
				listeTCles[parcoursListe][0] = tCles.split(" ");
				listeTCles[parcoursListe][0].pop();                  //bricolage
				parcoursListe++;

				// ATTRIBUTION DES POSITION DES MOTS

				for(  iAttribution in listeTCles){

					for(jAttribution in listeTCles[iAttribution]) {
						if((tableauPosition[listeTCles[iAttribution][jAttribution]]) === undefined){

							tableauPosition[listeTCles[iAttribution][jAttribution]]=[];
							tableauPosition[listeTCles[iAttribution][jAttribution]].push(compteur);

							compteur++;
						}
					}
				}

				tCles ="";
			}
		}
	}




	//AlGORITHME DE HAC



	// calcul de la moyenne 


	var moyenne;
	var iteration = 0;
	var somme = 0;


	var graph = new Array;
	var graph2 = new Array;
	var similariteJ =0 ;
	var indiceI;
	var indiceJ;


	var tableauSJaccard = similariteJaccard(listeTCles);


	for (iSimilarite in tableauSJaccard){
		for (jSimilarite in tableauSJaccard[iSimilarite]){
			somme+= tableauSJaccard[iSimilarite][jSimilarite];
			iteration++;
		}
	}

	moyenne = somme/iteration;	

	for (iSimilariteBIS in tableauSJaccard) {
		for (jSimilariteBIS in tableauSJaccard[iSimilariteBIS]) {
			comparator = tableauSJaccard[iSimilariteBIS][jSimilariteBIS];
			if(similariteJ<comparator) {
				similariteJ = comparator;
				indiceI = iSimilariteBIS;
				indiceJ = jSimilariteBIS;
			}
		}
	}
	listeTCles[indiceI].push(listeTCles[indiceJ]);

	listeTCles[indiceJ].pop();




	while(similariteJ>moyenne){
		similariteJ = 0;
		tableauSJaccard = similariteJaccard(listeTCles);


		for (iSimilariteBIS in tableauSJaccard){
			for (jSimilariteBIS in tableauSJaccard[iSimilariteBIS]){
				comparator = tableauSJaccard[iSimilariteBIS][jSimilariteBIS];

				if(similariteJ<comparator){

					similariteJ = comparator;
					indiceI = iSimilariteBIS;
					indiceJ = jSimilariteBIS;

				}
			}
		}	        
		listeTCles[indiceI].push(listeTCles[indiceJ]);

		listeTCles[indiceJ]=null


				graph[indiceI]= listeTCles[indiceI]


	}




	//CREATION DU GRAPHE COMPLET

	for(z in graph) {
		graph2[z]=[]
				for(w in graph) {
					if(z!=w){

						graph2[z][w] = poids(graph[z], graph[w], tableauPosition)
					}
				}
	}

	// DEBUT TEXTRANK


	var lambda = 0.85;
	var seuil = 0.0001;
	var sum1;
	var sum2;
	var num =0 ;
	var Wjk = 0;
	var iter = 0;
	var tmp = 0;
	var wS = [];

	for(i in graph) {
		wS.push(graph2[i])
		wS[graph2[i]] = 1
	}


	// ALGO


	var h = 0
			var wS2 = []
					for(m in graph) {

						sum1=0;
						wS2[graph2[m]]=wS[graph2[m]]
								for(k in graph[m]){
									if((k!=0)&&(m!=k)){


										var temp1 = graph2[m][k]
												var temp2 = wS[graph2[k]]
														h =temp1 * temp2

														sum2 = 1
														for ( j in graph[k] ) {
															if((j!=0)&&(j!=k)){

																Wjk = graph2[k][j]
																		sum2 += Wjk


															}
														}

										sum1 += h / sum2


									}	
								}

						wS[graph2[m]] = ((1-lambda) + (lambda*sum1))
								if(isNaN (wS[graph2[m]]) == true){
									wS[graph2[m]] = 0.1}

					}







	while(iter<10000){


		var h = 0



				for(m in graph) {



					sum1=0;
					var difference = wS2[graph2[m]] - wS[graph2[m]]

							if (difference<0){
								difference = -difference
							}

					if(difference > seuil){
						wStemp = wS[graph2[m]]
								wS2[graph2[m]]=wStemp


								for(k in graph[m]){
									if((k!=0)&&(m!=k)){


										var temp1 = graph2[m][k]
												var temp2 = wS2[graph2[k]]
														h =temp1 * temp2

														sum2 = 1
														for ( j in graph[k] ) {
															if((j!=0)&&(j!=k)){

																Wjk = graph2[k][j]
																		sum2 += Wjk


															}
														}

										sum1 += h / sum2


									}
								}

						wS[graph2[m]] = ((1-lambda) + (lambda*sum1))
								if(isNaN (wS[graph2[m]]) == true){
									wS[graph2[m]] = 0.1}



					} 
				}
		iter++
	}
	/*for (iii in graph){
			alert(wS[graph2[iii]]  + "graph m final " + graph[iii])
			}
	 */




	var topDixTemp=[]

			for (var parcoursG = 0 ; parcoursG < 10; parcoursG++)
			{
				var maximum = 0
						var place = 0;
				for ( parcoursWS in  graph){

					var motF = wS[graph2[parcoursWS]]

							if ( maximum < motF ){

								maximum = motF

										place = parcoursWS

							}			
				}


				topDixTemp.push(graph[place][0][0])
				wS[graph2[place]] =0


			}
	
	return topDixTemp;
}  





// LES FONCTIONS

function poids(si, sj, tableauPosition) {
	var sum1=0;
	var sum2 = 0;

	for(i in si) {
		ci = si[i];
		for(j in sj){
			cj = sj[j];
			sum2 += dist(ci, cj, tableauPosition);

		}
		sum1 += sum2;
	}
	return sum1;
}

function dist(ci, cj,tableauPosition) {
	var pi;
	var pj;
	var sum1=0;
	var sum2 =0 ;

	for (positionI in tableauPosition[ci]){
		pi=tableauPosition[ci][positionI]
				for(positionJ in tableauPosition[cj]){
					pj=tableauPosition[cj][positionJ]
							sum2+= 1/(Math.abs(pi-pj))
				}
		sum1+=sum2
	}

	return sum1;
}



function similariteJaccard(listeTCles){

	//GROUPEMENT DES CANDIDATS PAR SUJET ~ SIMILARITE DE JACCARD

	var tableauSJaccard = [];

	for(parcoursC in listeTCles){	
		tableauSJaccard[parcoursC]=[];

		for(parcours2C in listeTCles){
			if(parcours2C!=parcoursC){

				for(iJaccard in listeTCles[parcoursC]) {


					for(jJaccard in listeTCles[parcours2C]){

						var intersection = 0;
						var union = 0;
						var indice = 0;

						for (parcoursiJaccard in listeTCles[parcoursC][iJaccard]){  

							var estDans = false;

							for( level1 in listeTCles[parcours2C][jJaccard]) {

								var mot1 = listeTCles[parcours2C][jJaccard][level1];
								var mot2 = listeTCles[parcoursC][iJaccard][parcoursiJaccard];
								if (mot2 == mot1){

									estDans = true;
								}
							}



							if(estDans == true){  //calcule de l'intersection
								intersection ++;

							}
							union++	;

						}

						for (parcoursjJaccard in listeTCles[parcours2C][jJaccard]){  
							var estDans2 = false; 

							for( level2 in listeTCles[parcoursC][iJaccard]) {

								var mot1 = listeTCles[parcoursC][iJaccard][level2];
								var mot2 = listeTCles[parcours2C][jJaccard][parcoursjJaccard];
								if (mot2 == mot1){

									estDans2 = true;
								}
								if (estDans2 == false) {
									union ++;
								}
							}
						}

						indice = intersection / union;
						tableauSJaccard[parcoursC][parcours2C] = indice;


					}
				}
			}
		}
	}

	return tableauSJaccard;
}


