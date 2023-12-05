<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';

const router = useRouter();
const socket = ref(null);
const inQueue = ref(false);

const joinGameQueue = () => {
  console.log(inQueue.value)
  inQueue.value = true;
  socket.value.emit('join queue');

};

onMounted(() => {
  // Connect to the Socket.io server
  socket.value = io('http://localhost:80', {
    withCredentials: true,
    extraHeaders: {
      'Access-Control-Allow-Origin': '*',

    },
  });

  socket.value.on('room joined', (roomName) => {
    console.log('Received room info:', roomName);
    inQueue.value = false;
    router.push({ name: 'GameRoom', params: { roomName } });
  });
});

onBeforeUnmount(() => {
  // Disconnect the socket when the component is destroyed
  if (socket.value) {
    socket.value.disconnect();
  }
});
</script>

<template>
  <div>
    <h2>
      first compnent content here
    </h2>
    <button @click="joinGameQueue" :disabled="inQueue">
      join queue please
    </button>
    <!-- {{data.socket.id}} -->
  </div>
</template>

<style scoped></style>


