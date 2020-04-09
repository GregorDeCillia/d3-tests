# Datensätze für das d3-Dashboard

### Datenquellen

- bezirke_geojson: [https://github.com/ginseng666/GeoJSON-TopoJSON-Austria](https://github.com/ginseng666/GeoJSON-TopoJSON-Austria/blob/master/2017/simplified-95/bezirke_95_geo.json)
- regions_metadata: Daten vom 01.01.2020 nach [Wikipedia](https://de.wikipedia.org/wiki/Liste_der_Bezirke_und_Statutarst%C3%A4dte_in_%C3%96sterreich#Liste)
- ts_bezirke: https://github.com/statistikat/coronaDAT
- ts_nuts2: [Wikipedia Sammlung](https://de.m.wikipedia.org/wiki/COVID-19-Pandemie_in_%C3%96sterreich#Best%C3%A4tige_Infektionen) von Fällen auf Bundeslandebene

### Zeitreihen

Die Zeitreihen sind in einem tidy Format, das sich gut mit d3.js verwenden lässt. Spalten

* ts_bezirke: `t`, `bkz`, `freq`
* ts_nuts2: `t`, `iso`, `freq`

Hier bezeichnet `t` die Anzahl an Tagen seit den ersten Fällen in Tirol (26.02.2020) und `bkz` die [Bezirkskennziffer nach STAT](https://de.wikipedia.org/wiki/Liste_der_Bezirke_und_Statutarst%C3%A4dte_in_%C3%96sterreich#Liste) ohne vorangestelltem "AT-". `iso` ist der [Iso-Code des Bundeslandes](https://de.wikipedia.org/wiki/ISO_3166-2:AT). Im Eintrag `freq` befinden sich die bestätigten Fälle für die Region. Beispiel:

```javascript
const nuts2_ts = [
    // ...
    {"t":0,"iso":7,"freq":2},
    {"t":0,"iso":8,"freq":0}
    // ...
]

const bez_ts = [
    // ...
    {"t":25,"bkz":106,"freq":5}
    // ...
]
```

Die Daten sind nach `(t,bkz)` bzw. `(t,iso)` sortiert.

#### Codierung

Im Falle der `bkz` wird Wien unter einem Code (`900`) zusammengefasst. Hierzu müssen die Zahlen der Gemeindebezirke aus coronaDAT geeignet aggregiert werden, da in dem Datenformat des Gesundheitsministeriums ein Strukturbruch auftritt. Außerdem ist darauf zu achten Gröbming zu Lizen zu zählen. Das ist nötig um die Daten mit der GeoJSON Definition verknüpfbar zu machen.

### Metadaten

Der Datensatz in `regions_metadata.js` erlaubt es, den einzelnen Regionen (Bezirke oder Bundesländer) Labels und Einwohnerzahlen zuzuordnen. Einwohnerzahlen werden benötgigt um Quoten zu berechnen. Die Labels dienen als Achsenbeschriftungen in den Grafiken.

### GeoJSON

Für das Darstellen der Karte werden Polygone benötigt, welche die einzelnen Bezirke repräsentieren. Diese Polygone sind im geojson-Format unter `bezirke_geojson.js` verspeichert.