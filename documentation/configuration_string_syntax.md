# Kolk configuratiestring syntax

## Syntax

Een kolkconfiguratiestring voldoet aan de volgende syntax
```
 "(","N"|"O"|"Z"|"W",("ABC"|"CBA")?,")",symbol+
```

waarbij voor `symbol` een tekencombinatie
gebruikt wordt uit de tabel, zie **Symbolen**

Beschrijvend:

```
 ( [Ingang-volgens-netwerk-richting] [Naamvolgorde] ) Configuratiestring
```

Bijvoorbeeld:

```
( W ABC )<.:>.    .<.>.    .<.>: 
```

De configuratiestring bestaat uit drie delen: een deel tussen
haakjes aan het begin, een reeks symbolen en (eventueel)
afsluitend vrije tekst tussen haakjes. De symbolen staan voor
kolk-elementen, in de JavaScript-code aangeduid als _**elements**_

In het eerste gedeelte, tussen haakjes, staat achtereenvolgens:

* één letter die de windstreek aanduid waar de ingang van de kolk
  ligt volgens de netwerkrichting. Zie '**Windstreek**'

* De lettervolgorde 'ABC' of 'CBA' die de lexicografische nummering
  van de deuren vastlegt. Als hier 'ABC' staat of niets is vermeld,
  krijgt de meest linker deur de naam 'A', de volgende 'B', etcetera.
  Alleen als hier 'CBA' staat, is deze volgorde omgekeerd. Deze namen
  worden afgebeeld in het diagram en gebruikt om de schutruimtes mee
  aan te duiden.
  
Spaties in de het eerste gedeelte tussen de haakjes worden genegeerd en
kunnen naar believen worden toegevoegd om de leesbaarheid te verhogen.

De configuratiestring is een tekstuele, maar engiszins grafische, 
representatie van de sluis.
 
## Windstreek

De kolk wordt altijd horizontaal getekend en _altijd_ van west
naar oost _of_ van noord naar zuid. Dit geldt voor zowel  de
configuratiestring als  het uiteindelijke diagram. De linkerkant
van het diagram komt dus _altijd_ overeen met ofwel de westzijde van
de kolk ofwel de noordzijde van de kolk. De linkerkant wordt in het
uiteindelijk diagram altijd voorzien van de letter "N" _of_ "W". Evenzo
wordt de rechterzijde altijd voorzien van de letter "Z" _of_ "O".

De windstreek geeft aan, aan welke zijde van de kolk zich de ingang
bevindt volgens de netwerkrichting zoals RWS die hanteert. De enige
invloed die dit heeft op het uiteindelijke diagram is een pijltje
in de tekening. Het is echter van belang voor het toekennen van
id's aan de sluishoofden, aangezien deze altijd oplopend in de
netwerk-richting genummerd worden. (Dit staat dus los van de naamgeving!)

De windstreek-letter geeft ook aan of de kolk noord→zuid of west→oost
getekend word. Zowel de letter "W" als de letter "O" zorgen er dus
voor dat de kolk west→oost getekend word! En, zowel de letter "N"
als de letter "Z" zorgen ervoor dat de kolk noord→zuid getekend word.


## Symbolen

De serie symbolen tekenen samen de sluisconfiguratie op een een wijze die zowel voor computers als mensen
begrijpelijk is. De symbolen dienen gekozen te worden uit de eerste kolom van de volgende tabel

