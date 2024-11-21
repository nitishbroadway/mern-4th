class ProfileCtrl {
    details = async (req, res, next) => {
        res.send('in profile')
    }
    
    update = async (req, res, next) => {}
    
    password = async (req, res, next) => {}
}

module.exports = new ProfileCtrl