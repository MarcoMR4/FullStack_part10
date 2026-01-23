import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { GET_REPOSITORIES, GET_REPOSITORY_DETAILS } from "../graphql/queries";
import { FilterToQuery } from "../types/repositoryListFilters";
import { RepositoryEdge } from "../types/respository";

interface GetRepositoriesData {
  repositories: {
    edges: RepositoryEdge[];
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
    };
  };
}

const FILTER_TO_QUERY: FilterToQuery = {
  latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

const PAGE_SIZE = 5;

export default function useRepositories() {
  const [filter, setFilter] = useState<keyof FilterToQuery>("latest");
  const [keyword, setKeyword] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [repositoriesList, setRepositoriesList] = useState<RepositoryEdge[]>(
    [],
  );
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const params = useLocalSearchParams();
  const router = useRouter();

  // PAGINATED REVIEWS STATE
  const REVIEWS_PAGE_SIZE = 2;
  const [reviewsAfter, setReviewsAfter] = useState<string | null>(null);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [reviewsHasNextPage, setReviewsHasNextPage] = useState<boolean>(false);

  // SELECTED REPOSITORY DETAILS QUERY (with paginated reviews)
  const {
    data: detailsData,
    loading: detailsLoading,
    error: detailsError,
    refetch: refetchDetails,
    fetchMore: fetchMoreReviews,
  } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: {
      repositoryId: selectedId,
      first: REVIEWS_PAGE_SIZE,
      after: reviewsAfter === null ? undefined : reviewsAfter,
    },
    skip: !selectedId,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setReviewsAfter(null);
    setReviewsList([]);
  }, [selectedId]);

  // Accumulate reviews as pages are loaded
  useEffect(() => {
    const edges = (detailsData as any)?.repository?.reviews?.edges || [];
    if (edges.length > 0) {
      setReviewsList((prev) => {
        if (!reviewsAfter) return edges.map((e: any) => e.node);
        const prevIds = new Set(prev.map((e) => e.id));
        const filteredNew = edges
          .map((e: any) => e.node)
          .filter((e: any) => !prevIds.has(e.id));
        return [...prev, ...filteredNew];
      });
      setReviewsHasNextPage(
        (detailsData as any).repository.reviews.pageInfo.hasNextPage,
      );
    }
  }, [detailsData, reviewsAfter]);

  // Fetch next page of reviews
  const fetchNextReviewsPage = async () => {
    if (!reviewsHasNextPage || detailsLoading) return;
    const nextCursor = (detailsData as any)?.repository?.reviews?.pageInfo
      ?.endCursor;
    if (!nextCursor) return;
    await fetchMoreReviews({
      variables: {
        repositoryId: selectedId,
        first: REVIEWS_PAGE_SIZE,
        after: nextCursor,
      },
      updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prevResult;
        return fetchMoreResult;
      },
    });
    setReviewsAfter(nextCursor);
  };

  const repositoryQueryVars = {
    orderBy: FILTER_TO_QUERY[filter]?.orderBy || "CREATED_AT",
    orderDirection: FILTER_TO_QUERY[filter]?.orderDirection || "DESC",
    searchKeyword: typeof keyword === "string" ? keyword.trim() : "",
    first: PAGE_SIZE,
    after: typeof after === "string" ? after : undefined,
  };

  const { data, loading, error, refetch, fetchMore } =
    useQuery<GetRepositoriesData>(GET_REPOSITORIES, {
      variables: repositoryQueryVars,
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    setAfter(null);
    setRepositoriesList([]);
  }, [filter, keyword]);

  useEffect(() => {
    if (data?.repositories) {
      const newEdges = data.repositories.edges || [];
      setRepositoriesList((prev) => {
        if (!after) return newEdges;
        const prevIds = new Set(prev.map((e) => e.node.id));
        const filteredNewEdges = newEdges.filter(
          (e) => !prevIds.has(e.node.id),
        );
        return [...prev, ...filteredNewEdges];
      });
      setHasNextPage(data.repositories.pageInfo.hasNextPage);
    }
  }, [data, after]);

  useEffect(() => {
    if (error) {
      console.error("GET_REPOSITORIES error:", JSON.stringify(error, null, 2));
    }
  }, [error]);

  useEffect(() => {
    if (params?.refetch === "1") {
      refetch?.();
      router.replace("/");
    }
  }, [params?.refetch, refetch, router]);

  const fetchNextPage = async () => {
    if (!hasNextPage || loading) return;
    const nextCursor = data?.repositories?.pageInfo?.endCursor;
    if (!nextCursor) return;
    await fetchMore({
      variables: {
        ...repositoryQueryVars,
        after: nextCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return fetchMoreResult;
      },
    });
    setAfter(nextCursor);
  };

  return {
    repositories: { edges: repositoriesList },
    loading,
    error,
    filter,
    setFilter,
    keyword,
    setKeyword,
    selectedId,
    setSelectedId,
    refetch,
    fetchNextPage,
    hasNextPage,
    // Selected repository details
    detailsData,
    detailsLoading,
    detailsError,
    refetchDetails,
    // Paginated reviews
    reviewsList,
    reviewsHasNextPage,
    fetchNextReviewsPage,
  };
}
