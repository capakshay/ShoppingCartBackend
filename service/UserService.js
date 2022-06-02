const connection=require('../connection');


module.exports={
    getUserByUserEmail: (email,res) => { 
        let query=`select * from user where username = '${email}'`;
        connection.query(query,
          (error, results, fields) => {
            if (error) {
             throw error;
            }  
            return res(null, results[0]);
          }
        );
      }
}