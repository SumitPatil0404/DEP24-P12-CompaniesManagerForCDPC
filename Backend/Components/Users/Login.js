const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs')
const DB = require('../DataBase/SQLDatabase')
const { sendEmailWithDomain } = require('../Notifiers/EmailNotifier')
const { google } = require('googleapis');
// const fs = require('fs');
const axios = require('axios');
const { sendPdfBufferToSelectPdf } = require('./Pdfreader');
const {fetchAPI}=require('../../Tools/FetchAPI');
router = express()

const CheckUser = async (email,cycle_id) => {
    let query = `select * from users where email='${email}' and position='Representative' and cycle_id='${cycle_id}'`
    let result = await DB.runQuery(query)
    // console.log(result);
    if (!result.error) {
        return ({
            error: false,
            data: result.result[0]
        })
    }
    return ({
        error: true

    })
}

const CheckUser1 = async (email,cycle_id) => {
    let query = `select * from users where email='${email}' and position='Representative' and cycle_id= '${cycle_id}'`
    let result = await DB.runQuery(query)
    // console.log(result);
    if (!result.error) {
        return ({
            error: false,
            data: result.result[0]
        })
    }
    return ({
        error: true

    })
}

const CheckUser2 = async (user_id,cycle_id) => {
    console.log(user_id + " " + "check2");
    let query = `select * from users where user_id='${user_id}'  and cycle_id= '${cycle_id}'`
    let result = await DB.runQuery(query)
     console.log(result);
    if (!result.error) {
        return ({
            error: false,
            data: result.result[0]
        })
    }
    return ({
        error: true

    })
}

router.post('/user/login', async (req, resp) => {
    let email = req.body.email;
    let cycle_id = req.body.cycle_id;
    // let position = req.body.position;
    // console.log(email," ",position);
    let result = await CheckUser(email, cycle_id)
    // console.log(result);
    if (result.error) {
        resp.send({
            ok: false
        })
    }
    else {
        if (result.data == undefined) {
            resp.send({
                ok: true,
                isUserPresent: false,

            })
        }
        else {
            resp.send({
                ok: true,
                isUserPresent: true,
                userData: result.data

            })
        }

    }

})


// async function convertPdfToText(pdfBuffer) {
//     // Load the PDF buffer using pdfjs-dist
//     const pdfjsLib = await import('pdfjs-dist');
//     const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
  
//     // Extract text from each page
//     const totalPages = pdf.numPages;
//     let text = '';
//     for (let i = 1; i <= totalPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       content.items.forEach(item => {
//         text += item.str + '\n'; // Append text from each item
//       });
//     }
    
//     return text;
//   }




async function downloadAttachment(userId, messageId, attachmentId, attachmentName) {
    try {
      // Load pre-authorized user credentials
      const auth = new google.auth.GoogleAuth({
        // Provide your client ID, client secret, and refresh token
        credentials:{type:"authorized_user",client_id:"223033315288-33f44brihj52n9bolsjost5k67f9tvp8.apps.googleusercontent.com",client_secret:"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",refresh_token:"1//0gu1CdxzzeYt_CgYIARAAGBASNwF-L9IrN12xJropJa0A7Fp8t-Rv-xxJg-JYkZttBDbuk_oOVxYe0NaTtrMoLApTQfJVfL4LS4k"},
       
        // Scopes required to access Gmail API
        scopes: [
          'https://mail.google.com/',
          'https://www.googleapis.com/auth/gmail.readonly'
        ],
      });
  
      // Create Gmail API client
      const gmail = google.gmail({ version: 'v1', auth });
  
      // Retrieve attachment data
      const response = await gmail.users.messages.attachments.get({
        userId: userId,
        messageId: messageId,
        id: attachmentId
      });
  
      // Decode attachment data
      const attachmentData = Buffer.from(response.data.data, 'base64');
  
      // Write attachment data to file
      fs.writeFileSync(attachmentName, attachmentData);
  
      console.log(`Attachment downloaded: ${attachmentName}`);
    } catch (error) {
      console.error('Error downloading attachment:', error);
      throw error;
    }
  }
  


