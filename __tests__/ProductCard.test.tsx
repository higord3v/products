import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../app/components/ProductCard";
import { describe, it, expect, vi } from "vitest";
import { Product } from "@/types";

const mockProduct: Product = {
  codigo: "123",
  nome: "Test Product",
  preco: "10.50",
  imagem: "https://example.com/image.jpg",
  referencia: "REF123",
  codigo_categoria: "CAT1",
  descricao: "Test Description",
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(
      <ProductCard
        product={mockProduct}
        onViewDetails={() => {}}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />,
    );

    expect(screen.getByText("Test Product")).toBeDefined();
    expect(screen.getByText("Cód: 123")).toBeDefined();
    expect(screen.getByText(/R\$\s?10,50/)).toBeDefined();
  });

  it("calls onViewDetails when clicking the button", () => {
    const onViewDetails = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onViewDetails={onViewDetails}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />,
    );

    const button = screen.getByText("Confira");
    fireEvent.click(button);
    expect(onViewDetails).toHaveBeenCalledWith(mockProduct);
  });

  it("calls onToggleFavorite when clicking the favorite button", () => {
    const onToggleFavorite = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onViewDetails={() => {}}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    const button = screen.getByLabelText("Adicionar aos favoritos");
    fireEvent.click(button);
    expect(onToggleFavorite).toHaveBeenCalledWith(mockProduct);
  });
});
