import React, { useEffect, useState } from "react"
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api"
import { UseDebounce } from "../hooks/debounce"





export function HomePage() {
    const [search, setSearch] = useState('')
    const debounced = UseDebounce(search)
    const [dropdown, setDropdwown] = useState(false)
    const { isError, isLoading, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()



    useEffect(() => {
        setDropdwown(debounced.length > 3 && data?.length! > 0)

    }, [debounced, data])

    const clickHandler = (username: string) => {
        fetchRepos(username)
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className="text-red-600 text-center">smt go wrong...</p>}

            <div className="relative w-[560px]">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search items for GitHub"
                    className="border py-2 px-4 w-full h-[42px] mb-2" type="text" />

                {dropdown && <ul className="list-none bg-white left-0 right-0 top-[42px] max-h-[200px] oveflow-y-scroll">
                    {
                        isLoading && <p className="text-red text-center">Loading</p>
                    }
                    {
                        data?.map(user => (
                            <li
                                onClick={() => clickHandler(user.login)}
                                key={user.id}
                                className="py-1 px-3 hover:text-white hover:bg-gray-500 cursor-pointer"
                            >
                                {user.login}
                            </li>
                        ))
                    }

                </ul>}

            </div>
            <div>
                {
                    areReposLoading && <p className="text-center">Repos are loading..</p>
                }
            </div>
        </div>
    )
}

export default HomePage