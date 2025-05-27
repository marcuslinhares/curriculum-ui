import { EscolaridadeEnum } from "./enums/escolaridadeEnum";
import { NivelCompetenciaEnum } from "./enums/nivelCompetenciaEnum";

export interface Curriculo{
    escolaridade: EscolaridadeEnum,
    funcao: string,
    competencias: NivelCompetenciaEnum[]
}