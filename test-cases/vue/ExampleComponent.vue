<template>
   <div>
      <h1>Hello World</h1>
   </div>
</template>

<script setup>
import { onMounted } from 'vue';

let myVar = null;

onMounted(async () => {
   myVar = myVar === null ?? 'test';
});
</script>
