<template>
  <div>
    <h1>{{ species }} for Adoption</h1>
    <b-table striped hover :items="pets">
      <template slot="name" slot-scope="data">
        <router-link :to="`/pets/${species}/${data.index}`">
          {{ data.value }}
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'PetTable',
  props: {
    species: String,
    pets: Array
  }
}
</script>
