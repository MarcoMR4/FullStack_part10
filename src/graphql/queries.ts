import { gql } from "@apollo/client";

// Ejemplo de consulta tipada en TypeScript

// Query parametrizable para obtener repositorios con diferentes órdenes
export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

export const GET_ME = gql`
  query getMe($reviews: Boolean!, $first: Int, $after: String) {
    me {
      id
      username
      reviewCount
      reviews(first: $first, after: $after) @include(if: $reviews) {
        edges {
          cursor
          node {
            createdAt
            id
            rating
            repository {
              name
            }
            text
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
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
      createdAt
      reviews(first: $first, after: $after) {
        edges {
          cursor
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
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }
`;

// other queries...
