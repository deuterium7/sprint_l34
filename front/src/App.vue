<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <template v-if="isChatInit">
        <template v-if="roomId">
            <chat-room :room-id="roomId"></chat-room>
        </template>
        <template v-else>
            <chat-general></chat-general>
        </template>
    </template>
    <template v-else>
        Loading...
    </template>
</template>

<script>
import ChatGeneral from './components/ChatGeneral.vue';
import ChatRoom from './components/ChatRoom.vue';

export default {
    name: 'App',
    components: {
        ChatGeneral,
        ChatRoom,
    },
    data() {
        return {
            roomId: null,
            isChatInit: false,
        }
    },
    beforeMount() {
        this.chatInit();
    },
    methods: {
        chatInit() {
            const re = /^\/rooms\/(\d+)$/;
            const url = window.location.pathname;
            const res = re.exec(url);

            if (res && typeof res[1] !== 'undefined') this.roomId = parseInt(res[1]);

            this.isChatInit = true;
        },
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
