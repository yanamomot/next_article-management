import { Article } from "../types/Article";
import { FilterType, SortBy } from "../types/Sort&Filter";

export function filter(
  articles: Article[],
  { sortBy, query }: FilterType
): Article[] {
  let copy = [...articles];

  if (query) {
    copy = copy.filter((item) => {
      const normTitle = item.title.trim().toLowerCase();
      const normDescription = item.description.trim().toLowerCase();
      const normQuery = query.trim().toLowerCase();

      return (
        normTitle.includes(normQuery) || normDescription.includes(normQuery)
      );
    });
  }

  if (sortBy) {
    switch (sortBy) {
      case SortBy.Newest:
        copy = copy.sort(
          (a, b) =>
            new Date(b.published).getTime() - new Date(a.published).getTime()
        );
        break;
      case SortBy.Oldest:
        copy = copy.sort(
          (a, b) =>
            new Date(a.published).getTime() - new Date(b.published).getTime()
        );
        break;
      default:
        break;
    }
  }

  return copy;
}
