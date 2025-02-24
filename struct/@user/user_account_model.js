class UserAccountModel {

    constructor(user_data) {
        this.username = user_data.username
        this.email = user_data.email
        this.password = user_data.password
        this.joinedAt = user_data.joinedAt
        this.roleID = user_data.roleID
    }

    getRoleID() {
        return this.roleID
    }

    setRoleID(roleType) {

        let roleExist = false
        const client_role = 'adpmdpoe93kskwmwid0s0'
        const investor_role = 'ff493r93dm0wd03ej0dn3d'
        const company_role = 'whesdnenosdonornosen'
        const roletypes = {
            client: 'client',
            investor: 'investor',
            company: 'company'
        }

        function verifyExistingRole(roles, roleID){
            if(!(roles.includes(roleID))){
                roles.push(roleID)
            }
        }

        if (this.roleID.length == 0) {
            roleType === roletypes.client ? this.roleID.push(client_role) :
            roleType === roletypes.investor ? this.roleID.push(investor_role) :
            roleType === roletypes.company ? this.roleID.push(company_role) : this.roleID = this.roleID
        }else{
            roleType === roletypes.client ? verifyExistingRole(this.roleID, client_role) : 
            roleType === roletypes.investor ? verifyExistingRole(this.roleID, investor_role)  : 
            roleType === roletypes.company ? verifyExistingRole(this.roleID, company_role) : null
        }
    }

    clearRoleID(){
        this.roleID = []
    }

    deleteRoleID(roleType){
        const roleIDs = {
            client: 'adpmdpoe93kskwmwid0s0',
            investor: 'ff493r93dm0wd03ej0dn3d',
            company: 'whesdnenosdonornosen'
        }
        if(this.roleID.length != 0){
            if(this.roleID.includes(roleIDs[roleType])){
                this.roleID = this.roleID.filter(role => role != roleIDs[roleType])
            }
        }
    }

}

export default UserAccountModel