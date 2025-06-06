import { useEffect, useState } from 'react'

interface Author {

    name: string;
    isFollowing: boolean;
    image: string;
}

const TopSellers = () => {


    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=5');
                const data = await response.json();

                const authorsData: Author[] = data.results.map((user: any) => ({
                    name: `${user.name.first} ${user.name.last}`,
                    isFollowing: false,
                    image: user.picture.medium,

                }))
                setAuthors(authorsData);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        }

        fetchAuthors();
    }, [])


    const handleFollowingClick = (index: number) => {
        setAuthors((prevAuthors) =>
            prevAuthors.map((author, i) =>
                i === index ? { ...author, isFollowing: !author.isFollowing } : author
            )
        );
    };
    return (
        <div className='bg-white border rounded p-5 mx-5 mt-[5rem] w-[23rem] '>
            <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

            <ul>
                {authors.map((author, index) => (
                    <li key={index} className="flex items-center mb-4 justify-between">

                        <section className="flex justify-center items-center">
                            <img src={author.image} alt={author.name} className="w-[25%] h-[25%] justify-center rounded-full" />
                            <span className='ml-4'>{author.name}</span>
                        </section>


                        <button onClick={() => handleFollowingClick(index)}
                            className={`py-1 cursor-pointer px-4 rounded ${author.isFollowing ? 'bg-red-500 text-white' : 'bg-black text-white'}`}>{author.isFollowing ? 'unfollow' : 'follow'}</button>

                    </li>
                ))}
            </ul>

        </div>
    )
}

export default TopSellers
