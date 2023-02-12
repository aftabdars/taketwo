function Game(){
    this.cards = {clubs:{}, hearts:{}, spades:{}, diamonds:{}};
    this.deck = [];
    this.players = [];

    //adds cards 1-10 in all colors
    for(let i = 1; i < 11; i++){
        Object.keys(this.cards).forEach(key => {
            this['cards'][key][i] = 'deck';
        })
    }
    //adds KQJ for all colors
    Object.keys(this.cards).forEach(key => {
        this['cards'][key]['k'] = 'deck';
        this['cards'][key]['q'] = 'deck';
        this['cards'][key]['j'] = 'deck';
    })
    
    this.fillDeck = () => {
        for (let i = 0; i<52; i++) {
            let cardColor = '';
            let cardNumber = '';
            do{
                let rng = 1 + Math.floor(52 * Math.random());
                // determines the color according to rng
                    switch(true){
                        case (rng < 14): cardColor = 'clubs'; break;
                        case (rng < 27): cardColor =  'hearts'; break;
                        case (rng < 40): cardColor =  'spades'; break;
                        case (rng < 53): cardColor =  'diamonds'; break;
                }
                // determines number according to rng
                    let x = rng % 13;
                    switch(x){
                        case 11: cardNumber = 'j'; break;
                        case 12: cardNumber = 'q'; break;
                        case 13: cardNumber = 'k'; break;
                        default: cardNumber = x; break;
                }
            }while(this['cards'][cardColor][cardNumber] != 'deck');

            // adds card to deck array
            card = {};
            card[cardColor] = cardNumber
            this.deck.push(card);
        }
    }

    this.join = (name) => {
        this.players.push(name);
    }

    this.getCard = () => {
        if (this.deck.length == 0) this.fillDeck();
        let newCard = this.deck.pop();
        //change card state
        let cardColor = Object.keys(newCard)[0];
        let cardNumber = newCard[cardColor];
        this.cards[cardColor][cardNumber] = 'hand';

        return newCard;
    }

    this.startGame = () => {

    }
};


//testing
const game = new Game ();
game.getCard();

//these functions are working... waiting for opponent and starting game next or maybe finish signin first
// console.log(game.deck);
// console.log(game.cards);

// module.exports = {Game};