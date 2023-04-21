import { db } from '../database';

export const updateListingRoute = {
    method : 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        // get id from url
        const id = req.params.id;

        // get updated info from listing
        const {name, description, price} = req.payload;

        const userId = '12345';

        // update the listing with the data
        await db.query(`
            UPDATE listings
                SET name=?, description=?, price=?
                WHERE id=? AND user_id=?
        `,
            [name, description, price, id, userId],
        );

        // get the updated result
        const {results} = await db.query(
            'SELECT * FROM listings WHERE id=? AND user_id=?',
            [id, userId],
        );

        // return the updated result
        const updatedListing = results[0];
        return updatedListing;
    }
}