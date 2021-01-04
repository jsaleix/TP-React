import './404.css'
import NoContent from '../../assets/noName3.gif'

export default function NotFound(){
    return (
        <div className="notFound-container">
            <h2>404</h2>
            <p>Sorry content not found :'(</p>
            <img id="gyarados" src={NoContent} />
        </div>
    )
}