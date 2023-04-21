import { db } from '../database';

export const getUserListingsRoute = {
    method: 'GET',
    path: '/api/users/{userId}/listings',
    handler: async (req, h) =>{
        // get userId
        const userId = req.params.userId;
        // query the required data
        const {results} = await db.query(
            'SELECT * FROM listings WHERE user_id=?',
            [userId],
        );

        return results;
    }
}