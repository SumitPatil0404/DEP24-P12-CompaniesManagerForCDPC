const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const DB = require("../DataBase/SQLDatabase");
const { sendEmailWithDomain } = require("../Notifiers/EmailNotifier");
const { generateToken } = require("../Common/GenerateToken");
router = express();

const CheckUser = async (email, cycle_id) => {
  let query = `select * from users where email='${email}' and position != 'Representative' and cycle_id=${cycle_id}`; // Use backticks for template literals
  let result = await DB.runQuery(query);
  // console.log(result);
  if (!result.error) {
    return {
      error: false,
      data: result.result[0],
    };
  }

  return {
    error: true,
  };
};

router.post("/superuser/login", async (req, resp) => {
  let email = req.body.email;
  let cycle_id = req.body.cycle_id;
  // let position = req.body.position;
  // console.log(email," ",position);
  let result = await CheckUser(email, cycle_id);
  // console.log(result);
  if (result.error) {
    resp.send({
      ok: false,
    });
  } else {
    if (result.data == undefined) {
      resp.send({
        ok: true,
        isUserPresent: false,
      });
    } else {
      resp.send({
        ok: true,
        isUserPresent: true,
        userData: result.data,
      });
    }
  }
});

const addUser = async (name, email, position, department, cycle_id) => {
  let obj = {
    isUserAlreadyAdded: false,
    isUserAdded: false,
  };

  let query = `SELECT * FROM users WHERE email='${email}' and cycle_id=${cycle_id}`; // Use backticks for template literals
  let result = await DB.runQuery(query);

  //   let result1 = await CheckUser(email);

  if (result.error) {
    obj.isUserAdded = false;
  } else if (result.result.length !== 0) {
    obj.isUserAlreadyAdded = true;
  } else {
    query = `INSERT INTO users (name,email, position, department,cycle_id) VALUES ('${name}','${email}', '${position}', '${department}',${cycle_id})`; // Use backticks for template literals
    result = await DB.runQuery(query);

    if (!result.error) {
      obj.isUserAdded = true;
    }
  }

  return obj; // Return the object
};

