<template>
  <div class="mx-auto createNote soft-shadow">
    <b-form class="p-4 w-100" @submit="submitForm">
      <div class="loading" v-if="loadingData">
        <font-awesome-icon
          icon="spinner"
          :spin="true"
          class="mr-3"
        ></font-awesome-icon
        >Loading...
      </div>

      <div id="headerInfo">
        <h1 v-if="newOrEdit === 'new'" class="noteNewOrEdit">New</h1>
        <h1 v-else class="noteNewOrEdit">Edit</h1>
        <!-- Created at -->
        <p v-if="note.created_on" id="created_on" class="mb-0 ml-2">
          Created on:
          <small
            ><em>{{ note.created_on }}</em></small
          >
        </p>
      </div>

      <!-- Email -->
      <b-form-group
        id="note_header_group"
        label="Title:"
        label-for="note_header"
      >
        <b-form-input
          id="note_header"
          v-model="note.note_header"
          :value="note.note_header"
          type="text"
          required
          placeholder="e.g. Shopping List"
          :disabled="submitting ? true : false"
        />
      </b-form-group>

      <!-- Note Content -->
      <b-form-group
        id="note_content_group"
        label="What's on your mind?"
        label-for="note_content"
      >
        <b-form-textarea
          id="note_content"
          v-model="note.note_content"
          :value="note.note_content"
          placeholder="Eggs, Milk..."
          rows="6"
          max-rows="6"
        >
        </b-form-textarea>
      </b-form-group>

      <b-button
        type="submit"
        class="mb-3 px-5 py-2 btn light"
        :disabled="submitting"
        ><font-awesome-icon
          icon="spinner"
          class="mr-2"
          :spin="true"
          v-if="submitting"
        />Save</b-button
      >

      <b-alert variant="danger" :fade="true" show dismissible v-if="errMsg"
        ><font-awesome-icon icon="exclamation-circle" class="mr-3" />{{
          errMsg
        }}</b-alert
      >

      <b-alert variant="success" :fade="true" show dismissible v-if="successMsg"
        ><font-awesome-icon icon="exclamation-circle" class="mr-3" />{{
          successMsg
        }}</b-alert
      >
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data() {
    return {
      note: {},
      submitting: false,
      errMsg: '',
      successMsg: '',
      loadingData: false
    }
  },
  props: { newOrEdit: String },
  mounted() {
    console.log('Route params=', this.$route.params)
    //Load data with this id only if we are editing
    if (this.newOrEdit === 'edit') this.getNote(this.$route.params.id)
  },
  methods: {
    submitForm() {
      console.log('Submitting form...')
      console.log(moment().format('dd, MMMM Do YYYY, h:mm:ss a'))
      // return
      if (this.newOrEdit === 'edit') this.saveNote()
      else this.createNote()
    },
    createNote() {
      this.successMsg = ''
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:1234/note/create',
        data: {
          note_header: this.note.note_header,
          note_content: this.note.note_content
        }
      }).then(
        response => {
          this.loadingData = false
          console.log(response)
          if (response.data.resultcode == 0) {
            //There was an error
            this.errMsg = 'Unable to create new note.\n' + response.data.msg
            return
          }

          this.successMsg = 'Your new note was created successfully.'
        },
        rejected => {
          this.loadingData = false
          console.log(rejected)
          this.errMsg = 'Unable to create new note.\n' + rejected
        }
      )
    },
    saveNote() {},
    getNote(id) {
      this.loadingData = true
      this.errMsg = ''
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:1234/note/get',
        params: {
          id
        }
      }).then(
        response => {
          this.loadingData = false
          console.log(response)
          if (response.data.resultcode == 0) {
            //There was an error
            this.errMsg = 'Error getting data'
            return
          }

          let responseData = response.data.data
          this.note = responseData
        },
        rejected => {
          this.loadingData = false
          console.log(rejected)
          this.errMsg = 'Error getting data: ' + rejected
        }
      )
    }
  }
}
</script>

<style scoped>
.createNote {
  max-width: 750px;
  width: 95%;
}
#headerInfo {
  display: flex;
  flex-direction: revert;
  align-items: center;
  justify-content: space-between;
}
#created_on {
  text-align: right;
}
</style>
