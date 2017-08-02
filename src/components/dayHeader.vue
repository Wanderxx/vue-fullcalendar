<template>
  <div class="root">
    
    <div class="time-row">
        <div class="bordered time-cell">Resource</div>
        <div class="bordered time-cell" v-for="time in headerTimes">
            {{time}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['headerTimes']
}
</script>

<style>
  
</style>
