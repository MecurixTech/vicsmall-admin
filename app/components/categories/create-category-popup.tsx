import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

const CreateCategoryPopup = ({
  setIsShowingCreateCategoryPopup,
  token,
}: {
  setIsShowingCreateCategoryPopup: Dispatch<SetStateAction<boolean>>;
  token: string;
}) => {
  const generateSlug = () => {
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return `x_${randomString}`;
  };

  const [formData, setFormData] = useState({
    name: "",
    slug: generateSlug(),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(token);

    const creatingCategory = toast.loading("Creating category...");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/admin-categories`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        console.log(res);
        toast.dismiss(creatingCategory);
        if (res.status === 201) {
          toast.success(res.data.Data);
          window.location.reload();
        } else {
          toast.error(res.data.Data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => toast.dismiss(creatingCategory));
  };

  return (
    <>
      <div
        onClick={() => setIsShowingCreateCategoryPopup(false)}
        className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
      />
      <div className="fixed left-1/2 top-1/2 z-20 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 sm:w-[50%]">
        <h2 className="mb-4 text-xl">Create a category</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="category_name" className="mb-2">
              Category name
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              name="category_name"
              id="category_name"
              className="w-full"
            />
          </div>
          <button type="submit" className="button button-accent w-full py-2">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCategoryPopup;
