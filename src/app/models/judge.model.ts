export interface Judge {
    id_jueces: string;
    id_categorias: string;
    usuario: string;
    contrasena: string;
    nombre: string;
    rol: string;
    finished: string;
    deleted: string;
}
export interface JudgeMultiselectResponse {
    error: boolean;
    status: number;
    body: BodyJudgesMultiselect[];
}

export interface BodyJudgesMultiselect {
    id_jueces: string;
    nombre: string;
}
