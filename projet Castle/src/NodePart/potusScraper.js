var cheerio = require('cheerio');
var rp = require('request');
var fs = require('fs');

const url = 'https://www.relaischateaux.com/fr/site-map/etablissements';
const url2='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/'

var comptRelaisChateaux = 0;
var urlHotel = [];
var nomHotel = [];
var hotelRestoEtoile = [];//Liste des hotels
var urlhotelRestoEtoile = [];
var hotelEtoile = [];
var prixHotelEtoile =[];
var prixHotel = [];
var urlPhoto =[];
var restaurantFini=false;
var hotelFini = false;
var listeHotel ={
    hotelEtoile,
    prixHotel,
    urlPhoto
}
var suppressionResto =false;
rp(url, function (err, resp, body) {
    const $ = cheerio.load(body);
    //console.log(url);

    $("#countryF").each(function (part1) {

        if ($(this).find("h3").text() === 'France') {
            $(this).find("li").each(function (part2) {
                $(this).find("a").each(function (part3) {
                    if (part3 == 0) {//Premier lien de la dataset de la ligne
                        nomHotel[comptRelaisChateaux] = $(this).filter("a").text().trim();
                        urlHotel[comptRelaisChateaux] = $(this).attr("href").trim();
                        //console.log(nomHotel[comptRelaisChateaux]);
                        comptRelaisChateaux++;
                       	
                    }
                })
            })
        }
        //console.log(compt);
        if(comptRelaisChateaux==150)
        {
        	hotelFini=true;
        	HotelAvecUneEtoile();
        }
    })
});
var nomRestaurant = [];
var comptMichelin=0;
var url3;
for (var i = 1; i < 36; i++) {
	url3=url2;
	if(i!=1)
	{
		url3+="page-"+i;
	}
	rp(url3, function (err, resp, body) {
    const $ = cheerio.load(body);


    $(".poi-search-result").each(function (part1) {
    	//console.log($(this).find("li").text());
            $(this).find("li").each(function (part2) {
            	//console.log($(this).find(".poi_card-details").text());
            	$(this).find(".poi_card-details").each(function (part3) {
            		nomRestaurant[comptMichelin]=$(this).find(".poi_card-display-title").text().trim();
                    comptMichelin++; 
            	})
        })
            if(i==36)
            {
            	restaurantFini=true;
            	HotelAvecUneEtoile();
            }
    })
});
}
HotelAvecUneEtoile =function(){
    var comptCompare =0;
    var interHotel = [];
    var hotelEtoileFini =false;
    var regex = /(?:Hôtel Restaurant |Hôtel | Restaurants & Spa|Château de |Restaurant | Hotel & Spa| Parc & Spa|Hameau | & Spa| Bouliac)/gi;
    
	if(restaurantFini && hotelFini){

	for (var i = 0; i < nomHotel.length; i++) {
        interHotel[i] = JSON.parse(JSON.stringify(nomHotel[i].replace(regex, '')));
        //console.log(interHotel[i]);
            if(nomRestaurant.indexOf(interHotel[i])>=0){
                hotelRestoEtoile[comptCompare]=nomHotel[i];
                urlhotelRestoEtoile[comptCompare]=urlHotel[i];
				//console.log(hotelRestoEtoile[comptCompare]);
				comptCompare++;
            }
            else if(nomHotel[i]=="Abbaye de la Bussière" || nomHotel[i]=="Château de la Treyne" || nomHotel[i]=="Auberge de l’Île Barbe" || nomHotel[i]=="Auberge des Glazicks"|| nomHotel[i]=="Auberge du Jeu de Paume"|| nomHotel[i]=="Baumanière Hôtel & Spa"|| nomHotel[i]=="Brittany & Spa" || nomHotel[i]=="Château Lafaurie-Peyraguey Hôtel & Restaurant LALIQUE" || nomHotel[i]=="Château de Bagnols"|| nomHotel[i]=="Château de Berne"|| nomHotel[i]=="Château de La Chèvre d’Or"|| nomHotel[i]=="Château de Mercuès"|| nomHotel[i]=="Château de Mirambeau" || nomHotel[i]=="Château de Montreuil" || nomHotel[i]=="Château de Valmer"|| nomHotel[i]=="Château d’Adoménil"|| nomHotel[i]=="Clarance Hôtel"|| nomHotel[i]=="Domaine Les Crayères" || nomHotel[i]=="Domaine d’Auriac" || nomHotel[i]=="Georges Blanc Parc & Spa"|| nomHotel[i]=="Hameau Albert Ier"|| nomHotel[i]=="Hotel & Restaurant Thierry Drapeau"|| nomHotel[i]=="Hotel Ile de la Lagune Thalasso & Spa" || nomHotel[i]=="Hôtel & Spa du Castellet" || nomHotel[i]=="Hôtel Les Barmes de l'Ours" || nomHotel[i]=="Hôtel Restaurant Auberge du Père Bise – Jean Sulpice" || nomHotel[i]=="Hôtel Restaurant Clos des Sens - Laurent PETIT"|| nomHotel[i]=="Hôtel du Bois Blanc"|| nomHotel[i]=="Hôtel et Restaurant Régis et Jacques Marcon"|| nomHotel[i]=="Hôtel-Spa La Bouitte – Restaurant René et Maxime Meilleur" || nomHotel[i]=="La Bastide Saint-Antoine" || nomHotel[i]=="La Bastide de Saint-Tropez"|| nomHotel[i]=="La Chapelle Saint-Martin"|| nomHotel[i]=="La Côte Saint Jacques & Spa"|| nomHotel[i]=="La Ferme Saint-Siméon"|| nomHotel[i]=="La Maison d'Uzès" || nomHotel[i]=="La Maison des Bois – Marc Veyrat" || nomHotel[i]=="La Pyramide Patrick Henriroux"|| nomHotel[i]=="La Signoria & Spa"|| nomHotel[i]=="La Villa Archange"|| nomHotel[i]=="Le Chambard" || nomHotel[i]=="Le Château de Beaulieu" || nomHotel[i]=="Le Couvent des Minimes Hôtel & Spa L'Occitane"|| nomHotel[i]=="Le Grand Véfour"|| nomHotel[i]=="Le Petit Nice-Passedat"|| nomHotel[i]=="Le Phébus & Spa - Villa des Anges" || nomHotel[i]=="Le Prieuré Baumanière" || nomHotel[i]=="Le Relais Bernard Loiseau – Spa Loiseau des Sens" || nomHotel[i]=="Le Saint-James Bouliac" || nomHotel[i]=="Le Suquet, Sébastien Bras"|| nomHotel[i]=="Les Hauts de Loire"|| nomHotel[i]=="Les Maisons de Bricourt"|| nomHotel[i]=="Les Prés d’Eugénie - Maison Guérard" || nomHotel[i]=="L’Arnsbourg Restaurant et Hôtel" || nomHotel[i]=="L’Hôtel de Toiras & Villa Clarisse"|| nomHotel[i]=="Maison Doucet"|| nomHotel[i]=="Maison Pic"|| nomHotel[i]=="Monte-Carlo Beach"|| nomHotel[i]=="Moulin de l’Abbaye" || nomHotel[i]=="Royal Champagne Hotel & Spa" || nomHotel[i]=="Troisgros"|| nomHotel[i]=="Villa Florentine"|| nomHotel[i]=="Yoann Conte – Bord du Lac Hôtel Restaurant")          {
                hotelRestoEtoile[comptCompare]=nomHotel[i];
                urlhotelRestoEtoile[comptCompare]=urlHotel[i];
				//console.log(hotelRestoEtoile[comptCompare]);
				comptCompare++;
            }

            if(i==149)
                hotelEtoileFini=true;
    }
    if(hotelEtoileFini)
        SuppressionRestaurantEtRecupererPrix();
    /*for(var i = 0; i < nomHotel.length; i++){
        console.log(interHotel[i].replace(regex, ''))
    }*/
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
async function SuppressionRestaurantEtRecupererPrix() {
    await sleep(600);
    var comptSuppressionResto = 0;

    var siteExiste = [];


    for (var index = 0; index < hotelRestoEtoile.length; index++) {
        await sleep(200);
        const temp = index;
        var urlHotel = urlhotelRestoEtoile[index];

        rp(urlHotel, function (err, resp, body) {

            try {

                const $ = cheerio.load(body);
                
                siteExiste[temp] = true;

            }
            catch (error) {

                siteExiste[temp] = false;
                console.log("erreur pour le site : "+siteExiste[temp]);
            }

            if (siteExiste[temp]) {

                const $ = cheerio.load(body);

                $(".jsSecondNavMain").each(function (part1) {

                    $(this).find("li").each(function (partie1) {

                        //console.log("index1 :"+indexB);//La valeur est définie

                        $(this).find("a").each(function (partie2) {

                            //console.log("index2 :"+indexB);//La valeur est undefined

                            if ($(this).find("span").text() === 'Hôtel') {

                                if ($(".price").html() != null) {

                                    hotelEtoile[comptSuppressionResto] = hotelRestoEtoile[temp];//De ce fait, hotelEtoile n'a que l'hotel : Yoann Conte – Bord du Lac Hôtel Restaurant sur 75 cases

                                    prixHotel[comptSuppressionResto] = parseInt($(".price").text());

                                    //console.log("index3 :"+comptSuppressionResto + hotelEtoile[comptSuppressionResto]);//La valeur est toujours undefined
                                    urlPhoto[comptSuppressionResto] = $('.hotelHeader-img').attr("data-src");
                                    urlPhoto[comptSuppressionResto] = urlPhoto[comptSuppressionResto].replace("//media.relaischateaux.com/public/hash/", "https://media.relaischateaux.com/public/hash/");
                                    //console.log("index3 :"+comptSuppressionResto + urlPhoto[comptSuppressionResto]);
                                    comptSuppressionResto++;
                                    

                                }

                            }

                            if (comptSuppressionResto == 75) {
                                TriInsertion();

                            }

                        });

                    });

                })

            }

        })

    }

}

async function TriInsertion(){
        console.log("heol=f" + hotelEtoile.length);
        var test=0;
        var inter="";
        var urlInter="";
        await sleep(400);
        if(prixHotel[0]==undefined||hotelEtoile[0]==undefined)
            {
                prixHotel.splice(0,1);
                hotelEtoile.splice(0,1);
            }
        const endFor=hotelEtoile.length;
        prixHotel.splice(75,1);
        hotelEtoile.splice(75,1);
        console.log(endFor);
        for(i=1;i<endFor;i++)     // programme tri par insertion
        {
            await sleep(200);
            const temp=i;
            if(prixHotel[temp]==undefined||hotelEtoile[temp]==undefined)
            {
                prixHotel.splice(temp,1);
                hotelEtoile.splice(temp,1);
                console.log("bonsoir"+hotelEtoile.length);
            }
            test=prixHotel[temp];
            j=temp;
            inter=hotelEtoile[temp];
            urlInter=urlPhoto[temp]; 
            //console.log("oki"+i);       
            while(test<prixHotel[j-1] && j>=1) {
                prixHotel[j]=prixHotel[j-1];
                hotelEtoile[j]=hotelEtoile[j-1];
                urlPhoto[j]=urlPhoto[j-1];
                //console.log("Avant"+j);
                j--;
                //console.log("Après"+j);
            } 
            prixHotel[j]=test;
            hotelEtoile[j]=inter;
            urlPhoto[j]=urlInter;
            if(temp==75)
            {
                /*for (var index = 0; index < hotelEtoile.length; index++) {
                    console.log("Je suis là " + listeHotel.hotelEtoile[index]+" "+prixHotel[index]);
                }*/
                const test = JSON.stringify(listeHotel);
                console.log(test);
                
                fs.writeFile ("bonjourJeMappelleSam.json", test, function(err) {
                    if (err) throw err;
                    console.log('complete');
                    }
                );
            }
        
        }

}
