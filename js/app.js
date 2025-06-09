// HU1: Crear clase Template
        class Template {
            constructor(titulo, mensaje, hashtag, categoria, prioridad) {
                // Propiedades requeridas
                this.titulo = titulo;
                this.mensaje = mensaje;
                this.hashtag = hashtag;
                
                // Propiedades adicionales elegidas por el desarrollador
                this.categoria = categoria;
                this.prioridad = prioridad;
                
                // Propiedades automáticas
                this.id = Date.now() + Math.random(); // ID único
                this.fechaCreacion = new Date().toLocaleDateString();
            }

            // HU3: Método render para mostrar estado local
            render() {
                return `
                    <div class="template-card" data-id="${this.id}">
                        <div class="template-header">
                            <div class="template-title">${this.titulo}</div>
                            <div class="template-priority priority-${this.prioridad}">${this.prioridad.toUpperCase()}</div>
                        </div>
                        
                        <div class="template-content">
                            <div class="template-message">${this.mensaje}</div>
                            
                            <div class="template-tags">
                                <span class="hashtag">${this.hashtag}</span>
                                <span class="category-tag">${this.categoria}</span>
                            </div>
                        </div>
                        
                        <div class="template-meta">
                            <strong>Estado Local:</strong><br>
                            • ID: ${this.id}<br>
                            • Fecha de creación: ${this.fechaCreacion}<br>
                            • Longitud del mensaje: ${this.mensaje.length} caracteres
                        </div>
                        
                        <button class="delete-btn" onclick="eliminarPlantilla(${this.id})">
                            🗑️ Eliminar
                        </button>
                    </div>
                `;
            }
        }

        // HU2: Estado global - Array para almacenar plantillas
        let plantillasGlobales = [];

        // Función para añadir plantilla al estado global
        function agregarPlantilla(template) {
            plantillasGlobales.push(template);
            console.log('✅ Plantilla agregada al estado global:', template);
            renderizarTodasLasPlantillas();
            actualizarContador();
        }

        // Función para eliminar plantilla del estado global
        function eliminarPlantilla(id) {
            const indice = plantillasGlobales.findIndex(template => template.id === id);
            if (indice !== -1) {
                const plantillaEliminada = plantillasGlobales.splice(indice, 1)[0];
                console.log('🗑️ Plantilla eliminada del estado global:', plantillaEliminada);
                renderizarTodasLasPlantillas();
                actualizarContador();
            }
        }

        // HU3: Función global de renderizado para mostrar estado global
        function renderizarTodasLasPlantillas() {
            const contenedor = document.getElementById('templatesContainer');
            
            if (plantillasGlobales.length === 0) {
                contenedor.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #666;">
                        <h3>No hay plantillas creadas</h3>
                        <p>Crea tu primera plantilla usando el formulario</p>
                    </div>
                `;
                return;
            }

            // Mostrar todas las plantillas del estado global
            contenedor.innerHTML = plantillasGlobales.map(template => template.render()).join('');
            
            console.log('🔄 Estado Global actualizado. Total plantillas:', plantillasGlobales.length);
        }

        // Función para actualizar el contador
        function actualizarContador() {
            const contador = document.getElementById('templateCount');
            contador.textContent = `Total: ${plantillasGlobales.length} plantillas`;
        }

        // Manejar envío del formulario
        document.addEventListener('DOMContentLoaded', function() {
            const formulario = document.getElementById('templateForm');
            
            formulario.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtener valores del formulario
                const titulo = document.getElementById('titulo').value;
                const mensaje = document.getElementById('mensaje').value;
                const hashtag = document.getElementById('hashtag').value;
                const categoria = document.getElementById('categoria').value;
                const prioridad = document.getElementById('prioridad').value;

                // Crear nueva instancia de Template
                const nuevaPlantilla = new Template(titulo, mensaje, hashtag, categoria, prioridad);
                
                // Agregar al estado global
                agregarPlantilla(nuevaPlantilla);
                
                // Limpiar formulario
                formulario.reset();
                
                // Mostrar mensaje de éxito
                alert('✅ Plantilla creada exitosamente!');
            });

            // Renderizar plantillas iniciales (vacío)
            renderizarTodasLasPlantillas();
            actualizarContador();
        });

        // Crear algunas plantillas de ejemplo para demostración
        window.addEventListener('load', function() {
            // Ejemplo 1
            const ejemplo1 = new Template(
                "Saludo de Bienvenida",
                "¡Hola! 👋 Bienvenido/a a nuestro servicio. Estamos aquí para ayudarte en lo que necesites.",
                "#bienvenida",
                "saludo",
                "alta"
            );
            
            // Ejemplo 2
            const ejemplo2 = new Template(
                "Promoción Semanal",
                "🎉 ¡Oferta especial! 50% de descuento en todos nuestros productos. Válido hasta el domingo.",
                "#promocion",
                "promocion",
                "media"
            );

            // Agregar ejemplos al estado global
            setTimeout(() => {
                agregarPlantilla(ejemplo1);
                agregarPlantilla(ejemplo2);
            }, 500);
        });