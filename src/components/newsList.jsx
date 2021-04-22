import React from 'react'

function getDateString(dataTimeStr){
    return new Date(dataTimeStr).toDateString()
}

const NewsItem = React.forwardRef(({item}, ref) => (
    <div ref={(el)=> ref.push(el)} className='card mb-4'>
        {item.urlToImage && (
            <img 
                className='card-img-top'
                src={item.urlToImage} 
                alt={item.title}
            />
        )}
        <div className='card-body'>
            <a 
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: '#424242'}}
            >
                <h5 className='card-title'>{item.title}</h5>
            </a>
            <a 
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: '#424242'}}
            >
                <h5 className='card-title'>{item.content}</h5>
            </a>

            <div className='mt-2 d-flex align-items-center'>
                <small>
                    <strong>
                        published at {getDateString(item.publishedAt)}
                    </strong>
                </small>
            </div>
            <div
                style={{
                    padding: '0.25rem 0.5rem',
                    background: '#ededed',
                    color: '#424242',
                    borderRadius: '0.25rem',
                    display: 'inline-block'
                }}
                className='ml-auto'
            >
                <small>{item.source.name}</small>
            </div>

        </div>
    </div>
))

const newsList = React.forwardRef(({news}, ref)=> {
    return (
        <div>
            {news && news.length === 0 && <h4>There is no News </h4>}
            {news && news.map(item => <NewsItem ref={ref} key={item.title} item={item} />)}
        </div>
    )
})

export default newsList
