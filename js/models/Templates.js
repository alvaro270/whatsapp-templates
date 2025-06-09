// HU1: Clase Template - Modelo de datos
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

    // Método render para mostrar la plantilla en HTML
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
                    <strong>Información del Estado:</strong><br>
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

    // Método estático para crear plantillas de ejemplo
    static crearEjemplos() {
        return [
            new Template(
                "Saludo de Bienvenida",
                "¡Hola! 👋 Bienvenido/a a nuestro servicio. Estamos aquí para ayudarte en lo que necesites.",
                "#bienvenida",
                "saludo",
                "alta"
            ),
            new Template(
                "Promoción Semanal",
                "🎉 ¡Oferta especial! 50% de descuento en todos nuestros productos. Válido hasta el domingo.",
                "#promocion",
                "promocion",
                "media"
            )
        ];
    }
}