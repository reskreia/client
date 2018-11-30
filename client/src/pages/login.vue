<template>
  <div class="login">
    <div class="fixed fixed-center bg-white text-grey shadow-1">
     <form v-on:submit.prevent="onSubmit()">
        <q-card inline  class="flex-center text-center">
          <div></div>
          <br>
          <div class="text-left" >
              <q-input :before="[{icon: 'person_outline', handler () {}}]" hide-underline type="email" v-model.trim="form.email" placeholder="Your account" required autofocus/>
              <br>
              <q-input :before="[{icon: 'lock_open', handler () {}}]" hide-underline type="password" v-model="form.password" placeholder="Password" required/><br>
          </div>
          <q-card-actions>
            <q-btn type="submit" class="fit" rounded outline no-caps color="primary">Login</q-btn>
          </q-card-actions>
        </q-card>
      </form>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      drawerState: true,
      rememberMe: true,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$auth.login({
        url: 'auth/login',
        fetchUser: false,
        data: this.form,
        rememberMe: this.rememberMe
      })
        .then(response => {
          console.log('Res: ', response)
        })
    }
  }
}
</script>

<style lang="styl">
.login
  .q-card {
    width 300px
    padding 20px
  }
  @media (max-width: 380px) {
    .q-card {
      width 300px
      padding 10px
    }
    img {
      max-width 80%
      padding-top 30px
      padding-bottom 10px
    }
  }
  @media (min-width: 420px) {
    .q-card {
      width 400px
      padding 20px
    }
    img {
      max-width 100%
      padding-top 30px
      padding-bottom 10px
    }
  }
</style>
