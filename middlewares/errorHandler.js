module.exports = (err, req, res, next) => {
    let code = 0;
    let name = err.name;
    let message = '';
    switch (name) {
        case 'NOT_FOUND':
            code = 404;
            message = "Data tidak ditemukan!";
            break;
        case 'Missing_Token':
            code = 401;
            message = "Akses token hilang!";
            break;
        case 'JsonWebTokenError':
            code = 401;
            message = "Akses token tidak Valid!";
            break;
        case 'TokenExpiredError':
            code = 403;
            message = "Akses Token Kamu sudah Expired. Harap login ulang!";
            break;
        case 'Email_Invalid':
            code = 401;
            message = "Email yang anda masukan salah!";
            break;
        case 'User_Invalid':
            code = 401;
            message = "Email atau Password tidak Match!";
            break;
        case 'Your_Logged':
            code = 200;
            message = "Kamu sudah login!";
            break;
        case 'Not_Enough':
            code = 200;
            message = "Resource Kamu Tidak Cukup!";
            break;
        case 'Name_Used':
            code = 200;
            message = "Nama Telah Digunakan!";
            break;
        case 'ID_NOT_PASS':
            code = 200;
            message = "ID User tidak Sesuai!";
            break;
        default:
            code = 500;
            message = "Internal Server Error!";
            break;
    }
    res.status(code).json({
        success: false,
        message: message
    });
};