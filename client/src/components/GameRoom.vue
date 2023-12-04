<script setup>

const props = defineProps(['roomName']);


</script>

<template>
    <div>
        <nav>
            <router-link to="/">Go Home</router-link>
        </nav>
        <h2>Game Room: {{ roomName }}</h2>
        <!-- Your game UI and logic go here -->
    </div>
</template>
  
  
<style scoped>
/* Your component-specific styles go here */
</style>
  