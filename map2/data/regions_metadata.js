const regions = {
  bz: {
    "101":{"population":   14637, "label": "Eisenstadt(Stadt)"},
    "102":{"population":    1940, "label": "Rust(Stadt)"},
    "103":{"population":   42927, "label": "Eisenstadt-Umgebung"},
    "104":{"population":   25797, "label": "G\u00fcssing"},
    "105":{"population":   17066, "label": "Jennersdorf"},
    "106":{"population":   39925, "label": "Mattersburg"},
    "107":{"population":   59552, "label": "Neusiedl am See"},
    "108":{"population":   37513, "label": "Oberpullendorf"},
    "109":{"population":   54076, "label": "Oberwart"},
    "201":{"population":  100817, "label": "Klagenfurt Stadt"},
    "202":{"population":   62243, "label": "Villach Stadt"},
    "203":{"population":   18224, "label": "Hermagor"},
    "204":{"population":   59800, "label": "Klagenfurt Land"},
    "205":{"population":   54555, "label": "Sankt Veit an der Glan"},
    "206":{"population":   76091, "label": "Spittal an der Drau"},
    "207":{"population":   64668, "label": "Villach Land"},
    "208":{"population":   41878, "label": "V\u00f6lkermarkt"},
    "209":{"population":   52726, "label": "Wolfsberg"},
    "210":{"population":   29937, "label": "Feldkirchen"},
    "301":{"population":   24876, "label": "Krems an der Donau(Stadt)"},
    "302":{"population":   55044, "label": "Sankt P\u00f6lten(Stadt)"},
    "303":{"population":   11261, "label": "Waidhofen an der Ybbs(Stadt)"},
    "304":{"population":   45277, "label": "Wiener Neustadt(Stadt)"},
    "305":{"population":  116114, "label": "Amstetten"},
    "306":{"population":  146203, "label": "Baden"},
    "307":{"population":  102010, "label": "Bruck an der Leitha"},
    "308":{"population":  103686, "label": "G\u00e4nserndorf"},
    "309":{"population":   36773, "label": "Gm\u00fcnd"},
    "310":{"population":   50858, "label": "Hollabrunn"},
    "311":{"population":   31090, "label": "Horn"},
    "312":{"population":   90889, "label": "Korneuburg"},
    "313":{"population":   56596, "label": "Krems(Land)"},
    "314":{"population":   25812, "label": "Lilienfeld"},
    "315":{"population":   77962, "label": "Melk"},
    "316":{"population":   75483, "label": "Mistelbach"},
    "317":{"population":  118998, "label": "M\u00f6dling"},
    "318":{"population":   86291, "label": "Neunkirchen"},
    "319":{"population":  131044, "label": "Sankt P\u00f6lten(Land)"},
    "320":{"population":   41403, "label": "Scheibbs"},
    "321":{"population":  103771, "label": "Tulln"},
    "322":{"population":   25888, "label": "Waidhofen an der Thaya"},
    "323":{"population":   77991, "label": "Wiener Neustadt(Land)"},
    "325":{"population":   42222, "label": "Zwettl"},
    "401":{"population":  205726, "label": "Linz(Stadt)"},
    "402":{"population":   38193, "label": "Steyr(Stadt)"},
    "403":{"population":   61727, "label": "Wels(Stadt)"},
    "404":{"population":  104408, "label": "Braunau am Inn"},
    "405":{"population":   33156, "label": "Eferding"},
    "406":{"population":   66621, "label": "Freistadt"},
    "407":{"population":  101631, "label": "Gmunden"},
    "408":{"population":   64721, "label": "Grieskirchen"},
    "409":{"population":   56866, "label": "Kirchdorf an der Krems"},
    "410":{"population":  150273, "label": "Linz-Land"},
    "411":{"population":   68459, "label": "Perg"},
    "412":{"population":   61204, "label": "Ried im Innkreis"},
    "413":{"population":   56524, "label": "Rohrbach"},
    "414":{"population":   57307, "label": "Sch\u00e4rding"},
    "415":{"population":   60427, "label": "Steyr-Land"},
    "416":{"population":   85505, "label": "Urfahr-Umgebung"},
    "417":{"population":  136253, "label": "V\u00f6cklabruck"},
    "418":{"population":   73094, "label": "Wels-Land"},
    "501":{"population":  154211, "label": "Salzburg(Stadt)"},
    "502":{"population":   60374, "label": "Hallein"},
    "503":{"population":  152281, "label": "Salzburg-Umgebung"},
    "504":{"population":   80573, "label": "Sankt Johann im Pongau"},
    "505":{"population":   20320, "label": "Tamsweg"},
    "506":{"population":   87462, "label": "Zell am See"},
    "601":{"population":  288806, "label": "Graz(Stadt)"},
    "603":{"population":   60821, "label": "Deutschlandsberg"},
    "606":{"population":  154260, "label": "Graz-Umgebung"},
    "610":{"population":   84155, "label": "Leibnitz"},
    "611":{"population":   60060, "label": "Leoben"},
    "612":{"population":   79901, "label": "Liezen"},
    "614":{"population":   27659, "label": "Murau"},
    "616":{"population":   51161, "label": "Voitsberg"},
    "617":{"population":   90343, "label": "Weiz"},
    "620":{"population":   72004, "label": "Murtal"},
    "621":{"population":   98984, "label": "Bruck-M\u00fcrzzuschlag"},
    "622":{"population":   90622, "label": "Hartberg-F\u00fcrstenfeld"},
    "623":{"population":   84276, "label": "S\u00fcdoststeiermark"},
    "701":{"population":  132110, "label": "Innsbruck-Stadt"},
    "702":{"population":   60056, "label": "Imst"},
    "703":{"population":  179318, "label": "Innsbruck-Land"},
    "704":{"population":   63881, "label": "Kitzb\u00fchel"},
    "705":{"population":  109682, "label": "Kufstein"},
    "706":{"population":   44362, "label": "Landeck" },
    "707":{"population":   48753, "label": "Lienz"},
    "708":{"population":   32670, "label": "Reutte"},
    "709":{"population":   83873, "label": "Schwaz"},
    "801":{"population":   64103, "label": "Bludenz"},
    "802":{"population":  134989, "label": "Bregenz"},
    "803":{"population":   89879, "label": "Dornbirn"},
    "804":{"population":  108123, "label": "Feldkirch"},
    "900":{"population": 1897491, "label": "Wien(Stadt)"}
  },
  nuts2: {
    "1": {"pop":  291493, "label": "Burgenland"},
    "2": {"pop":  560939, "label": "Kärnten"},
    "3": {"pop": 1677542, "label": "Niederösterreich"},
    "4": {"pop": 1482095, "label": "Oberösterreich"},
    "5": {"pop":  555221, "label": "Salzburg"},
    "6": {"pop": 1243052, "label": "Steiermark"},
    "7": {"pop":  754705, "label": "Tirol"},
    "8": {"pop":  397094, "label": "Vorarlberg"},
    "9": {"pop": 1897491, "label": "Wien"}
  }
}