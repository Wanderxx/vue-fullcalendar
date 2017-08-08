<template>
    <div class="root" ref="timecell">
        <div v-html="getEventElement(name, time, index)"></div>
        {{colors[index % colors.length]}}          
    </div>
</template>

<script>
export default {

}
</script>

<style>
  
</style>
