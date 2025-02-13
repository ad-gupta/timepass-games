import React, { useState } from "react";
import horrorMystery from "../assets/horror-mystery.jpg";
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios'
import { toast } from "react-toastify";

const uploadFile = async (img) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "image_preset");

  try {
    let cloudName = "dfzsw9nsu";
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    console.log(secure_url);
    return secure_url;
  } catch (error) {
    console.log(error);
  }
};

const PopupMenu = ({ setToEdit, setOpen, menuVisible, setIsToUpdate, setMenuVisible, data }) => {
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [publishDate, setPublishDate] = useState(data?.publishDate);
  const [author, setAuthor] = useState(data?.author);
  const [url, setUrl] = useState(data?.url);
  const [gamePic, setgamePic] = useState(data?.gamePic || horrorMystery);

  const handleImageChange = async(e) => {
    if (e.target.files && e.target.files[0]) {
      let saveUrl = e.target.files[0]
      saveUrl = await uploadFile(saveUrl);
      console.log(saveUrl, typeof saveUrl)
      setgamePic(saveUrl);
    }
  };

  const addGame = async() => {
    try{
      const response = await axios.post('/api/v1/add', {title, description, publishDate, author, url, gamePic});
      toast.success(response.data.message);

      setOpen(false)
      setIsToUpdate(prev => !prev)
    }catch(err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  };

  const updateGame = async() => {
    try{
      const response = await axios.put(`/api/v1/${data._id}`, {title, description, publishDate, author, url, gamePic});

      toast.success(response.data.message);

      setMenuVisible(false)
      setOpen(false)
      setToEdit(false)
      setIsToUpdate(prev => !prev)
    }catch(err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }
  

  return (
    <div className="fixed z-100 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-full md:w-1/2 p-8 m-2 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4 text-black">Add New Item</h2>
            <div
              className="text-black cursor-pointer"
              onClick={() => {setOpen(false), setToEdit(false)}}
            >
              <MdOutlineClose />{" "}
            </div>
          </div>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold my-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 text-2xl px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label
                className="block text-gray-700 text-sm font-bold my-2"
                htmlFor="Description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border text-2xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Description"
                type="text"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              />

              <label
                className="block text-gray-700 text-sm font-bold my-2"
                htmlFor="Url"
              >
                Url
              </label>
              <input
                className="shadow appearance-none border text-2xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Url"
                type="text"
                placeholder="Enter url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <label
                className="block text-gray-700 text-sm font-bold my-2"
                htmlFor="Author"
              >
                Author
              </label>
              <input
                className="shadow appearance-none border text-2xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Author"
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <div className="flex justify-between">
                <div className="max-w-[70%]">
                  <label
                    className="block text-gray-700 text-sm font-bold my-2"
                    htmlFor="Date"
                  >
                    Published date
                  </label>
                  <input
                    className="shadow appearance-none text-2xl border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Date"
                    type="date"
                    placeholder="Enter Date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </div>
                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-bold my-2"
                    htmlFor="image"
                  >
                    <img
                      src={gamePic}
                      alt=""
                      className="h-32 w-32 max-sm:h-20 max-sm:w-20 rounded-3xl mt-5 shadow-md shadow-black"
                    />
                  </label>
                  <input
                    className="hidden"
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                className="bg-black hover:bg-neutral-800 text-white font-bold py-2 text-2xl px-10 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {!data ? addGame() : updateGame()}}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
