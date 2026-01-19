import { gql } from "@apollo/client";

// Ejemplo de consulta tipada en TypeScript
export const GET_REPOSITORIES = gql`
  query {
    repositories {
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

export const GET_RATING_AVERAGE_SORTED_REPOSITORIES = gql`
  query {
    repositories(orderBy: RATING_AVERAGE, orderDirection: DESC) {
      edges {
        node {
          id
          fullName
          ratingAverage
        }
      }
    }
  }
`;

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
