export interface ISsoSessionsEndpointResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    company: {
      id: string;
      name: string;
      corporate_name: string;
      patron: string;
      cnpj: string;
      ie: string;
    };
    user_image_base64: string | null;
    internal_code: string;
    role: string;
    application_name: string[];
  };
  token: string;
}
