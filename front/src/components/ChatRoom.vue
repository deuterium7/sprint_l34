<template>
    <div class="hello">
        <h1>Комната {{ roomId }}</h1>

        <p>
            <strong>Всего подключений:</strong> {{ stats.total_connections }}
        </p>
        <p>
            <strong>В комнате:</strong> {{ stats.room_connections }}
        </p>

        <form @submit.prevent="onMessageSubmit">
            <input type="text" v-model="message" required>
            <button type="submit">Отправить</button>
        </form>

        <ul style="display: inline-grid;">
            <li v-for="(item, index) in chat" :key="index">
                <p>
                    <strong>Username:</strong> {{ item.user.name }}
                </p>
                <p>
                    <strong>Email:</strong> {{ item.user.email }}
                </p>
                <p>
                    <strong>CreatedAt:</strong> {{ item.created_at }}
                </p>
                <p>
                    <strong>Message:</strong> {{ item.message }}
                </p>
                <div>
                    <template v-if="item.is_answered">
                        <p>
                            <strong>Мой ответ:</strong> {{ item.answer }}
                        </p>
                    </template>
                    <template v-else>
                        <form @submit.prevent="onAnswerSubmit(item)">
                            <input type="text" v-model="item.answer" required>
                            <button type="submit">Ответить в ЛС</button>
                        </form>
                    </template>
                </div>
                <hr />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ChatRoom',
    props: {
        roomId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            stats: {
                total_connections: 0,
                room_connections: 0,
            },
            message: null,
            chat: [],
        }
    },
    mounted() {
        setInterval(() => {
            this.$socket.emit('room_chat-check_stats', { room_id: this.roomId });
        }, 1000);

        this.$socket.on('room_chat-new_stats', (response) => {
            this.stats = response;
        });

        this.$socket.on('room_chat-message_is_stored', (response) => {
            // TODO: Обновлять данные по чату из хранилища
            this.chat.push(response);
        });

        this.$socket.on('private_chat-message_is_stored', (response) => {
            // TODO: Обновлять данные по чату из хранилища
            this.chat.push(response);
        });
    },
    methods: {
        onMessageSubmit() {
            this.$socket.emit('room_chat-new_message', {
                message: this.message,
                room_id: this.roomId,
            });
            this.message = null;
        },
        onAnswerSubmit(item) {
            this.$socket.emit('private_chat-new_message', {
                message: item.answer,
                connection_id: item.connection_id,
            });
            item.is_answered = true;
        },
    },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
