<template>
  <div class="container main-div">
    <h3>Time Off Manager</h3>
    <!--DIV SUBMIT/LOGOUT -->
    <div class="container form-div">
    <form autocomplete="off">
      <div class="container">
        <!-- ROW ONE EMPLOYEE -->
        <div class="row employeeRow">
          <div class="col">
            <label class="daysOffStats"><b>Your Days Off {{currentYear}}</b></label>
          </div>
          <div class="col">
            <label class="employeeLabel">Employee</label>
          </div>
          <div class="col">
            <label class="employeeNameLabel">{{firstName + " " + lastName}}</label>
          </div>
        </div>
        <!-- ROW TWO DATE FROM -->
        <div @mousedown="setMessageToNull" class="row dateRow">
          <div class="col">
            <label class="daysOffStats">Vacation: {{vacation}}</label>
          </div>
          <div class="col">
            <label class="dateLabel">Date From</label>
          </div>
          <div class="col">
            <datepicker placeholder="Select a date" :bootstrap-styling="true" v-model="dateFrom"></datepicker>
          </div>
        </div>
        <!-- ROW THREE DATE TO -->
        <div @mousedown="setMessageToNull" class="row dateRow">
          <div class="col">
            <label class="daysOffStats">On Demand: {{onDemand}}</label>
          </div>
          <div class="col">
            <label class="dateLabel">Date To</label>
          </div>
          <div class="col">
            <datepicker placeholder="Select a date" :bootstrap-styling="true" v-model="dateTo"></datepicker>
          </div>
        </div>
        <!-- ROW FOUR TOTAL DAYS ROW -->
        <div @mousedown="setMessageToNull" class="row totalDaysRow">
          <div class="col">
            <label class="daysOffStats"><b>Total: {{total}}</b></label>
          </div>
          <div class="col">
            <label class="totalDaysLabel">Total Days Off</label>
          </div>
          <div class="col">
            <b-input v-model="numberOfDaysRequested" placeholder="Number of days"></b-input>
          </div>
        </div>
        <!-- ROW FIVE TYPES OF TIME OFF -->
        <div @mousedown="setMessageToNull" class="row timeOffRow">
          <div class="col">

          </div>
          <div class="col-sm">
            <label class="timeOffLabel">Time Off Type</label>
          </div>
          <div class="col">
            <b-select v-model="selected">
              <option disabled :value="null">Select a type</option>
              <option>Vacation</option>
              <option>On Demand</option>
            </b-select>
          </div>
        </div>
        <!-- ROW SIX LOGOUT/SUBMIT -->
        <div class="row buttonRow">
          <div class="col">

          </div>
          <div class="col">
            <b-button @click="logout" class="btn-primary btn-block btn-sm buttonLogout">Logout</b-button>
          </div>
          <div class="col">
            <b-button @click="submit" class="btn-danger btn-block btn-sm buttonSubmit">Submit Request</b-button>
          </div>
        </div>
      </div>
    </form>
    <!-- ROW SIX MESSAGE -->
    <div class="row messageRow">
      <div class="container message-div">
        <label v-if=success class="messageSuccess">{{message}}</label>
        <label v-else class="messageFailure">{{message}}</label>
      </div>
    </div>
    </div>
  <!-- DIV TABLE -->
  <div class="container table-div">
  <table v-if="tableData && tableData.length > 0" class="table table-bordered table-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Date From</th>
        <th scope="col">Date To</th>
        <th scope="col">Days</th>
        <th scope="col">Type</th>
        <th scope="col">Request Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(object, index) in tableData" :key="index">
        <th scope="=row"><label class="tableNumberColumn">{{index + 1}}</label></th>
        <td>
          <datepicker v-model="object.dateFrom" :bootstrap-styling="true"></datepicker>
        </td>
        <td>
          <datepicker v-model="object.dateTo" :bootstrap-styling="true"></datepicker>
        </td>
        <td>
          <b-input class="tableInput" v-model="object.numberOfDays"></b-input>
        </td>
        <td>
          <b-select class="tableSelector" v-model="object.timeOffType">
            <option>Vacation</option>
            <option>On Demand</option>
          </b-select>
        </td>
        <td>
          <label class="requestDateCell">{{object.requestDate}}</label>
        </td>
        <td>
          <b-button @click="confirmDelete(object.formId)" class="btn btn-sm buttonDelete">Delete</b-button>
        </td>
        <td>
          <b-button @click="update(object)" class="btn btn-sm buttonUpdate">Update</b-button>
        </td>
        <td>
          <b-button @click="navigateTo({name: 'Print'}, object)" class="btn btn-sm buttonPrint">Print</b-button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import SubmitFormService from '@/services/SubmitFormService'
