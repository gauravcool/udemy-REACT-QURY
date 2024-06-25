import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {
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
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <p className="loading">Post delete pending {deleteMutation.isPending}</p>}
        {deleteMutation.isError && <p className="error">Error in post delete {deleteMutation.error.toString()}</p>}
        {deleteMutation.isSuccess && <p className="success">Post delete success {deleteMutation.isSuccess}</p>}
      </div> 
      <div><button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
        {updateMutation.isPending && <p className="loading">Post update pending {updateMutation.isPending}</p>}
        {updateMutation.isError && <p className="error">Error in post update {updateMutation.error.toString()}</p>}
        {updateMutation.isSuccess && <p className="success">Post update success {updateMutation.isSuccess}</p>}
      </div>
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
