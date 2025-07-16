/**
 * Compare.js - Copyright marc.wagner@gamerscon.de 
 * Vergleichen und markieren der Unterschieden zwischen zweier Strings.
 */
function Compare(strText_src,strText){
    this.m_StringSource = new Stringify(strText_src);
    this.m_StringTarget = new Stringify(strText);
    this.m_intMaxDistance = 20;
    // Vergleiche wort bei wort
    this.Start();
}

/**
 * Durchführen des Vergleichens
 */
Compare.prototype.Start = function () {
    // Zähler
    var intCounter = this.GetBiggerNumber(this.m_StringSource.CountWords(), this.m_StringTarget.CountWords());
    var intOffset = 0;
    var intOffsetSource = 0;
    var index = -1;

    // Durchlaufen aller Worte
    for (var i = 0; i < intCounter; i++) {
        //console.log("IntOffsetSource: " + intOffsetSource);
        if (this.m_StringTarget.GetWord(i) && this.m_StringSource.GetWord(i)) {
            if (this.m_StringTarget.GetWord(i).IsEqual(this.m_StringSource.GetWord(i).Get()) == false) {
                index = this.m_StringTarget.Find(this.m_StringSource.GetWord(i).Get(), intOffset+i, this.m_intMaxDistance);
                indexSource = this.m_StringSource.Find(this.m_StringTarget.GetWord(i).Get(), intOffsetSource+i, this.m_intMaxDistance);
                
                console.log("VGL: (" + i + ") Target: " + this.m_StringTarget.GetWord(i).Get() + " =  Source: " + this.m_StringSource.GetWord(i).Get() + " (index = " + index + ", indexscource = " + indexSource + " intOffset = "+(intOffset+i)+")");

                if (index == -1 && indexSource == -1) {
                    // Wort wurde gelöscht und wurde auch nicht später im string gefunden.
                    //this.m_StringTarget.Add("|", i, EnumWord.ADDED);
                    this.m_StringTarget.GetWord(i).SetState(EnumWord.ADDED);
                    intOffset++;
                } else if (index != -1 && indexSource != -1) {
                    // Es wurde ein Wort gelöscht zwischendrinnen
                    this.m_StringTarget.Add("|", i, EnumWord.DELETED);
                    intOffset++;
                } else if (index != -1 && indexSource == -1) {
                    // Wort wurde hinzugefügt - Füge im Source ein leerzeichen ein
                    this.m_StringSource.Add("", i, EnumWord.ADDED);
                    this.m_StringTarget.GetWord(i).SetState(EnumWord.ADDED);
                    intOffsetSource--;
                } else if (index == -1 && indexSource != -1) {
                    // Wort wurde gelöscht und kommt auch nicht mehr später im string vor
                    this.m_StringTarget.Add("|", i, EnumWord.DELETED);
                    this.m_StringSource.GetWord(i).SetState(EnumWord.DELETED);
                    intCounter++;
                }

                /*
                if (index != -1) {
                    this.m_StringSource.GetWord(i).SetState(EnumWord.MOVED);
                    intOffset = index; // Das offset dient dazu sicherzustellen, das keine Wörter vor dem Offset gesucht werden können damit diese wörter dnan nicht als vorhanden zählen.
                } else {
                    this.m_StringSource.GetWord(i).SetState(EnumWord.ADDED);
                }
                if (indexSource != -1) {
                    this.m_StringTarget.Add("|", i, EnumWord.DELETED);
                    intCounter++; // Erweitert die Forschleife da wörter hinzugefügt wurden. Sorgt dafür das kein Wort ausgelassen wird bei der ausgabe.
                    intOffsetSource = indexSource; // Das offset dient dazu sicherzustellen, das keine Wörter vor dem Offset gesucht werden können, damit diese wörter dann nicht als vorhanden zählen.
                } else {
                    //console.log("VGL: (" + i + ") " + this.m_StringTarget.GetWord(i).Get() + " = " + this.m_StringSource.GetWord(i).Get() + " (index = " + index + ")");
                    if (index != -1) {
                        this.m_StringSource.Add("", i, EnumWord.ADDED);
                        this.m_StringTarget.GetWord(i).SetState(EnumWord.ADDED);
                    } else {
                        //                        this.m_StringTarget.Add("|", i, EnumWord.ADDED);
                        this.m_StringTarget.GetWord(i).SetState(EnumWord.ADDED);
                    }
                    intOffsetSource--;
                }
                */
            }
        } else if (typeof (this.m_StringSource.GetWord(i)) === "undefined") {
            // Source String zu Ende, aber Target hat noch weitere Wörter - Dies beduetet der Target String ist länger als der Source string.
            // Das heißt alle Wörter die jetzt kommen sind neu hinzugekommen.
            if (this.m_StringTarget.GetWord(i)) {
                //if (this.m_StringSource.Find(this.m_StringTarget.GetWord(i).Get(), intOffsetSource, this.m_intMaxDistance) == -1)
                //{
                    this.m_StringTarget.GetWord(i).SetState(EnumWord.ADDED);
                    intOffsetSource++;
                //}
            }
        } else if (typeof (this.m_StringTarget.GetWord(i)) === "undefined") {
            // Source String ist lägner als der Target string. Das heißt alle wörter die jetzt kommen zählen als gelöscht.
            this.m_StringTarget.Add("|", i, EnumWord.DELETED);
            intOffsetSource = i;
        }
    }
    this.Debug(intCounter);
    //this.Display(intCounter);
}

