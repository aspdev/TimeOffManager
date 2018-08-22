<template>
  <div class="container contentDiv">
    <div class="row">
      <p style="font-size: 20px">{{firstName + ' ' + lastName}}</p>
      <p style="margin-left: 650px; font-size: 20px">{{requestDate}}</p>
    </div>
      <h4 style="margin-top: 50px">Wniosek urlopowy</h4>
      <p style="margin-top: 70px">Proszę o udzielenie urlopu wypoczynkowego
        za rok {{currentYear}} w liczbie {{numberOfDays}} dni
        od dnia {{dateFrom}} do dnia {{dateTo}}</p>
      <p style="margin-top: 100px; margin-left: 400px;">Podpis pracownika</p>
      <p style="margin-top: 50px; position: absolute; margin-left:80px">Wyrażam zgodę na urlop we wskazanym terminie_________________</p>
  </div>
</template>
<script>

export default {

  data () {
    return {
      firstName: this.$store.state.user.firstName,
      lastName: this.$store.state.user.lastName,
      dateFrom: this.$store.state.dateFrom,
      dateTo: this.$store.state.dateTo,
      requestDate: this.$store.state.requestDate,
      numberOfDays: this.$store.state.numberOfDays,
      currentYear: new Date().getFullYear()
    }
  },
  mounted () {
    window.onafterprint = () => { window.close() }
    window.print()
    this.$router.push('/form')
  }
}
</script>
<style scoped>
.contentDiv{
  width: 1200px;
  font-family: Verdana;
  margin-top: 30px;

}
.innerDivTwo{
  margin-top: 100px;
}
</style>
