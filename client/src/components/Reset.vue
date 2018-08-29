<template>
<div>
  <div class="container center-div">
    <form autocomplete="on">
    <div class="container forgotPasswordLabel">
      <label>Forgot Password?</label>
    </div>
    <div class=" container enterEmailPrompt">
      <label>Enter your email to reset your password</label>
    </div>
    <div class="row">
        <b-input v-model="email" class="inputfield" type="email" name="email" placeholder="email"/>
    </div>
    <div class="row">
        <b-button @click="submit" class="btn btn-danger float-right btn-Submit btn-sm">Submit</b-button>
    </div>
    <div class="row">
      <b-button @click="back" class="btn btn-primary float-left btn-Back btn-sm">Back</b-button>
    </div>
    </form>
  </div>
  </div>
</template>
<script>
import ResetPasswordService from '@/services/ResetPasswordService'
export default {
  data () {
    return {
      email: null
    }
  },
  methods: {
    async submit () {
      try {
        const response = await ResetPasswordService.reset({
          email: this.email
        })
        this.confirmResetPassword(response.data.message)
        this.$router.push({name: 'Login'})
      } catch (error) {
        if (error.response.status === 403) {
          this.confirmNoEmailFound(error.response.data.error)
          this.setInputToNull()
        } else {
          this.internalServerError(error.response.data.error)
          this.setInputToNull()
        }
      }
    },
    back () {
      this.$router.push({name: 'Login'})
    },
    confirmResetPassword (message) {
      this.$swal({
        title: 'Request submitted',
        text: message,
        type: 'success',
        confirmButtonColor: '#808080'
      })
    },
    confirmNoEmailFound (message) {
      this.$swal({
        title: message,
        type: 'error',
        confirmButtonColor: '#808080'
      })
    },
    internalServerError (message) {
      this.$swal({
        title: 'Error',
        type: 'error',
        text: message,
        confirmButtonColor: '#808080'
      })
    },
    setInputToNull () {
      this.email = null
    }
  }
}
</script>

<style>
.center-div {
  width: 300px;
  margin-top: 40px;
}
.btn-Back {
  width: 300px;
  margin-bottom: 20px;
  margin-top: 5px;
}
.btn-Submit {
  width: 300px;
  margin-bottom: 10px;
  margin-top: 15px;
}
.inputfield {
  height: 40px;
  margin-bottom: 10px;
}
.forgotPasswordLabel {
  font-family: Verdana;
  font-size: 21px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.enterEmailPrompt{
  font-size: 11.5px;
  font-family: Verdana;
  margin-bottom: 10px;
}
</style>
