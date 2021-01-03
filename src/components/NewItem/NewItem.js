import './NewItem.css';

export default function NewItem({data}){
    return(
        <>
            {/*<p>{JSON.stringify(data)}</p>*/}
            <article className="news-card">
                <h2>{data.title}</h2>
                <div className="news-details">
                    <p>{data.published_date}</p>
                    {data.author && <p>{data.author}</p>}
                    <p>country: {data.country}</p>
                </div>

                <div>
                    <p>{data.summary}</p>
                    <p className="btn">Source: <a href={data.link} >{data.rights}</a></p>
                    
                </div>    
                <img src={data.media || "https://cdn03.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_ds_22/H2x1_NDS_PokemonPlatinum_frFR_bannerXS.jpg"}/>
            </article>
        </>
    )
}