<template>
  <div class="root">
    <div class="time-row">
        <div class="bordered time-cell">Resource</div>
        <div class="outlined time-cell" v-for="time in headerTimes">
            <span>{{time}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['headerTimes']
}
</script>

<style lang="scss">
  /* transform: rotate(7deg); */
  /* .time-cell span {
    transform: rotate(-90deg);
  } */
</style>
