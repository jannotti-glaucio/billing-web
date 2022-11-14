import { Address } from './address'

export class Company {
    
    id:                 number;
    tipo:               string;
    name:               string;
    tradingName:        string;
    email:              string;
    tipoDocumento:      string;
    numeroDocumento:    string;
    telefone:           string;
    celular:            string;
    observacoes:        string;
    status:             string;
    endereco:          Address;

    constructor( id?: number, tipo?: string, tradingName?: string, email?: string, tipoDocumento?: string, numeroDocumento?: string, celular?: string,
        telefone?: string, observacoes?:  string, status?: string, endereco?: Address) {
        
        this.id = id;
        this.tipo = tipo;
        this.tradingName = tradingName;
        this.email = email;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.telefone = telefone;
        this.celular = celular;
        this.observacoes = observacoes;
        this.status = status;
        this.endereco = endereco;
      }
}