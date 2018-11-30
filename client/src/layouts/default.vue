<template>
  <q-layout class="defLay" view="lHr Lpr lFr" v-if="this.$store.state.auth.loggedIn">
    <q-layout-header>
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="drawerState = !drawerState">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Mimzy
          <div slot="subtitle">Testing</div>
        </q-toolbar-title>
        <q-btn flat round dense v-on:click="logout()" icon="power_settings_new" />
      </q-toolbar>
      <show-order v-if="$q.theme === 'mat'" />
    </q-layout-header>
    <q-layout-drawer
      :mini="miniState"
      v-model="drawerState"
      :content-class="['bg-grey-1', 'q-pa-sm']"
      side="left"
    >
      <div slot="mini">
        <q-scroll-area
          style="height: 600px"
          :thumb-style="{
            right: '2px',
            borderRadius: '4px',
            width: '1px',
            opacity: 0
          }"
        >
          <q-list
            no-border
            link
          >
            <q-item to="/dashboard">
              <q-item-side icon="home" />
              <q-tooltip anchor="center right" self="center left" :offset="[8, 8]">
                <strong>Dashboard</strong>
              </q-tooltip>
            </q-item>
            <q-item-separator />
            <template v-for="category in categories">
              <q-item
                v-for="feature in category.features"
                :key="feature.hash"
                :to="`/holic/${category.hash}/${feature.hash}`"
                :replace="!category.extract"
              >
                <q-item-side :icon="feature.icon" />
                <q-tooltip anchor="center right" self="center left" :offset="[8, 8]">
                  <strong>{{ feature.title }}</strong>
                </q-tooltip>
                <!--
                <q-item-side right v-if="feature.status">
                  <q-chip dense color="faded">{{ feature.status }}</q-chip>
                </q-item-side>
                -->
              </q-item>
              <q-item-separator :key="`separator-${category.title}`" />
            </template>
          </q-list>
        </q-scroll-area>
        <q-btn class="fixed-bottom full-width"
          icon="arrow_forward_ios" color="primary"
          @click.capture="drawerClick"
        >
          <q-tooltip anchor="center right" self="center left" :offset="[8, 8]">
            <strong>Expand menu</strong>
          </q-tooltip>
        </q-btn>
      </div>
      <q-scroll-area class="fit">
        <q-list
          no-border
          link
          dense
        >
          <q-item to="/dashboard">
            <q-item-side icon="home" />
            <q-item-main label="Dashboard"/>
          </q-item>
          <q-item-separator />
          <template v-for="category in categories">
            <q-list-header :key="`header-${category.title}`">
              {{ category.title }}
            </q-list-header>
            <q-item
              v-for="feature in category.features"
              :key="feature.hash"
              :to="`/holic/${category.hash}/${feature.hash}`"
              :replace="!category.extract"
            >
              <q-item-side :icon="feature.icon" />
              <q-item-main :label="feature.title"/>
              </q-item>
            <q-item-separator :key="`separator-${category.title}`" />
          </template>
        </q-list>
        <br>
        <q-btn no-caps color="primary"
          class="q-mini-drawer-hide full-width"
          align="right" icon-right="arrow_back_ios"
          @click="miniState = true"
        />
      </q-scroll-area>
    </q-layout-drawer>
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="100"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import ShowOrder from 'components/menu-order'
import { mapMutations, mapState } from 'vuex'
import categories from 'assets/categories'

export default {
  name: 'LayoutDefault',
  components: {
    ShowOrder
  },
  data () {
    return {
      miniState: true,
      categories
    }
  },
  methods: {
    ...mapMutations('auth', [
      'LOGIN_OK'
    ]),
    logout () {
      this.$auth.logout({
        makeRequest: true,
        url: 'auth/logout',
        redirect: '/login',
        success () {
          console.log('success ')
        },
        error () {
          console.log('error ')
        }
      })
    },
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  },
  mounted: function () {
    this.$auth.fetch({
      url: 'check'
    }).then((response) => {
      this.LOGIN_OK(response)
    })
  },
  computed: {
    drawerState: {
      get () {
        return this.$store.state.menuholic.drawerState
      },
      set (val) {
        this.$store.commit('menuholic/updateDrawerState', val)
      }
    },
    ...mapState('menuholic', [
      'pageMeta'
    ])
  }
}
</script>

<style>

</style>
