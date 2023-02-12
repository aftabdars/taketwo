class Game{

    constructor(){
    this.inProgress = false;
    this.cards = [];
    this.deck = [];
    this.players = [];


    let colors = ['clubs', 'hearts', 'diamonds', 'spades'];
        //adds cards 1-10 in all colors
    for(let i = 1; i < 11; i++){  
        colors.forEach(element => {
            this.cards.push({'number': i, 'color': element, 'position': 'deck'});
        })  
    }
    //adds KQJ for all colors
    colors.forEach(element => {
        this.cards.push({'number': 'k', 'color': element, 'position': 'deck'});
        this.cards.push({'number': 'q', 'color': element, 'position': 'deck'});
        this.cards.push({'number': 'j', 'color': element, 'position': 'deck'});
    })
    }

    fillDeck() {
        for(let i = 0; i<52; i++) {
            let rng = 1;
            do {
                rng = Math.floor(52 * Math.random());
            }while(this.cards[rng]['position'] != 'deck');
            //add the random card to deck
            this.deck.push(this.cards[rng]);
        }
    }

    join(data) {
        this.players.push(data);
    }

    disconnect(data) {
        this.players.forEach ( (value, index) => {
            if (value['id'] == data['id']) {
                this.players.splice(index,1);
            }
        })
    }

    getCard() {
        if(this.deck.length == 0) this.fillDeck();
        return this.deck.pop();
    }

    startGame () {

    }
};


//testing
// const game = new Game ();
// game.getCard();

// //these functions are working... waiting for opponent and starting game next or maybe finish signin first
// console.log(game.deck);
// console.log(game.cards);

module.exports = {Game};