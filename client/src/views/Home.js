import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'

const Home = () => {
    const [stories, setStories] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getStories = async() => {
            try {
                const response = await axiosPrivate.get('/api/story', {
                    signal: controller.signal
                })
                const authors = response.data.map(story => story.author)
                console.log(response.data)
                isMounted && setStories(response.data)
            } catch (err) {
                console.log(err)
                navigate('/login', { state: {from : location}, replace: true })
            }
        }

        getStories()

        return () => {
            isMounted = false
            controller.abort()
        }
    })


  return (
    <div>
        <Nav />
        <h2>Library</h2>
        <section>
            {
                stories.map((story, index) => {
                    return (
                    <article key={index}>
                        <h3>`${story.title}`</h3>
                        <h4>`by ${story.author}`</h4>
                        <p> `Genre: ${story.genre}` <br />
                        Short Description of Book.  Show on Hover</p>
                    </article>
                    )
                })
            }
        </section>
        {/* Footer Component */}
    </div>
    
  )
}

export default Home