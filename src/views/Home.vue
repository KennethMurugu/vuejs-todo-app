<template>
  <div class="mx-auto home">
    <button class="btn light" id="btn_refresh" @click="refresh" title="Refresh">
      <font-awesome-icon icon="sync"></font-awesome-icon>
    </button>
    <!-- Will show while data is loading -->
    <div class="loading" v-if="loadingData">
      <font-awesome-icon
        icon="spinner"
        :spin="true"
        class="mr-3"
      ></font-awesome-icon
      >Loading...
    </div>
    <ul class="noteList mt-3">
      <li v-for="note in allNotes" :key="note._id">
        <NoteSummaryCard :noteItem="note"></NoteSummaryCard>
      </li>

      <!-- Will show when the user has no saved notes -->
      <p v-if="allNotes.length <= 0 && errMsg != ''">No notes to display</p>
    </ul>

    <!-- Will show if there was an error when loading the data -->
    <b-alert variant="danger" :fade="true" show dismissible v-if="errMsg"
      ><font-awesome-icon icon="exclamation-circle" class="mr-3" />{{
        errMsg
      }}</b-alert
    >

    <router-link
      to="/home/note/new"
      class="mx-2 my-4 btn light util addNewNote"
    >
      <font-awesome-icon icon="plus-circle" class="mr-3"></font-awesome-icon>
      Add New Note
    </router-link>
  </div>
</template>

<script>
import NoteSummaryCard from '@/components/NoteSummaryCard.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    NoteSummaryCard
  },
  mounted() {
    if (!this.isAuthenticated) this.$router.replace({ name: 'login' })
  },
  created() {
    //Fetch data after component is created
    this.refresh()
  },
  methods: {
    refresh() {
      this.loadingData = true
      this.allNotes = []
      this.errMsg = ''
      axios.get('http://192.168.43.63:1234/note/get/all').then(
        response => {
          this.loadingData = false
          console.log(response)
          if (response.data.resultcode == 0) {
            //There was an error
            this.errMsg = 'Error getting data'
            return
          }

          let responseData = response.data.data
          this.allNotes = responseData
        },
        rejected => {
          this.loadingData = false
          console.log(rejected)
          this.errMsg = 'Oops! Soomething went wrong.\n' + rejected
        }
      )
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    }
  },
  data() {
    return {
      allNotes: [],
      errMsg: '',
      loadingData: false
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  width: 95%;
  max-width: 1000px;
  position: relative;
}
.noteList {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  justify-content: center;
}
.addNewNote {
  padding: 10px 15px;
  position: sticky;
  bottom: 10px;
}
#btn_refresh {
  position: absolute;
  right: 0;
  top: -30px;
}
</style>
