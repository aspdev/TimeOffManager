<template>
<div>
  <div v-if="displaySetNewPasswordView" class="container center-div">
    <form autocomplete="off">
    <div class="row">
        <b-input class="inputfield" v-model="newPassword" type="password" name="newPassword" placeholder="new password"/>
    </div>
    <div class="row">
      <b-input class="inputfield" v-model="confirmNewPassword" type="password" name="confirmNewPasssword" placeholder="confirm new password"/>
    </div>
    <div class="row">
        <b-button @click="submit" class="btn btn-danger float-right btn-Submit btn-sm">Submit</b-button>
    </div>
    </form>
  </div>
  <div v-else class="container center-div-message">
    <div class="message">
      <p>The link expired or contains invalid data.</p>
      <p>You may close the browser tab or <a class="linkToReset" href="http://localhost:8080/reset">try</a> again.</p>
    </div>
  </div>
  </div>
</template>

<script>
import AuthenticateResetPasswordTokenService from '@/services/AuthenticateResetPasswordTokenService'
import SubmitNewPasswordService from '@/services/SubmitNewPasswordService'

export default {
  data () {
    return {
      displaySetNewPasswordView: false,
      userId: null,
      newPassword: null,
      confirmNewPassword: null
    }
  },
  methods: {
    async authenticateResetPasswordToken (resetPasswordToken) {
      try {
        const response = await AuthenticateResetPasswordTokenService.authenticate({
          resetPasswordToken: resetPasswordToken
        })
        if (response.status === 200) {
          this.displaySetNewPasswordView = response.status
          this.userId = response.data.userId
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submit () {
      try {
        const response = await SubmitNewPasswordService.submit({
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword,
          userId: this.userId
        })
        if (response.status === 201) {
          this.confirmResetPassword()
          this.$router.push({name: 'Login'})
        }
      } catch (error) {
        this.resetPasswordFailed(error.response.data.error)
        this.setInputToNull()
      }
    },
    confirmResetPassword () {
      this.$swal({
        title: 'Password changed',
        type: 'success',
        confirmButtonColor: '#808080'
      })
    },
    resetPasswordFailed (message) {
      this.$swal({
        title: 'Invalid data',
        text: message,
        type: 'error',
        confirmButtonColor: '#808080'
      })
    },
    setInputToNull () {
      this.newPassword = null
      this.confirmNewPassword = null
    }
  },
  created () {
    this.authenticateResetPasswordToken(this.$route.params.resetpasswordtoken)
  }
}

</script>
<style scoped>
.center-div {
    width: 300px;
    margin-top: 40px;

   }
.center-div-message {
  width: 400px;
  margin-top: 40px;
  font-family: Verdana;
  color: gray;
  border: 2px;
  border-style: solid;
  background-color: grey;
}
.message {
  margin-top: 10px;
  margin-bottom: 10px;
  color: whitesmoke;

}
.linkToReset {
  color:silver;
  text-decoration: none;
}
   .btn-Submit {
     width: 300px;
     margin-bottom: 20px;
     margin-top: 15px;
  }
  .inputfield {
     height: 40px;
     margin-bottom: 10px;
  }
  .loginLabelContainer {
    margin-bottom: 10px;
    margin-top: 20px;
  }
</style>
