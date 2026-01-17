// Importar el contenedor y dependencias con ESM6
import { render } from "@testing-library/react-native";
import React from "react";
import RepositoryListContainer from "../../components/repositorylist/RepositoryListContainer";
import { ThemeProviderCustom } from "../../context/ThemeContext";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      // Mock genérico de repositorios
      const repositories = {
        edges: [
          {
            node: {
              id: "repo1",
              fullName: "someuser/somerepo",
              description: "A description",
              language: "TypeScript",
              forksCount: 123,
              stargazersCount: 456,
              ratingAverage: 78,
              reviewCount: 9,
              ownerAvatarUrl: "https://example.com/avatar.png",
            },
          },
        ],
      };

      const {
        getByText: getByTextRender,
        getAllByTestId: getAllByTestIdRender,
      } = render(
        <ThemeProviderCustom>
          <RepositoryListContainer repositories={repositories} />
        </ThemeProviderCustom>
      );

      // Verificar todos los campos visuales para ambos repositorios
      repositories.edges.forEach(({ node }) => {
        expect(getByTextRender(node.fullName)).toBeTruthy();
        expect(getByTextRender(node.description)).toBeTruthy();
        expect(getByTextRender(node.language)).toBeTruthy();
        expect(getByTextRender(`Stars: ${node.stargazersCount}`)).toBeTruthy();
        expect(getByTextRender(`Forks: ${node.forksCount}`)).toBeTruthy();
        expect(getByTextRender(`Reviews: ${node.reviewCount}`)).toBeTruthy();
        expect(getByTextRender(`Rating: ${node.ratingAverage}`)).toBeTruthy();
      });
    });
  });
});
