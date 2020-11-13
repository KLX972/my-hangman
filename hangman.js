const Hangman = {
  data() {
    return {
      // words: ['parapluie','tableau','television','bouteille','tapis','escalier','trampoline','guitare','lapin','monsieur','ecouteur','boite',
      //         'savon','liquide','vaisselle','voiture','balance','chaise','ordinateur','blanc','ecran','fusil','pistolet','canon','habit','policier',
      //       'ecole','photo','fleche','cadeau','sapin','piscine','oreiller'],
      words: ['parapluie','tableau'],
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
    },
    hideLetters(){
      let arrayWord = this.chosenWord.split('')
      let numberOfLetters = arrayWord.length
      for (var i = 0; i < numberOfLetters; i++) {
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
          }
        }
        this.testedLetters.push(this.letter)
        this.letter = null
        if (success === false) {
          if (this.picture <= 5) {
            this.picture++
          }
          if (this.picture === 6) {
            this.victory = false
          }
        }else if (success === true) {
          let found = this.myHiddenWord.find(element => element  === '_')
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