import GetRecordedRequestsService from '@/services/GetRecordedRequestsService'
import RemoveRecordService from '@/services/RemoveRecordService'
import UpdateRecordService from '@/services/UpdateRecordService'

export default {
  data () {
    return {
      firstName: this.$store.state.user.firstName,
      lastName: this.$store.state.user.lastName,
      dateFrom: null,
      dateTo: null,
      selected: null,
      numberOfDaysRequested: null,
      message: null,
      success: null,
      tableData: null,
      vacation: 0,
      onDemand: 0,
      total: 0,
      currentYear: new Date().getFullYear()
    }
  },
  components: {
    Datepicker
  },
  methods: {
    logout () {
      localStorage.removeItem('store')
      sessionStorage.removeItem('store')
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({name: 'Login'})
    },
    async submit () {
      try {
        await SubmitFormService.submit({
          employeeId: this.$store.state.user.id,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          numberOfDaysRequested: Number(this.numberOfDaysRequested),
          selectedType: this.selected,
          onDemand: Number(this.onDemand),
          vacation: Number(this.vacation),
          total: Number(this.numberOfDaysRequested) + Number(this.total)
        })
        this.getRecordedRequests()
        this.submitSuccess()
      } catch (error) {
        if (error.response.data.error === 'jwt expired') {
          this.logout()
          this.sessionExpired()
          return
        }
        this.submitFailure(error.response.data.error)
      }
    },
    sessionExpired () {
      this.$swal({
        title: 'Session expired',
        text: 'The action was aborted. Login and try again',
        type: 'info',
        confirmButtonColor: '#808080'
      })
    },
    submitFailure (message) {
      this.$swal({
        title: 'Request rejected',
        type: 'error',
        text: message,
        confirmButtonColor: '#808080'
      })
    },
    submitSuccess () {
      this.$swal({
        title: 'Request submitted',
        type: 'success',
        confirmButtonColor: '#808080'
      })
    },
    confirmDelete (formId) {
      // TODO: sprawdzić czy sesja wygasła
      this.$swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancellButtonText: 'Cancel',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#808080'
      }).then((result) => {
        if (result.value) {
          this.deleteRow(formId)
          this.$swal({
            title: 'Deleted',
            type: 'info',
            confirmButtonColor: '#808080'
          })
        } else {
          this.$swal({
            title: 'Cancelled',
            type: 'info',
            confirmButtonColor: '#808080'
          })
        }
      })
    },
    async deleteRow (formId) {
      try {
        const response = await RemoveRecordService.delete(formId)
        if (response.data === 1) {
          this.getRecordedRequests()
          this.setMessageToNull()
        }
      } catch (error) {
        if (error.response.data.error === 'jwt expired') {
          this.logout()
          this.sessionExpired()
        }
      }
    },
    updateSuccess (message) {
      this.$swal({
        title: 'Request updated',
        type: 'success',
        text: message,
        confirmButtonColor: '#808080'
      })
    },
    updateFailure (message) {
      this.$swal({
        title: 'Update rejected',
        type: 'error',
        text: message,
        confirmButtonColor: '#808080'
      })
    },
    async update (object) {
      try {
        const response = await UpdateRecordService.update(Object.assign(object, { vacation: this.vacation, onDemand: this.onDemand, total: this.total }))
        if (response.data > 0) {
          this.updateSuccess()
          this.getRecordedRequests()
        } else {
          this.message = 'No data has been updated'
        }
      } catch (error) {
        if (error.response.data.error === 'jwt expired') {
          this.logout()
          this.sessionExpired()
          return
        }
        const index = this.tableData.findIndex((request) => request.formId === object.formId)
        this.tableData[index].dateFrom = error.response.data.unupdatedRequest.dateFrom
        this.tableData[index].dateTo = error.response.data.unupdatedRequest.dateTo
        this.tableData[index].numberOfDays = error.response.data.unupdatedRequest.numberOfDaysRequested
        this.tableData[index].timeOffType = error.response.data.unupdatedRequest.selectedType
        this.updateFailure(error.response.data.error)
      }
    },
    async getRecordedRequests () {
      try {
        const response = await GetRecordedRequestsService.getRecordedRequests(
          this.$store.state.user.id
        )
        if (response.data == null) {
          this.message = 'No records found'
        } else {
          this.tableData = response.data
          // Zrównoleglenie operacji wyliczenia poszczególnych rodzajów urlopu
          Promise.all([this.computeTotalVacation(response.data),
            this.computeTotalOnDemand(response.data),
            this.computeTotalDaysOff(response.data)])
            .then(([vacation, onDemand, totalDaysOff]) => {
              this.vacation = vacation
              this.onDemand = onDemand
              this.total = totalDaysOff
            }, (error) => {
              this.message = error
            })
        }
      } catch (error) {
        if (error.response.data.error === 'jwt expired') {
          this.logout()
          this.sessionExpired()
          return
        }
        this.message = error.response.data.error
      }
    },
    navigateTo (route, object) {
      this.$store.dispatch('setDateFrom', object.dateFrom)
      this.$store.dispatch('setDateTo', object.dateTo)
      this.$store.dispatch('setRequestDate', object.requestDate)
      this.$store.dispatch('setNumberOfDays', object.numberOfDays)
      this.$router.push(route)
    },
    computeTotalVacation (data) {
      var promise = new Promise((resolve, reject) => {
        var vacation = data.filter(form => (form.timeOffType === 'Vacation') &&
            (new Date(form.requestDate).getFullYear() === new Date().getFullYear()))
          .map(form => form.numberOfDays)
          .reduce((a, b) => { return a + b }, 0)

        vacation ? resolve(vacation) : resolve(0)
      })
      return promise
    },
    computeTotalOnDemand (data) {
      var promise = new Promise((resolve, reject) => {
        var onDemand = data.filter(form => (form.timeOffType === 'On Demand') &&
            (new Date(form.requestDate).getFullYear() === new Date().getFullYear()))
          .map(form => form.numberOfDays)
          .reduce((a, b) => { return a + b }, 0)

        onDemand ? resolve(onDemand) : resolve(0)
      })
      return promise
    },
    computeTotalDaysOff (data) {
      var promise = new Promise((resolve, reject) => {
        var totalDaysOff = data.map(form => form.numberOfDays)
          .reduce((a, b) => { return a + b }, 0)

        totalDaysOff ? resolve(totalDaysOff) : resolve(0)
      })
      return promise
    },
    setMessageToNull () {
      this.message = null
    }
  },
  created () {
    this.getRecordedRequests()
  }
}
</script>

