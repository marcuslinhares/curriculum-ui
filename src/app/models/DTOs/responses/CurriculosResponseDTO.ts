import { CurriculoResponseDTO } from "./CurriculoResponseDTO";

export interface CurriculosResponseDTO{
    number: number;
    content: CurriculoResponseDTO[]
    totalPages: number;
    totalElements: number;
}