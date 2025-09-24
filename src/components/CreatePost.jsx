import { useState } from "react";
import { addPost } from "../services/PostsService";

export default function CreatePost({ getAllPosts, setPosts }) {
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    function handleFileChange(e) {
        if (e.target.files.length !== 0) {
            setImage(e.target.files[0]);
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setImagePreview(imageURL);
        }
    }

    function handleRemoveImage() {
        setImage(null);
        setImagePreview(null);
        document.querySelector("#fileInput").value = "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (body.trim() === "" && image == null) {
            return;
        }

        const formData = new FormData();
        if (body.trim() !== "") formData.append("body", body);
        if (image != null) formData.append("image", image);

        setIsSubmitting(true);

        const response = await addPost(formData);
        console.log("Create Post Response:", response);

        if (response.message === "success") {
            handleRemoveImage();
            setBody("");
            getAllPosts();
            setShowForm(false);
            
        }

        setIsSubmitting(false);
        getAllPosts();
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {showForm ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Caption Input */}
                    <div>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="3"
                        />
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full max-h-64 object-cover rounded-lg"
                            />
                            <button
                                onClick={handleRemoveImage}
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                        <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
                            <input
                                onChange={handleFileChange}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="fileInput"
                            />
                            <span className="text-sm font-medium">📷 Photo</span>
                        </label>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowForm(false)}
                                type="button"
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isSubmitting || (body.trim() === "" && image == null)}
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                            >
                                {isSubmitting ? "Posting..." : "Post"}
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full cursor-pointer text-left text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg px-4 py-3 transition duration-200"
                >
                    What's on your mind? Share a post...
                </button>
            )}
        </div>
    );
}
