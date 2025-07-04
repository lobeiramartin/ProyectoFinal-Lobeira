<template>
  <div id="app">
    <header>
      <h1>InkSumos</h1>     
    </header>

    <nav class="navbar">
      <ul class="nav-links">
        <li><router-link to="/productos">Productos</router-link></li>
        <li><router-link to="/carrito">Carrito</router-link></li>
        <li><router-link to="/login">Ingresar</router-link></li>
      </ul>
    </nav>
    
    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 InkSumos. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
header {
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
}

nav {
  background-color: #2c2c2c;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center; /* ✅ Centra horizontalmente */
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

nav a {
  color: #ccc;
  text-decoration: none;
  font-weight: 500;
}

nav a:hover {
  color: #fff;
}

main {
  padding: 2rem;
}

footer {
  background-color: #1a1a1a;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
</style>

<style>
html, body {
  cursor: url('/imagenes/cursores/cursorink_white.png'), auto;
}
</style>

