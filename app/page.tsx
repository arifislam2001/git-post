import PostCards from "./components/ui/PostCards";
import PaginationBtn from "./components/PaginationBtn";
import { apiClient } from "./lib/apiClient";


export default async function Home({searchParams}) {

const query = await searchParams;
  // Fetch posts from API
  const page = Number(query.page) || 1; 
  const res = await apiClient.get(`/posts?limit=10&skip=${10 * page}`, {
    revalidate : 60 * 5,
   
  });

  return (
    <section className="py-10">
      <div className="container space-y-8">
        {
          res.posts.map((item)=>(

            <PostCards key={item.id} post={item} />
          ))
        }
      <div >
        <PaginationBtn />
      </div>
      
      </div>
    </section>
  );
}
