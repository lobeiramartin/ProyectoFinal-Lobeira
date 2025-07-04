<template>
  <div class="login">
    <h2>Ingresar</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="usuario" type="text" placeholder="Usuario" required />
      <input v-model="clave" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref('')
const clave = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = () => {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {}

  if (!usuarios[usuario.value]) {
    error.value = 'El usuario no existe'
    return
  }

  if (usuarios[usuario.value] !== clave.value) {
    error.value = 'Contraseña incorrecta'
    return
  }

  sessionStorage.setItem('usuario', usuario.value)
  error.value = ''
  router.push('/productos') // o donde quieras redirigir
}
</script>

<style scoped>
.login input {
  display: block;
  width: 100%;
  max-width: 300px; 
  margin: 0 auto 1rem auto; 
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login button {
  width: 100%;
  max-width: 200px; 
  margin: 0 auto 1rem auto;
  padding: 0.7rem;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.login button:hover {
  background-color: #666;
}

.error {
  color: red;
  margin-top: 0.5rem;
  font-weight: bold;
}
</style>
