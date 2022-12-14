export const INIT_STATE = {

    system : {
        isLoading : false,
        isError : false,
        message : '',
        type : '',
    },
    posts : {
        isLoading : false,
        isError : true,
        data : []
    },
    fab : {
        isShowModalCreate : false,
    },
    edit : {
        isShowEditModal : false,
        data : {
            title : '',
            content : '',
            attachment : '',
        }
    },
    account : {
        AccessToken : '',
        isLoading : false,
        loginSuccess : true,
        userID : undefined,
        isError : false,
        username : undefined,
        isAdmin : false,

    }
}