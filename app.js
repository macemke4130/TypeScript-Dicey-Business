var dieCount = 0;
var diceSet = [];
var maxDie = 10;
var Die = /** @class */ (function () {
    function Die() {
        this.div = $('<div></div>');
        this.value = random();
    }
    Die.prototype.generateDie = function () {
        this.div.attr('id', dieCount);
        this.div.text(this.value);
        this.div.addClass('die d-flex align-items-center justify-content-center m-2');
        $('#table').append(this.div); // #table is a div container for the .dice objects --
        dieCount++;
        this.div.click(function () {
            diceSet[this.id].roll();
        });
        this.div.dblclick(function () {
            diceSet[this.id].remove();
        });
    };
    Die.prototype.roll = function () {
        this.value = random();
        this.div.text(this.value);
        $('#sum-result').text(''); // Clears Output --
    };
    Die.prototype.remove = function () {
        delete diceSet[this.div.attr('id')]; // Empties diceSet array location --
        $('#' + this.div.attr('id')).remove(); // Removes <div> from HTML --
        diceSet = diceSet.filter(function (x) { return x != null; }); // Removes empty array locations --
        for (var index = 0; index < diceSet.length; index++) {
            diceSet[index].id = index; // Renames id of the array Die objects --
            $('.die')[index].id = index.toString(); // Renames all of the element ids in the HTML. HTML IDs must be a string type --
        }
        dieCount--; // Decrements dieCount for a Die removal --
        $('#sum-result').text(''); // Clears Output --
    };
    return Die;
}());
var $generate = $('#generate-die'); // Button in HTML --
$generate.click(function () {
    if (dieCount < maxDie) { // Limits number of dice on screen --
        // Puts new Die object in the diceSet array and calls generateDie() on that object --
        diceSet[dieCount] = new Die;
        diceSet[dieCount].generateDie();
        $('#sum-result').text(''); // Clears Output --
    }
});
// This random() function has nothing to do with an individual Die so I did not see it neccesary to include it in the class --
function random() {
    return Math.floor((Math.random() * 6) + 1);
}
var $sum = $('#sum-dice'); // Sum Dice <button> --
$sum.click(function () {
    var addItUp = 0;
    for (var index = 0; index < diceSet.length; index++) {
        var x = diceSet[index].value;
        addItUp = addItUp + x;
    }
    if (dieCount == 0) {
        $('#sum-result').text('There are no dice to add!');
    }
    else {
        $('#sum-result').text("The sum of all dice is " + addItUp + ".");
    }
});
var $roll = $('#roll-dice'); // Roll Dice <button) --
$roll.click(function () {
    if (dieCount == 0) {
        $('#sum-result').text('There are no dice to roll!');
    }
    ;
    for (var index = 0; index < diceSet.length; index++) {
        diceSet[index].roll();
    }
});