router.post("/superuser/edituser", async (req, resp) => {
  let email = req.body.email;
  let name = req.body.name;
  let position = req.body.position;
  let department = req.body.department;
  let cycle_id = req.body.cycle_id;

  if(position != 'Representative'){
   let query =`Select * from users where position='${position}' and department='${department}' and cycle_id=${cycle_id}`;
    let result = await DB.runQuery(query);

    if(result.result.length > 0){
      resp.send({
        ok: false,
        message: "Super User with same position and department already exists",
      });
      return;
    }
  }




  try {
    let query = `UPDATE users SET name='${name}',position='${position}', department='${department}' WHERE email='${email}' and cycle_id=${cycle_id}`; // Use backticks for template literals
    let result = await DB.runQuery(query);
    resp.send({
      ok: true,
      result,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    resp.send({
      ok: false,
      message: "Error updating user",
    });
  }
});

router.post("/superuser/deleteuser", async (req, resp) => {
  //let email = req.body.email;
  let user_id = req.body.user_id;
  let cycle_id = req.body.cycle_id;
  try {
    let query1 = `UPDATE companies SET user_id=NULL WHERE user_id='${user_id}' and cycle_id=${cycle_id}`;
    let query = `DELETE FROM users WHERE user_id='${user_id}' and cycle_id=${cycle_id}`; // Use backticks for template literals
    let result1 = await DB.runQuery(query1);
    let result = await DB.runQuery(query);
    resp.send({
      ok: true,
      result,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/superuser/deletesuperuser", async (req, resp) => {
  //let email = req.body.email;
  let user_id = req.body.user_id;
  let cycle_id = req.body.cycle_id;
  try {
    let query1 = `UPDATE companies SET user_id=NULL WHERE user_id='${user_id}' and cycle_id=${cycle_id}`;
    let query = `DELETE FROM users WHERE user_id='${user_id}' and cycle_id=${cycle_id}`; // Use backticks for template literals
    let result1 = await DB.runQuery(query1);
    let result = await DB.runQuery(query);
    resp.send({
      ok: true,
      result,
    });
  } catch (error) {
    console.error("Error deleting superuser:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/superuser/all", async (req, resp) => {
  try {
    let cycle_id = req.body.cycle_id;
    const query = `SELECT * FROM users WHERE position != 'Representative' and cycle_id=${cycle_id}`; // Use backticks for template literals
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        data: result.result,
      });
    } else {
      resp.send({
        ok: false,
      });
    }
  } catch (error) {
    console.error("Error fetching superusers:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/superuser/adduser", async (req, resp) => {
  console.log("Calculating.....");
  let name = req.body.name;
  let email = req.body.email;
  let position = req.body.position;
  let department = req.body.department;
  let cycle_id = req.body.cycle_id;
  try {
    let result = await addUser(name, email, position, department, cycle_id);
    resp.send({
      ok: true,
      result,
    });
  } catch (err) {
    console.log(err);
    resp.send({
      ok: false,
    });
  }
});

router.post("/superuser/profile", async (req, resp) => {
  let email = req.body.email;
  let cycle_id = req.body.cycle_id;
  // console.log(email," ");
  let result = await CheckUser(email, cycle_id);
  // console.log(result);
  if (result.error) {
    resp.send({
      ok: false,
    });
  } else {
    resp.send({
      ok: true,
      data: result.data,
    });
  }
});

// const addSuperUser = async (email, position, name, department, cycle_id) => {
//   let obj = {
//     isUserAlreadyAdded: false,
//     isUserAdded: false,
//   };

//   let query = `SELECT * FROM users WHERE email='${email}' and cycle_id=${cycle_id}`; // Use backticks for template literals
//   let result = await DB.runQuery(query);

//   if (result.error) {
//     obj.isUserAdded = false;
//   } else if (result.result.length !== 0) {
//     obj.isUserAlreadyAdded = true;
//   } else {
//     const query = `INSERT INTO users (email, name, position,department,cycle_id) VALUES ('${email}', '${name}', '${position}','${department}',${cycle_id})`; // Use backticks for template literals
//     const result = await DB.runQuery(query);

//     if (!result.error) {
//       obj.isUserAdded = true;
//     }
//   }

//   return obj; // Return the object
// };



const addSuperUser = async (email, position, name, department, cycle_id) => {
  let obj = {
    isUserAlreadyAdded: false,
    isUserAdded: false,
    isDuplicatePositionDepartment: false, // Add a flag for duplicate position and department
  };

  let query = `SELECT * FROM users WHERE email='${email}' and cycle_id=${cycle_id}`;
  let result = await DB.runQuery(query);

  
    

  if (result.error) {
    obj.isUserAdded = false;
  } else if (result.result.length !== 0) {
    obj.isUserAlreadyAdded = true;
  } else {
    // Check if a user with the same position and department exists for the given cycle
    query = `SELECT * FROM users WHERE position='${position}' AND department='${department}' AND cycle_id=${cycle_id}`;
    result = await DB.runQuery(query);

    if (result.error) {
      obj.isUserAdded = false;
    } else if (result.result.length !== 0) {
      obj.isDuplicatePositionDepartment = true; // Set flag if a user with the same position and department exists
    } else {
      // Insert the user if not already added and no duplicate position and department
      query = `INSERT INTO users (email, name, position, department, cycle_id) VALUES ('${email}', '${name}', '${position}', '${department}', ${cycle_id})`;
      result = await DB.runQuery(query);

      if (!result.error) {
        obj.isUserAdded = true;
      }
    }
  }

  return obj;
};


router.post("/superuser/addsuperuser", async (req, resp) => {
  console.log("Calculating.....");
  let email = req.body.email;
  let name = req.body.name;
  let department = req.body.department;
  let position = req.body.position;
  let cycle_id = req.body.cycle_id;
  try {
    let result = await addSuperUser(
      email,
      position,
      name,
      department,
      cycle_id
    );
    resp.send({
      ok: true,
      result,
    });
  } catch (err) {
    console.log(err);
    resp.send({
      ok: false,
    });
  }
});

const editSuperUserProfile = async (email, newName, newPhone, cycle_id) => {
  try {
    // Assuming you have a 'users' table in your database
    // Perform the database update operation here, using a query or an ORM like Sequelize

    // For example, using a query with pg-promise:

    const query = `UPDATE users SET name = '${newName}', phone = ${newPhone} WHERE email = '${email}' and cycle_id=${cycle_id}`;
    const result = await DB.runQuery(query);

    // You might want to handle the result or throw an error based on your use case

    return result;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

router.post("/superuser/editprofile", async (req, resp) => {
  let email = req.body.email;
  let newName = req.body.name;
  let newPhone = req.body.phone;
  let cycle_id = req.body.cycle_id;
  try {
    let result = await editSuperUserProfile(email, newName, newPhone, cycle_id);
    resp.send({
      ok: true,
      result,
    });
  } catch (err) {
    console.log(err);
    resp.send({
      ok: false,
    });
  }
});





router.post("/superuser/addcompany", async (req, resp) => {
  let name = req.body.name;
  let details = req.body.details; // Assuming 'details' is the array of hr details
  let updates = req.body.updates;
  let company_details = req.body.company_details;
  let cycle_id = req.body.cycle_id;

  try {
    const query = `
        INSERT INTO companies (name, details, updates, company_details, cycle_id)
        SELECT '${name}', '${details}', '${updates}', '${company_details}', ${cycle_id}
        WHERE NOT EXISTS (
            SELECT 1 FROM companies WHERE LOWER(name) = LOWER('${name}')
        )
        RETURNING *`; // Add RETURNING clause to get inserted row data

    const result = await DB.runQuery(query);
    console.log(result.result);
    if (!result.error) {
      if (result.result.length === 0) {
        resp.send({
          ok: false,
          message: "Company Name already exists",
        });
      } else if (result.result.length !== 0) {
        resp.send({
          ok: true,
          message: "Company added successfully",
        });
      }
    } else {
      resp.send({
        ok: false,
        message: "Error adding company",
      });
    }
  } catch (error) {
    console.error("Error adding company:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/company/all", async (req, resp) => {
  try {
    let cycle_id = req.body.cycle_id;
    const query = `SELECT * FROM companies where cycle_id=${cycle_id}`; // Use backticks for template literals
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        data: result.result,
      });
    } else {
      resp.send({
        ok: false,
      });
    }
  } catch (error) {
    console.error("Error fetching company data:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/company/edit", async (req, resp) => {
  let company_id = req.body.company_id;
  let name = req.body.name;
  let details = req.body.details;
  let updates = req.body.updates;
  let company_details = req.body.company_details;
  let cycle_id = req.body.cycle_id;
  let jaf = req.body.jaf;
  let inf = req.body.inf;
  try {
    const query = `UPDATE companies SET name='${name}', details='${details}', updates='${updates}', company_details='${company_details}',jaf = '${jaf}', inf = '${inf}' WHERE company_id=${company_id} and cycle_id=${cycle_id}`;
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        message: "Company updated successfully",
      });
    } else {
      resp.send({
        ok: false,
        message: "Error updating company",
      });
    }
  } catch (error) {
    console.error("Error updating company:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/company/editstatus", async (req, resp) => {
  let company_id = req.body.company_id;
  let status = req.body.status;
  let updates = req.body.updates;
  let cycle_id = req.body.cycle_id;

  try {
    const query = `UPDATE companies SET updates='${updates}', status='${status}' WHERE company_id=${company_id} and cycle_id=${cycle_id}`;
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        message: "Company updated successfully",
      });
    } else {
      resp.send({
        ok: false,
        message: "Error updating company",
      });
    }
  } catch (error) {
    console.error("Error updating company:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/company/delete", async (req, resp) => {
  let company_id = req.body.company_id;
  let cycle_id = req.body.cycle_id;

  try {
    const query = `DELETE FROM companies WHERE company_id=${company_id} and cycle_id=${cycle_id}`;
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        message: "Company deleted successfully",
      });
    } else {
      resp.send({
        ok: false,
        message: "Error deleting company",
      });
    }
  } catch (error) {
    console.error("Error deleting company:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/company/toassign", async (req, resp) => {
  try {
    let cycle_id = req.body.cycle_id;
    const query = `SELECT * FROM companies WHERE user_id IS NULL and cycle_id=${cycle_id}`;
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        data: result.result,
      });
    } else {
      resp.send({
        ok: false,
      });
    }
  } catch (error) {
    console.error("Error fetching companies:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/company/assigned", async (req, resp) => {
  try {
    let cycle_id = req.body.cycle_id;
    const query = `SELECT * FROM companies WHERE user_id IS NOT NULL and cycle_id=${cycle_id}`;
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        data: result.result,
      });
    } else {
      resp.send({
        ok: false,
      });
    }
  } catch (error) {
    console.error("Error fetching companies:", error);
    resp.send({
      ok: false,
    });
  }
});

router.post("/company/assigntospoc", async (req, resp) => {
  let company_id = req.body.company_id;
  let user_id = req.body.user_id;
  let cycle_id = req.body.cycle_id;
  try {
    const query = `UPDATE companies SET user_id='${user_id}' WHERE company_id=${company_id} and cycle_id=${cycle_id}`;
    const result = await DB.runQuery(query);

    if (!result.error) {
      resp.send({
        ok: true,
        message: "Company assigned successfully",
      });
    } else {
      resp.send({
        ok: false,
        message: "Error assigning company",
      });
    }
  } catch (error) {
    console.error("Error assigning company:", error);
    resp.send({
      ok: false,
    });
  }
});

module.exports = router;
