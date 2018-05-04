# Kolk configuratiestring syntax

## Syntax

Een kolkconfiguratiestring voldoet aan de volgende syntax
```
 "(",("up-down"|"down-up"),"N"|"O"|"Z"|"W",("ABC"|"CBA")?,")",symbol+
```

waarbij voor `symbol` een tekencombinatie
gebruikt wordt uit de tabel, zie **Symbolen**

Beschrijvend:

```
 ( [stroom] [Ingang-volgens-netwerk-richting] [Naamvolgorde] ) Configuratiestring
```

Bijvoorbeeld:

```
( up-down W ABC )<.:>.    .<.>.    .<.>: 
```

De configuratiestring bestaat uit twee delen: een deel tussen
haakjes aan het begin, gevolgd door een reeks symbolen 

De symbolen staan voor kolk-elementen, in de JavaScript-code aangeduid 
als _**elements**_

In het eerste gedeelte, tussen haakjes, staat achtereenvolgens:

* Een duiding van de 'stroom'. Zie **Stroom**

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

## Stroom

Als de linkerzijde van het diagram als stroomopwaarts wordt gezien,
dient hier 'up-down' te staan. Als de stroomrichting omgekeerd is, staat
hier 'down-up'. 
 
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

Rollen:

* i Informatief

* C (Chamber) Kolkdeel

* &lt; Deur, linkskerend

* &gt; Deur, rechtskerend

* N Deur, neutraal

* B Brug

* W weg

