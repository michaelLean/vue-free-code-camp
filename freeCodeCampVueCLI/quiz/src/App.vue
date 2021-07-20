<template>
  <div>
    <Header
      :numCorrect="numCorrect"
      :numTotal="numTotal"
    />
    <QuestionBox
      v-if="questions.length"
      :currentQuestion="questions[index]"
      :next="next"
      :increment="increment"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import QuestionBox from "./components/QuestionBox.vue";

export default {
  name: "App",
  data() {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0
    }
  },
  components: {
    Header,
    QuestionBox,
  },
  methods: {
    next() {
      if (this.index >= 9) {
        return;
      }
      this.index ++;
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect ++;
      }
      this.numTotal ++;
    }
  },
  mounted() {
    fetch("https://opentdb.com/api.php?amount=10", {
      method: 'get'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.questions = data.results;
      });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
