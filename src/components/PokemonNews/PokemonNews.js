import './PokemonNews.css';

export default function PokemonNews({data}){
    var { title, published_date, author, country, link, summary, rights, media } = data;
    return(
        <article className="article-item" >
            <img src={media || "https://cdn03.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_ds_22/H2x1_NDS_PokemonPlatinum_frFR_bannerXS.jpg"}/>
            <div className="article-item-content">
                <h2>{title}</h2>
                <div className="sub-infos">
                    <p>{author}</p>
                    <p>{published_date}</p>
                </div>
                <p>{summary.substring(0, 450)}...</p>
                <a className="btn" href={link} >{rights}</a>
            </div>  
        </article>
    )
}
