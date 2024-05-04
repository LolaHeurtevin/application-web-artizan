import PropTypes from 'prop-types'
import ArtisansListItem from './ArtisansListItem'

// { artisans } permet de récupérer un objet contenant un élément qui s'appelle artisans
function ArtisansList ({ artisans }) {
  if (!artisans || artisans.length < 1) {
    return 'No data'
  }
  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center'>
      {
        artisans.map(artisan => (
          <ArtisansListItem key={artisan.id} artisan={artisan} />
        ))
      }
    </div>
  )
}

ArtisansList.propTypes = {
  artisans: PropTypes.arrayOf(PropTypes.object)
}

export default ArtisansList
