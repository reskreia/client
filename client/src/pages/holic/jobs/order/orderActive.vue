<template>
  <q-page padding class="pages-active row items-start">
    <q-card inline v-for="(d, index) in data" :key="index" class="q-ma-sm">
      <q-card-title>
        {{ d.orderCode }}
        <span slot="subtitle">Meja: {{ d.noTable }}</span>
      </q-card-title>
      <q-card-main>
        <p v-if="d.status == 3">Status = Done</p>
        <p v-else-if="d.status == 2">Status = Process</p>
        <p v-else-if="d.status == 1">Status = Queue</p>
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat disable dense round icon="event" />
        <q-btn flat dense rounded @click="openModal(d)" dense color="blue-10">Detail</q-btn>
        <q-btn flat dense rounded @click="deleteOrder(d,index)" dense color="teal-8">Delete</q-btn>
        <q-btn flat v-if="role == 1" dense rounded @click="orderPay(d)" dense color="primary">Paid</q-btn>
      </q-card-actions>
    </q-card>
    <q-modal v-model="basicModal" position="top" :content-css="{minWidth: '50vw'}">
      <div style="padding: 20px">
        <div class="q-display-1 q-mb-md">Order</div>
        <q-input v-model="meja" inverted hide-underline placeholder="No. Meja" />
        <br>
        <q-list inset-separator>
          <q-collapsible label="Detail Item" opened>
          <div>
              <q-list inset-separator class="q-mt-md" v-for="(o, index) in dataOrder" :key="index">
            <q-item>
              <q-item-main :label="o.itemName" />
              <q-item-tile sublabel>
                <span>Jumlah: </span> {{ o.itemTotal }}
                <q-popup-edit v-model.trim="o.itemTotal">
                <q-input hide-underline type="number" v-model.trim="o.itemTotal" />
                </q-popup-edit>
              </q-item-tile>
              <q-item-side right>
                <q-btn flat round @click="deleteEvent(o,index)" icon="clear">
                  </q-btn>
              </q-item-side>
            </q-item>
            </q-list>
          </div>
          </q-collapsible>
        </q-list>
        <br>
        <q-btn color="primary" @click="saveData" label="Save" />
      </div>
    </q-modal>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      basicModal: false,
      role: this.$store.state.auth.user.userSuper,
      meja: '',
      dataOrder: []
    }
  },
  mounted () {
    this.getActive()
  },
  methods: {
    getActive () {
      this.axios.get('/item/list/active')
        .then((response) => {
          this.data = response.data.data
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    },
    saveData () {
      this.axios.post('/order/edit',
        {
          data: this.dataOrder
        })
        .then((response) => {
          this.getActive()
          this.basicModal = false
          this.meja = ''
          this.dataOrder = []
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    },
    deleteEvent(oObj,index) {
      this.axios.post('/order/item/delete',
        {
          data: OObj.id
        })
        .then((response) => {
          this.dataOrder.splice(index, 1)
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    },
    deleteOrder(dObj,index) {
      this.axios.post('/order/delete',
        {
          id: dObj.id
        })
        .then((response) => {
          this.data.splice(index, 1)
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    },
    orderPay(dObj,index) {
      this.axios.post('/order/pay',
        {
          id: dObj.id
        })
        .then((response) => {
          this.data.splice(index, 1)
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    },
    openModal (dObj) {
      const vm = this
      vm.dataOrder = []
      vm.meja = dObj.noTable
      dObj.item.forEach(item => {
        vm.dataOrder.push({ id: item.id, orderItem: item.orderItem, itemName:item.itemName, itemTotal: item.itemTotal })
      })
      vm.basicModal = true
    }
  }
}
</script>

<style lang="stylus">
.pages-acitve
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
