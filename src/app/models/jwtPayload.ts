export interface JwtPayload {
    sub: string;
    scope: string;
    iss: string;
    nome: string;
    exp: number;
    iat: number;
    userId: string;
}