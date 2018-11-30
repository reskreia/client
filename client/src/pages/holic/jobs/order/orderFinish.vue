<template>
  <q-page padding class="pages-finish row items-start">
    <q-card inline v-for="(d, index) in data" :key="index" class="q-ma-sm">
      <q-card-title>
        {{ d.orderCode }}
        <span slot="subtitle">Meja: {{ d.noTable }}</span>
      </q-card-title>
      <q-card-main>
        <p>Status = Paid</p>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.getFinish()
  },
  methods: {
    getFinish () {
      this.axios.get('/item/list/finish')
        .then((response) => {
          this.data = response.data.data
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    }
  }
}
</script>

<style lang="stylus">
.pages-finish
  .q-card
    width 280px
  .q-card-title {
    padding 0px
  }
  .q-card-container {
    padding 15px 18px 5px 12px
  }
  .pages-news .q-card-title {
    padding 0px 0px 0px 4px
  }
  .bigger
    width 400px
    max-width 90vw
  @media (max-width $breakpoint-xs-max)
    .q-card
      width 100%
</style>
