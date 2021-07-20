<template>
  <div class="home-view-container">
    <h1>Adopt a new best friend</h1>
    {{ animalsCount }}
    <button class="btn btn-primary" @click="togglePetForm"> Add New Pet</button>
    <b-form @submit.prevent="handleSubmit" v-if="showPetForm">
      <b-form-group id="" label="Pet's Name: " label-for="">
        <b-form-input
          id=""
          type="text"
          v-model="formData.name"
          required
          placeholder="Enter name"
        />
      </b-form-group>
      <b-form-group id="" label="Species: " label-for="">
        <b-form-select id="" class="form-control" :options="['cats','dogs']" required v-model="formData.species" />
      </b-form-group>
      <b-form-group id="" label="Pet's Age: " label-for="">
        <b-form-input
          id=""
          type="number"
          v-model="formData.age"
          required
          placeholder="Enter age"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      showPetForm: false,
      formData: {
        name: '',
        age: 0,
        species: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'animalsCount',
      'getAllCats',
      'getAllDogs'
    ])
  },
  methods: {
    ...mapActions([
      'addPet'
    ]),
    togglePetForm () {
      this.showPetForm = !this.showPetForm
    },
    handleSubmit () {
      const { species, name, age } = this.formData
      const payload = {
        species,
        pet: {
          name,
          age
        }
      }
      this.addPet(payload)
      this.formData = {
        name: '',
        age: 0,
        species: null
      }
      this.showPetForm = false
    }
  }
}
</script>
