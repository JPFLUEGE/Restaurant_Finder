const apiKey = process.env.NOPE


const Yelp = {
    Search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
        {headers: {
            Authorization: `Bearer ${apiKey}`
        }}
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        name: business.name,
                        imageSrc: business.image_url,
                        address: business.address,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zipCode,
                        category: business.categories.title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        url: business.url,
                        lat: business.latitude,
                        long: business.longitude,
                        distance: business.distance,
                        transactions: business.transactions.join(", ")
                    }
                })
            }
        })
    }
}

export default Yelp;