import { Article } from "@/types/Article";
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createItem, updateItem, BASE_URL } from "../api/api";
import { testURL } from "../helper/isValidUrl";
import { Banner } from "./Banner";
import { useStore } from "@/store/store";

type Props = {
  article?: Article | null;
};

export const Form: React.FC<Props> = ({ article }) => {
  const { createItem, updateItem } = useStore();

  const [title, setTitle] = useState(article?.title || "");
  const [hasTitleError, setHasTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");

  const [description, setDescr] = useState(article?.description || "");

  const [url, setUrl] = useState(article?.url || "");
  const [hasUrlError, setHasUrlError] = useState(false);
  const [urlErrorMessage, setUrlErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleDescrChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescr(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    setHasUrlError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    setHasTitleError(!title);
    setHasUrlError(!url);

    let titleEmpty = false;
    let shortTitle = false;
    let urlEmpty = false;
    let invalidurl = false;

    if (!title) {
      setTitleErrorMessage("Title must not be empty");
      setHasTitleError(true);
      titleEmpty = true;
    } else if (title.length <= 8) {
      setTitleErrorMessage("Title should have at least 8 characters");
      setHasTitleError(true);
      shortTitle = true;
    }

    if (!url) {
      setUrlErrorMessage("URL must not be empty");
      setHasUrlError(true);
      urlEmpty = true;
    } else if (!testURL(url)) {
      setUrlErrorMessage("Please enter a valid URL");
      setHasUrlError(true);
      invalidurl = true;
    }

    if (invalidurl || urlEmpty || titleEmpty || shortTitle) {
      setLoading(false);
      return;
    }

    try {
      if (article) {
        await updateItem(title, description, url, article.id);
        setError("");
        setSuccess("Updated successfully :)");
        setTimeout(() => {
          router.push("/admin-panel");
        }, 400);
      } else {
        await createItem(title, description, url);
        setError("");
        setSuccess("Created successfully :)");
      }
    } catch (err) {
      setSuccess("");
      setError("Something went wrong :(");
    } finally {
      reset();
    }
  };
  // #region reset
  const reset = () => {
    setTitle("");
    setDescr("");
    setUrl("");

    setHasTitleError(false);
    setTitleErrorMessage("");

    setHasUrlError(false);
    setUrlErrorMessage("");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 b-10">
      <form
        className="w-full max-w-xl p-8 bg-white border rounded-lg shadow-md space-y-6 mb-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">
          {article ? `Edit article ${article.id}` : "Create a new article"}
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <div
              className={classNames("relative", {
                "border-red-500": hasTitleError,
                "border-gray-300": !hasTitleError,
              })}
            >
              <input
                id="post-title"
                className={classNames(
                  "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm",
                  {
                    "border-red-500": hasTitleError,
                    "border-gray-300": !hasTitleError,
                  }
                )}
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            {hasTitleError && (
              <p className="text-sm text-red-600">{titleErrorMessage}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-gray-700"
            >
              URL
            </label>

            <div
              className={classNames("relative", {
                "border-red-500": hasUrlError,
                "border-gray-300": !hasUrlError,
              })}
            >
              <input
                id="post-title"
                className={classNames(
                  "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm",
                  {
                    "border-red-500": hasUrlError,
                    "border-gray-300": !hasUrlError,
                  }
                )}
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={handleUrlChange}
              />
            </div>

            {hasUrlError && (
              <p className="text-sm text-red-600">{urlErrorMessage}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>

            <div>
              <textarea
                className="block w-full px-3 py-2 border-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter description"
                value={description}
                onChange={handleDescrChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <button
            type="submit"
            disabled={loading}
            className={classNames(
              "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
              {
                "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500":
                  !loading,
                "text-white bg-blue-800 hover:bg-blue-900 focus:ring-blue-800":
                  loading,
              }
            )}
          >
            {article ? "Save" : "Create"}
          </button>

          <button
            onClick={() => {
              router.push("/admin-panel");
            }}
            type="reset"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
      {error ? <Banner error={error} setError={setError} /> : null}
      {success ? <Banner success={success} setSuccess={setSuccess} /> : null}
    </div>
  );
};
