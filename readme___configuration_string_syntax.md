# Kolk configuratiestring syntax

## Syntax

Een kolkconfiguratiestring voldoet aan de volgende syntax
```
 "(",['0'-'9']{4,5},"N"|"O"|"Z"|"W","-->"|"<--",")",symbol+
```

waarbij voor `symbol` een tekencombinatie gebruikt wordt uit de tabel, zie **Symbolen**

Bijvoorbeeld:

```
( 31415 W --> )<.>.    .<.>.    .<.>
```

De configuratiestring bestaat uit twee delen: een deel tussen haakjes aan het begin en een reeks
symbolen aan het einde. De symbolen staan voor kolk-elementen, in de JavaScript-code aangeduid als 
_**elements**_

In het gedeelte tussen haakjes staat achtereenvolgens:

* de kolk-id, bestaande uit 4 of 5 cijfers

* één letter die de windstreek aangeeft waar begonnen wordt met het tellen van de deuren. Zie '**Windstreek**'

* een 'pijl' die aangeeft of de netwerkrichting binnen de configuratiestring van links naar rechts
  of van recht naar links loopt. De netwerkrichting heeft geen invloed op de weergave van het diagram.

Spaties in de het gedeelte tussen de haakjes worden genegeerd en kunnen naar believen worden toegevoegd om
de leesbaarheid te verhogen.

## Windstreek

De kolk wordt altijd horizontaal getekend en altijd van west naar oost _of_ van noord naar zuid. Dit geldt voor
zowel  de configuratiestring als  het uiteindelijke diagram. De linkerkant van het diagram komt dus _altijd_ 
overeen met ofwel de westzijde van de kolk ofwel de noordzijde van de kolk. De linkerkant wordt in het uiteindelijk 
diagram altijd voorzien van de letter "N" _of_ "W". Evenzo wordt de rechterzijde altijd voorzien van de 
letter "Z" _of_ "O". 

De windstreek-letter geeft dus aan of de kolk noord→zuid of west→oost getekend word. Zowel de letter "W" als de 
letter "O" zorgen er dus voor dat de kolk west→oost getekend word! En, zowel de letter "N" als de letter "Z" zorgen
ervoor dat de kolk noord→zuid getekend word.

De windsteek-letter geeft ook aan aan welke  zijde van de kolk begonnen dient te worden met het
tellen van de deuren. Als hier dus een letter "Z" staat, weten we dat de kolk noord→zuid getekend wordt, maar
dat de deur aan de rechterzijde (de *zuid*zijde dus) geteld wordt als deur "A".

## Symbolen

De serie symbolen tekenen samen de sluisconfiguratie op een een wijze die zowel voor computers als mensen
begrijpelijk is. De symbolen dienen gekozen te worden uit de tabel aan het einde van dit document.

| symbol | name            | mnemo 
| ---    | ---             | --- 
| `[SPACE]`  | gladde-kolk                    |                                                                                                                                         |
| `.`        | stopstreep                     |                                                                                                                                         |
| `[PIPE]`   | kolk-verbreed                  |                                                                                                                                         |
| `b`        | kamerkolk-kop-b                | Overgang van verbrede kolk (links) naar smalle kolk (rechts-onder). De vorm van dit element lijkt op de onderkastletter 'b'             |
| `d`        | kamerkolk-kop-d                | Overgang van smalle kolk (links-onder) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op de kleine letter 'd'    |
| `p`        | kamerkolk-kop-p                | Overgang van verbrede kolk (links) naar smalle kolk (rechts-boven). De vorm van dit element lijkt op de onderkastletter 'p'             |
| `q`        | kamerkolk-kop-q                | Overgang van smalle kolk (links-boven) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op de onderkastletter 'q'  |
| `6`        | kamerkolk-kop-6-rond           | Overgang van verbrede kolk (links) naar smalle kolk (rechts-onder). De vorm van dit element lijkt op het cijfer '6'                     |
| `j`        | kamerkolk-kop-j-rond           | Overgang van smalle kolk (links-onder) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op  de letter 'j'          |
| `r`        | kamerkolk-kop-r-rond           | Overgang van verbrede kolk (links) naar smalle kolk (rechts-boven). De vorm van dit element lijkt op de  de letter 'r'                  |
| `9`        | kamerkolk-kop-9-rond           | Overgang van smalle kolk (links-boven) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op het cijfer '9'          |
| `[`        | binnenfrontkolk-kop-links      | Overgang van smalle kolk (links) naar verbrede kolk (rechts) met rechthoeking front                                                     |
| `]`        | binnenfrontkolk-kop-rechts     | Overgang van verbrede kolk (links) naar smalle kolk (rechts) met rechthoeking front                                                     |
| `{`        | komkolk-kop-links              | Overgang van smalle kolk (links) naar verbrede kolk (rechts) met rond front                                                             |
| `}`        | komkolk-kop-rechts             | Overgang van verbrede kolk (links) naar smalle kolk (rechts) met rond front                                                             |
| `>`        | puntdeur-links                 |                                                                                                                                         |
| `>`        | puntdeur-rechts                |                                                                                                                                         |
| `<P`       | puntdeur-pin-links             |                                                                                                                                         |
| `P>`       | puntdeur-pin-rechts            |                                                                                                                                         |
| `<D`       | puntdeur-dubbelk-links         |                                                                                                                                         |
| `D>`       | puntdeur-dubbelk-rechts        |                                                                                                                                         |
| `<s`       | puntdeur-storm-links           | Deur is voorzien van het label 'HW'                                                                                                     |
| `>s`       | puntdeur-storm-rechts          | Deur is voorzien van het label 'HW'                                                                                                     |
| `<h`       | puntdeur-hwk-links             | Deur is voorzien van het label 'HWK'                                                                                                    |
| `>h`       | puntdeur-hwk-rechts            | Deur is voorzien van het label 'HWK'                                                                                                    |
| `,\`       | draaideur-lb                   | De komma toont de aanslag, de backslash toont een half-open deur                                                                        |
| `'/`       | draaideur-lo                   | De apostrophe toont de aanslag, de slash een half-open deur                                                                             |
| `/,`       | draaideur-rb                   | De komma toont de aanslag, de slash een half-open deur                                                                                  |
| `\'`       | draaideur-ro                   | De apostrophe toont de aanslag, de backslash een half-open deur                                                                         |
| `H`        | hefdeur                        |                                                                                                                                         |
| `Hs`       | hefdeur-storm                  |                                                                                                                                         |
| `Hh`       | hefdeur-hwk                    |                                                                                                                                         |
| `?`        | hangroldeur                    |                                                                                                                                         |
| `A`        | roldeur-boven                  | De letter A is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `As`       | roldeur-boven-storm            | De letter A is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `Ah`       | roldeur-boven-hwk              | De letter A is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `V`        | roldeur-onder                  | De letter V is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `Vs`       | roldeur-onder-storm            | De letter V is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `Vh`       | roldeur-onder-hwk              | De letter V is een pijltje datwijst de richting aan waarin de deur rolt                                                                 |
| `<W`       | waaierdeur-links               |                                                                                                                                         |
| `W>`       | waaierdeur-rechts              |                                                                                                                                         |
| `#`        | brug-vast                      |                                                                                                                                         |
| `:`        | brug-beweegbaar                |                                                                                                                                         |
