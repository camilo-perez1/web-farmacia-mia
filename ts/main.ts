// Esperamos a que todo el HTML cargue correctamente
document.addEventListener('DOMContentLoaded', () => {
  
  // Seleccionamos el encabezado de nuestra página
  const header = document.querySelector('header');

  // Le decimos a la ventana que escuche el evento de "scroll" (desplazamiento)
  window.addEventListener('scroll', () => {
    
    // Verificamos que el encabezado exista para evitar errores
    if (header) {
      
      // window.scrollY nos dice cuántos píxeles hemos bajado.
      // Si bajamos más de 50 píxeles, aplicamos el nuevo estilo:
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        // Si regresamos hasta arriba (menos de 50px), lo dejamos como estaba:
        header.classList.remove('header-scrolled');
      }
      
    }
  });
});

// --- ANIMACIONES DE SCROLL (Intersection Observer) ---
  
  // Seleccionamos todas las tarjetas de servicios y mesoterapia
  const tarjetas = document.querySelectorAll('.tarjeta-servicio, .tarjeta-meso');

  // Creamos el "vigilante" que revisará si las tarjetas ya entraron en la pantalla
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      // Si la tarjeta ya es visible en la pantalla...
      if (entrada.isIntersecting) {
        entrada.target.classList.add('mostrar'); // Le agregamos la clase que la hace aparecer
      }
    });
  }, {
    threshold: 0.15 // Se activa cuando el 15% de la tarjeta es visible
  });

  // A cada tarjeta le ponemos el estado "oculto" inicial y la empezamos a vigilar
  tarjetas.forEach((tarjeta) => {
    tarjeta.classList.add('oculto');
    observador.observe(tarjeta);
  });