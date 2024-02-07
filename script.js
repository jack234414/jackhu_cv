Vue.component('button-counter', {
  data: function () {
    return {
      welcome: true,
      seen1: false,
      seen2: false,
      seen3: false
    }
  }
})

Vue.component('todo-item', {
    template: '\
        <li>\
        {{number}}\
        </li>\
    ',
    props: ['number']
})

var app = new Vue({
    el: "#app",
    data: {
        //msg or feedback variables
        message : "",
        result : "",
        restartNote : "",
        diffRange : "",
        congratsImg : false,
        liarImg : false,
        errResult : "",
        //to hide button if it need to be disabled
        disabled : false,
        guessed : false,
        disabled3 : true,
        guessed3 : true,
        disabled4 : true,
        guessed4 : true,
        setted : false,
        wrongGuessed : false,
        //count how many times you've tried
        numTrial : 0,
        mixnum : 0,
        maxnum : 99,
        //generate a random and set it as the answer
        correctNum : 0,
        correctNum3 : null,
        correctNum4 : null,
        absoluteNum : 0,
        //when you click "Run code" label, how it change the page to the specific one
        seen1: false,
        seen2: false,
        seen3: false,
        seen4: false,
        welcome: true,
        //a list to record the number computer guesses
        newGuess : 0,
        newGuess4 : 0,
        guessList : [
            {
              number: "thinking: ",
            }
        ],
        alreadyIn : "",
        loseImg : false

    },
    //Called a random number first before the mounting begins, this can avoid it is change by actions, such as clicking
    //ref: https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
    beforeMount() {
        this.correctNum = Math.floor(Math.random() * 100)
    },
    methods: {
        //when users input a string, the random number should keep as its original number.
        originalRadmNum: function() {
            return this.correctNum
        },
        /*------------------------------------------------
        Iteration 1
        ------------------------------------------------*/
        Submit: function() {
            this.guessed = true
            var corr = this.originalRadmNum()
            this.result = ""
            this.restartNote = ""

            //condition
            if(parseInt(this.message) >= 0 && parseInt(this.message) <= 99 && this.correctNum > parseInt(this.message)) {
                this.result = "Try higher"
                this.numTrial += 1
            }
            else
                if(parseInt(this.message) >= 0 && parseInt(this.message) <= 99 && this.correctNum < parseInt(this.message)) {
                    this.result = "Try lower"
                    this.numTrial += 1
                }
            else
                if(this.correctNum == parseInt(this.message)) {
                    this.result = "Congrats!"
                    this.congratsImg = true
                    this.restartNote = "Please press the Restart button to play again!"
                    this.numTrial += 1
                    this.disabled = true
                    document.getElementById("newColor").style.backgroundColor = "Yellow"
                }
            else{
                this.result = "You should input a number between 0 and 99, it cannot be a text!"
                this.correctNum = corr
            }
        },

        /*------------------------------------------------
        Iteration 2
        ------------------------------------------------*/
        Submit2: function() {
            this.guessed = true
            var corr = this.originalRadmNum()
            this.result = ""
            this.restartNote = ""
            this.absoluteNum = Math.abs(this.correctNum  - parseInt(this.message))

            if(parseInt(this.message) >= 0 && parseInt(this.message) <= 99 && this.absoluteNum >= 40) {
                this.result = "Cold"
                this.diffRange = "over 40"
                //document.getElementById("newColor").style.backgroundColor = "DodgerBlue"
                this.numTrial += 1
            }
            else
                if(parseInt(this.message) >= 0 && parseInt(this.message) <= 99 && this.absoluteNum >= 20 && this.absoluteNum <= 39) {
                    this.result = "Cool"
                    this.diffRange = "between 20-39"
                    //document.getElementById("newColor").style.backgroundColor = "DeepSkyBlue"
                    this.numTrial += 1
                }
            else
                if(parseInt(this.message) >= 0 && parseInt(this.message) <= 99 && this.absoluteNum >= 10 && this.absoluteNum <= 19) {
                    this.result = "Warn"
                    this.diffRange = "between 10-19"
                    //document.getElementById("newColor").style.backgroundColor = "Orange"
                    this.numTrial += 1
            }
            else
                if(parseInt(this.message) >= 0 && parseInt(this.message) <= 99 && this.absoluteNum >= 1 && this.absoluteNum <= 9) {
                    this.result = "Hot"
                    this.diffRange = "between 1-9"
                    //document.getElementById("newColor").style.backgroundColor = "Crimson"
                    this.numTrial += 1
            }
            else
                if(this.absoluteNum == 0) {
                    this.result = "Congrats!"
                    this.congratsImg = true
                    this.restartNote = "Please press the Restart button to play again!"
                    this.diffRange = "0"
                    this.numTrial += 1
                    this.disabled = true
                    document.getElementById("newColor").style.backgroundColor = "Yellow"
            }
            else{
                this.result = "You should input a number between 0 and 99, it cannot be a text!"
                this.correctNum = corr
            }
        },

        /*------------------------------------------------
        Iteration 3
        ------------------------------------------------*/
        setNum3: function() {
            this.wrongGuessed = true
            this.setted = true
            this.correctNum3 = parseInt(this.message)
            this.errResult = ""

            if(!isNaN(this.correctNum3) && this.correctNum3 >= 0 && this.correctNum3 <= 99) {
                this.guessed3 = false
                return this.correctNum3
            }
            else {
                this.errResult = "You should input a number between 0 and 99, it cannot be a text!"
                this.setted = false
            }
        },
        addGuess3: function () {
            this.newGuess = Math.floor(Math.random() * (this.maxnum - this.mixnum) + this.mixnum)
            this.guessList.push({
                number: this.newGuess
            })
            this.numTrial += 1
            this.guessed3 = true
            this.disabled3 = false
            if(this.numTrial > 1) {
                this.computerReply = "ummmm...bad luck"
            }
        },
        tryhigher: function() {
            if(this.newGuess == this.maxnum) {
                this.computerReply = "Hey! It is not equal to your setting, liar!"
                this.restartNote = "Please press the Restart button to play again!"
                this.disabled3 = true
                this.liarImg = true
                document.getElementById("newColor").style.backgroundColor = "OrangeRed"
                document.getElementById("newColor").style.color = "White"
            }
            else {
                this.mixnum = this.newGuess + 1
                this.addGuess3()
            }
        },
        trylower: function() {
            if(this.newGuess == this.mixnum) {
                this.computerReply = "Hey! It is not equal to your setting, liar!"
                this.restartNote = "Please press the Restart button to play again!"
                this.disabled3 = true
                this.liarImg = true
                document.getElementById("newColor").style.backgroundColor = "OrangeRed"
                document.getElementById("newColor").style.color = "White"
            }
            else {
                this.maxnum = this.newGuess - 1
                this.addGuess3()
            }
        },
        correct3: function() {
            if(this.newGuess != this.correctNum3) {
                this.computerReply = "Hey! It is not equal to your setting, liar!"
                this.restartNote = "Please press the Restart button to play again!"
                this.disabled3 = true
                this.guessed3 = true
                this.liarImg = true
                document.getElementById("newColor").style.backgroundColor = "OrangeRed"
                document.getElementById("newColor").style.color = "White"
            }
            else {
                this.computerReply = "Yesssss!"
                this.restartNote = "Please click the Restart button to play again!"
                this.disabled3 = true
                this.guessed3 = true
                this.congratsImg = true
                document.getElementById("newColor").style.backgroundColor = "Yellow"
                document.getElementById("newColor").style.color = "#999999"
            }
        },

        /*------------------------------------------------
        Iteration 4
        ------------------------------------------------*/
        setNum4: function() {
            this.wrongGuessed = true
            this.setted = true
            this.correctNum4 = parseInt(this.message)
            this.errResult = ""

            if(!isNaN(this.correctNum4) && this.correctNum4 >= 0 && this.correctNum4 <= 99) {
                this.guessed4 = false
                return this.correctNum4
            }
            else {
                this.errResult = "You should input a number between 0 and 99, it cannot be a text!"
                this.setted = false
            }
        },
        addGuess4: function () {
            document.getElementById("toggDiv").style.display = "block"
            this.newGuess4 = Math.floor(Math.random() * (this.maxnum - this.mixnum) + this.mixnum)
            this.absoluteNum = Math.abs(this.correctNum4  - this.newGuess4)
            if (this.isExist() == false) {
                this.guessList.push({
                    number: this.newGuess4
                })
                this.numTrial += 1
            }
            else {
                this.numTrial += 0
            }

            this.guessed4 = true //should be true
            this.disabled4 = false
            this.checkRange()
        },
        checkRange : function() {
            if(this.absoluteNum > 40) {
                this.diffRange = "over 40"
                document.getElementById("prompt").style.backgroundColor = "#00539C"
                document.getElementById("prompt").style.color = "White"
            }
            else
                if(this.absoluteNum >= 20 && this.absoluteNum <= 39) {
                    this.diffRange = "between 20-39"
                    document.getElementById("prompt").style.backgroundColor = "#6F9FD8"
                    document.getElementById("prompt").style.color = "White"
            }
            else
                if(this.absoluteNum >= 10 && this.absoluteNum <= 19) {
                    this.diffRange = "between 10-19"
                    document.getElementById("prompt").style.backgroundColor = "#DD4132"
                    document.getElementById("prompt").style.color = "White"
            }
            else
                if(this.absoluteNum >= 1 && this.absoluteNum <= 9) {
                    this.diffRange = "between 1-9"
                    document.getElementById("prompt").style.backgroundColor = "#9E1030"
                    document.getElementById("prompt").style.color = "White"
            }
            else
                if(this.absoluteNum == 0) {
                    /*
                    this.diffRange = "correct!"
                    document.getElementById("prompt").style.backgroundColor = "#00539C"
                    document.getElementById("prompt").style.color = "White"
                    */
                    this.computerReply = "Hey! It actually is equal to your setting, liar!"
                    this.restartNote = "Please press the Restart button to play again!"
                    this.disabled4 = true
                    this.liarImg = true
                    document.getElementById("newColor").style.backgroundColor = "OrangeRed"
                    document.getElementById("newColor").style.color = "White"
            }
        },
        isExist : function() {
            for(var i=0; i < this.guessList.length; i++) {
                if( this.newGuess4 == this.guessList[i].number ) {
                    return this.alreadyIn = true
                }
            }
            return this.alreadyIn = false
        },
        nextGuess : function() {
            this.newGuess4 = Math.floor(Math.random() * (this.maxnum - this.mixnum) + this.mixnum)
            this.absoluteNum = Math.abs(this.correctNum  - this.newGuess)
            this.guessList.push({
                number: this.newGuess4
            })
            this.numTrial += 1
        },
        hot: function() {
            if(this.numTrial < 40){
                if(this.newGuess4+9 <= 99 && this.newGuess4-9 >= 0) {
                    this.maxnum = this.newGuess4+9
                    this.mixnum = this.newGuess4-9
                    this.nextGuess()
                    this.checkRange()
                }
                else
                    if(this.newGuess4+9 > 99) {
                        this.maxnum = 99
                        this.mixnum = this.newGuess4-9
                        this.nextGuess()
                        this.checkRange()
                }
                else
                    if(this.newGuess-9 < 0) {
                        this.maxnum = this.newGuess4+9
                        this.mixnum = 0
                        this.nextGuess()
                        this.checkRange()
                }
            }
            else {
                this.computerReply = "oh! no...I lose..."
                this.restartNote = "Please press the Restart button to play again!"
                document.getElementById("newColor").style.backgroundColor = "#898E8C"
                document.getElementById("newColor").style.color = "White"
                this.disabled4 = true
                this.loseImg = true
            }
        },
        warm: function() {
            if(this.numTrial < 40){
                if(this.newGuess4+19 <= 99 && this.newGuess4-19 >= 0) {
                    this.maxnum = this.newGuess4+19
                    this.mixnum = this.newGuess4-19
                    var diffx = 9
                    this.newGuess4 = Math.floor((Math.random() * (this.maxnum - (this.newGuess-9))) + this.mixnum)
                    if (this.newGuess4 >= this.newGuess4-9)
                        this.newGuess4  += diffx
                    this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                    this.guessList.push({
                        number: this.newGuess4
                    })
                    this.numTrial += 1
                    this.checkRange()
                }
                else
                    if(this.newGuess4+19 > 99) {
                        this.maxnum = 99
                        this.mixnum = this.newGuess4-19
                        var diffx = 9
                        this.newGuess4 = Math.floor(Math.random() * (this.maxnum - (this.newGuess4-9) + this.mixnum))
                        if (this.newGuess4 >= this.newGuess4-9)
                            this.newGuess4  += diffx
                        this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                        this.guessList.push({
                            number: this.newGuess4
                        })
                        this.numTrial += 1
                        this.checkRange()
                }
                else
                    if(this.newGuess4-19 < 0) {
                        this.maxnum = this.newGuess4+19
                        this.mixnum = 0
                        var diffx = 9
                        this.newGuess4 = Math.floor(Math.random() * (this.maxnum - (this.newGuess4-9) + this.mixnum))
                        if (this.newGuess4 >= this.newGuess4-9)
                            this.newGuess4 += diffx

                        this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                        this.guessList.push({
                            number: this.newGuess4
                        })
                        this.numTrial += 1
                        this.checkRange()
                }
            }
            else {
              this.computerReply = "oh! no...I lose..."
              this.restartNote = "Please press the Restart button to play again!"
              document.getElementById("newColor").style.backgroundColor = "#898E8C"
              document.getElementById("newColor").style.color = "White"
              this.disabled4 = true
              this.loseImg = true
            }
        },

        cool: function() {
            if(this.numTrial < 40){
                if(this.newGuess4+39 <= 99 && this.newGuess4-39 >= 0) {
                    this.maxnum = this.newGuess4+39
                    this.mixnum = this.newGuess4-39
                    var diffx = 19
                    this.newGuess4 = Math.floor(Math.random() * (this.maxnum - (this.newGuess4-19) + this.mixnum))
                    if (this.newGuess4 >= this.newGuess4-19)
                        this.newGuess4 += diffx
                    this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                    this.guessList.push({
                        number: this.newGuess4
                    })
                    this.numTrial += 1
                    this.checkRange()
                }
                else
                    if(this.newGuess4+39 > 99) {
                        this.maxnum = 99
                        this.mixnum = this.newGuess4-39
                        var diffx = 19
                        this.newGuess4 = Math.floor(Math.random() * (this.maxnum - (this.newGuess4-19) + this.mixnum))
                        if (this.newGuess4 >= this.newGuess4-19)
                            this.newGuess4 += diffx
                        this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                        this.guessList.push({
                            number: this.newGuess4
                        })
                        this.numTrial += 1
                        this.checkRange()
                }
                else
                    if(this.newGuess4-39 < 0) {
                        this.maxnum = this.newGuess4+39
                        this.mixnum = 0
                        var diffx = 19
                        this.newGuess4 = Math.floor(Math.random() * (this.maxnum - (this.newGuess4-19) + this.mixnum))
                        if (this.newGuess4 >= this.newGuess4-19)
                            this.newGuess4 += diffx

                        this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                        this.guessList.push({
                            number: this.newGuess4
                        })
                        this.numTrial += 1
                        this.checkRange()
                }
            }
            else {
                this.computerReply = "oh! no...I lose..."
                this.restartNote = "Please press the Restart button to play again!"
                document.getElementById("newColor").style.backgroundColor = "#898E8C"
                document.getElementById("newColor").style.color = "White"
                this.disabled4 = true
                this.loseImg = true
            }
        },

        cold: function() {
            if(this.numTrial < 40){
                if(this.newGuess4+40 <= 99 && this.newGuess4-40 >= 0) {
                    this.maxnum = this.newGuess4+40
                    this.mixnum = this.newGuess4-40
                    var diffx = 40
                    this.newGuess4 = Math.floor((Math.random() * (this.maxnum - this.mixnum)) + this.mixnum)
                    if (this.newGuess4 >= this.mixnum)
                        this.newGuess4 += diffx
                    this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                    this.guessList.push({
                        number: this.newGuess4
                    })
                    this.numTrial += 1
                    this.checkRange()
                }
                else
                    if(this.newGuess4+40 > 99) {
                        this.maxnum = 99
                        this.mixnum = this.newGuess4-40
                        var diffx = 40
                        this.newGuess4 = Math.floor((Math.random() * (this.maxnum - this.mixnum)) + this.mixnum)
                        if (this.newGuess4 >= this.mixnum)
                            this.newGuess4 += diffx
                        this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                        this.guessList.push({
                            number: this.newGuess4
                        })
                        this.numTrial += 1
                        this.checkRange()
                }
                else
                    if(this.newGuess4-40 < 0) {
                        this.maxnum = this.newGuess4+40
                        this.mixnum = 0
                        var diffx = 40
                        this.newGuess4 = Math.floor((Math.random() * (this.maxnum - this.mixnum)) + this.mixnum)
                        if (this.newGuess4 >= this.mixnum)
                            this.newGuess4 += diffx

                        this.absoluteNum = Math.abs(this.correctNum4 - this.newGuess4)
                        this.guessList.push({
                            number: this.newGuess4
                        })
                        this.numTrial += 1
                        this.checkRange()
                }
            }
            else {
                this.computerReply = "oh! no...I lose..."
                this.restartNote = "Please press the Restart button to play again!"
                document.getElementById("newColor").style.backgroundColor = "#898E8C"
                document.getElementById("newColor").style.color = "White"
                this.disabled4 = true
                this.loseImg = true
            }
        },

        correct: function() {
            if(this.newGuess4 != this.correctNum4) {
                this.computerReply = "Hey! It is not equal to your setting, liar!"
                this.restartNote = "Please press the Restart button to play again!"
                this.disabled4 = true
                this.liarImg = true
                document.getElementById("newColor").style.backgroundColor = "OrangeRed"
                document.getElementById("newColor").style.color = "White"
            }
            else {
                this.computerReply = "Yesssss!"
                this.restartNote = "Please press the Restart button to play again!"
                this.disabled4 = true
                this.congratsImg = true
                document.getElementById("newColor").style.backgroundColor = "Yellow"
                document.getElementById("newColor").style.color = "#999999"
            }
        },
        //reset all variables as default
        Restart: function() {
            this.message = "",
            this.result = "",
            this.restartNote = "",
            this.diffRange = "",
            this.congratsImg = false,
            this.liarImg = false,
            this.errResult = "",
            this.computerReply = "",

            this.disabled = false,
            this.guessed = false,
            this.disabled3 = true,
            this.guessed3 = true,
            this.disabled4 = true,
            this.guessed4 = true,
            this.setted = false,
            this.wrongGuessed = false,
            document.getElementById("newColor").style.backgroundColor = "initial",
            document.getElementById("newColor").style.color = "#999999",

            //document.getElementById("prompt").style.backgroundColor = "initial",
            //document.getElementById("prompt").style.color = "#999999",

            //document.getElementById("toggDiv").style.backgroundColor = "initial",

            this.numTrial = 0,
            this.mixnum = 0,
            this.maxnum = 99,

            this.correctNum = Math.floor(Math.random() * 100),
            this.correctNum3 = null,
            this.correctNum4 = null,
            this.absoluteNum = 0,

            this.newGuess = 0,
            this.newGuess4 = 0,
            this.guessList = [
                {
                  number: "thinking: ",
                }
            ]
        },
        //homepage
        home: function() {
            this.message = "",
            this.result = "",
            this.restartNote = "",
            this.diffRange = "",
            this.congratsImg = false,
            this.liarImg = false,
            this.errResult = "",
            this.computerReply = "",

            this.disabled = false,
            this.guessed = false,
            this.disabled3 = true,
            this.guessed3 = true,
            this.disabled4 = true,
            this.guessed4 = true,
            this.setted = false,
            this.wrongGuessed = false,

            this.numTrial = 0,
            this.mixnum = 0,
            this.maxnum = 99,

            this.correctNum = Math.floor(Math.random() * 100),
            this.correctNum3 = null,
            this.correctNum4 = null,
            this.absoluteNum = 0,

            this.newGuess = 0,
            this.newGuess4 = 0,
            this.guessList = [
                {
                  number: "thinking: ",
                }
            ]
        },
        set1 (event) {
          this.seen1 = true
          this.seen2 = false
          this.seen3 = false
          this.seen4 = false
          this.welcome = true
        },

        set2 (event) {
          this.seen1 = false
          this.seen2 = true
          this.seen3 = false
          this.seen4 = false
          this.welcome = true
        },

        set3 (event) {
          this.seen1 = false
          this.seen2 = false
          this.seen3 = true
          this.seen4 = false
          this.welcome = true
        },

        set4 (event) {
          this.seen1 = false
          this.seen2 = false
          this.seen3 = false
          this.seen4 = true
          this.welcome = true
        },

        setWelcome (event) {
          this.welcome = !this.welcome
        },

        setHome (event) {
          this.welcome = true
          this.seen1 = false
          this.seen2 = false
          this.seen3 = false
          this.seen4 = false
        },
    }
})
