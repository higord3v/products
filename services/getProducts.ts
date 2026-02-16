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

  // The documentation says GET for listing (without filter) and POST for filter.
  // However, the "GET" endpoint documentation says body: {}, which is unusual for GET.
  // And the POST endpoint has filter fields.
  // Given requirements usually imply simpler distinction:
  // - Initial load: GET (but maybe POST with empty body works too?)
  // Let's use POST for everything since it supports filters and likely the same endpoint logic.
  // Actually, req says: "Buscar via GET ... e renderizar grid".
  // AND "Filtrar ... usando POST".
  // If GET doesn't support body (standard), maybe it just returns all?
  // Let's try GET first if no filters, POST if filters?
  // Or just POST with empty body if allowed?
  // Let's implement both or smart switch.

  const method = nome_produto || codigo_produto ? "POST" : "GET";

  // Wait, standard GET requests cannot have a body. The requirements `GET` section shows a body `{}`.
  // This might be a documentation artifact or a specific API behavior (some clients allow it).
  // But `fetch` specs say GET body is undefined behavior or forbidden.
  // I will assume GET doesn't need body, or I should use POST for everything if GET fails.
  // Let's try to stick to "POST" for search. For "Get all", the documentation says GET.
  // I'll try GET without body for initial load.

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
