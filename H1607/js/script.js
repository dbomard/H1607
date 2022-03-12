var $date_du_jour = new Date();
var $current_year = $date_du_jour.getFullYear();
var $nb_jours_annee = (($current_year % 4 === 0 && $current_year % 100 > 0) || $current_year % 400 == 0) ? 366 : 365;

var $solidarite = false;

var $jours_feries = calcule_jours_feries($current_year);
var $weekend = calcul_jours_weekend($nb_jours_annee);
update_affichage();

function update_moyenne() {
    var $duree = document.querySelector("#duree-moyenne").value;
    var $annee = new Array($duree);
    for (var i = 0; i < $duree; i++) {
    // Todo
    }
}

function solidarite() {
    $solidarite = !$solidarite;
    $elt = document.querySelectorAll(".ajout-solidarite");
    for (var i = 0; i < $elt.length; i++) {
        if ($elt[i].style.display == "inline")
            $elt[i].style.display = "none";
        else
            $elt[i].style.display = "inline";
    }
    update_affichage();
}

function test_ferie($jour) {
    switch ($jour.getDay()) {
        case 6:
            $feries_samedi++;
            break;
        case 0:
            $feries_dimanche++;
            break;
        case 1:
            $feries_lundi++;
            break;
    }
}

function calcul_jours_weekend($nb_jours_tot) {
    $wkd = {
        nombre_dimanches: 0,
        nombre_lundis: 0,
        nombre_samedis: 0
    };
    var $date = new Date($current_year, "00", "01");
    for (var i = 0; i < $nb_jours_tot; i++) {
        switch ($date.getDay()) {
            case 0:
                $wkd.nombre_dimanches++;
                break;
            case 1:
                $wkd.nombre_lundis++;
                break;
            case 6:
                $wkd.nombre_samedis++;
                break;
        }
        $date.setDate($date.getDate() + 1);
    }
    return $wkd;
}

function calcule_jours_feries($year) {
    $feries_dimanche = 0;
    $feries_lundi = 0;
    $feries_samedi = 0;
    var $feries = new Object();
    $feries.jour_an = new Date($year, "00", "01");
    test_ferie($feries.jour_an);
    $feries.fete_travail = new Date($year, "04", "01");
    test_ferie($feries.fete_travail);
    $feries.victoire1945 = new Date($year, "04", "08");
    test_ferie($feries.victoire1945);
    $feries.fete_nationale = new Date($year, "06", "14");
    test_ferie($feries.fete_nationale);
    $feries.assomption = new Date($year, "07", "15");
    test_ferie($feries.assomption);
    $feries.toussaint = new Date($year, "10", "1");
    test_ferie($feries.toussaint);
    $feries.armistice = new Date($year, "10", "11");
    test_ferie($feries.armistice);
    $feries.noel = new Date($year, "11", "25");
    test_ferie($feries.noel);

    var G = $current_year % 19
    var C = Math.floor($current_year / 100)
    var H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    var I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    var J = ($current_year * 1 + Math.floor($current_year / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    var L = I - J
    var MoisPaques = 3 + Math.floor((L + 40) / 44)
    var JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    $feries.paques = new Date($current_year, MoisPaques - 1, JourPaques)
    test_ferie($feries.paques);
    $feries.lundi_paques = new Date($current_year, MoisPaques - 1, JourPaques + 1)
    test_ferie($feries.lundi_paques);
    $feries.ascension = new Date($current_year, MoisPaques - 1, JourPaques + 39)
    test_ferie($feries.ascension);
    $feries.pentecote = new Date($current_year, MoisPaques - 1, JourPaques + 49)
    test_ferie($feries.pentecote);
    $feries.lundi_pentecote = new Date($current_year, MoisPaques - 1, JourPaques + 50)
    test_ferie($feries.lundi_pentecote);
    return $feries;
}

function changer_annee($new_annee) {
    $current_year = $new_annee.value;
    $nb_jours_annee = (($current_year % 4 === 0 && $current_year % 100 > 0) || $current_year % 400 == 0) ? 366 : 365;
    $jours_feries = calcule_jours_feries($current_year);
    $weekend = calcul_jours_weekend($nb_jours_annee);
    update_affichage();
}

function update_affichage() {
    document.querySelector("#year").value = $current_year;
    document.querySelector("#annee-affichee").innerHTML = $current_year;
    var $liste = document.querySelectorAll(".nombre-jours-annee");
    for (var i = 0; i < $liste.length; i++)
        $liste[i].innerHTML = $nb_jours_annee;
    var $options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    document.querySelector("#jour-an").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.jour_an);
    document.querySelector("#fete-travail").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.fete_travail);
    document.querySelector("#victoire1945").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.victoire1945);
    document.querySelector("#fete-nationale").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.fete_nationale);
    document.querySelector("#assomption").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.assomption);
    document.querySelector("#toussaint").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.toussaint);
    document.querySelector("#armistice").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.armistice);
    document.querySelector("#noel").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.noel);
    document.querySelector("#paques").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.paques);
    document.querySelector("#lundi-paques").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.lundi_paques);
    document.querySelector("#ascension").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.ascension);
    document.querySelector("#pentecote").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.pentecote);
    document.querySelector("#lundi-pentecote").innerHTML = new Intl.DateTimeFormat("fr-FR", $options).format($jours_feries.lundi_pentecote);

    $liste = document.querySelectorAll(".nombre-dimanches");
    for (var i = 0; i < $liste.length; i++)
        $liste[i].innerHTML = $weekend.nombre_dimanches;
    $liste = document.querySelectorAll(".nombre-lundis");
    for (var i = 0; i < $liste.length; i++)
        $liste[i].innerHTML = $weekend.nombre_lundis;
    $liste = document.querySelectorAll(".nombre-samedis");
    for (var i = 0; i < $liste.length; i++)
        $liste[i].innerHTML = $weekend.nombre_samedis;

    var $nombre_jours_feries = 13 - $feries_dimanche - $feries_lundi;
    document.querySelector("#feries-dimanche-lundi").innerHTML = $nombre_jours_feries;
    var $jours_travailles = $nb_jours_annee - $weekend.nombre_dimanches - $weekend.nombre_lundis - 25 - $nombre_jours_feries + ($solidarite ? 1 : 0);
    document.querySelector("#jours-travailles-dimanche-lundi").innerHTML = $jours_travailles;
    document.querySelector("#heures-dimanche-lundi").innerHTML = $jours_travailles * 7;

    $nombre_jours_feries = 13 - $feries_dimanche - $feries_samedi;
    document.querySelector("#feries-samedi-dimanche").innerHTML = $nombre_jours_feries;
    $jours_travailles = $nb_jours_annee - $weekend.nombre_dimanches - $weekend.nombre_samedis - 25 - $nombre_jours_feries + ($solidarite ? 1 : 0);
    document.querySelector("#jours-travailles-samedi-dimanche").innerHTML = $jours_travailles;
    document.querySelector("#heures-samedi-dimache").innerHTML = $jours_travailles * 7;
}
