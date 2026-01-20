import { gql } from "@apollo/client";

// Ejemplo de consulta tipada en TypeScript

// Query parametrizable para obtener repositorios con diferentes órdenes
export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          createdAt
          reviews {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Ya no es necesario GET_RATING_AVERAGE_SORTED_REPOSITORIES, se usa GET_REPOSITORIES con parámetros

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      language
      name
      forksCount
      description
      ownerAvatarUrl
      ownerName
      ratingAverage
      reviewCount
      stargazersCount
      reviews {
        edges {
          node {
            id
            rating
            user {
              id
              username
            }
            text
            userId
            repositoryId
            createdAt
          }
        }
      }
    }
  }
`;

// other queries...
