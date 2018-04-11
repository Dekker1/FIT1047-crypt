function get_key() {
    var map = [];
    for (let i = 0; i < 26; i++) {
        map.push($("#" +String.fromCharCode(i + 65)).val());
    }

    for (let i = 0; i < map.length; i++) {
        if (!(typeof map[i] === 'string' || map[i] instanceof String) || map[i].length < 1) {
            map[i] = String.fromCharCode(i + 65);
        } else {
            const code = map[i].charCodeAt(0);
            if (map[i].length > 1) {
                map[i] = map[i][0];
                $("#" +String.fromCharCode(i + 65)).val(map[i][0]);
            } else if (code >= 65 && code <= 90) {
                map[i] = String.fromCharCode(code + 32);
            }
        }
    }

    return map;
}

function encrypt(plaintext, key) {
    var encrypted = "";

    var text = plaintext.toUpperCase();
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            encrypted += key[code - 65];
        } else {
            encrypted += text[i];
        }
    }

    return encrypted;
}

function decrypt(encrypted, key) {
    var plaintext = "";

    var text = encrypted.toLowerCase()
    for (let i = 0; i < text.length; i++) {
        var loc = key.indexOf(text[i]);
        const code = text.charCodeAt(i);
        if (loc >= 0) {
            plaintext += String.fromCharCode(loc + 97);
        } else if (97 <= code && code <= 122) {
            plaintext += String.fromCharCode(code - 32);
        } else {
            plaintext += text[i];
        }
    }

    return plaintext;
}

$(document).ready(function() {
    $("#encrypt").button().click(function(){
        var key = get_key();
        var text = $("#plain-text").val();
        $("plain-text").val(text.toLowerCase());
        var encrypted = encrypt(text, key);
        $("#encrypted-text").val(encrypted);
    });
    $("#decrypt").button().click(function(){
        var key = get_key();
        var text = $("#encrypted-text").val();
        $("#encrypted-text").val(text.toLowerCase());
        var decrypted = decrypt(text, key);
        $("#plain-text").val(decrypted);
    });
    $("#generate-alpha").button().click(function(){
        var key = get_key();
        var alpha = "";
        for (let i = 0; i < key.length; i++) {
            alpha += key[i];
        }
        $("#alphabet").val(alpha);
    });
    $("#import-alpha").button().click(function(){
        var alpha = $("#alphabet").val();
        if (alpha.length != 26) {
            alert("Alphabet of invalid length");
            return;
        }
        alpha = alpha.toUpperCase();
        for (let i = 0; i < alpha.length; i++) {
            const code = alpha.charCodeAt(i);
            if (code != i + 65) {
                $("#" +String.fromCharCode(i + 65)).val(alpha[i]);
            }
        }
    });
});
