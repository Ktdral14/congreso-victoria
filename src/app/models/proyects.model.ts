export interface ProyectsMultiselectResponse {
    error: boolean;
    status: number;
    body: BodyProyectsMultiselect[];
}

export interface BodyProyectsMultiselect {
    id_proyectos: string;
    nombre_propuesta: string;
}

export interface ProyectosCalificacion {
    id_usuarios: string;
    nombre: string;
    innovador: string;
    calificacion_innovador: string;
    calificacion: string;
    autores: any;
}