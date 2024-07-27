import { Article } from "@/types/Article";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link  from "next/link";

type Props = {
  item: Article;
  isAdmin?: boolean;
};

export const ArticleItem: React.FC<Props> = ({ item, isAdmin }) => {
  return (
    <div className="border border-gray-400 rounded-lg p-4 m-1 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.published}</p>
        <p className="text-gray-600 mb-2">{item.description}</p>
      </div>
      <div className="flex justify-between items-end">
        <a href={item.url} className="text-blue-500 hover:underline mt-auto">
          Go to article...
        </a>
        {isAdmin ? (
          <div>
            <i
              className="bi bi-trash cursor-pointer text-danger fs-5 me-3 p-2 bg-red-50 hover:bg-red-100 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            ></i>
            <Link href={`/admin-panel/edit/${item.id}`}>
              <i
                className="bi bi-pen text-primary fs-5 p-2 cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
              ></i>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};
