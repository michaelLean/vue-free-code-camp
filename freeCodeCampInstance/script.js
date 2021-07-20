Vue.component('cat-list', {
  props: ['cats'],
  template: `
    <ul>
      <li v-for="(cat, index) in cats" :key="index">{{cat.name}}</li>
    </ul>
  `
});

const app = new Vue({
  el: '#root',
  component: [
    'cat-list'
  ],
  data: {
    greeting: 'Hello Vue',
    count: 1,
    email: '',
    cats: [
      {
        name: 'Garfield'
      },
      {
        name: 'Tom'
      }, 
      {
        name: 'Little Boy'
      }
    ],
    newCat: ''
  },
  methods: {
    addKitty() {
      if (this.newCat.trim() === '') {
        return;
      }
      this.cats.push({
        name: this.newCat
      });
      this.newCat = '';
    }
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
    lowerCase(value) {
      return value.toLowerCase();
    }
  },
  computed: {
    kittifyName() {
      if(this.newCat.length > 1) {
        return this.newCat + 'y'
      }
    }
  }
})