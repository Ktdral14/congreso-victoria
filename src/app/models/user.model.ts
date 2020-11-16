
export interface UserData {
    autores: Autores[];
    confirmed: string;
    contrasena: string;
    correo: string;
    deleted: string;
    id_usuarios: string;
    tk: string;
    propuesta: string;
    proyectos: string;
}

export interface Autores {
    a_materno: string;
    a_paterno: string;
    calle: string;
    ciudad: string;
    colonia: string;
    estado: string;
    fecha_nacimiento: string;
    id_autores: string;
    nombres: string;
    num_ext: string;
    num_int: string;
    sexo: string;
}
