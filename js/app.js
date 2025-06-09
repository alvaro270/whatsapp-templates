// HU1, HU2, HU3: Lógica principal de la aplicación

// Función global para renderizar plantillas (conectada al Store)
function renderizarPlantillas() {
    const contenedor = document.getElementById('templatesContainer');
    const plantillas = Store.obtenerPlantillas(); // HU1: Leer desde el Store
    
    if (plantillas.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <h3>No hay plantillas creadas</h3>
                <p>Crea tu primera plantilla usando el formulario</p>
            </div>
        `;
        return;
    }

    // Renderizar todas las plantillas del Store
    contenedor.innerHTML = plantillas.map(template => template.render()).join('');
    
    console.log('🖼️ Plantillas renderizadas desde el Store. Total:', plantillas.length);
}

// Función para actualizar contador de plantillas
function actualizarContador() {
    const contador = document.getElementById('templateCount');
    const stats = Store.obtenerEstadisticas();
    contador.textContent = `Total: ${stats.total} plantillas`;
}

// HU2: Función para agregar nueva plantilla
function agregarNuevaPlantilla(titulo, mensaje, hashtag, categoria, prioridad) {
    // Crear nueva instancia de Template
    const nuevaPlantilla = new Template(titulo, mensaje, hashtag, categoria, prioridad);
    
    // Agregar al Store (sin mutar el estado original)
    Store.agregarPlantilla(nuevaPlantilla);
    
    console.log('✨ Nueva plantilla creada y agregada al Store');
}

// HU3: Función global para eliminar plantilla (llamada desde el HTML)
function eliminarPlantilla(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
        // Eliminar del Store (sin mutar el estado original)
        Store.eliminarPlantilla(id);
    }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación con patrón Store');
    
    // HU1: Suscribirse a cambios del Store para actualizar la UI automáticamente
    Store.suscribirse(function(plantillas) {
        console.log('🔄 Store cambió, actualizando interfaz...');
        renderizarPlantillas();
        actualizarContador();
    });

    // Configurar manejo del formulario
    const formulario = document.getElementById('templateForm');
    
    // HU2: Manejar envío del formulario para agregar nueva plantilla
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const titulo = document.getElementById('titulo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const hashtag = document.getElementById('hashtag').value.trim();
        const categoria = document.getElementById('categoria').value;
        const prioridad = document.getElementById('prioridad').value;

        // Validación básica
        if (!titulo || !mensaje || !hashtag || !categoria || !prioridad) {
            alert('❌ Por favor completa todos los campos');
            return;
        }

        // Agregar nueva plantilla al Store
        agregarNuevaPlantilla(titulo, mensaje, hashtag, categoria, prioridad);
        
        // Limpiar formulario
        formulario.reset();
        
        // Mostrar mensaje de éxito
        alert('✅ Plantilla guardada exitosamente!');
        
        // Log para debugging
        Store.debug();
    });

    // HU1: Renderizado inicial desde el Store
    console.log('📊 Cargando plantillas iniciales del Store...');
    renderizarPlantillas();
    actualizarContador();
    
    // Mostrar estado inicial del Store
    Store.debug();
});

// Funciones adicionales para mejorar la experiencia del usuario

// Función para buscar plantillas por título o hashtag
function buscarPlantillas(termino) {
    const plantillas = Store.obtenerPlantillas();
    return plantillas.filter(template => 
        template.titulo.toLowerCase().includes(termino.toLowerCase()) ||
        template.hashtag.toLowerCase().includes(termino.toLowerCase())
    );
}

// Función para filtrar plantillas por categoría
function filtrarPorCategoria(categoria) {
    const plantillas = Store.obtenerPlantillas();
    return plantillas.filter(template => template.categoria === categoria);
}

// Función para exportar plantillas (podría ser útil más adelante)
function exportarPlantillas() {
    const plantillas = Store.obtenerPlantillas();
    const dataStr = JSON.stringify(plantillas, null, 2);
    console.log('📤 Exportando plantillas:', dataStr);
    return dataStr;
}

// Event listeners adicionales que se pueden agregar
window.addEventListener('beforeunload', function() {
    console.log('👋 Aplicación cerrándose. Estado final del Store:');
    Store.debug();
});