<template>
  <div class="card">
    <img
  :src="producto.imagen"
  :alt="producto.nombre"
  :class="{
    'img-tinta': producto.categoria === 'tinta',
    'img-maquina': producto.categoria === 'maquina'
  }"
/>
    <h3>{{ producto.nombre }}</h3>
    <p>${{ producto.precio }}</p>
    <button @click="$emit('agregar', producto)">Agregar al carrito</button>
  </div>
</template>

<script setup>
defineProps({
  producto: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid #444;
  border-radius: 8px;
  padding: 1rem;
  color: #f0f0f0;

  img {
    width: 100%;
    max-width: 220px;
    border-radius: 4px;
  }

  .img-tinta {
  width: 90%;
  max-width: 40px;
  object-fit: cover;
  border-radius: 6px;
}

.img-maquina {
  height: 220px;
  object-fit: contain;
  border-radius: 6px;
}

  button {
    margin-top: 0.8rem;
    background: white;
    border: none;
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
