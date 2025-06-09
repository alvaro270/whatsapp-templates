// HU1: Patrón Store - Estado centralizado
const Store = {
    // Estado central: array de plantillas
    plantillas: Template.crearEjemplos(), // Precargado con 2 ejemplos
    
    // Suscriptores para el patrón Observer
    suscriptores: [],

    // HU1: Obtener todas las plantillas del estado
    obtenerPlantillas() {
        console.log('📋 Obteniendo plantillas del Store:', this.plantillas);
        return [...this.plantillas]; // Retorna copia para evitar mutaciones
    },

    // HU2: Agregar nueva plantilla sin mutar el estado original
    agregarPlantilla(template) {
        console.log('➕ Agregando plantilla al Store:', template);
        
        // Inmutabilidad: crear nuevo array sin modificar el original
        this.plantillas = [...this.plantillas, template];
        
        console.log('✅ Estado actualizado. Total plantillas:', this.plantillas.length);
        
        // Notificar a los suscriptores del cambio
        this.notificarCambios();
    },

    // HU3: Eliminar plantilla específica sin mutar el estado original
    eliminarPlantilla(id) {
        console.log('🗑️ Eliminando plantilla con ID:', id);
        
        const plantillaAntes = this.plantillas.length;
        
        // Inmutabilidad: crear nuevo array filtrado sin modificar el original
        this.plantillas = this.plantillas.filter(template => template.id !== id);
        
        const plantillaDespues = this.plantillas.length;
        
        if (plantillaAntes > plantillaDespues) {
            console.log('✅ Plantilla eliminada exitosamente');
            console.log('📊 Estado actualizado. Total plantillas:', this.plantillas.length);
            
            // Notificar a los suscriptores del cambio
            this.notificarCambios();
        } else {
            console.log('❌ No se encontró plantilla con ese ID');
        }
    },

    // Patrón Observer: suscribirse a cambios en el Store
    suscribirse(callback) {
        this.suscriptores.push(callback);
        console.log('🔔 Nuevo suscriptor registrado al Store');
    },

    // Notificar a todos los suscriptores sobre cambios
    notificarCambios() {
        console.log('📢 Notificando cambios a', this.suscriptores.length, 'suscriptores');
        this.suscriptores.forEach(callback => callback(this.plantillas));
    },

    // Método para obtener estadísticas del estado
    obtenerEstadisticas() {
        const stats = {
            total: this.plantillas.length,
            porCategoria: {},
            porPrioridad: {}
        };

        this.plantillas.forEach(template => {
            // Contar por categoría
            stats.porCategoria[template.categoria] = 
                (stats.porCategoria[template.categoria] || 0) + 1;
            
            // Contar por prioridad
            stats.porPrioridad[template.prioridad] = 
                (stats.porPrioridad[template.prioridad] || 0) + 1;
        });

        return stats;
    },

    // Método para debugging: mostrar estado completo
    debug() {
        console.log('🔍 ESTADO COMPLETO DEL STORE:');
        console.log('Plantillas:', this.plantillas);
        console.log('Estadísticas:', this.obtenerEstadisticas());
        console.log('Suscriptores:', this.suscriptores.length);
    }
};