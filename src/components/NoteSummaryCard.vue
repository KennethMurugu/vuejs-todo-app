<template>
  <div class="m-3 note_card soft-shadow">
    <div class="header">
      <p>{{ noteItem.note_header }}</p>
    </div>
    <div class="px-2 content">
      <p class="created_on">Created on: {{ noteItem.created_on }}</p>
    </div>
    <div class="utilOverlay">
      <router-link :to="'/home/note/edit/' + noteItem._id" class="util mx-2">
        <font-awesome-icon icon="edit"></font-awesome-icon>
      </router-link>
      <router-link to="/home" class="util mx-2">
        <font-awesome-icon icon="trash-alt"></font-awesome-icon>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteSummaryCard',
  props: {
    noteItem: Object
  }
}
</script>

<style scoped>
.note_card {
  /* height: 100px; */
  width: 250px;
  text-align: center;
  border-radius: 0.15rem;
  position: relative;
  overflow-y: hidden;
  transition: all 0.2s ease;
}
.note_card:hover {
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
    0 4px 15px 0 rgba(0, 0, 0, 0.175);
  transform: scale(1.05, 1.05);
}
.note_card .header {
  padding: 5px;
  background-color: #e3e3e3;
  font-size: 1.35em;
}
.note_card .header p {
  margin: 0 auto;
}
.note_card .content {
  line-height: 2em;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.note_card .content .created_on {
  margin-bottom: 0;
}
.note_card .utilOverlay {
  text-align: center;
  background-color: var(--primary-light);
  position: absolute;
  width: 100%;
  bottom: 0%;
  opacity: 0;
  transition: all 0.2s ease;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.note_card:hover .utilOverlay {
  opacity: 0.95;
}
.note_card .utilOverlay .util {
  font-size: 2em;
  color: #fff;
}
.note_card .utilOverlay .util:hover {
  font-size: 2em;
  color: var(--primary-dark);
  text-shadow: 0 5px 11px rgba(0, 0, 0, 0.18);
}
</style>
