export class CompanyEntity {
  id: string;
  name: string;
  corporate_name: string;
  patron: string;
  cnpj: string;
  ie: string;

  constructor(company: CompanyEntity) {
    this.id = company.id;
    this.name = company.name;
    this.corporate_name = company.corporate_name;
    this.patron = company.patron;
    this.cnpj = company.cnpj;
    this.ie = company.ie;
  }
}
