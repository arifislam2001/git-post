import React from 'react'
import PostCards from "../components/ui/PostCards";
import { apiClient } from "../lib/apiClient";

const page = async ({params}) => {
  const { id } = await params;
  
  const res = await apiClient.get(`/posts/${id}`);
  const commentsRes = await apiClient.get(`/posts/${id}/comments`);
  
  const comments = commentsRes?.comments || [];

  return (
    <div className='container'>
      <div className='p-6'>
        <PostCards post={res} />
      </div>

      <div className='p-6 space-y-3'>
        <h2>Comments ({comments.length})</h2>
        {
         comments.map((item) => (
          <div key={item.id}>
         
            <p>{item.body}</p>
            
          </div>
        ))
        }
      </div>
      
    </div>
  );
}

export default page