| Symbool | (Bestands)naam            | Rol | Tooltip | Beschrijving | Afbeelding 
| ---     | ---                       | --- | ---     | ---          | ---   
| `!`        | stopstreep                     | i | stopstreep                                                   | Stopstrepen horen altijd bij 1 bepaalde deur                                                                                            | ![stopstreep](../documentation/png/stopstreep.svg.png) |
| `"`        | vanginrichting                 | i | vangwinrichting                                              | Vanginrichtingen horen altijd bij 1 bepaalde deur                                                                                       | ![vanginrichting](../documentation/png/vanginrichting.svg.png) |
| `#`        | schot                          | i | Deur of schot, alleen bij hoogwater                          |                                                                                                                                         | ![schot](../documentation/png/schot.svg.png) |
| `$`        | schot-breed                    | i | Deur of schot over brede kolk, alleen bij hoogwater          |                                                                                                                                         | ![schot-breed](../documentation/png/schot-breed.svg.png) |
| `%`        | gladde-kolk                    | C | kolkdeel                                                     | Getekend op 'sluisdeur-/sluishoofdbreedte'. Voor een langere Sluiskolk of langer Sluiskolkdeel wordt dit symbool naar smaak herhaald. Deze wordt in principe alleen toegepast in zgn. "gladde kolken" (even breed als de Sluishoofden). | ![gladde-kolk](../documentation/png/gladde-kolk.svg.png) |
| `&`        | gladde-kolk-half               | C | kolkdeel, halve breedte                                      | Identiek aan gladde-kolk, maar slechts halve breedte. Voor de fijnproever.                                                              | ![gladde-kolk-half](../documentation/png/gladde-kolk-half.svg.png) |
| `'`        | kolk-verbreed                  | C | Verbreed Kolkdeel                                            | Een kolkdeel dat breder is dan de 'deur-/hoofdbreedte' van de Sluiskolk. Voor een langere Sluiskolk of Sluiskolkdeel wordt dit symbool naar behoefte herhaald. Een Verbreed Kolkdeel wordt altijd vooraf gegaan door een Kolkovergang of  door een ander Verbreed Kolkdeel. | ![kolk-verbreed](../documentation/png/kolk-verbreed.svg.png) |
| `(`        | overgang-b-recht               | C | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel.                                              | ![overgang-b-recht](../documentation/png/overgang-b-recht.svg.png) |
| `)`        | overgang-d-recht               | C | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-d-recht](../documentation/png/overgang-d-recht.svg.png) |
| `*`        | overgang-p-recht               | C | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel.                                              | ![overgang-p-recht](../documentation/png/overgang-p-recht.svg.png) |
| `+`        | overgang-q-recht               | C | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-q-recht](../documentation/png/overgang-q-recht.svg.png) |
| `,`        | overgang-b-rond                | C | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel.                                              | ![overgang-b-rond](../documentation/png/overgang-b-rond.svg.png) |
| `-`        | overgang-d-rond                | C | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-d-rond](../documentation/png/overgang-d-rond.svg.png) |
| `.`        | overgang-p-rond                | C | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel.                                              | ![overgang-p-rond](../documentation/png/overgang-p-rond.svg.png) |
| `/`        | overgang-q-schuin              | C | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-q-schuin](../documentation/png/overgang-q-schuin.svg.png) |
| `0`        | overgang-d-schuin              | C | Kolkovergang, smal-naar-breed                                | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-d-schuin](../documentation/png/overgang-d-schuin.svg.png) |
| `1`        | overgang-p-schuin              | C | Kolkovergang, breed-naar-smal                                | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel.                                              | ![overgang-p-schuin](../documentation/png/overgang-p-schuin.svg.png) |
| `2`        | overgang-q-schuin              | C | Kolkovergang, smal-naar-breed, schuin                        | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-q-schuin](../documentation/png/overgang-q-schuin.svg.png) |
| `3`        | overgang-binnenfrontkolk-links | C | Kolkovergang, smal-naar-breed, binnenfront                   | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-binnenfrontkolk-links](../documentation/png/overgang-binnenfrontkolk-links.svg.png) |
| `4`        | overgang-binnenfrontkolk-rechts | C | Kolkovergang, breed-naar-smal, binnenfront                   | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel.                                              | ![overgang-binnenfrontkolk-rechts](../documentation/png/overgang-binnenfrontkolk-rechts.svg.png) |
| `5`        | overgang-komkolk-links         | C | Kolkovergang, smal-naar-breed, komkolk                       | Adaptor voor een kolkverbreding. Na dit kolkdeel moet een Verbreed Kolkdeel volgen.                                                     | ![overgang-komkolk-links](../documentation/png/overgang-komkolk-links.svg.png) |
| `6`        | overgang-komkolk-rechts        | C | Kolkovergang, breed-naar-smal, komkolk                       | Adaptor voor een kolkversmalling. Dit kolkdeel kan alleen volgen op een Verbreed Kolkdeel.                                              | ![overgang-komkolk-rechts](../documentation/png/overgang-komkolk-rechts.svg.png) |
| `7`        | puntdeur-links                 | &lt; | puntdeur links                                               |                                                                                                                                         | ![puntdeur-links](../documentation/png/puntdeur-links.svg.png) |
| `8`        | puntdeur-rechts                | &gt; | puntdeur rechts                                              |                                                                                                                                         | ![puntdeur-rechts](../documentation/png/puntdeur-rechts.svg.png) |
| `9`        | puntdeur-pin-links             | N | dubbelkerende enkelvoudige puntdeur met pin, links           |                                                                                                                                         | ![puntdeur-pin-links](../documentation/png/puntdeur-pin-links.svg.png) |
| `:`        | puntdeur-pin-rechts            | N | dubbelkerende enkelvoudige puntdeur met pin, rechts          |                                                                                                                                         | ![puntdeur-pin-rechts](../documentation/png/puntdeur-pin-rechts.svg.png) |
| `;`        | puntdeur-dubbelk-links         | N | dubbelkerende enkelvoudige puntdeur, links                   |                                                                                                                                         | ![puntdeur-dubbelk-links](../documentation/png/puntdeur-dubbelk-links.svg.png) |
| `<`        | puntdeur-dubbelk-rechts        | N | dubbelkerende enkelvoudige puntdeur, rechts                  |                                                                                                                                         | ![puntdeur-dubbelk-rechts](../documentation/png/puntdeur-dubbelk-rechts.svg.png) |
| `=`        | draaideur-lb                   | &lt; | enkele draaideur, links, scharnier boven, aanslag onder      |                                                                                                                                         | ![draaideur-lb](../documentation/png/draaideur-lb.svg.png) |
| `>`        | draaideur-lo                   | &lt; | enkele draaideur, links, scharnier onder, aanslag boven      |                                                                                                                                         | ![draaideur-lo](../documentation/png/draaideur-lo.svg.png) |
| `?`        | draaideur-rb                   | &gt; | enkele draaideur, rechts, scharnier boven, aanslag onder     |                                                                                                                                         | ![draaideur-rb](../documentation/png/draaideur-rb.svg.png) |
| `@`        | draaideur-ro                   | &gt; | enkele draaideur, rechts, scharnier onder, aanslag boven     |                                                                                                                                         | ![draaideur-ro](../documentation/png/draaideur-ro.svg.png) |
| `A`        | hefdeur                        | N | hefdeur                                                      |                                                                                                                                         | ![hefdeur](../documentation/png/hefdeur.svg.png) |
| `B`        | hangroldeur                    | N | hangroldeur                                                  |                                                                                                                                         | ![hangroldeur](../documentation/png/hangroldeur.svg.png) |
| `C`        | roldeur-boven                  | N | roldeur boven                                                |                                                                                                                                         | ![roldeur-boven](../documentation/png/roldeur-boven.svg.png) |
| `D`        | roldeur-onder                  | N | roldeur, onder                                               |                                                                                                                                         | ![roldeur-onder](../documentation/png/roldeur-onder.svg.png) |
| `E`        | waaierdeur-links               | &lt; | waaierdeur, links                                            |                                                                                                                                         | ![waaierdeur-links](../documentation/png/waaierdeur-links.svg.png) |
| `F`        | waaierdeur-rechts              | &gt; | waaierdeur, rechts                                           |                                                                                                                                         | ![waaierdeur-rechts](../documentation/png/waaierdeur-rechts.svg.png) |
| `G`        | puntdeur-links-hwk             | &lt; | puntdeur, links, hoogwaterkerig                              |                                                                                                                                         | ![puntdeur-links-hwk](../documentation/png/puntdeur-links-hwk.svg.png) |
| `H`        | puntdeur-rechts-hwk            | &gt; | puntdeur, rechts, hoogwaterkering                            |                                                                                                                                         | ![puntdeur-rechts-hwk](../documentation/png/puntdeur-rechts-hwk.svg.png) |
| `I`        | puntdeur-pin-links-hwk         | N | dubbelkerende enkelvoudige puntdeur met pin, links, hoogwaterkering |                                                                                                                                         | ![puntdeur-pin-links-hwk](../documentation/png/puntdeur-pin-links-hwk.svg.png) |
| `J`        | puntdeur-pin-rechts-hwk        | N | dubbelkerende enkelvoudige puntdeur met pin, rechts, hoogwaterkering |                                                                                                                                         | ![puntdeur-pin-rechts-hwk](../documentation/png/puntdeur-pin-rechts-hwk.svg.png) |
| `K`        | puntdeur-dubbelk-links-hwk     | N | dubbelkerende enkelvoudige puntdeur, links, hoogwaterkering  |                                                                                                                                         | ![puntdeur-dubbelk-links-hwk](../documentation/png/puntdeur-dubbelk-links-hwk.svg.png) |
| `L`        | puntdeur-dubbelk-rechts-hwk    | N | dubbelkerende enkelvoudige puntdeur, rechts, hoogwaterkering |                                                                                                                                         | ![puntdeur-dubbelk-rechts-hwk](../documentation/png/puntdeur-dubbelk-rechts-hwk.svg.png) |
| `M`        | hefdeur-hwk                    | N | hefdeur                                                      |                                                                                                                                         | ![hefdeur-hwk](../documentation/png/hefdeur-hwk.svg.png) |
| `N`        | roldeur-boven-hwk              | N | roldeur, hoogwaterkering, boven                              |                                                                                                                                         | ![roldeur-boven-hwk](../documentation/png/roldeur-boven-hwk.svg.png) |
| `O`        | roldeur-onder-hwk              | N | roldeur, hoogwaterkering, onder                              |                                                                                                                                         | ![roldeur-onder-hwk](../documentation/png/roldeur-onder-hwk.svg.png) |
| `P`        | hangroldeur-hwk                | N | hangroldeur, hoogwaterkering                                 |                                                                                                                                         | ![hangroldeur-hwk](../documentation/png/hangroldeur-hwk.svg.png) |
| `Q`        | waaierdeur-links-hwk           | &lt; | waaierdeur, hoogwaterkering, links                           |                                                                                                                                         | ![waaierdeur-links-hwk](../documentation/png/waaierdeur-links-hwk.svg.png) |
| `R`        | waaierdeur-rechts-hwk          | &gt; | waaierdeur, hoogwaterkering, rechts                          |                                                                                                                                         | ![waaierdeur-rechts-hwk](../documentation/png/waaierdeur-rechts-hwk.svg.png) |
| `S`        | draaideur-lb-hwk               | &lt; | enkele draaideur, links, scharnier boven, aanslag onder, hoogwaterkering |                                                                                                                                         | ![draaideur-lb-hwk](../documentation/png/draaideur-lb-hwk.svg.png) |
| `T`        | draaideur-lo-hwk               | &lt; | enkele draaideur, links, scharnier onder, aanslag boven, hoogwaterkering |                                                                                                                                         | ![draaideur-lo-hwk](../documentation/png/draaideur-lo-hwk.svg.png) |
| `U`        | draaideur-rb-hwk               | &gt; | enkele draaideur, rechts, scharnier boven, aanslag onder, hoogwaterkering |                                                                                                                                         | ![draaideur-rb-hwk](../documentation/png/draaideur-rb-hwk.svg.png) |
| `V`        | draaideur-ro-hwk               | &gt; | enkele draaideur, rechts, scharnier onder, aanslag boven, hoogwaterkering |                                                                                                                                         | ![draaideur-ro-hwk](../documentation/png/draaideur-ro-hwk.svg.png) |
| `W`        | vaarweg                        | i | Vaarweg, geen kolk, alleen voor brug buiten kolk             |                                                                                                                                         | ![vaarweg](../documentation/png/vaarweg.svg.png) |
| `X`        | brug-vast                      | B | Doorvaartopening, vast                                       |                                                                                                                                         | ![brug-vast](../documentation/png/brug-vast.svg.png) |
| `Y`        | brug-beweegbaar                | B | Doorvaartopening, beweegbaar                                 |                                                                                                                                         | ![brug-beweegbaar](../documentation/png/brug-beweegbaar.svg.png) |
| `Z`        | weg-over-hoofd                 | W | Wegdek over sluishoofd                                       |                                                                                                                                         | ![weg-over-hoofd](../documentation/png/weg-over-hoofd.svg.png) |
