/**
 * Die Stringify Klasse verwaltet Strings
 */
function Stringify(strText) {
    this.m_strSource = strText;                             // Der eigentliche String
    this.m_intCountChars = strText.length;                  // Die anzahl an zeichen im String
    this.m_intCountWords = strText.split(" ").length;       // Die anzahl der Wörter im String
    this.m_arrWords = this.InitWords();
}

/**
 * Wörter initialisieren
 * @return array
 */
Stringify.prototype.InitWords = function () {
    var data = new Array();

    if (this.CountChars() > 0) {
        var arr = this.m_strSource.split(" ");
        for (var i = 0; i < arr.length; i++) {
            data.push(new Wortify(arr[i],i));
        }
    }
    return data;
}

/**
 * Liefert den Text zurück
 * @return string
 */
Stringify.prototype.GetText = function () {
    return this.m_strSource;
}

/**
 * Liefert die Anzahl aller Chars im String zurück
 * @return int
 */
Stringify.prototype.CountChars = function () {
    return this.m_intCountChars;
}

/**
 * Liefert die Anzahl aller Wörter im String zurück
 * @return int
 */
Stringify.prototype.CountWords = function () {
    return this.m_intCountWords;
}

/**
 * Durchsucht den String nach einem Wort und Liefert anschließend den index zurück an dem sich das Wort befindet
 * @param string    - Wort das gesucht wird
 * @param int       - Offset ab dem begonnen wird zu suchen
 * @param int       - Limit wie weit gesucht wird
 * @return int
 */
Stringify.prototype.Find = function (strWord, intOffset, intLimit) {
    if (isNaN(intOffset)) {
        intOffset = 0;
    }
    if (isNaN(intLimit)) {
        intLimit = this.m_arrWords.length;
    } else {
        intLimit = intOffset + intLimit;
    }
    
    //console.log(strWord + " : " + intOffset);

    for (var i = intOffset; i < intLimit; i++)
    {
        if (typeof (this.m_arrWords[i]) !== "undefined") {
            if (this.m_arrWords[i].IsEqual(strWord)) {
                return i;
            }
        }
    }
    return -1;
}

/**
 * Add ermöglicht es ein wort zum String hinzuzufügen
 */
Stringify.prototype.Add = function (strWord, intPosition, EnumState) {
    var Wort = new Wortify(strWord, intPosition)
    Wort.SetState(EnumState);
    var tmp = this.m_arrWords.slice(0, intPosition);
    var tmp2 = this.m_arrWords.slice(intPosition, this.m_arrWords.length);
    tmp.push(Wort);
    tmp = tmp.concat(tmp2);
    this.m_arrWords = tmp;
    return Wort;
}

/**
 * Ein Wort an einer Bestimmten stelle abfragen und zurückgeben
 * @return string
 */
Stringify.prototype.GetWord = function (intIndex) {
    return this.m_arrWords[intIndex];
}