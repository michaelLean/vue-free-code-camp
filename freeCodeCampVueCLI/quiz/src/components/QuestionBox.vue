<template>
  <div class="container" >
    <div class="header">
      {{ question }}
    </div>
    <div class="list">
      <p
        v-for="(answer, index) in suffledAnswers"
        :key="index"
        :class="answerClass(index)"
        @click="selectAnswer(index)"
        >
        {{ answer }}
      </p>
    </div>
    <div class="actions">
      <button
        class="primary"
        @click="submitAnswer"
        :disabled="selectedAnswer === null || answered"
      >
        Submit
      </button>
      <button @click="next" class="success">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionBox",
  data() {
    return {
      selectedAnswer: null,
      correctIndex: null,
      suffledAnswers: [],
      answered: false
    }
  },
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function
  },
  methods: {
    clearEncodes(value) {
      return value.replace(/&quot;/g,"\"")
        .replace(/&#34;/g,'"')
        .replace(/&#039;/g, '\'')
        .replace(/&rdquo;/g, '\'')
        .replace(/&ldquo;/g, '\'');
    },
    selectAnswer(index) {
      this.selectedAnswer = index;
    },
    submitAnswer() {
      let isCorrect = false;
      if (this.selectedAnswer === this.correctIndex) {
        isCorrect = true;
      }
      this.answered = true;
      this.increment(isCorrect);
    },
    answerClass(index) {
      if (!this.answered && this.selectedAnswer === index) {
        return 'selected';
      }
      if (this.answered && this.correctIndex === index) {
        return 'correct';
      }
      if (this.answered && this.selectedAnswer === index && this.correctIndex !== index) {
        return 'incorrect';
      }
      return '';
    },
    suffleAnswers() {
      const length = this.answers === null ? 0 : this.answers.length;
      if (!length) {
        return []
      }
      let index = -1;
      const lastIndex = length - 1;
      const result = this.answers;
      while(++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        const value = result[rand]
        result[rand] = result[index]
        result[index] = value
      }
      this.suffledAnswers = result;

      this.correctIndex = this.suffledAnswers.indexOf(this.currentQuestion.correct_answer);
    }
  },
  computed: {
    question() {
      return this.clearEncodes(this.currentQuestion.question);

    },
    answers() {
      const answers = this.currentQuestion.incorrect_answers.map(incorrect_answers => {
        return this.clearEncodes(incorrect_answers);
      })

      answers.push(this.clearEncodes(this.currentQuestion.correct_answer));
      return answers;
    }
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedAnswer = null;
        this.answered = false;
        this.suffleAnswers();
      }
    }
  }
};
</script>

<style scoped>
  .container {
    box-sizing: border-box;

    width: 600px;
    margin: 8px auto;

    background-color: #E6E8EE;
    border-radius: 8px;

    display: grid;
    grid-template-areas:
    'header'
    'list'
    'actions';
  }

  .header {
    grid-area: header;

    margin-top: 8px;
    font-size: 24px;
    padding: 8px 0;
    border-bottom: 2px solid #eee;
  }

  .list {
    grid-area: list;
    justify-self: center;
    margin: 16px 0;
    width: 80%;
    background-color: #fff;

    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .list p {
    margin: 0;
    padding: 16px 0;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }

  .list p:hover {
    background-color: #eee;
  }

  .list p.selected {
    background-color: #0069FC;
    color: #fff;
  }

  .list p.correct {
    background-color: #1A9F3B;;
    color: #fff;
  }

  .list p.incorrect {
    background-color: red;
    color: #fff;
  }

  .actions {
    grid-area: actions;
    padding-bottom: 16px;
  }

  .actions button.primary {
    background-color: #0069FC;
  }

  .actions button.primary:disabled {
    background-color: #0069FC;
    opacity: 0.5;
  }

  .actions button.success {
    background-color: #1A9F3B;
  }

  .actions button {
    padding: 8px;
    width: 72px;
    margin: 0 4px;
    color: white;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid transparent;
  }

</style>
