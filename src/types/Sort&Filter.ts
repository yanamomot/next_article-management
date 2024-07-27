export enum SortBy {
  All = "All",
  Newest = "Newest",
  Oldest = "Oldest",
}

export type FilterType = {
  sortBy: SortBy;
  query: string;
};
