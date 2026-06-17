import React from 'react'
import PostCards from "../components/ui/PostCards";
import { apiClient } from "../lib/apiClient";

const page = async ({ params }) => {
  const { id } = await params;
  
  const res = await apiClient.get(`/posts/${id}`);
  const commentsRes = await apiClient.get(`/posts/${id}/comments`);
  
  const comments = commentsRes?.comments || [];

  return (
    <div className='container max-w-4xl mx-auto py-10 px-4'>
      {/* Post Card Section */}
      <div className='mb-10'>
        <PostCards post={res} />
      </div>

      {/* Comments Section (Top gap add kora hoyeche) */}
      <div className='mt-8 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-md md:p-8 space-y-6'>
        <h2 className='text-xl font-bold text-slate-800 border-b border-slate-100 pb-4'>
          Comments ({comments.length})
        </h2>
        
        {comments.length === 0 ? (
          <p className="text-slate-400 text-sm py-4 text-center">No comments yet. Be the first to comment!</p>
        ) : (
          <div className='space-y-5'> {/* Card gular bhetor gap barano hoyeche */}
            {comments.map((item) => (
              <div 
                key={item.id} 
                className='flex gap-4 p-5 rounded-xl bg-white border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-indigo-100'
              >
                {/* Avatar */}
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-semibold text-white shadow-inner'>
                  {item.user?.username ? item.user.username.charAt(0).toUpperCase() : 'U'}
                </div>

                {/* Comment Box */}
                <div className='space-y-1.5 w-full'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-bold text-slate-800 bg-slate-100/80 px-2.5 py-0.5 rounded-full w-fit'>
                      @{item.user?.username || `user_${item.user?.id || 'anonymous'}`}
                    </h4>
                    {/* Just now bad deya hoyeche */}
                  </div>
                  <p className='text-sm leading-relaxed text-slate-600 pl-1 pt-1'>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;