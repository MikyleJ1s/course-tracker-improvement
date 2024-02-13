const mysql = require('mysql')

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mikyle123',
    database: 'sdda_course_trackerDB'//'sanlam_data_and_digital_academy'
})

database.connect((error) => {
    if (error) throw error
    console.log('Connected to Database')
})




exports.getteams = (req, res) => {
    database.query("select * from teams",
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.get_users = (req, res) => {
    database.query("select * from users where user_type = 'Graduate'",
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.get_events = (req, res) => {
    database.query("select * from events_table where user_id = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_dates = (req, res) => {
    database.query("select * from events_table where event_id = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.filter_events = (req, res) => {
    const q = "select * from events_table where user_id in ("+req.params.s+")";
    database.query(q,
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_user_events = (req, res) => {
    database.query("select * from events_table where user_id = ? or user_id = ?",
        [req.params.s, '11'],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_user_feedback = (req, res) => {
    database.query("select * from feedback where user_id = ? or manager = ?",
        [req.params.s, req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_one_rating = (req, res) => {
    database.query("SELECT * FROM ratings INNER JOIN users ON ratings.user_id=users.user_id where event_id = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}


exports.get_one_rating2 = (req, res) => {
    database.query("select count(pace) as cp, pace from (SELECT pace, event_id FROM ratings INNER JOIN users ON ratings.user_id=users.user_id where event_id = ?) as a group by pace order by pace",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}


exports.get_one_rating3 = (req, res) => {

    jsondata = req.params.s.split(',')
    const q = "select "+ jsondata[0]+ ", count("+ jsondata[0]+") as oo from ratings where event_id = "+jsondata[1]+" group by "+jsondata[0]
    console.log("q: "+q)
    database.query(q,
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_laters = (req, res) => {
    jsondata = req.params.s.split(',')
    database.query("select alias from users where user_type='Graduate' and user_id " + jsondata[0] + " (select user_id from ratings where event_id = "+jsondata[1]+")",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_my_feedback = (req, res) => {
    jsondata = req.params.s.split(',')
    database.query("select * from ratings where user_id=" + jsondata[0] + " and event_id = "+jsondata[1],
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_ratings= (req, res) => {

    database.query("SELECT events_table.user_id, events_table.title, events_table.event_id, avg(ratings.rating) as average FROM ratings INNER JOIN events_table ON ratings.event_id=events_table.event_id group by ratings.event_id",
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.searchteams = (req, res) => {
    database.query("select * from teams where technologies like ? or name like ? or description like ? or expectations like ?",
        ['%'+req.params.s+'%', '%'+req.params.s+'%', '%'+req.params.s+'%', '%'+req.params.s+'%'],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.get_one_rotation = (req, res) => {
    database.query("select * from teams where manager = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
    

}

exports.search_users = (req, res) => {
    database.query("select * from users where first_name like ? or last_name like ?",
        ['%'+req.params.s+'%', '%'+req.params.s+'%'],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })
}



exports.validation = (req, res) => {
    database.query("select user_id from users where email = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.validation2 = (req, res) => {
    database.query("select password from users where user_id = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.validation3 = (req, res) => {
    database.query("select user_type from users where user_id = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.get_name_and_surname = (req, res) => {
    database.query("select first_name, last_name from users where user_id = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}
exports.get_rotation_name = (req, res) => {
    database.query("select name from teams where manager = ?",
        [req.params.s],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}
exports.insert_leave = (req, res) => {
    jsondata = req.body;
    a = jsondata['start_date'];
    b = jsondata['end_date']
    c = jsondata['user_id']

    database.query("insert into events_table (title, start, end, event_color, user_id) values (?, ?, ?, ?, ?)",
        ['Leave Day', a, b, '#808080', c],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.insert_feedback = (req, res) => {
    jsondata = req.body;
    a = jsondata['event_id']
    b = jsondata['user_id']
    c = jsondata['engaging'];
    d = jsondata['effective']
    e = jsondata['insightful']
    f = jsondata['pace']
    g = jsondata['review']
    h = jsondata['date_posted']
    console.log(jsondata)

    database.query("insert into ratings (event_id, user_id, rating, engaging, effective, insightful, pace, review, date_posted) values (?,?,?, ?, ?, ?, ?, ?, ?)",
        [a, b, 3, c, d, e, f, g, h],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.send_feedback = (req, res) => {
    jsondata = req.body;

    user_id=jsondata['user_id'] 
    manager=jsondata['manager']

    collab_1=jsondata['collab_1']  
    collab_a=jsondata['collab_a'] 
    collab_2=jsondata['collab_2'] 
    collab_b=jsondata['collab_b'] 
    collab_3=jsondata['collab_3'] 
    collab_c=jsondata['collab_c']

    innov_1=jsondata['innov_1'] 
    innov_a=jsondata['innov_a'] 
    innov_2=jsondata['innov_2'] 
    innov_b=jsondata['innov_b'] 
    innov_3=jsondata['innov_3'] 
    innov_c=jsondata['innov_c']

    care_1=jsondata['care_1'] 
    care_a=jsondata['care_a'] 
    care_2=jsondata['care_2'] 
    care_b=jsondata['care_b'] 
    care_3=jsondata['care_3'] 
    care_c=jsondata['care_c']
    int_1=jsondata['int_1'] 
   int_a=jsondata['int_a'] 
    int_2=jsondata['int_2'] 
    int_b=jsondata['int_b'] 
    int_3=jsondata['int_3'] 
    int_c=jsondata['int_c']


    a=jsondata['a']
    b=jsondata['b'] 
    c=jsondata['c'] 
    d=jsondata['d']
    e=jsondata['e']
    f=jsondata['f'] 
    g=jsondata['g'] 
    h=jsondata['h']
    i=jsondata['i']
    j=jsondata['j'] 
    k=jsondata['k'] 
    l=jsondata['l']
    m=jsondata['m']
    n=jsondata['n'] 
    o=jsondata['o'] 
    p=jsondata['p']
    q=jsondata['q']
    r=jsondata['r'] 
     w=jsondata['w'] 
    x=jsondata['x'] 
    y=jsondata['y']
    z=jsondata['z']

    console.log(jsondata)

    database.query("insert into feedback (user_id, manager,collab_1, collab_a,collab_2, collab_b,collab_3, collab_c, innov_1, innov_a,innov_2, innov_b, innov_3, innov_c,care_1, care_a, care_2, care_b,care_3, care_c, int_1, int_a,int_2, int_b, int_3, int_c, a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,w,x,y,z, collaborative, innovative, care, integrity, behaviour) values (?, ?,?,?,?   ,?, ?, ?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,         ?, ?,          ?, ?, ?, ?,         ?, ?,        ?, ?,         ?, ?,         ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [    user_id, manager,
            collab_1, collab_a,
            collab_2, collab_b,
            collab_3, collab_c,
        
            innov_1, innov_a,
            innov_2, innov_b,
            innov_3, innov_c,
        
            care_1, care_a,
            care_2, care_b,
            care_3, care_c,
        
            int_1, int_a,
            int_2, int_b,
            int_3, int_c,
        a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,w,x,y,z, (parseFloat(collab_a)+parseFloat(collab_b)+parseFloat(collab_c))/3,  (parseFloat(innov_a)+parseFloat(innov_b)+parseFloat(innov_c))/3, (parseFloat(care_a)+parseFloat(care_b)+parseFloat(care_c))/3, (parseFloat(int_a)+parseFloat(int_b)+parseFloat(int_c))/3,(parseFloat(b)+parseFloat(d)+parseFloat(f)+parseFloat(h)+parseFloat(j)+parseFloat(l)+parseFloat(n)+parseFloat(p)+parseFloat(r))],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.insert_event = (req, res) => {
    jsondata = req.body;
    a = jsondata['start_date'];
    b = jsondata['end_date']
    c = jsondata['event_title'];
    d = jsondata['event_color']

    database.query("insert into events_table (title, start, end, event_color, user_id) values (?, ?, ?, ?, ?)",
        [c, a, b, d, 11],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.update_rotation_details = (req, res) => {
    jsondata = req.body;

    a = jsondata['name'];
    b = jsondata['technologies']
    c = jsondata['expectations'];
    e = jsondata['description']
    f = jsondata['rotation_identifier']
    database.query("update teams set name = ?, technologies = ?, expectations = ?, description = ? where manager = ?",
        [a, b, c, e, f],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.update_event = (req, res) => {
    jsondata = req.body;

    a = jsondata['a'];
    b = jsondata['b']
    c = jsondata['c'];
    d = jsondata['d']
    e = jsondata['e']
    database.query("update events_table set title = ?, start = ?, end = ?, event_color = ? where event_id = ?",
        [a, b, c, d, e],
        function (err, result, fields) {
            if (err) {
                return err
            }
            return res.send(JSON.stringify(result))
        })

}

exports.unsave_rotation = (req, res) => {
    database.query("delete from events_table where event_id = ?",
        [req.params.i],
        function (error, result, fields) {
            if (error) throw error;
            return res.send(JSON.stringify(result))
        })
}