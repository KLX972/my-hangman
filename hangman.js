const Hangman = {
  data() {
    return {
      words: ['parapluie','tableau','television','bouteille','tapis','escalier','trampoline'],
      chosenWord: '',
      hiddenWord:[],
      letter: null
    }
  },
  methods: {
    chooseWord() {
      const random = Math.floor(Math.random() * this.words.length);
      this.chosenWord = this.words[random]
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
      for (var i = 0; i < this.chosenWord.length; i++) {
        if (this.letter === this.chosenWord[i]) {
          this.myHiddenWord[i] = this.letter
        }
      }
      this.letter = null
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
    }


  },
  mounted() {
    this.chooseWord()
    this.hideLetters()
  }
}

Vue.createApp(Hangman).mount('#app')