| symbol | name            | mnemo 
| ---    | ---             | --- 
| `[SPACE]`  | gladde-kolk                    |                                                                                                                                         |
| `.`        | stopstreep                     |                                                                                                                                         |
| `[PIPE]`   | kolk-verbreed                  |                                                                                                                                         |
| `b`        | kamerkolk-kop-b                | Overgang van verbrede kolk (links) naar smalle kolk (rechts-onder). De vorm van dit element lijkt op de onderkastletter 'b'             |
| `d`        | kamerkolk-kop-d                | Overgang van smalle kolk (links-onder) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op de kleine letter 'd'    |
| `p`        | kamerkolk-kop-p                | Overgang van verbrede kolk (links) naar smalle kolk (rechts-boven). De vorm van dit element lijkt op de onderkastletter 'p'             |
| `q`        | kamerkolk-kop-q                | Overgang van smalle kolk (links-boven) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op de onderkastletter 'q'  |
| `6`        | kamerkolk-kop-6-rond           | Afgeronde overgang van verbrede kolk (links) naar smalle kolk (rechts-onder). De vorm van dit element lijkt op het cijfer '6'           |
| `j`        | kamerkolk-kop-j-rond           | Afgeronde overgang van smalle kolk (links-onder) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op  de letter 'j' |
| `r`        | kamerkolk-kop-r-rond           | Afgeronde overgang van verbrede kolk (links) naar smalle kolk (rechts-boven). De vorm van dit element lijkt op de  de letter 'r'        |
| `9`        | kamerkolk-kop-9-rond           | Afgeronde overgang van smalle kolk (links-boven) naar verbrede kolk aan de rechterzijde. De vorm van dit element lijkt op het cijfer '9' |
| `[`        | binnenfrontkolk-kop-links      | Overgang van smalle kolk (links) naar verbrede kolk (rechts) met rechthoeking front                                                     |
| `]`        | binnenfrontkolk-kop-rechts     | Overgang van verbrede kolk (links) naar smalle kolk (rechts) met rechthoeking front                                                     |
| `{`        | komkolk-kop-links              | Overgang van smalle kolk (links) naar verbrede kolk (rechts) met rond front                                                             |
| `}`        | komkolk-kop-rechts             | Overgang van verbrede kolk (links) naar smalle kolk (rechts) met rond front                                                             |
| `<`        | puntdeur-links                 |                                                                                                                                         |
| `>`        | puntdeur-rechts                |                                                                                                                                         |
| `<P`       | puntdeur-pin-links             |                                                                                                                                         |
| `P>`       | puntdeur-pin-rechts            |                                                                                                                                         |
| `<D`       | puntdeur-dubbelk-links         |                                                                                                                                         |
| `D>`       | puntdeur-dubbelk-rechts        |                                                                                                                                         |
| `/,`       | draaideur-lb                   | De komma toont de aanslag, de backslash toont een half-open deur                                                                        |
| `\'`       | draaideur-lo                   | De apostrophe toont de aanslag, de slash een half-open deur                                                                             |
| `,\ `       | draaideur-rb                   | De komma toont de aanslag, de slash een half-open deur                                                                                  |
| `'/`       | draaideur-ro                   | De apostrophe toont de aanslag, de backslash een half-open deur                                                                         |
| `H`        | hefdeur                        |                                                                                                                                         |
| `?`        | hangroldeur                    |                                                                                                                                         |
| `A`        | roldeur-boven                  | De letter A is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `V`        | roldeur-onder                  | De letter V is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `<W`       | waaierdeur-links               |                                                                                                                                         |
| `W>`       | waaierdeur-rechts              |                                                                                                                                         |
| `!`        | schot                          | Deur krijgt geen eigen letter                                                                                                           |
| `<h`       | puntdeur-links-hwk             | Deur is voorzien van het label 'HWK'                                                                                                    |
| `>h`       | puntdeur-rechts-hwk            | Deur is voorzien van het label 'HWK'                                                                                                    |
| `<Ph`      | puntdeur-pin-links-hwk         |                                                                                                                                         |
| `P>h`      | puntdeur-pin-rechts-hwk        |                                                                                                                                         |
| `<Dh`      | puntdeur-dubbelk-links-hwk     |                                                                                                                                         |
| `D>h`      | puntdeur-dubbelk-rechts-hwk    |                                                                                                                                         |
| `Hh`       | hefdeur-hwk                    |                                                                                                                                         |
| `Ah`       | roldeur-boven-hwk              | De letter A is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `Vh`       | roldeur-onder-hwk              | De letter V is een pijltje dat wijst de richting aan waarin de deur rolt                                                                |
| `?h`       | hangroldeur-hwk                | Geen                                                                                                                                    |
| `<Wh`      | waaierdeur-links-hwk           |                                                                                                                                         |
| `W>h`      | waaierdeur-rechts-hwk          |                                                                                                                                         |
| `/,h`      | draaideur-lb-hwk               | De komma toont de aanslag, de backslash toont een half-open deur                                                                        |
| `\'h`      | draaideur-lo-hwk               | De apostrophe toont de aanslag, de slash een half-open deur                                                                             |
| `,\h`      | draaideur-rb-hwk               | De komma toont de aanslag, de slash een half-open deur                                                                                  |
| `'/h`      | draaideur-ro-hwk               | De apostrophe toont de aanslag, de backslash een half-open deur                                                                         |
| `#`        | brug-vast                      |                                                                                                                                         |
| `:`        | brug-beweegbaar                |                                                                                                                                         |
