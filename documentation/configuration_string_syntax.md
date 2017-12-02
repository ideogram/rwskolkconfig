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

| Symbool    | (Bestands)naam                 | Tooltip                                                      | Afbeelding | Beschrijving
| ---        | ---                            | ---                                                          | ---          | ---   
| `I01`      | stopstreep                     | stopstreep                                                   | ![stopstreep](../documentation/png/stopstreep.svg.png) | Stopstrepen horen altijd bij 1 bepaalde deur                                                                                            |
| `C01`      | gladde-kolk                    | kolkdeel                                                     | ![gladde-kolk](../documentation/png/gladde-kolk.svg.png) | Getekend op 'sluisdeur-/sluishoofdbreedte'. Voor een langere Sluiskolk of langer Sluiskolkdeel wordt dit symbool naar smaak herhaald. Deze wordt in principe alleen toegepast in zgn. "gladde kolken" (even breed als de Sluishoofden). |
| `C02`      | kolk-verbreed                  | Verbreed Kolkdeel                                            | ![kolk-verbreed](../documentation/png/kolk-verbreed.svg.png) | Een kolkdeel dat breder is dan de 'deur-/hoofdbreedte' van de Sluiskolk. Voor een langere Sluiskolk of Sluiskolkdeel wordt dit symbool naar behoefte herhaald. Een Verbreed Kolkdeel (C02) wordt altijd vooraf gegaan door een Kolkovergang (C04, C06, C08, C10 of C11) of  door een ander Verbreed Kolkdeel. |
| `C03`      | kamerkolk-kop-b                | Kolkovergang, breed-naar-smal                                | ![kamerkolk-kop-b](../documentation/png/kamerkolk-kop-b.svg.png) | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        |
| `C04`      | kamerkolk-kop-d                | Kolkovergang, smal-naar-breed                                | ![kamerkolk-kop-d](../documentation/png/kamerkolk-kop-d.svg.png) | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel (G02) volgen.                                               |
| `C05`      | kamerkolk-kop-p                | Kolkovergang, breed-naar-smal                                | ![kamerkolk-kop-p](../documentation/png/kamerkolk-kop-p.svg.png) | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        |
| `C06`      | kamerkolk-kop-q                | Kolkovergang, smal-naar-breed                                | ![kamerkolk-kop-q](../documentation/png/kamerkolk-kop-q.svg.png) | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel (G02) volgen.                                               |
| `C07`      | kamerkolk-kop-6-rond           | Kolkovergang, breed-naar-smal                                | ![kamerkolk-kop-6-rond](../documentation/png/kamerkolk-kop-6-rond.svg.png) | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        |
| `C08`      | kamerkolk-kop-j-rond           | Kolkovergang, smal-naar-breed                                | ![kamerkolk-kop-j-rond](../documentation/png/kamerkolk-kop-j-rond.svg.png) | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel (G02) volgen.                                               |
| `C09`      | kamerkolk-kop-r-rond           | Kolkovergang, breed-naar-smal                                | ![kamerkolk-kop-r-rond](../documentation/png/kamerkolk-kop-r-rond.svg.png) | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        |
| `C10`      | kamerkolk-kop-9-rond           | Kolkovergang, smal-naar-breed                                | ![kamerkolk-kop-9-rond](../documentation/png/kamerkolk-kop-9-rond.svg.png) | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     |
| `C11`      | binnenfrontkolk-kop-links      | Kolkovergang, smal-naar-breed                                | ![binnenfrontkolk-kop-links](../documentation/png/binnenfrontkolk-kop-links.svg.png) | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     |
| `C12`      | binnenfrontkolk-kop-rechts     | Kolkovergang, breed-naar-smal                                | ![binnenfrontkolk-kop-rechts](../documentation/png/binnenfrontkolk-kop-rechts.svg.png) | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        |
| `C13`      | komkolk-kop-links              | Kolkovergang, smal-naar-breed                                | ![komkolk-kop-links](../documentation/png/komkolk-kop-links.svg.png) | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     |
| `C14`      | komkolk-kop-rechts             | Kolkovergang, breed-naar-smal                                | ![komkolk-kop-rechts](../documentation/png/komkolk-kop-rechts.svg.png) | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        |
| `D01`      | puntdeur-links                 | puntdeur links                                               | ![puntdeur-links](../documentation/png/puntdeur-links.svg.png) |                                                                                                                                         |
| `D02`      | puntdeur-rechts                | puntdeur rechts                                              | ![puntdeur-rechts](../documentation/png/puntdeur-rechts.svg.png) |                                                                                                                                         |
| `D03`      | puntdeur-pin-links             | dubbelkerende enkelvoudige puntdeur met pin, links           | ![puntdeur-pin-links](../documentation/png/puntdeur-pin-links.svg.png) |                                                                                                                                         |
| `D04`      | puntdeur-pin-rechts            | dubbelkerende enkelvoudige puntdeur met pin, rechts          | ![puntdeur-pin-rechts](../documentation/png/puntdeur-pin-rechts.svg.png) |                                                                                                                                         |
| `D05`      | puntdeur-dubbelk-links         | dubbelkerende enkelvoudige puntdeur, links                   | ![puntdeur-dubbelk-links](../documentation/png/puntdeur-dubbelk-links.svg.png) |                                                                                                                                         |
| `D06`      | puntdeur-dubbelk-rechts        | dubbelkerende enkelvoudige puntdeur, rechts                  | ![puntdeur-dubbelk-rechts](../documentation/png/puntdeur-dubbelk-rechts.svg.png) |                                                                                                                                         |
| `D07`      | draaideur-lb                   | enkele draaideur, links, scharnier boven, aanslag onder      | ![draaideur-lb](../documentation/png/draaideur-lb.svg.png) |                                                                                                                                         |
| `D08`      | draaideur-lo                   | enkele draaideur, links, scharnier onder, aanslag boven      | ![draaideur-lo](../documentation/png/draaideur-lo.svg.png) |                                                                                                                                         |
| `D09`      | draaideur-rb                   | enkele draaideur, rechts, scharnier boven, aanslag onder     | ![draaideur-rb](../documentation/png/draaideur-rb.svg.png) |                                                                                                                                         |
| `D10`      | draaideur-ro                   | enkele draaideur, rechts, scharnier onder, aanslag boven     | ![draaideur-ro](../documentation/png/draaideur-ro.svg.png) |                                                                                                                                         |
| `D11`      | hefdeur                        | hefdeur                                                      | ![hefdeur](../documentation/png/hefdeur.svg.png) |                                                                                                                                         |
| `D12`      | hangroldeur                    | hangroldeur                                                  | ![hangroldeur](../documentation/png/hangroldeur.svg.png) |                                                                                                                                         |
| `D13`      | roldeur-boven                  | roldeur boven                                                | ![roldeur-boven](../documentation/png/roldeur-boven.svg.png) |                                                                                                                                         |
| `D14`      | roldeur-onder                  | roldeur, onder                                               | ![roldeur-onder](../documentation/png/roldeur-onder.svg.png) |                                                                                                                                         |
| `D15`      | waaierdeur-links               | waaierdeur, links                                            | ![waaierdeur-links](../documentation/png/waaierdeur-links.svg.png) |                                                                                                                                         |
| `D16`      | waaierdeur-rechts              | waaierdeur, rechts                                           | ![waaierdeur-rechts](../documentation/png/waaierdeur-rechts.svg.png) |                                                                                                                                         |
| `I02`      | schot                          | Deur of schot, alleen bij hoogwater                          | ![schot](../documentation/png/schot.svg.png) |                                                                                                                                         |
| `I03`      | breed-schot                    | Deur of schot over brede kolk, alleen bij hoogwater          | ![breed-schot](../documentation/png/breed-schot.svg.png) |                                                                                                                                         |
| `D17`      | puntdeur-links-hwk             | puntdeur, links, hoogwaterkerig                              | ![puntdeur-links-hwk](../documentation/png/puntdeur-links-hwk.svg.png) |                                                                                                                                         |
| `D18`      | puntdeur-rechts-hwk            | puntdeur, rechts, hoogwaterkering                            | ![puntdeur-rechts-hwk](../documentation/png/puntdeur-rechts-hwk.svg.png) |                                                                                                                                         |
| `D19`      | puntdeur-pin-links-hwk         | dubbelkerende enkelvoudige puntdeur met pin, links, hoogwaterkering | ![puntdeur-pin-links-hwk](../documentation/png/puntdeur-pin-links-hwk.svg.png) |                                                                                                                                         |
| `D19`      | puntdeur-pin-rechts-hwk        | dubbelkerende enkelvoudige puntdeur met pin, rechts, hoogwaterkering | ![puntdeur-pin-rechts-hwk](../documentation/png/puntdeur-pin-rechts-hwk.svg.png) |                                                                                                                                         |
| `D20`      | puntdeur-dubbelk-links-hwk     | dubbelkerende enkelvoudige puntdeur, links, hoogwaterkering  | ![puntdeur-dubbelk-links-hwk](../documentation/png/puntdeur-dubbelk-links-hwk.svg.png) |                                                                                                                                         |
| `D21`      | puntdeur-dubbelk-rechts-hwk    | dubbelkerende enkelvoudige puntdeur, rechts, hoogwaterkering | ![puntdeur-dubbelk-rechts-hwk](../documentation/png/puntdeur-dubbelk-rechts-hwk.svg.png) |                                                                                                                                         |
| `D22`      | hefdeur-hwk                    | hefdeur                                                      | ![hefdeur-hwk](../documentation/png/hefdeur-hwk.svg.png) |                                                                                                                                         |
| `D23`      | roldeur-boven-hwk              | roldeur, hoogwaterkering, boven                              | ![roldeur-boven-hwk](../documentation/png/roldeur-boven-hwk.svg.png) |                                                                                                                                         |
| `D24`      | roldeur-onder-hwk              | roldeur, hoogwaterkering, onder                              | ![roldeur-onder-hwk](../documentation/png/roldeur-onder-hwk.svg.png) |                                                                                                                                         |
| `D25`      | hangroldeur-hwk                | hangroldeur, hoogwaterkering                                 | ![hangroldeur-hwk](../documentation/png/hangroldeur-hwk.svg.png) |                                                                                                                                         |
| `D26`      | waaierdeur-links-hwk           | waaierdeur, hoogwaterkering, links                           | ![waaierdeur-links-hwk](../documentation/png/waaierdeur-links-hwk.svg.png) |                                                                                                                                         |
| `D27`      | waaierdeur-rechts-hwk          | waaierdeur, hoogwaterkering, rechts                          | ![waaierdeur-rechts-hwk](../documentation/png/waaierdeur-rechts-hwk.svg.png) |                                                                                                                                         |
| `D28`      | draaideur-lb-hwk               | enkele draaideur, links, scharnier boven, aanslag onder, hoogwaterkering | ![draaideur-lb-hwk](../documentation/png/draaideur-lb-hwk.svg.png) |                                                                                                                                         |
| `D29`      | draaideur-lo-hwk               | enkele draaideur, links, scharnier onder, aanslag boven, hoogwaterkering | ![draaideur-lo-hwk](../documentation/png/draaideur-lo-hwk.svg.png) |                                                                                                                                         |
| `D30`      | draaideur-rb-hwk               | enkele draaideur, rechts, scharnier boven, aanslag onder, hoogwaterkering | ![draaideur-rb-hwk](../documentation/png/draaideur-rb-hwk.svg.png) |                                                                                                                                         |
| `D31`      | draaideur-ro-hwk               | enkele draaideur, rechts, scharnier onder, aanslag boven, hoogwaterkering | ![draaideur-ro-hwk](../documentation/png/draaideur-ro-hwk.svg.png) |                                                                                                                                         |
| `I04`      | vaarweg                        | Vaarweg, geen kolk, alleen voor brug buiten kolk             | ![vaarweg](../documentation/png/vaarweg.svg.png) |                                                                                                                                         |
| `I05`      | brug-vast                      | Doorvaartopening, vast                                       | ![brug-vast](../documentation/png/brug-vast.svg.png) |                                                                                                                                         |
| `I06`      | brug-beweegbaar                | Doorvaartopening, beweegbaar                                 | ![brug-beweegbaar](../documentation/png/brug-beweegbaar.svg.png) |                                                                                                                                         |
| `I07`      | weg-over-hoofd                 | Wegdek over sluishoofd                                       | ![weg-over-hoofd](../documentation/png/weg-over-hoofd.svg.png) |                                                                                                                                         |
