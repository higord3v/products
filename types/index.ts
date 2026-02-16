export type UserData = {
  codigo_usuario: string;
  nome_usuario: string;
  codigo_grupo: string;
  nome_grupo: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  token_de_acesso: string;
  dados_usuario: {
    codigo_usuario: string;
    nome_usuario: string;
    codigo_grupo: string;
    nome_grupo: string;
  };
};

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type Product = {
  codigo: string;
  nome: string;
  referencia: string;
  codigo_categoria: string;
  imagem: string;
  preco: string;
  descricao: string;
};
