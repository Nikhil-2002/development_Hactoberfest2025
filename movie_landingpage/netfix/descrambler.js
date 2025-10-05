(function( $ ) {

    // scramble:
      // duration: the duration over which the function will execute. Min is 200. Max is 20000. Parameter is type safe.
      // interval: interval between new random letters being added/removed. Default is 20. Min is 5. Max is 10000. Parameter is type safe.
      // charset: the character set to use. Optional. Default is 'all'.
      // uppercase: determines whether scrambled characters will be uppercase or lowercase. Optional. Boolean.Default is true.
    $.fn.scramble = function( duration, interval, charset, uppercase ) {
      // duration: The time, in ms, over which the function is to execute.
      // If duration is not a valid number or outside min/max (200ms/2000ms), default duration (3000) will be used.
      // NOTE: isNaN does not operate consistently across browsers and browser support for Number.isInteger is poor. Until then, this mess is the best I can do to make the duration argument type-safe.
      if ((typeof(duration) !== "number") || (duration === NaN) || (duration < 1000) || (duration > 20000)) {
        duration = 3000;
      }
  
      // interval: If interval is not a valid number or outside min/max (5/10000ms), default interval 20 will be used.
      // NOTE: isNaN does not operate consistently across browsers and browser support for Number.isInteger is poor. Until then, this mess is the best I can do to make the interval argument type-safe.
      if ((typeof(interval) !== "number") || (interval === NaN) || (interval < 5) || (interval > 1000)) {
        interval = 20;
      }
  
      // charsets: pre-defined character sets to use for descrambling characters.
        // Default: charsets.all.
      var charsets = {
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        alphabet: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
        punctuation: ["@", "#", "$", "%", "^", "*", "(", ")", "&", "+", "=", "}", "{", "|", ":", ";", ">", "<", "?", "~", " "],
        emoji: ["👸🏼","🇩🇰","⌚","🙏🏽","🌓","👃","🏋🏽","🇱🇹","🍐","📛","🚵🏾‍♀","🚻","💆🏻‍♂","😠","📩","🥚","🏋🏿‍♀","🕳","➗","🆕","🏃🏼‍♀","🇬🇼","🔑","🙏","🇬🇹","🖌","🙋🏼","✊🏿","🕔","⛹🏿‍♀","👊","👱🏼","🏄🏿‍♀","🕯","😯","🔰","🏡","🐣","🏹","🌆","👵🏿","🙎🏻","💂🏼‍♀","🇻🇳","🏃‍♀","👵🏼","🍦","🖊","🙎🏼","👆🏿","🇧🇿","🎫","💇🏾","🕵🏼‍♀","🇾🇪","🔹","🎤","🗝","💺","🇬🇱","🇷🇸","🇿🇦","🤘🏻","👼🏼","💁🏽","💟","🚡","🦂","🚕","🐼","🗨","🐳","🆘","📣","🐚","🐇","💙","💆🏼","🌤","💪🏿","👮🏾","⛹🏼‍♀","🇱🇺","🏄🏿","🙆","💇🏽","👩🏼","👲🏼","🐽","🎥","🥁","🚽","🇬🇭","🐹","🚴🏽","👩","🎇","🔼","🇨🇦","🈵","🎬","✍🏻","🎰","🍾","🇧🇹","🇸🇸","👩","🍲","☀","🍂","🤔","👱‍♀","🇱🇮","👵🏻","🔪","🇬🇶","🇳🇴","🛠","🙍🏻","🇪🇹","⏪","😔","👼","🚴🏾‍♀","🙎","🙍🏿‍♂","👱🏾‍♀","👋🏼","🇻🇨","✌🏽","🙅🏻‍♂","🇵🇭","🕥","🎆","👰🏼","💁🏻‍♂","⭐","💪🏼","⌛","👳🏽","💅🏿","👃🏾","😜","🌴","🏄🏽‍♀","🔁","🗼","🚺","🙎🏼‍♂","🏊🏼","🇧🇳","👱🏿‍♀","🖖🏼","💁🏽‍♂","🙋🏼‍♂","⛹🏾‍♀","😳","👧🏽","🙋","❌","🙏🏻","🐦","👯‍♂","🇨🇵","🆖","🍏","🙇🏼","🏋🏽‍♀","🔡","👆🏽","👳🏾‍♀","👨‍👧","🇨🇩","🖐","🇺🇬","👧🏿","👱🏽","🇪🇺","🔐","🉑","✅","⛵","🛤","🇲🇷","👟","🏓","💇🏾‍♂","🦃","🔜","🌂","🎭","💂🏾‍♀","👮🏼","🚓","🚜","👁‍🗨","🇫🇯","🐯","🙌🏻","👍🏻","📹","🎅","🏧","🙍‍♂","🗞","🗻","🎾","👷🏽‍♀","💇‍♂","🎚","👈🏻","🛂","👨🏿","👳‍♀","✋🏿","🚀","🏑","👶🏼","🎼","🎮","🎦","🏃🏿","🏺","👂🏻","🇻🇦","👇🏼","🆔","🌚","🎒","🖕🏻","😰","🇬🇫","😃","📥","🏠","🔎","🏷","🇩🇿","🚅","👉🏾","🚵🏿‍♀","💁🏼‍♂","🚶","🇧🇱","🇸🇻","🕵🏿","👌🏻","👨‍👨‍👧","👊🏼","⏳","🔙","🇸🇴","🤘🏾","🙅🏼","🌻","🎡","🇮🇳","🏛","💗","🏜","5⃣","🇬🇦","👨‍👩‍👧‍👦","💇","🍍","🙆🏾","✌🏼","🇪🇦","💐","👨","📼","🚋","🐰","📎","🌞","🇹🇦","🙋🏿","👮🏻‍♀","🇵🇷","❕","⬇","👈🏼","🇸🇭","🇧🇭","✒","😅","🇲🇳","✊","♦️","🚌","👇🏽","👲🏻","😗","👇🏻","👼🏻","🇲🇿","🍹","🇬🇬","👉🏻","⏮","🇪🇭","👼🏽","🇧🇫","👂","🕜","🏔","👊🏻","👳🏻","🚶🏼","🇦🇲","💷","🉐","🔮","🙇🏼‍♀","👸🏻","👵🏾","🇱🇷","🇧🇸","🙆🏿‍♂","👩‍👩‍👦","🈸","🤗","😛","🕦","🍿","💇🏽‍♂","🇸🇦","💀","🇯🇵","💆‍♂","🔝","🙅‍♂","💇🏻‍♂","🗾","💒","📸","⚽","🙇🏾‍♀","👈🏿","🎐","👮🏿","👷🏾","🏃🏾‍♀","💩","🐠","👑","💣","🇲🇭","👈🏽","🍋","🐒","🇭🇳","🎌","👂🏾","🎁","🇲🇶","👄","🚵🏿","👷🏻","💓","🎅🏽","🚒","🕗","🇧🇾","😭","🇸🇲","🎨","🇦🇱","🇧🇻","🚴🏾","🈶","👌🏼","💳","🇬🇩","🌾","🍞","🚵🏼‍♀","🕵‍♀","🔩","🔻","👂🏽","👎🏾","🕵🏻‍♀","🐫","🇹🇫","🔫","😷","🇸🇽","🇻🇮","🇦🇷","🇦🇪","🚖","🇩🇯","🚃","🤘🏽","🍤","🇸🇰","👩‍👧‍👦","🙎🏾","👮🏿‍♀","🇸🇾","🚶🏿‍♀","💪🏻","🇵🇸","🙍🏾","🔔","🎂","🇬🇮","🐂","🇵🇲","👷🏼‍♀","✖","🙇","👳🏽‍♀","👃🏽","🆗","🚣🏻","🇬🇷","🚣🏿","🔷","💃","🇲🇺","🌝","👃🏻","📕","🇬🇸","🔓","🇦🇸","🍉","🏋🏾‍♀","🇸🇳","😕","🐭","📖","🐵","🌅","🛬","💂","🍚","🎸","🇺","📬","🚠","🎅🏿","🙇🏽","👏🏾","👧🏾","🇧🇴","👍🏼","🙅🏾","👳🏻‍♀","🏀","🇳🇺","👨🏽","🙆🏼","👩🏿","👱🏻","🔠","👍🏾","🐋","😞","🏃🏽‍♀","⚾","🍓","🐅","🔱","🎳","🏄🏻","👌🏿","💁🏿‍♂","🙍🏽‍♂","👳🏾","⛈","👉","🎃","🇲🇴","⛹🏼","🏠","🚣🏿","🐳","🖼","🌝","✍🏻","🙅‍♂","😄","👋🏼","🕧","🙅🏻","🎁","🇦🇺","👊🏻","🐯","🙏","👟","🚴","👈🏻","🙋","🎚","🐪","🔫"],
        get alphanumeric() {
          return this.numbers.concat(this.alphabet);
        },
        get all() {
          return this.alphanumeric.concat(this.punctuation);
        },
        get allPlusEmoji() {
          return this.all.concat(this.emoji)
        }
      };
  
      // If no charset parameter is passed in, or if an invalid charset parameter is passed in, the default charset (all) will be used.
      if ((charset === undefined) || !(charset in charsets) ) {
        charset = "all";
      }
      charset = charsets[charset];
  
      // uppercase: Whether uppercase character set should be used.
      // If uppercase boolean not defined, or if an invalid parameter is passed, the default false is used.
      if ((uppercase === undefined) || (uppercase === false)) {
        uppercase = false;
      } else {
        uppercase = true;
      }
  
      // originalText: the text contents of the the element on which the scramble method is called. Once stored, the text of the element is cleared.
      var originalText = this.text();
      this.text("");
  
      // random: returns a random letter from the characterList array (this function is always called passing in the charset variable).
      var random = function(characterList) {
        var length = characterList.length;
        var randomNumber = Math.floor(Math.random() * length);
        var letter = characterList[randomNumber];
        if (uppercase) {
          return letter.toUpperCase();
        } else {
          return letter;
        }
      };
  
      // replacer: takes three arguments - scambledArray is an array of random characters the same length as the original word; originalArr is the original word, split into an array; charsToReplace is the number of characters to replace (counting from index 0).
      var replacer = function(scrambledArray, originalArr, charsToReplace) {
        // take the first charsToReplace number of characters from the original array...
        var replacement = originalArr.slice(0, charsToReplace);
        // ...join that array on the empty string...
        replacement = replacement.join("");
        // ... and replace the first n characters in the scrambledArray with the replacement string.
        return scrambledArray.splice(0, replacement.length, replacement);
      };
  
      var scrambler = function(lengthOfArray) {
        var scrambledArray = [];
        for (var i = 0; i < lengthOfArray; i++) {
          scrambledArray.push(random(charset));
        }
        return scrambledArray;
      };
  
      // constructor function: returns a wordScrambler object, including details of the word, the iteration number, etc. Internal 'scramble' function performs the substantive work of the whole method.
      var wordScrambler = function($element, word) {
        this.iteration = 0;
        this.spliceIteration = 0;
        this.$element = $element;
        this.word = word;
        this.len = word.length;
        this.arr = word.split("");
        this.terminated = false;
        $element.on("click", (e) => {
          this.terminated = true;
        });
  
        var magicNumber = parseInt(duration / interval / this.len);
        // this.scramble takes a setInterval timer parameter (necessary to clear the setInterval when the slice iterations have completed). Called every interval milliseconds, calls the replacer function, which returns an array of un/scrambled letters, and re-sets the .text of this.$element
        this.scramble = function(timer) {
          if (this.terminated) {
            this.$element.text(word)
            window.clearInterval(timer);
            return;
          }
          this.iteration += 1;
          // Get an array of random characters the same length as the text of the element on which the method is called.
          var scrambledArray = scrambler(this.len);
  
            if (this.iteration % magicNumber === 0) {
              this.spliceIteration += 1;
            }
            replacer(scrambledArray, this.arr, this.spliceIteration);
        // }
          // Join the array of characters in scrambledArray (once modified by replacer function).
          var scrambledWord = scrambledArray.join("");
          // Replace the text of the element on which the method was called with that string.
          this.$element.text(scrambledWord);
          // Once all letters have been replaced, clear the setInterval passed in to this function.
          if (this.spliceIteration === this.len) {
            window.clearInterval(timer);
          }
        };
      };
  
      var text = new wordScrambler(this, originalText);
      var intervalTimer = window.setInterval(function() {
        text.scramble(intervalTimer);
      }, interval);
      return this;
    };
  
  }(jQuery));
  