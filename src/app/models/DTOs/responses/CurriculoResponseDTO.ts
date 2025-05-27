import { EscolaridadeEnum } from "../../enums/escolaridadeEnum";
import { CandidatoResponseDTO } from "./CandidatoResponseDTO";
import { CompetenciaResponseDTO } from "./CompetenciaResponseDTO";

export interface CurriculoResponseDTO {
    id: string;
    escolaridade: EscolaridadeEnum;
    funcao: string;
    candidato: CandidatoResponseDTO,
    competencias: CompetenciaResponseDTO[]
}