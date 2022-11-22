const express = require('express');
const router = express.Router();

const {
    joinlist,
    getUsers,
    addContributor,
    getContributors
} = require('../controllers/prelaunchController');

router.route('/waitlist').post(joinlist);
router.route('/allusers').get(getUsers);
router.route('/contributors').post(addContributor);
router.route('/allcontributors').get(getContributors);


module.exports = router;