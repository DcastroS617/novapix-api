const express = require('express')
const { getReviews, createReview, deleteReview, updateReview } = require('../controllers/review')
const { AuthenticateUser, AuthorizePermissions } = require('../middleware/Authentication')
const router = express.Router()

router.route('/review/:id').get(getReviews)
    .post(AuthenticateUser, createReview)
    .patch(AuthenticateUser, updateReview)

router.route('/review').delete([AuthenticateUser, AuthorizePermissions('admin', 'moderator')], deleteReview)
module.exports = router;