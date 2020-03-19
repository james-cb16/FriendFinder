var friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends)
    });

    app.post("/api/friends", function (req, res) {
        var closeResult = {
            name: "",
            photo: "",
            characterContrast: Infinity
        };
        var personInfo = req.body;
        var personChoices = personInfo.scores;
        var sumOfContrast;
        for (var i = 0; i < friends.length; i++) {
            var selectedPerson = friends[i];
            sumOfContrast = 0;
            console.log(selectedPerson.name);
            for (var j = 0; j < selectedPerson.scores.length; j++) {
                var selectedPersonScore = selectedPerson.scores[j];
                var userScore = personChoices[j];
                sumOfContrast += Math.abs(parseInt(userScore) - parseInt(selectedPersonScore))
            }
            if (sumOfContrast <= closeResult.characterContrast) {
                closeResult.name = selectedPerson.name;
                closeResult.photo = selectedPerson.photo;
                closeResult.characterContrast = sumOfContrast
            }
        }
        friends.push(personInfo);
        res.json(closeResult)
    })
};