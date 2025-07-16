// Enum über den Zsustand
var EnumWord = {
    DELETED: -1,
    MOVED: 1,
    ADDED: 2,
    STANDARD:3
}

/**
 * Wortify ist für jedes einzelne Wort verantwortlich.
 */
function Wortify(strWord, intPosition) {
    this.m_strSource = strWord;             // Das wort
    this.m_intPosition = intPosition;       // Die Position im String
    this.m_enumState = EnumWord.STANDARD;   // Zustand
    this.m_bcasesensitive = true;
}

/**
 * Abfragen des Wortes
 * @return string
 */
Wortify.prototype.Get = function () {
    return this.m_strSource;
}

/**
 * Position abfragen
 * @return int
 */
Wortify.prototype.Position = function () {
    return this.m_intPosition;
}

/**
 * Position aktualisieren
 * @params int - Position im String
 */
Wortify.prototype.SetPosition = function (intPosition) {
    if (this.m_intPosition != intPosition && this.m_enumState != EnumWord.MOVED) {
        this.m_intPosition = intPosition;
        this.m_enumState = EnumWord.MOVED;
    }
}

/**
 * Zustand abfragen
 * @return EnumWord
 */
Wortify.prototype.GetState = function () {
    return this.m_enumState;
}

/**
 * Status ändern
 */
Wortify.prototype.SetState = function (enumState) {
    this.m_enumState = enumState;
}

/**
 * Vergleicht ein Wort mit dem Wort aus dem Objekt und liefert dann true zurück wenn identisch oder false wenn nicht gleich
 * @returns bool
 */
Wortify.prototype.IsEqual = function (strWord) {
    var src = this.m_strSource;
    // Abfragen ob casesenstive
    if (this.m_bcasesensitive == false) {
        src = src.toLowerCase();
        strWord = strWord.toLowerCase();
    }

    //console.log("VGL: " + strWord + " = " + this.m_strSource + ": "+(this.m_strSource == strWord));
    if (src == strWord) {
        return true;
    }
    return false;
}
