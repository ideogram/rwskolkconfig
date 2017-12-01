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

| Symbool | (Bestands)naam            | Tooltip | Beschrijving | Afbeelding 
| ---     | ---                       | ---     | ---          | ---   
| `I01`      | stopstreep                     | stopstreep                                                   | Stopstrepen horen altijd bij 1 bepaalde deur                                                                                            | ![stopstreep](../assets/stopstreep.png) |
| `C01`      | gladde-kolk                    | kolkdeel                                                     | Getekend op 'sluisdeur-/sluishoofdbreedte'. Voor een langere Sluiskolk of langer Sluiskolkdeel wordt dit symbool naar smaak herhaald. Deze wordt in principe alleen toegepast in zgn. "gladde kolken" (even breed als de Sluishoofden). | ![gladde-kolk](../assets/gladde-kolk.png) |
| `C02`      | kolk-verbreed                  | Verbreed Kolkdeel                                            | Een kolkdeel dat breder is dan de 'deur-/hoofdbreedte' van de Sluiskolk. Voor een langere Sluiskolk of Sluiskolkdeel wordt dit symbool naar behoefte herhaald. Een Verbreed Kolkdeel (C02) wordt altijd vooraf gegaan door een Kolkovergang (C04, C06, C08, C10 of C11) of  door een ander Verbreed Kolkdeel. | ![kolk-verbreed](../assets/kolk-verbreed.png) |
| `C03`      | kamerkolk-kop-b                | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        | ![kamerkolk-kop-b](../assets/kamerkolk-kop-b.png) |
| `C04`      | kamerkolk-kop-d                | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel (G02) volgen.                                               | ![kamerkolk-kop-d](../assets/kamerkolk-kop-d.png) |
| `C05`      | kamerkolk-kop-p                | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        | ![kamerkolk-kop-p](../assets/kamerkolk-kop-p.png) |
| `C06`      | kamerkolk-kop-q                | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel (G02) volgen.                                               | ![kamerkolk-kop-q](../assets/kamerkolk-kop-q.png) |
| `C07`      | kamerkolk-kop-6-rond           | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        | ![kamerkolk-kop-6-rond](../assets/kamerkolk-kop-6-rond.png) |
| `C08`      | kamerkolk-kop-j-rond           | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel (G02) volgen.                                               | ![kamerkolk-kop-j-rond](../assets/kamerkolk-kop-j-rond.png) |
| `C09`      | kamerkolk-kop-r-rond           | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        | ![kamerkolk-kop-r-rond](../assets/kamerkolk-kop-r-rond.png) |
| `C10`      | kamerkolk-kop-9-rond           | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![kamerkolk-kop-9-rond](../assets/kamerkolk-kop-9-rond.png) |
| `C11`      | binnenfrontkolk-kop-links      | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![binnenfrontkolk-kop-links](../assets/binnenfrontkolk-kop-links.png) |
| `C12`      | binnenfrontkolk-kop-rechts     | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        | ![binnenfrontkolk-kop-rechts](../assets/binnenfrontkolk-kop-rechts.png) |
| `C13`      | komkolk-kop-links              | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![komkolk-kop-links](../assets/komkolk-kop-links.png) |
| `C14`      | komkolk-kop-rechts             | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel (C02).                                        | ![komkolk-kop-rechts](../assets/komkolk-kop-rechts.png) |
| `D01`      | puntdeur-links                 | puntdeur links                                               |                                                                                                                                         | ![puntdeur-links](../assets/puntdeur-links.png) |
| `D02`      | puntdeur-rechts                | puntdeur rechts                                              |                                                                                                                                         | ![puntdeur-rechts](../assets/puntdeur-rechts.png) |
| `D03`      | puntdeur-pin-links             | dubbelkerende enkelvoudige puntdeur met pin, links           |                                                                                                                                         | ![puntdeur-pin-links](../assets/puntdeur-pin-links.png) |
| `D04`      | puntdeur-pin-rechts            | dubbelkerende enkelvoudige puntdeur met pin, rechts          |                                                                                                                                         | ![puntdeur-pin-rechts](../assets/puntdeur-pin-rechts.png) |
| `D05`      | puntdeur-dubbelk-links         | dubbelkerende enkelvoudige puntdeur, links                   |                                                                                                                                         | ![puntdeur-dubbelk-links](../assets/puntdeur-dubbelk-links.png) |
| `D06`      | puntdeur-dubbelk-rechts        | dubbelkerende enkelvoudige puntdeur, rechts                  |                                                                                                                                         | ![puntdeur-dubbelk-rechts](../assets/puntdeur-dubbelk-rechts.png) |
| `D07`      | draaideur-lb                   | enkele draaideur, links, scharnier boven, aanslag onder      |                                                                                                                                         | ![draaideur-lb](../assets/draaideur-lb.png) |
| `D08`      | draaideur-lo                   | enkele draaideur, links, scharnier onder, aanslag boven      |                                                                                                                                         | ![draaideur-lo](../assets/draaideur-lo.png) |
| `D09`      | draaideur-rb                   | enkele draaideur, rechts, scharnier boven, aanslag onder     |                                                                                                                                         | ![draaideur-rb](../assets/draaideur-rb.png) |
| `D10`      | draaideur-ro                   | enkele draaideur, rechts, scharnier onder, aanslag boven     |                                                                                                                                         | ![draaideur-ro](../assets/draaideur-ro.png) |
| `D11`      | hefdeur                        | hefdeur                                                      |                                                                                                                                         | ![hefdeur](../assets/hefdeur.png) |
| `D12`      | hangroldeur                    | hangroldeur                                                  |                                                                                                                                         | ![hangroldeur](../assets/hangroldeur.png) |
| `D13`      | roldeur-boven                  | roldeur boven                                                |                                                                                                                                         | ![roldeur-boven](../assets/roldeur-boven.png) |
| `D14`      | roldeur-onder                  | roldeur, onder                                               |                                                                                                                                         | ![roldeur-onder](../assets/roldeur-onder.png) |
| `D15`      | waaierdeur-links               | waaierdeur, links                                            |                                                                                                                                         | ![waaierdeur-links](../assets/waaierdeur-links.png) |
| `D16`      | waaierdeur-rechts              | waaierdeur, rechts                                           |                                                                                                                                         | ![waaierdeur-rechts](../assets/waaierdeur-rechts.png) |
| `I02`      | schot                          | Deur of schot, alleen bij hoogwater                          |                                                                                                                                         | ![schot](../assets/schot.png) |
| `I03`      | breed-schot                    | Deur of schot over brede kolk, alleen bij hoogwater          |                                                                                                                                         | ![breed-schot](../assets/breed-schot.png) |
| `D17`      | puntdeur-links-hwk             | puntdeur, links, hoogwaterkerig                              |                                                                                                                                         | ![puntdeur-links-hwk](../assets/puntdeur-links-hwk.png) |
| `D18`      | puntdeur-rechts-hwk            | puntdeur, rechts, hoogwaterkering                            |                                                                                                                                         | ![puntdeur-rechts-hwk](../assets/puntdeur-rechts-hwk.png) |
| `D19`      | puntdeur-pin-links-hwk         | dubbelkerende enkelvoudige puntdeur met pin, links, hoogwaterkering |                                                                                                                                         | ![puntdeur-pin-links-hwk](../assets/puntdeur-pin-links-hwk.png) |
| `D19`      | puntdeur-pin-rechts-hwk        | dubbelkerende enkelvoudige puntdeur met pin, rechts, hoogwaterkering |                                                                                                                                         | ![puntdeur-pin-rechts-hwk](../assets/puntdeur-pin-rechts-hwk.png) |
| `D20`      | puntdeur-dubbelk-links-hwk     | dubbelkerende enkelvoudige puntdeur, links, hoogwaterkering  |                                                                                                                                         | ![puntdeur-dubbelk-links-hwk](../assets/puntdeur-dubbelk-links-hwk.png) |
| `D21`      | puntdeur-dubbelk-rechts-hwk    | dubbelkerende enkelvoudige puntdeur, rechts, hoogwaterkering |                                                                                                                                         | ![puntdeur-dubbelk-rechts-hwk](../assets/puntdeur-dubbelk-rechts-hwk.png) |
| `D22`      | hefdeur-hwk                    | hefdeur                                                      |                                                                                                                                         | ![hefdeur-hwk](../assets/hefdeur-hwk.png) |
| `D23`      | roldeur-boven-hwk              | roldeur, hoogwaterkering, boven                              |                                                                                                                                         | ![roldeur-boven-hwk](../assets/roldeur-boven-hwk.png) |
| `D24`      | roldeur-onder-hwk              | roldeur, hoogwaterkering, onder                              |                                                                                                                                         | ![roldeur-onder-hwk](../assets/roldeur-onder-hwk.png) |
| `D25`      | hangroldeur-hwk                | hangroldeur, hoogwaterkering                                 |                                                                                                                                         | ![hangroldeur-hwk](../assets/hangroldeur-hwk.png) |
| `D26`      | waaierdeur-links-hwk           | waaierdeur, hoogwaterkering, links                           |                                                                                                                                         | ![waaierdeur-links-hwk](../assets/waaierdeur-links-hwk.png) |
| `D27`      | waaierdeur-rechts-hwk          | waaierdeur, hoogwaterkering, rechts                          |                                                                                                                                         | ![waaierdeur-rechts-hwk](../assets/waaierdeur-rechts-hwk.png) |
| `D28`      | draaideur-lb-hwk               | enkele draaideur, links, scharnier boven, aanslag onder, hoogwaterkering |                                                                                                                                         | ![draaideur-lb-hwk](../assets/draaideur-lb-hwk.png) |
| `D29`      | draaideur-lo-hwk               | enkele draaideur, links, scharnier onder, aanslag boven, hoogwaterkering |                                                                                                                                         | ![draaideur-lo-hwk](../assets/draaideur-lo-hwk.png) |
| `D30`      | draaideur-rb-hwk               | enkele draaideur, rechts, scharnier boven, aanslag onder, hoogwaterkering |                                                                                                                                         | ![draaideur-rb-hwk](../assets/draaideur-rb-hwk.png) |
| `D31`      | draaideur-ro-hwk               | enkele draaideur, rechts, scharnier onder, aanslag boven, hoogwaterkering |                                                                                                                                         | ![draaideur-ro-hwk](../assets/draaideur-ro-hwk.png) |
| `D32`      | vaarweg                        | Vaarweg, geen kolk, alleen voor brug buiten kolk             |                                                                                                                                         | ![vaarweg](../assets/vaarweg.png) |
| `I04`      | brug-vast                      | Doorvaartopening, vast                                       |                                                                                                                                         | ![brug-vast](../assets/brug-vast.png) |
| `I05`      | brug-beweegbaar                | Doorvaartopening, beweegbaar                                 |                                                                                                                                         | ![brug-beweegbaar](../assets/brug-beweegbaar.png) |
| `I06`      | weg-over-hoofd                 | Wegdek over sluishoofd                                       |                                                                                                                                         | ![weg-over-hoofd](../assets/weg-over-hoofd.png) |
