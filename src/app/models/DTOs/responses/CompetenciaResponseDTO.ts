import { NivelCompetenciaEnum } from "../../enums/nivelCompetenciaEnum";

export interface CompetenciaResponseDTO {
    id: string;
    descricao: string;
    nivel: NivelCompetenciaEnum
}