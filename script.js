let listBg = document.querySelectorAll('.bg');
let listTab = document.querySelectorAll('.tab');
let titleBanner = document.querySelector('.banner h1');

window.addEventListener("scroll", (event) => {
    /*scrollY is the web scrollbar position (pixel)*/
    let top = this.scrollY;
    /*index is the order of classes bg (0,1,2,3,4,5,6,7,8)
    When scrolling the web, the classes bg scroll down,
    the bigger the index, the faster the movement
    */
    listBg.forEach((bg, index) => {
        if(index != 0 && index != 8){
            bg.style.transform = `translateY(${(top*index/2)}px)`;
        }else if(index == 0){
            bg.style.transform = `translateY(${(top/3)}px)`;
        }
    })
    titleBanner.style.transform = `translateY(${(top*4/2)}px)`;

    /* parallax scroll in tab
    when tab's position is less than 550 px
    from scrollbar position add active class to animate 
    and vice versa
    */
    listTab.forEach(tab =>{
        if(tab.offsetTop - top < 550){
            tab.classList.add('active');
        }else{
            tab.classList.remove('active');
        }
    })
});  


// time line
const timelineEvents = document.querySelectorAll('.timeline__event');

        const handleScroll = () => {
            timelineEvents.forEach(event => {
                const rect = event.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    event.classList.add('timeline__event--visible');
                } else {
                    event.classList.remove('timeline__event--visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('DOMContentLoaded', handleScroll);

// mapa 
// --------------------
document.addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([-17.9746, -67.1202], 14); // Coordenadas iniciales

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    const points = [
        { lat: -17.97177350794686, lng: -67.11495882046685, title: "Colegio Bolivar" },
        { lat: -17.97167811464972, lng: -67.11407343965755, title: "Casa de las Nazarias" },
        { lat: -17.973762614633124, lng: -67.11003118183274, title: "Estación de Trenes" },
        { lat: -17.979738294817757, lng: -67.11063480459056, title: "Cementerio" },
    ];

    points.forEach(point => {
        L.marker([point.lat, point.lng]).addTo(map)
            .bindPopup(`<b>${point.title}</b>`);
    });

    // API Key de OpenRouteService
    const orsApiKey = '5b3ce3597851110001cf6248248bf3b151854b2981648a1a1fbf964f'; // Reemplaza con tu clave válida

    const pointsW = [
        { lat: -17.97177350794686, lng: -67.11495882046685, title: "Colegio Bolivar" },
        { lat: -17.97167811464972, lng: -67.11407343965755, title: "Casa de las Nazarias" },
        { lat: -17.973762614633124, lng: -67.11003118183274, title: "Estación de Trenes" },
        { lat: -17.976228268994873, lng: -67.11117582381388, title: "Soria" },
        { lat: -17.979738294817757, lng: -67.11063480459056, title: "Cementerio" },
    ];

    const colors = ['blue', 'red', 'green', 'purple']; // Colores para cada tramo

    for (let i = 0; i < pointsW.length - 1; i++) {
        const start = `${pointsW[i].lng},${pointsW[i].lat}`;
        const end = `${pointsW[i + 1].lng},${pointsW[i + 1].lat}`;

        const orsUrl = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${orsApiKey}&start=${start}&end=${end}`;

        try {
            const response = await fetch(orsUrl);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const data = await response.json();
            const route = data.features[0].geometry;

            // Añade la ruta al mapa
            L.geoJSON(route, {
                style: {
                    color: colors[i % colors.length], // Asigna un color secuencialmente
                    weight: 4
                }
            }).addTo(map);
        } catch (error) {
            console.error(`Error fetching route for segment ${i}:`, error);
        }
    }
});



// menu
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los enlaces dentro del menú
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Cierra el menú al hacer clic en una opción
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector('.custom-navbar'); // Selecciona el navbar
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link'); // Selecciona los enlaces del menú

    // Agrega un evento "click" a cada enlace del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado
            const targetId = this.getAttribute('href'); // Obtiene el ID del destino
            const targetSection = document.querySelector(targetId); // Selecciona la sección destino

            // Calcula la posición ajustada
            const navbarHeight = navbar.offsetHeight; // Altura del menú
            const targetPosition = targetSection.offsetTop - navbarHeight;

            // Realiza el desplazamiento suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
});





document.addEventListener("DOMContentLoaded", () => {
    const typingElements = document.querySelectorAll(".typing-effect");

    typingElements.forEach((element) => {
      const text = element.getAttribute("data-text"); // Texto a escribir
      let index = 0;
      let isDeleting = false;

      function typeAndDelete() {
        if (!isDeleting && index < text.length) {
          // Escribir letra por letra
          element.textContent += text[index];
          index++;
        } else if (isDeleting && index > 0) {
          // Borrar letra por letra
          element.textContent = text.substring(0, index - 1);
          index--;
        }

        if (index === text.length) {
          // Comienza a borrar después de escribir todo el texto
          isDeleting = true;
          setTimeout(typeAndDelete, 1000); // Espera antes de borrar
          return;
        }

        if (index === 0) {
          // Comienza a escribir de nuevo
          isDeleting = false;
        }

        // Ajusta la velocidad de escritura y borrado
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeAndDelete, speed);
      }

      typeAndDelete(); // Llama a la función
    });
  });