<template>
  <q-page padding class="pages-menu row items-start">
  	<q-card inline class="bigger q-ma-sm" v-for="(d, index) in data" :key="index">
  	  	<q-card-media>
  	  	  <img src="statics/nasgor.jpeg">
		  <q-card-title slot="overlay">
			{{ d.name }}
			<span slot="subtitle">Rp{{ d.price }}</span>
			<q-btn fab v-if="d.status == 1" color="primary" @click="addData(d)" icon="add" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />
			<q-btn fab v-else color="dark" disable icon="block" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />
		  </q-card-title>
		</q-card-media>
		<q-card-actions v-if="role == 1">
		</q-card-actions>
		</q-card>
		<q-btn
			round
			v-if="dataOrder.length > 0"
			color="primary"
			@click="basicModal = true"
			class="fixed"
			icon="keyboard_arrow_up"
			style="right: 18px; bottom: 18px"
		>
			<q-chip floating color="blue">{{ dataOrder.length }}</q-chip>
		</q-btn>
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
								<q-btn flat round @click="deleteEvent(index)" icon="clear">
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
	  	meja: '',
	  	role: this.$store.state.auth.user.userSuper,
	  	dataOrder: [],
	  	basicModal: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.axios.get('/item/all')
        .then((response) => {
          this.data = response.data
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    },
    saveData () {
      this.axios.post('/order/add',
        {
          meja: this.meja,
          data: this.dataOrder
        })
        .then((response) => {
          this.getData()
          this.basicModal = false
          this.meja = ''
          this.dataOrder = []
        })
        .catch((error) => {
          this.$q.notify({message: 'Error: ' + error.response.data.error, timeout: 2000, color: 'negative'})
        })
    },
    addData (dObj) {
      const vm = this
      var result = false
      if (vm.dataOrder.length > 0) {
        for (var i = 0; i < vm.dataOrder.length; i++) {
          if (dObj.id === vm.dataOrder[i].orderItem) {
            vm.dataOrder[i].itemTotal += 1
            result = true
            break
          }
        }
        if (result === false) {
          vm.dataOrder.push({ orderItem: dObj.id, itemName: dObj.name, itemTotal: 1 })
        }
      } else {
        vm.dataOrder.push({ orderItem: dObj.id, itemName: dObj.name, itemTotal: 1 })
      }
    },
    deleteEvent (index) {
      this.dataOrder.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus">
.pages-menu
  .q-card
    width 280px
  .q-card-title {
    padding 0px
  }
  .q-card-container {
    padding 15px 18px 5px 12px
  }
  .q-card-title {
    padding 0px 0px 0px 4px
  }
  .bigger
    width 400px
    max-width 90vw
  @media (max-width $breakpoint-xs-max)
    .q-card
      width 100%
</style>
