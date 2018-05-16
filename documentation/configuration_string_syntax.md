# Kolk- en brugconfiguratiestring syntax

## Syntax

Een configuratiestring volgt de volgende syntax:

```
"(","N"|"O"|"Z"|"W","mee"|"tegen","rood-links|rood-rechts",")",symbol+
```

waarbij voor `symbol` een tekencombinatie
gebruikt wordt uit de tabel, zie **Symbolen**

Beschrijvend:

```
( [ingang-volgens-netwerk-richting] [stroomrichting tov netwerkrichting] [betonningsrichting] ) Configuratiestring
```

Bijvoorbeeld

Voor een kolk:

```
( N tegen rood-rechts ) Vrw DAM StA DAT StA KS4 StO DAM StA StO DAT StO KS4 StO DAM StO DAT Vrw
```

Voor een brug:
```
( n tegen rood-rechts ) Wal WlL BLN BEN BVN BHN WlR Wal
```

De configuratiestring bestaat uit twee delen: een deel tussen
haakjes aan het begin, gevolgd door een reeks symbolen.

In het eerste gedeelte, tussen haakjes, staat achtereenvolgens:

- eerste symbool: N, Z, W of O

    Dit karakter geeft de richting van het netwerk aan.

- tweede symbool:  “mee” of “tegen”.

    Deze geeft aan of de stroomrichting met de netwerkwerkrichting mee gaat, of er
    tegen in loopt. 

- derde symbool: “rood-rechts", "rood-links" of "geen”. 
    
    Geeft de richting van de betonning aan, stroomafwaarts kijkend. Hierbij volgen we de
    IALA/SIGNI (*) definitie. Indien hier 'geen' staat, wordt geen betonning getoond
    in het diagram en wordt de afvaart in dezelfde richting verondersteld als de
    stroomrichting.
     
(*) IALA/SIGNI definitie van stroomrichting.  
> op rivieren stroomafwaarts (in getijdegebieden met de ebstroom mee);    
> op kanalen van hoog naar laag;    
> op zijvaarten en in geulen in de richting van de hoofdvaarweg of hoofdgeul;    
> op meren in de richting van de uitgang naar zee of ander open water;    
> op de randmeren gerekend vanaf de Hollandse Brug in oostelijke richting;    
> in zeegaten en aansluitende hoofdgeulen in de richting van de Noordzee.    
  
Na het gedeelte tussen haakjes volgt een reeks symbolen. Deze symbolen staan
voor kolkelementen of doorvaartopeningen.

Bij _bruggen_ beschouwen we de brug in stroomafwaartse richting.
De linkerzijde van de configuratiestring komt dan overeen met de linkerzijde 
van de brug.

Bij _sluizen_ komt de linkerzijde van de configuratiestring overeen met de stroomopwaartse
zijde van de kolk. Dit is contraintuïtief, want de stroomrichting van het water
is tegengesteld aan de leesrichting. Hier wordt echter de conventie gevolgd
dat bij de naamgeving van sluisdeuren, stroomafwaarts wordt begonnen.  