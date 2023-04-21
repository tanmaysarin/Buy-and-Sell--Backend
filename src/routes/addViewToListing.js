import { db } from '../database';

export const addViewToListingRoute = {
    method : 'POST',
    path: '/api/listings/{id}/add-view',
    handler: async (req, h) => {
        const id = req.params.id;
        // update the view
        await db.query(
            'UPDATE listings SET views=views+1 WHERE id=?',
            [id],
        );
        // get the updated result
        const {results} = await db.query(
            'SELECT * FROM listings WHERE id=?',
            [id],
        );
        // return the updated result
        const updatedListing = results[0];
        return updatedListing;
    }
}