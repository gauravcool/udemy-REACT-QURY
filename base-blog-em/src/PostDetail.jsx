import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation }) {
  // replace with useQuery
  const {data, isError, isLoading, error} = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 2000
  });

  if(isLoading) {
    return <div>Loading...</div>
  }
  if(isError) return <h3>{error.toString()}</h3>


  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={()=>deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <p className="loading">Delete Post is pending...</p>}
        {deleteMutation.isError && <p className="error">Error in deleting Post {deleteMutation.error.toString()}...</p>}
        {deleteMutation.isSuccess && <p className="success">Delete Post is (not) successful...</p>}

      </div> 
      <div><button>Update title</button></div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
