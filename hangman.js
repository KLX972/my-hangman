const Hangman = {
  data() {
    return {
      words: ['parapluie','tableau','television','bouteille','tapis','escalier','trampoline','guitare','lapin','monsieur','ecouteur','boite',
              'savon','liquide','vaisselle','voiture','balance','chaise','ordinateur','blanc','ecran','fusil','pistolet','canon','habit','policier',
            'ecole','photo','fleche','cadeau','sapin','piscine','oreiller','verre','rideau','fenetre','canape','table','bougie','tasse','pull',
            'crayon','trousse','ciseau','cartable','classe','mathematique','francais','professeur','culotte','chemise','pantalon'],
      // words: ['parapluie','tableau'],
      chosenWord: '',
      hiddenWord:[],
      letter: null,
      picture: 0,
      victory: null,
      testedLetters: []
    }
  },
  methods: {
    init() {
      const random = Math.floor(Math.random() * this.words.length);
      this.chosenWord = this.words[random].toUpperCase()
      this.picture = 0
      this.letter = null
      this.victory = null
      this.hideLetters()
      this.$refs.test.focus()
      this.testedLetters = []
      this.findedLetters = []
    },
    hideLetters(){
      let arrayWord = this.chosenWord.split('')
      for (var i = 0; i < arrayWord.length; i++) {
        arrayWord[i] = "_"
      }
      this.myHiddenWord = arrayWord
    },
    testLetter(){
      if (this.letter !== null) {
        let success = false
        for (var i = 0; i < this.chosenWord.length; i++) {
          if (this.letter === this.chosenWord[i]) {
            this.myHiddenWord[i] = this.letter
            success = true
            this.findedLetters.push(this.letter)
          }
        }
        this.testedLetters.push(this.letter)
        this.letter = null
        let hangmanImg = document.querySelector('.hangman-img');
        let wordToFind = document.querySelector('.my-word-to-find-content');

        if (success === false) {
          if (this.picture <= 5) {
            this.picture++
            hangmanImg.classList.add('animate__animated', 'animate__tada');
            hangmanImg.addEventListener('animationend', () => {
              hangmanImg.classList.remove('animate__animated', 'animate__tada')
            });

          }
          if (this.picture === 6) {
            hangmanImg.classList.add('animate__animated', 'animate__hinge');
            hangmanImg.addEventListener('animationend', () => {
              hangmanImg.classList.remove('animate__animated', 'animate__hinge')
            });
            for (var i = 0; i < this.myHiddenWord.length; i++) {
              if (this.myHiddenWord[i] === '_') {
                this.myHiddenWord[i] = this.chosenWord[i]
              }
            }
            this.victory = false
          }
        }else if (success === true) {
          let found = this.myHiddenWord.find(element => element  === '_')
          wordToFind.classList.add('animate__animated', 'animate__bounceIn');
          wordToFind.addEventListener('animationend', () => {
            wordToFind.classList.remove('animate__animated', 'animate__bounceIn')
          });
          if (found === undefined) {
            this.victory = true
          }
        }
      }

    },
    upper(e) {
        e.target.value = e.target.value.toUpperCase()
        this.myLetter = e.target.value
    },
    testLetterWithEnterButton(e){
        if (e.keyCode === 13) {
            this.testLetter()
        }
    },
    testFindedLetter(letter){
      let found = this.findedLetters.find(element => element  === letter)
      if (found === undefined) {
        return false
      }else {
        return true
      }
    }
  },
  computed: {
    myHiddenWord:{
      get: function(){
        return this.hiddenWord
      },
      set: function(newValue){
        this.hiddenWord= newValue
      }
    },
    myLetter:{
      get: function(){
        return this.letter
      },
      set: function(newValue){
        this.letter= newValue
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.testLetterWithEnterButton);
    this.init()
    this.hideLetters()
    this.$refs.test.focus()

  }
}

Vue.createApp(Hangman).mount('#app')
