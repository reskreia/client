<template>
  <div class="menu-order">
    <q-tabs align="justify" swipeable animated
      v-if="pageMeta.order.length > 0"
      :class="{'within-iframe-hide': !pageMeta.iframeTabs}"
      :style="$q.theme === 'ios' ? { background: 'rgba(255,255,255,0.95' } : null"
    >
      <q-route-tab
        v-for="tab in pageMeta.order"
        :key="tab.hash"
        slot="title"
        :icon="tab.icon"
        :to="`/holic${pageMeta.hash}/${tab.hash}`"
        :label="tab.label"
        exact
        replace
        :alert="tab.status !== void 0"
      />
    </q-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShowInstant',
  computed: mapState('menuholic', [
    'pageMeta'
  ])
}
</script>

<style>
.menu-order
  .q-tabs-head {
      min-height: 38px;
      overflow: hidden;
      font-size: 0.95rem;
      font-weight: 500;
  }
  .q-tab {
    min-height: 38px;
    text-transform: capitalize;
  }
  @media (min-width: 992px)
  .q-layout-marginal .q-tabs-head:not(.scrollable) {
    padding-left: 0px;
    padding-right: 0px;
  }
  .q-layout-marginal .q-tabs-head:not(.scrollable) {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
