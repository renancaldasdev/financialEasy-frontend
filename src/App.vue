<template>
  <div>
    <h2>Usuários</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    axios
      .get('${process.env.VUE_APP_BACKEND_URL}/api/users')
      .then((response) => {
        this.users = response.data
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error)
      })
  }
}
</script>