<style scoped>

.main-div{
  width: 1100px;
  margin-top: 50px;
  font-family: Verdana;
  margin-bottom: 100px;
}
.form-div{
  width: 800px;
  margin-top: 40px;
}
.table-div{
  margin-top: 20px;
}
.message-div{
  height: 40px;
  margin-top: 8px;
}
.employeeRow{
  margin-top: 20px;
  margin-bottom: 10px;
}
.dateRow{
  margin-top: 10px;
}
.buttonRow{
  margin-top: 50px
}
.dateLabel{
  margin-top: 5px;
}
.employeeNameLabel{
  margin-top: 5px;
  float: left;
}
.timeOffRow{
  margin-top: 10px;
}
.employeeLabel{
  margin-top: 5px;
}
.timeOffLabel{
  margin-top: 5px;
}
.messageRow{
  margin-top: 30px;
  margin-bottom: 20px;
}
.messageSuccess{
  color: gray;
}
.messageFailure{
  color: red;
}
.totalDaysRow{
  margin-top: 10px;
}
.totalDaysLabel{
  margin-top: 5px;
}
.daysOffStats{
  margin-top: 5px;
  float: right;
}
.buttonDelete{
  margin-top: 4px;
}
.buttonPrint{
  margin-top: 4px;
  width: 63px;
}
.buttonUpdate{
  margin-top: 4px;

}
.tableNumberColumn{
  margin-top: 5px;
}
.tableInput{
  width: 50px;
  text-align: center;
}
.tableSelector{
  width: 150px;
}
.requestDateCell{
  margin-top: 7px;
}
</style>
