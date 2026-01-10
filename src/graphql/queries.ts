import { gql } from '@apollo/client';

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
        repositories(
            orderBy: RATING_AVERAGE, 
            orderDirection: DESC, 
        ) {
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

// other queries...