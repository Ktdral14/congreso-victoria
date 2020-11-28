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
export interface RegistredProyects {
    error: boolean;
    status: number;
    body: RegistredProyectsBody[];
}

export interface RegistredProyectsBody {
    nombre_propuesta: string;
}

export interface AsignedProyects {
    error: boolean;
    status: number;
    body: AsignedProyectsBody[];
}

export interface AsignedProyectsBody {
    id_proyectos: string;
    nombre_propuesta: string;
    terminado: string;
}
