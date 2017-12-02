export default Ember.HTMLBars.template({"id":"t69ErMxG","block":"{\"symbols\":[\"movie\"],\"statements\":[[6,\"h1\"],[7],[0,\"Solo Play\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[10,\"hidden\",[18,\"gameNotStarted\"],null],[7],[0,\"\\n  \"],[6,\"p\"],[7],[0,\"Start a game!\"],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"btn btn-primary btn-lg btn-block\"],[3,\"action\",[[19,0,[]],\"startGame\"]],[7],[0,\"Start\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[9,\"style\",\"min-width:750px;\"],[10,\"hidden\",[18,\"isDisabled\"],null],[7],[0,\"\\n  \"],[6,\"p\"],[9,\"id\",\"roundNumber\"],[7],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"id\",[26,[[19,1,[\"id\"]]]]],[10,\"data-best-movie\",[26,[[19,1,[\"bestMovie\"]]]]],[3,\"action\",[[19,0,[]],\"isBestMovie\",[19,1,[]]]],[7],[0,\"\\n  \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"poster\"]]]]],[9,\"class\",\"img-rounded float-left\"],[9,\"style\",\"max-width:250px; max-height:350px;\"],[10,\"alt\",[26,[[19,1,[\"title\"]]]]],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[2,\"\\n<div hidden={{timeForNextRound}}>\\n  <br><button class=\\\"btn btn-primary btn-lg\\\" {{action 'nextRound'}}>Next Round</button>\\n</div>\\n\"],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"p\"],[7],[0,\"Round Points: \"],[1,[18,\"roundPoints\"],false],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[10,\"hidden\",[18,\"gameFinished\"],null],[7],[0,\"\\n  \"],[6,\"b\"],[7],[6,\"p\"],[7],[0,\"Final Score: \"],[1,[18,\"gameFinalScore\"],false],[8],[8],[0,\"\\n  \"],[2,\"form handler for pushing name to database here\"],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[7],[0,\"\\n    \"],[6,\"h1\"],[7],[0,\"Account Info\"],[8],[0,\"\\n\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n    \"],[6,\"p\"],[7],[0,\"Please enter your Name\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"form-horizontal form-group form-group-lg row\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"col-md-4 col-md-offset-4\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"for\",\"firstName\"],[7],[0,\"First Name\"],[8],[0,\" \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"text\",[20,[\"firstName\"]],\"form-control\",\"First Name\",\"autofocus\"]]],false],[0,\"\\n        \"],[6,\"label\"],[9,\"for\",\"lastName\"],[7],[0,\"Last Name\"],[8],[0,\" \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"text\",[20,[\"lastName\"]],\"form-control\",\"Last Name\",\"autofocus\"]]],false],[0,\"\\n        \"],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"btn btn-primary btn-lg btn-block\"],[10,\"disabled\",[18,\"isDisabled2\"],null],[3,\"action\",[[19,0,[]],\"pushScoreToDatabase\"]],[7],[0,\"Submit\"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"responseMessage\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"class\",\"alert alert-success\"],[7],[1,[18,\"responseMessage\"],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[6,\"center\"],[7],[0,\"***Note: If movie does not display a poster, hover over for Movie's title***\"],[8],[0,\"\\n\"]],\"hasEval\":false}","meta":{"moduleName":"movie-quiz/templates/soloplay.hbs"}});