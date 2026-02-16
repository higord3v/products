import { Product } from "@/types";

type FetchProductsParams = {
  token: string;
  nome_produto?: string;
  codigo_produto?: string;
};

export const fetchProducts = async ({
  token,
  nome_produto = "",
  codigo_produto = "",
}: FetchProductsParams): Promise<Product[]> => {
  const url =
    "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const body = JSON.stringify({
    nome_produto,
    codigo_produto,
  });

  const method = nome_produto || codigo_produto ? "POST" : "GET";

  const options: RequestInit = {
    method,
    headers,
  };

  if (method === "POST") {
    options.body = body;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