async function getMessage(userId, messageId) {
  try {
    // Load pre-authorized user credentials
    const auth = new google.auth.GoogleAuth({
      // Provide your client ID, client secret, and refresh token
      credentials:{type:"authorized_user",client_id:"223033315288-33f44brihj52n9bolsjost5k67f9tvp8.apps.googleusercontent.com",client_secret:"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",refresh_token:"1//0gu1CdxzzeYt_CgYIARAAGBASNwF-L9IrN12xJropJa0A7Fp8t-Rv-xxJg-JYkZttBDbuk_oOVxYe0NaTtrMoLApTQfJVfL4LS4k"},
       
      // Scopes required to access Gmail API
      scopes: [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.readonly'
      ],
    });

    // Create Gmail API client
    const gmail = google.gmail({ version: 'v1', auth });

    // Retrieve the specified message
    const response = await gmail.users.messages.get({
      userId: userId, // Use 'me' to indicate the authenticated user
      id: messageId,
      format: 'full' // Specify full format to retrieve entire message body
    });

    // Return the message
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
}

// Function to fetch message details
async function fetchMessageDetails(userId, messageIds) {
  try {
    const messageDetails = [];
    // Iterate over each message ID and fetch details
    for (const messageId of messageIds) {
      const message = await getMessage(userId, messageId.id);
      // Extract subject, body, and attachments from the message
      const subject = message.payload.headers.find(header => header.name === 'Subject').value;
      const body = message.snippet; // Using snippet for message body, you can extract the body from the payload if needed
      const attachments = message.payload.parts.filter(part => part.filename); // Filter parts with filenames as attachments
      // Push message details to the array
      // for (const attachment of attachments) {
      //   await downloadAttachment(userId, messageId.id, attachment.body.attachmentId, attachment.filename);
      // }

      messageDetails.push({ subject, body, attachments });
    }
    return messageDetails;
  } catch (error) {
    console.error('Error fetching message details:', error);
    throw error;
  }
}


async function listMessagesFromSender(userId, senderEmail) {
    try {
      // Load pre-authorized user credentials
      const auth = new google.auth.GoogleAuth({
        // Provide your client ID, client secret, and refresh token
        // credentials: {
        //     type:"authorized_user",client_id:"223033315288-33f44brihj52n9bolsjost5k67f9tvp8.apps.googleusercontent.com",client_secret:"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",refresh_token:"1//0gYbkSRPQ7sYrCgYIARAAGBASNwF-L9IrsoJY-qCXkc157zkl6X1EhT44_w3MOamieM7HRkLc2CBn8INHchhIWAL4n1zU4rB4jS0"
        // },


        credentials:{type:"authorized_user",client_id:"223033315288-33f44brihj52n9bolsjost5k67f9tvp8.apps.googleusercontent.com",client_secret:"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",refresh_token:"1//0gu1CdxzzeYt_CgYIARAAGBASNwF-L9IrN12xJropJa0A7Fp8t-Rv-xxJg-JYkZttBDbuk_oOVxYe0NaTtrMoLApTQfJVfL4LS4k"},
        // Scopes required to access Gmail API
        scopes: [
          'https://mail.google.com/',
          'https://www.googleapis.com/auth/gmail.readonly'
        ],
      });
  
      // Create Gmail API client
      const gmail = google.gmail({ version: 'v1', auth });
  
      // Retrieve list of messages from the specified sender
      const response = await gmail.users.messages.list({
        userId: userId,
        q: `from:${senderEmail}`
      });
  
      // Return list of messages
      return response.data.messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
  


// const userId = 'me'; // 'me' indicates the authenticated user
// const senderEmail = 'atharvamulay25@gmail.com'; // Sender's email address

// listMessagesFromSender(userId, senderEmail)
//   .then(messages => {
//     // console.log('Retrieved messages from sender:', messages);

//     fetchMessageDetails(userId, messages)
//       .then(messageDetails => {
//         console.log('Retrieved message details:', messageDetails);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });


//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });



  
router.post('/user/emails', async (req, resp) => {
    let email = req.body.email;
     
    let userId = 'me';
    let senderEmail = email;
    listMessagesFromSender(userId, senderEmail)
    .then(messages => {
      // console.log('Retrieved messages from sender:', messages);
  
      fetchMessageDetails(userId, messages)
        .then(messageDetails => {
        //   console.log('Retrieved message details:', messageDetails);
            resp.send({
                ok: true,
                data: messageDetails
            });
        })
        .catch(error => {
          console.error('Error:', error);

            resp.send({
                ok: false

            });
        });
  
  
    })
    .catch(error => {
      console.error('Error:', error);
      
    });
  


})






router.post('/file/buffer', async (req, resp) => {
   let buffer = req.body.buffer;
   buffer=Buffer.from(buffer,'base64')
    let text=await sendPdfBufferToSelectPdf(buffer)
   // console.log(text);
   
   //https://plankton-app-tkucz.ondigitalocean.app/acad/dep
   
  
  // console.log(res);
   resp.send  ({

    ok:true,
    text:text
   })


})







router.post('/user/profile', async (req, resp) => {
    let email = req.body.email;
    let cycle_id = req.body.cycle_id;
    let user_id = req.body.user_id;
    let result;
    console.log(email + " Profile");
    if(email== "0")
    { 
        //  console.log(user_id," ");
        console.log("hiiii")
         result = await CheckUser2(user_id,cycle_id)

    }

    else{
     console.log(email," ");
     result = await CheckUser1(email,cycle_id)
    
    }// console.log(result);
    if (result.error) {
        resp.send({
            ok: false
        })
    }
    else {
        if (result.data == undefined) {
            resp.send({
                ok: true,
                isUserPresent: false,

            })
        }
        else {
            resp.send({
                ok: true,
                isUserPresent: true,
                userData: result.data

            })
        }

    }

})

// Import necessary modules and dependencies

const editUserProfile = async (email, newName, newPhone,cycle_id) => {
    try {
        // Assuming you have a 'users' table in your database
        // Perform the database update operation here, using a query or an ORM like Sequelize

        // For example, using a query with pg-promise:

        const query = `UPDATE users SET name = '${newName}', phone = ${newPhone} WHERE email = '${email}' and cycle_id='${cycle_id}'`;
        const result = await DB.runQuery(query);

        // You might want to handle the result or throw an error based on your use case

        return result;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

router.post('/user/editprofile', async (req, resp) => {
    let email = req.body.email;
    let newName = req.body.name;
    let newPhone = req.body.phone;
    let cycle_id = req.body.cycle_id;
    try {
        let result = await editUserProfile(email, newName, newPhone,cycle_id);
        resp.send({
            ok: true,
            result
        });
    } catch (err) {
        console.log(err);
        resp.send({
            ok: false
        });
    }
});


router.post("/user/addcompany", async (req, resp) => {
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
  




router.post('/user/all', async (req, resp) => {
    try {
        let cycle_id = req.body.cycle_id;
        const query = `SELECT * FROM users WHERE position='Representative' and cycle_id='${cycle_id}'`;
        const result = await DB.runQuery(query);

        if (!result.error) {
            resp.send({
                ok: true,
                data: result.result
            });
        } else {
            resp.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        resp.send({
            ok: false
        });
    }
}
);




router.post('/user/superuser/all', async (req, resp) => {
    try {
        let cycle_id = req.body.cycle_id;
        const query = `SELECT * FROM users where cycle_id='${cycle_id}'`;
        const result = await DB.runQuery(query);

        if (!result.error) {
            resp.send({
                ok: true,
                data: result.result
            });
        } else {
            resp.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        resp.send({
            ok: false
        });
    }
}
);

router.post('/user/superuser', async (req, resp) => {
    try {
        let cycle_id = req.body.cycle_id;
        let email = req.body.email;
        const query = `SELECT * FROM users where cycle_id='${cycle_id}' and email='${email}'`;
        const result = await DB.runQuery(query);

        if (!result.error) {
            resp.send({
                ok: true,
                data: result.result
            });
        } else {
            resp.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        resp.send({
            ok: false
        });
    }
}
);

router.post('/user/assigned_company', async (req, resp) => {
    let user_id= req.body.user_id;
    let cycle_id = req.body.cycle_id;
    try {
        const query = `SELECT * FROM companies WHERE user_id='${user_id}' and cycle_id='${cycle_id}'`;
        const result = await DB.runQuery(query);

        if (!result.error) {
            resp.send({
                ok: true,
                data: result.result
            });
        } else {
            resp.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching assigned companies:', error);
        resp.send({
            ok: false
        });
    }
});


router.post('/placement/cycles', async (req, resp) => {
    try {
        const query = `SELECT * FROM placement_cycle`;
        const result = await DB.runQuery(query);

        if (!result.error) {
            resp.send({
                ok: true,
                data: result.result
            });
        } else {
            resp.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching placement cycles:', error);
        resp.send({
            ok: false
        });
    }
}
);

router.post('/placement/createcycle', async (req, resp) => {
    let cycle = req.body.cycle;
    try {
        const query = `INSERT INTO placement_cycle (cycle) VALUES (${cycle}) `;
        const result = await DB.runQuery(query);

        if (!result.error) {
            resp.send({
                ok: true,
                data: result.result
            });
        } else {
            resp.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error creating placement cycle:', error);
        resp.send({
            ok: false
        });
    }
}
);


router.post('/placement/selectcycle', async (req, resp) => {
    let cycle = req.body.cycle;
    try {
        const query = `SELECT * FROM placement_cycle WHERE cycle=${cycle}`;
        const result = await DB.runQuery(query);

        if (!result.error) {
            resp.send({
                ok: true,
                data: result.result
            });
        } else {
            resp.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error selecting placement cycle:', error);
        resp.send({
            ok: false
        });
    }
}
);



 





router.post('/messages', async (req, res) => {
    try {
        let { sender_id, receiver_id } = req.body;

        let query = `
            SELECT * 
            FROM messages 
            WHERE (sender_id = ${sender_id} AND receiver_id = ${receiver_id}) 
            OR (sender_id = ${receiver_id} AND receiver_id = ${sender_id})
            ORDER BY sent_at ASC

            
        `;
       
        // insert into messages (sender_id, receiver_id, message_text, sent_at) values (12, 3, 'Hello', '2021-09-01 12:00:00')
        // Execute the query with parameters
        let result = await DB.runQuery(query);
        
        if (!result.error) {
            res.send({
                ok: true,
                messages: result.result
            });
        } else {
            res.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.send({
            ok: false
        });
    }
});



router.post('/company/updates', async (req, res) => {
    try {
        let { company_id,cycle_id } = req.body;

        let query = `
  SELECT u.*, up.name as user_name
  FROM updates u
  JOIN users up ON u.user_id = up.user_id
  WHERE u.company_id = ${company_id} AND u.cycle_id = ${cycle_id}
  ORDER BY u.created_at ASC;
`;

       
        // insert into messages (sender_id, receiver_id, message_text, sent_at) values (12, 3, 'Hello', '2021-09-01 12:00:00')
        // Execute the query with parameters
        let result = await DB.runQuery(query);
        
        if (!result.error) {
            res.send({
                ok: true,
                data: result.result
            });
        } else {
            res.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching updates:', error);
        res.send({
            ok: false
        });
    }
});



router.post('/company/addupdate', async (req, res) => {

    let { company_id, cycle_id, text, user_id } = req.body

    let query = `INSERT INTO updates (text, company_id, cycle_id, user_id) VALUES ('${text}', ${company_id}, ${cycle_id}, ${user_id})`

    let result = await DB.runQuery(query)
    if(!result.error) {
        res.send({ ok: true, message: 'Update added successfully' })
    }
    else {
        res.send({ ok: false, message: 'Error adding update' })
    }
}
)







router.post('/company/user', async (req, res) => {


    let email = req.body.email;
    let cycle_id = req.body.cycle_id;
    try {
        const query = `SELECT * FROM users WHERE email='${email}' and cycle_id='${cycle_id}'`;

        const result = await DB.runQuery(query);
        if (!result.error) {
            res.send({
                ok: true,
                data: result.result
            });
        } else {
            res.send({
                ok: false
            });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.send({
            ok: false
        });
    }
});















router.post('/send/message', async (req, res) => {
    let { user_id, message, receiver_id, sent_at } = req.body

    let query = `INSERT INTO messages (sender_id, receiver_id, message_text, sent_at) VALUES (${user_id}, ${receiver_id}, '${message}', '${sent_at}')`
    
    let result = await DB.runQuery(query)
    console.log(result);
    if(result.error) {
       
        res.send({ error: 'Error sending message' })
        return
    }

    res.send({ message: 'Message sent successfully' })

}
)
















router.post('/notification/superuser/user', async (req, resp) => {
    let sender_email = req.body.sender_email;
    let receiver_email = req.body.receiver_email;
    let message = req.body.message;
    try {
      const query = `INSERT INTO notifications (sender_email, receiver_email, message) VALUES ('${sender_email}', '${receiver_email}', '${message}')`;
      const result = await DB.runQuery(query);
      if (!result.error) {
        resp.send({
          ok: true,
          message: "Notification sent successfully",
        });
      } else {
        resp.send({
          ok: false,
          message: "Error sending notification",
        });
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      resp.send({
        ok: false,
      });
    }
  });
  

  router.post('/notification/user', async (req, resp) => {
    let email = req.body.email;
    try {
      const query = `SELECT * FROM notifications WHERE receiver_email='${email}'`;
      const result = await DB.runQuery(query);
      if (!result.error) {
        resp.send({
          ok: true,
          notifications: result.result,
        });
      } else {
        resp.send({
          ok: false,
        });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      resp.send({
        ok: false,
      });
    }
  });

  router.post('/notification/user/superuser', async (req, resp) => {
    let sender_email = req.body.sender_email;
    let receiver_email = req.body.receiver_email;
    let message = req.body.message;
    try {
        const query = `INSERT INTO notifications (sender_email, receiver_email, message) VALUES ('${sender_email}', '${receiver_email}', '${message}')`;
        const result = await DB.runQuery(query);
        if (!result.error) {
            resp.send({
            ok: true,
            message: "Notification sent successfully",
            });
        } else {
            resp.send({
            ok: false,
            message: "Error sending notification",
            });
        }
        } catch (error) {
        console.error("Error sending notification:", error);
        resp.send({
            ok: false,
        });
    }
    }
    );





module.exports = router
