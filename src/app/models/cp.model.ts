export interface CpRespuest {
    error: boolean;
    code_error: number;
    error_message?: any;
    response: CpInfo;
}

export interface CpInfo {
    cp: string;
    asentamiento: string;
    tipo_asentamiento: string;
    municipio: string;
    estado: string;
    ciudad: string;
    pais: string;
}
