<template>
<div>
  <div class="container center-div">
    <form autocomplete="off">
    <div @mousedown="setLabelToNull" class="row">
      <b-input class="inputfield" v-model="firstName" type="text" name="firstName" placeholder="first name" />
    </div>
    <div @mousedown="setLabelToNull" class="row">
      <b-input class="inputfield" v-model="lastName" type="text" name="lastName" placeholder="last name" />
    </div>
    <div @mousedown="setLabelToNull" class="row">
        <b-input class="inputfield" v-model="email" type="email" name="email" placeholder="email"/>
      </div>
    <div @mousedown="setLabelToNull" class="row">
      <b-input class="inputfield" v-model="password" type="password" name="password" placeholder="password"/>
    </div>
    <div @mousedown="setLabelToNull" class="row">
      <b-input class="inputfield" v-model="confirmPassword" type="password" name="repeatPassword" placeholder="confirm password"/>
    </div>
    <div class="row">
      <b-button @click="register" class="btn btn-danger btn-Register btn-sm">Register</b-button>
    </div>
    <div class="row">
      <b-button @click="navigateTo({name: 'Login'})" class="btn btn-Back btn-primary btn-sm">Back</b-button>
    </div>
    <div class="container error">
        <label>{{message}}</label>
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
        this.registerSuccess()
      } catch (error) {
        this.registerFailure(error.response.data.error)
      }
    },
    registerFailure (message) {
      this.$swal({
        title: 'Invalid registration data',
        text: message,
        type: 'error',
        confirmButtonColor: '#808080'
      })
    },
    registerSuccess () {
      this.$swal({
        title: 'Welcome to Simplito Team',
        text: 'Log in and enjoy your time off',
        type: 'success',
        confirmButtonColor: '#808080'
      }).then((result) => {
        this.clearInput()
        this.navigateTo({name: 'Login'})
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
      margin-top: 20px;
  }
  .btn-Back {
     width: 300px;
     margin-bottom: 20px;

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

  }
  </style>
