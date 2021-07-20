<template>
  <div>
    <nav>
      <nav-item active>
        Fancy Quiz App
      </nav-item>
      <nav-item>
        Counter: {{ numCorrect }} / {{ numTotal }}
      </nav-item>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: [
    'numCorrect',
    'numTotal'
  ]
};
</script>

<style scoped>
  nav {
    border-bottom: 2px solid #eee;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  nav-item {
    margin-left: 16px;
    font-size: 18px;
    cursor: pointer;
  }
</style>
