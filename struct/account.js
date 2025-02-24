import UserAccountModel from './@user/user_account_model.js'

const data = {
    username: 'larson',
    email: 'larsonkapita@gmail.com',
    password: 'Kksnud3883jsedwnudn9e38osmqs8j',
    joinedAt: '2024 21 jan 12:6',
    roleID: []
}

const user = new UserAccountModel(data)
user.setRoleID('client')
user.setRoleID('investor')
user.setRoleID('company')

// user.deleteRoleID('client')
// user.deleteRoleID('investor')
// user.deleteRoleID('company')

console.log(user.getRoleID())

