import { SituacaoEnum } from "../../enums/situacaoEnum";
import { UsuarioResponseDTO } from "./UsuarioResponseDTO";

export interface CandidatoResponseDTO {
    id: string;
    cpf: string;
    dataNasc: Date;
    telefone: string,
    situacao: SituacaoEnum,
    usuario: UsuarioResponseDTO
}