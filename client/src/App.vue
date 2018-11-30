<template>
  <div id="q-app">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      :duration="100"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  created () {
    this.$q.addressbarColor.set()
  }
}
</script>

<style>
@keyframes webkit-autofill-on {
  100% {
    background: transparent;
    color: #ce1126;
  }
}
.layout-padding {
  padding: 12px 14px;
  margin: 0px;
}
</style>
