<template>
  <div>
    <PetTable
      species="cats"
      :pets="cats"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PetTable from '@/components/PetTable.vue'

export default {
  name: 'Cats',
  components: {
    PetTable
  },
  computed: {
    ...mapState([
      'cats'
    ])
  }
}
</script>

<style>

</style>
