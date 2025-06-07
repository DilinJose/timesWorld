import React from 'react'
import Card from 'react-bootstrap/Card';

interface CardWithImageTypes {
    key: number;
    name: string;
    region: string;
    flag: string;
}

const CardWithImage: React.FC<CardWithImageTypes> = ({ key, name, region, flag }) => {
    return (
        <div key={key}>
            <Card className='border border-dark' style={{ width: '100%' }}>
                <Card.Body className="d-flex flex-row flex-md-row align-items-start gap-3">
                    <Card.Img
                        src={flag}
                        alt={`${name} flag`}
                        style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                    />
                    <div className='text-start text-md-start'>
                        <Card.Title className='mb-0'>{name}</Card.Title>
                        <Card.Text className='mb-0'>{region}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardWithImage
