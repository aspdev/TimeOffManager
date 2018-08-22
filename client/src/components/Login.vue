<template>
<div>
  <div class="container center-div">
    <form autocomplete="off">
    <div @mousedown="setLabelToNull" class="row">
        <b-input class="inputfield" v-model="email" type="email" name="email" placeholder="email"/>
    </div>
    <div @mousedown="setLabelToNull" class="row">
      <b-input class="inputfield" v-model="password" type="password" name="password" placeholder="password"/>
    </div>
    <div class="row">
        <b-button @click="login" class="btn btn-danger float-right btn-Login btn-sm">Login</b-button>
    </div>
    <div class="row">
      <div class="container">
       <div class="form-check">
         <input type="checkbox" v-model="rememberMe" class="form-check-input" id="rememberMe">
         <label class="form-check-label rememberMeCheckbox" for="rememberMe">Rememer Me</label>
       </div>
      </div>
    </div>
    <div class="row">
      <div class="container loginLabelContainer">
        <label class="loginLabel">A newbie to Simplito Team?</label>
      </div>
    </div>
    <div class="row">
      <b-button @click="navigateTo({ name: 'Register'})" class="btn btn-primary float-left btn-Register btn-sm">Register</b-button>
    </div>
    <div class="row">
      <div class="container error">
        <label>{{message}}</label>
      </div>
    </div>
    </form>
  </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      message: null,
      rememberMe: false
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setRememberMe', this.rememberMe)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'Form'})
      } catch (error) {
        this.displayLoginError(error.response.data.error)
      }
    },
    displayLoginError (message) {
      this.$swal({
        title: 'Invalid login data',
        type: 'error',
        text: message,
        confirmButtonColor: '#808080'
      })
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    setLabelToNull () {
      this.message = null
    },
    clearInput () {
      this.firstName = null
      this.lastName = null
      this.email = null
      this.password = null
      this.confirmPassword = null
    }
  }
}
</script>

<style lang="css" scoped>
  .error {
    color: red;
    font-family: Verdana;
    font-size: 12px;
    margin-top: 20 px;
  }
  .center-div {
    width: 300px;
    margin-top: 40px;

   }
  .btn-Register {
      width: 300px;
      margin-bottom: 20px;

  }
  .btn-Login {
     width: 300px;
     margin-bottom: 20px;
     margin-top: 15px;
  }
  .inputfield {
     height: 40px;
     margin-bottom: 10px;
  }
  .loginLabel {

     font-family: Verdana;
     font-size: 12px;
     color:darkcyan;

  }
  .loginLabelContainer {
    margin-bottom: 10px;
    margin-top: 20px;
  }

  </style>
