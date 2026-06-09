import Link from "next/link"
import { BiUser } from "react-icons/bi"
import { BsEye } from "react-icons/bs"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"

export default function PostCards({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition duration-300">
      
      <div className="flex items-center gap-2 mt-4 text-sm mb-4">
       <div className="bg-blue-700 w-12 h-12 flex justify-center items-center rounded-full">
            <BiUser className="text-2xl rounded-full  text-white " />
       </div>
        <span className="font-bold text-base">User ID: {post?.userId}</span>
      </div>
      {/* Title */}
      <Link href={`/${post?.id}`} className="text-2xl font-bold hover:text-blue-600 transition text-gray-800 mb-3">
        {post?.title}
      </Link>

      {/* Body */}
      <p className="text-gray-600 mb-5 line-clamp-3 py-3">
        {post?.body}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {post?.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-4 text-gray-600">
        
        {/* Reactions */}
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-1">
            <FaThumbsUp className="text-green-500" />
            <span>{post?.reactions?.likes}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaThumbsDown className="text-red-500" />
            <span>{post?.reactions?.dislikes}</span>
          </div>
        <div className="flex items-center gap-1">
          <BsEye className="text-blue-500" />
          <span>{post?.views}</span>
        </div>
        </div>

        {/* Views */}
      </div>

      {/* User */}
    </div>
  )
}