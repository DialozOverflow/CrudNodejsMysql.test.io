var userlogin = null;

function index(req,res) {
    res.render('tasks/index');
}

function inicio(req,res) {
    res.render('tasks/inicio', {userlogin});
}


function condiciones(req,res) {
    res.render('tasks/condiciones');
}

function store(req,res) {
    const data = req.body;
    if (Object.keys(data).length == 2) {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM usuarios WHERE correo = "'+data.email+'" AND contraseña = "'+data.password+'"',(err,rows) =>{
                if (rows[0]) {
                    userlogin = rows;
                    res.redirect('/inicio');
                }else{
                    res.redirect('/');
                }
            });
        });
    }
    if (Object.keys(data).length == 5) {
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM usuarios WHERE correo = "'+data.email+'" AND contraseña = "'+data.password+'"',(err, rows) =>{
                if (rows[0]) {
                    res.redirect('/');
                }else{
                    conn.query('SELECT * FROM usuarios', (err, exiss)=>{
                        id = 100;
                        for (let x = 0; x < Object.keys(exiss).length; x++) {
                            if (exiss[x].id == id){
                                id = id + 1;
                            }else{
                                break;
                            }
                        }
                        conn.query('INSERT INTO usuarios (id,nombre,correo,contraseña) value ('+id+',"'+data.nombre+'","'+data.email+'","'+data.password+'")', (err,ins)=>{
                            conn.query('SELECT * FROM usuarios WHERE correo = "'+data.email+'" AND contraseña = "'+data.password+'"',(err,rows) =>{
                                userlogin = rows;
                            });
                            res.redirect('/inicio');
                        });
                    })
                }
            })
        });
    }
}

function updateuserinfo(req,res) {
    var data = req.body;
    if (Object.keys(data).length == 4) {
        req.getConnection((err,conn)=>{
            conn.query('SELECT * FROM usuarios WHERE id = '+data.id+'',(err, conff)=>{
                if (err){
                    console.log('error el usuario no existe');
                    res.redirect('/inicio');
                }if(conff){
                    conn.query('UPDATE usuarios SET nombre = "'+data.nombre+'", correo = "'+data.correo+'", contraseña = "'+data.contraseña+'" WHERE id = '+data.id+'',(err,conf) => {
                        if (err) {
                            console.log('error');
                        }if (conf){
                            console.log('info actualizada');
                            res.redirect('/inicio');
                            conn.query('SELECT * FROM usuarios WHERE id = '+data.id+'',(err, conxx)=>{
                                userlogin = conxx;
                            })
                        }
                    });
                }
            });
        });
    }
}


module.exports = {
    index: index,
    inicio:inicio,
    condiciones: condiciones,
    store: store,
    updateuserinfo:updateuserinfo,
}