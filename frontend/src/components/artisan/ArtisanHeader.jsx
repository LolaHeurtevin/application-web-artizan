import PropTypes from 'prop-types'
import ArtisanDashboard from './ArtisanDashboard'

function ArtisanHeader ({ attributes }) {
  const imgUrl = process.env.REACT_APP_BASE_URL + attributes.picture?.data?.attributes.url

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <div className='flex flext-start'>
          <img
            src={imgUrl}
            className='rounded'
          />
        </div>
        <div className='flex-col flex-end m-5'>
          <h1 className='text-2xl text-bold'>{attributes.name}</h1>
          <p className='mt-4 text-justify'>{attributes.description}</p>
        </div>
      </div>
      <ArtisanDashboard />
    </div>
  )
}

ArtisanHeader.propTypes = {
  attributes: PropTypes.object
}

export default ArtisanHeader
