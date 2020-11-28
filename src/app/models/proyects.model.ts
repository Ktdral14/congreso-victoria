export interface ProyectsMultiselectResponse {
    error: boolean;
    status: number;
    body: BodyProyectsMultiselect[];
}

export interface BodyProyectsMultiselect {
    id_proyectos: string;
    nombre_propuesta: string;
}
