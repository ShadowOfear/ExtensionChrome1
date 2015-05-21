function TextRank(noeuds){


		var lambda = 0.85;
		var seuil = 0.0001;
		var sum1;
		var sum2;
		var num =0 ;
		var Wjk = 0;
		var iter = 0;
		var tmp = 0;
		var wS = [];
		
		 for(var i=0; i<noeuds.length; i++) {
			var mot1 = noeuds[i]
			wS.push(mot1)
			wS[mot1] = 1
				}

      

	
			// ALGO
			
		
		var h = 0
		var wS2 = []
		
		
			for(var m=0; m<noeuds.length; m++) {
			
			
			
				sum1=0;
				sum2 = 1
				var mot2 = noeud[m]
				wS2[mot2]=wS[mot2]
				
				var tableauTemp = noeud[mot2]
						for(var j=0 ; j < tableauTemp.length; j++){
							var mot3 = tableauTemp[j]
							
							var temp1 = noeud[mot2][mot3]

						
							var temp2 = wS[mot2]
							
							h =temp1 * temp2
							
							
						
							var tableauTemp2 = noeud[mot3]
							
							for ( var k = 0 ; k < tableauTemp2.length ; k++ ) {
								var mot4 = tableauTemp2[k]
								
								Wjk = noeud[mot3][mot4]
								
								sum2 += Wjk
							
								
							
							}
							

							
							
						sum1 += h / sum2
						}
							
							wS[mot2] = ((1-lambda) + (lambda*sum1))/10

							
						
						
			}
			
			
			
			

		


						while(iter<10000){
						
								 
								var h = 0
						
						
						
							for(var m=0; m<noeuds.length; m++) {
							
							
							
								sum1=0;
								sum2 = 1
								var mot2 = noeud[m]
								var difference = wS2[mot2] - wS[mot2]
								
								if (difference<0){
								difference = -difference
								}
								
								if(difference > seuil){
								wS2[mot2]=wS[mot2]
								var tableauTemp = noeud[mot2]
										for(var j=0 ; j < tableauTemp.length; j++){
											var mot3 = tableauTemp[j]
											
											var temp1 = noeud[mot2][mot3]
											
											
											var temp2 = wS[mot2]
											h =temp1 * temp2
											
											
										
											var tableauTemp2 = noeud[mot3]
											for ( var k = 0 ; k < tableauTemp2.length ; k++ ) {
												var mot4 = tableauTemp2[k]
												Wjk = noeud[mot3][mot4]
												sum2 += Wjk
												
											
											}
											

											
											
										sum1 += h / sum2
										}
											
											wS[mot2] = ((1-lambda) + (lambda*sum1))/10
											
										
										
							}
						}
						iter++
						}
		

		
	/*for (var ff=0; ff<wS.length; ff++){
		var mot5=wS[ff];
		
		alert(mot5+ " " +wS[mot5]);
		 }
		*/
		
		// TRI (NE MARCHE PAS POUR L'INSTANT)
		
		 


	var en_desordre = 1;
	var indice1,indice2;
 
	for (indice1 = 0; (indice1 < wS.length) && en_desordre; indice1++)
	{
		en_desordre = 0;
		for (indice2= 1; indice2 < (wS.length - indice1); indice2++)
		{
		var motF1 = wS[indice2-1]
		var motF2 = wS[indice2]
		

			if (wS[motF1] >wS[motF2])
			{
				var temporary1 = wS[indice2-1]
				var temporary2 = wS[indice2]
				
				wS[indice2-1] = wS[temporary2]
				wS[indice2] = wS[temporary1]


				en_desordre = 1;
 			}
		}
	}
alert(wS[1])
}
  
 