Compare.prototype.Display = function (intCounter) {
    var isDelete = false;

    for (var i = 0; i < intCounter; i++) {
        if (this.m_StringTarget.GetWord(i)) {
            if (this.m_StringTarget.GetWord(i).GetState() != EnumWord.STANDARD) {
                if (isDelete == false) {
                    this.Log("<div class='change'>" + this.m_StringTarget.GetWord(i).Get() + "</div> ");
                }

                if (this.m_StringTarget.GetWord(i).Get() == "|") {
                    isDelete = true;
                } else {
                    isDelete = false;
                }
            } else {
                this.Log(this.m_StringTarget.GetWord(i).Get() + " ");
                isDelete = false;
            }
        }
    }
}

Compare.prototype.Debug = function (intCounter) {
    
    /// Durchlaufen aller Worte
    var str = "<table cellpadding='5' border='1'>";
    var cell = "<tr>";
    var sourceText = "<tr>";
    var targetText = "<tr>";
    var stateText = "<tr>";
    for (var i = 0; i < intCounter; i++) {
        cell += "<td>";
        if (this.m_StringTarget.GetWord(i)) {
            if (this.m_StringTarget.GetWord(i).GetState() != EnumWord.STANDARD) {
                cell += "<div class='change'>" + this.m_StringTarget.GetWord(i).Get() + "</div>";
            } else {
                cell += this.m_StringTarget.GetWord(i).Get();
            }
            //console.log(this.m_StringTarget.GetWord(i).Get() + " = " + this.m_StringTarget.GetWord(i).GetState());
        }
        cell += "</td>"

        // Textausgabe für debug
        if (this.m_StringSource.GetWord(i)) {
            sourceText += "<td>" + this.m_StringSource.GetWord(i).Get() + "</td>";
        }
        if (this.m_StringTarget.GetWord(i)) {
            targetText += "<td>" + this.m_StringTarget.GetWord(i).Get() + "</td>";
            stateText += "<td>" + this.m_StringTarget.GetWord(i).GetState() + "</td>";
        }
    }
    str += sourceText + "</tr>";
    //str += targetText + "</tr>";
    str += cell + "</tr>";
    str += stateText + "</tr>";

    str += "</table>";
    this.Log(str);
}

/**
 * Vergleichen zweier Zahlen und zurückgeben der größeren
 * @returns int
 */
Compare.prototype.GetBiggerNumber = function (number_one, number_two) {
    if (number_one > number_two) {
        return number_one;
    }
    return number_two;
}

/**
 * Log ausgeben
 */
Compare.prototype.Log = function(strText){
	$(".output").html($(".output").html()+""+strText);
}