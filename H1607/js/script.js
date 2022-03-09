var $date_du_jour = new Date();
var $current_year = $date_du_jour.getFullYear();
var $nb_jours_annee = (($current_year % 4 === 0 && $current_year % 100 > 0) || $current_year % 400 == 0) ? 366 : 365;
var $jour_an;
var $paques;
var $lundi_paques;
var $fete_travail;
var $victoire1945;
var $ascension;
var $pentecote;
var $lundi_pentecote;
var $fete_nationale;
var $assomption;
var $toussaint;
var $armistice;
var $noel;

calcule_jours_feries();
update_affichage();

function calcule_jours_feries() {
    $jour_an = new Date($current_year, "00", "01");
    $fete_travail = new Date($current_year, "04", "01");
    $victoire1945 = new Date($current_year, "04", "08");
    $fete_nationale = new Date($current_year, "06", "14");
    $assomption = new Date($current_year, "07", "15");
    $toussaint = new Date($current_year, "10", "10");
    $armistice = new Date($current_year, "10", "11");
    $noel = new Date($current_year, "11", "25");

    var G = $current_year % 19
    var C = Math.floor($current_year / 100)
    var H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    var I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    var J = ($current_year * 1 + Math.floor($current_year / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    var L = I - J
    var MoisPaques = 3 + Math.floor((L + 40) / 44)
    var JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    $paques = new Date($current_year, MoisPaques - 1, JourPaques)
    $lundi_paques = new Date($current_year, MoisPaques - 1, JourPaques + 1)
    $ascension = new Date($current_year, MoisPaques - 1, JourPaques + 39)
    $pentecote = new Date($current_year, MoisPaques - 1, JourPaques + 49)
    $lundi_pentecote = new Date($current_year, MoisPaques - 1, JourPaques + 50)
}

function changer_annee($new_annee) {
    $current_year = $new_annee.value;
    $nb_jours_annee = (($current_year % 4 === 0 && $current_year % 100 > 0) || $current_year % 400 == 0) ? 366 : 365;
    calcule_jours_feries();
    update_affichage();
}

function update_affichage() {
    document.querySelector("#year").value = $current_year;
    document.querySelector("#annee-affichee").innerHTML = $current_year;
    document.querySelector("#nombre-jours-annee").innerHTML = $nb_jours_annee;
    var $options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    document.querySelector("#jour-an").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jour_an);
    document.querySelector("#fete-travail").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($fete_travail);
    document.querySelector("#victoire1945").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($victoire1945);
    document.querySelector("#fete-nationale").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($fete_nationale);
    document.querySelector("#assomption").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($assomption);
    document.querySelector("#toussaint").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($toussaint);
    document.querySelector("#armistice").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($armistice);
    document.querySelector("#noel").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($noel);
    document.querySelector("#paques").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($paques);
    document.querySelector("#lundi-paques").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($lundi_paques);
    document.querySelector("#ascension").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($ascension);
    document.querySelector("#pentecote").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($pentecote);
    document.querySelector("#lundi-pentecote").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($lundi_pentecote);
}