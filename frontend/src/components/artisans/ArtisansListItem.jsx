import { Card, CardBody, CardHeader, Link } from '@nextui-org/react'
import PropTypes from 'prop-types'

function ArtisansListItem ({ artisan }) {
  const { name, description, slug, picture } = artisan.attributes
  const imgUrl = process.env.REACT_APP_BASE_URL + picture?.data?.attributes?.url
  return (
    <Card as={Link} className='max-w-[400px]' href={`/artisans/${slug}`}>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
          classname='profile-picture'
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <h3 className='font-semibold text-3xl'>{name}</h3>
        <p>{description}</p>
      </CardBody>
    </Card>
  )
}

ArtisansListItem.propTypes = {
  artisan: PropTypes.object
}

export default ArtisansListItem
