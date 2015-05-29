/**
*@author  Cédric Berland & Matthieu Bernard
*/


/*
* Activation ou désactivation de l'extension
*/
var activer = document.getElementById("gettingActive"),
	desactiver = document.getElementById("gettingInactive"),
	toggleONOFF = document.getElementById("myonoffswitch");
	
	
var textArea = document.getElementById('wordarea');
	textArea.style.backgroundColor = '#ffffff';

	

	
var isActive = true;
	
activer.addEventListener("click", activation);
desactiver.addEventListener("click", desactivation);







var reload = document.getElementById("reload");
	reload.addEventListener('click', reloadPage);

	
var printer = document.getElementById("afficher");
	printer.addEventListener('click', giveKeyWord);
	
var Highlighteur = document.getElementById("bouttonContent");
	Highlighteur.addEventListener('click', Highlighting);

var buttonGoogle = document.getElementById("recherche");
	buttonGoogle.addEventListener('click', launchGoogle);
	
	

var currentState = localStorage.currentState || "start";

//update button status
if(currentState==="stop"){
	toggleONOFF.checked = false;
	desactivation();
}

function activation() {
	
	textArea.style.backgroundColor = '#ffffff';
	textArea.disable = false;

	isActive = true;
	
    localStorage.currentState="start";
}

function desactivation() {	
	reloadPage();
	
	textArea.style.backgroundColor = '#7f8c8d';
	textArea.disabled = true;

	clearTextArea();
	isActive = false;
	
	
    localStorage.currentState="stop";
}


/*
* Update du nombre de mot pour le slider
*/

var inp = document.getElementById("rangeInput"),
	nbmots = document.getElementById("nbmots");
	
updateNbmots();
inp.addEventListener('input', updateNbmots);





function updateNbmots() {
	nbmots.innerHTML = inp.value;
}
function getSliderValue (){
	return inp.value;
}




/*
*Modification Topic Ou Text
*/

var topicbtt = document.getElementById("toTopic"),
	textbtt = document.getElementById("toText");

var isText = true;

topicbtt.addEventListener("click", versTopic);
textbtt.addEventListener("click", versText);


function versTopic() {
	isText = false;
}

function versText() {
	isText = true;
}

/*
* Fonction utilisant le Text Area
*/


function clearTextArea()
{
	textArea.value = "";
}
function copyTextArea()
{
	var copy = textArea.value;
	return copy;
}
function addToTextArea(args) 
{
	textArea.value += args;
}
function giveKeyWord() 
{
	if(isActive) 
	{
		clearTextArea();
		var max = getSliderValue();
		
		if(isText) {
		
			chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
			var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, {"message": "getText", "text":" "}, function(response) {				
					var keys = "";
					for(var i = 0; i< max-1; i++)
					{
						keys += ( response[i] + "\n");
					}
					keys+=response[max-1];
					addToTextArea(keys);
				});
			});
		} else {
			addToTextArea("Veuillez patienter un instant...");
		
		
			chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
			var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, {"message": "getTopic", "text":" "}, function(response) {				
					clearTextArea();
					var keys = "";
					for(var i = 0; i< max-1; i++)
					{
						keys += ( response[i] + "\n");
					}
					keys+=response[max-1];
					addToTextArea(keys);
				});
			});
		}
	} else 
	{
		alert("L'extension n'est pas activée");
	}
}


function reloadPage() {
   
	if(isActive) 
	{
   chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {"message": "reload", "text":" "});
	});
	} else 
	{
		alert("L'extension n'est pas activée");
	}
}





/*
*TEST DU CONTENT.JS
*/

function Highlighting() {        
	
	if(isActive) 
	{
	 chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
	var toHighlight = copyTextArea().replace(/\n/g, "|");
	
    chrome.tabs.sendMessage(activeTab.id, {"message": "highlight", "text":toHighlight});
   });
	} else 
	{
		alert("L'extension n'est pas activée");
	}
}



function launchGoogle() 
{
	if(isActive) 
	{
 
	var url = "http://www.google.fr/search?q=";
	var text = copyTextArea();
	text = text.replace(/\n/g, "+");
	url = url+text;
		String(url);
	rechercheGoogle(url);
	} else 
	{
		alert("L'extension n'est pas activée");
	}
}


function rechercheGoogle(args){
	window.open(args);
	}
