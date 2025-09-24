import axios from "axios"

const baseUrl = "https://linked-posts.routemisr.com/"


export async function addComment(commentContent, postId) {
    try {
        const { data } = await axios.post(baseUrl + "comments", {
            content: commentContent,
            post: postId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    } catch (error) {
        console.log(error.response.data);

    }
}