const express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const config = {
    service: 'gmail',
    auth : {
        user: 'fa1319673@gmail.com', //please put a gmail id
        pass: 'hrkwasmunaqbosve' //please create an app password for gmail id and put here
    }
}

const transporter = nodemailer.createTransport(config);

const MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: 'G4GAME',
        link: 'https://www.g4game.in/'
    }
});

// For testing with testaccount 
router.post('/testingaccount', async (req,res) => {

    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        }
      });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, mdfaizan012001@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>",
    };

    transporter.sendMail(message).then((info)=> {
        return res.status(201)
        .json({
            message: "you should receive an email!",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });

    }).catch( error => {
        return res.status(500).json({error});
    })

});

//Real route with Gmail for contact us form
router.post('/contactform', [
    // Add your validation rules here using express-validator
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('mobile').notEmpty().withMessage('Mobile is required'),
  ], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile, service, message} = req.body;

    let response = {
        body: {
            name: 'Admin',
            intro: "You got a contact request",
            table: {
                data: [{
                    name: name,
                    email: email,
                    mobile: mobile,
                    service: service,
                    message: message
                }]
            },
            outro: "Please look into it."
        }
    };

    let mail = MailGenerator.generate(response);

    let MailMessage = {
        from: 'fa1319673@gmail.com',
        to: 'mdfaizan012001@gmail.com',
        subject: "CONTACT REQUEST",
        html: mail
    };

    transporter.sendMail(MailMessage).then(()=> {
        return res.status(201).json({
            message: "You should recieve an email in few minutes."
        })
    }).catch(error => {
        return res.status(500).json({error})
    })

});

//Real route for hiredeveloper
router.post('/hiredeveloper',[
    body('techStack').notEmpty().withMessage('Tech Stack is required'),
    body('numResources').isInt({ min: 1 }).withMessage('Number of Resources is required'),
    body('projectDesc').notEmpty().withMessage('Project Description is required'),
    // body('company').notEmpty().withMessage('Company name is required'),
    body('experience').isInt({ min: 0 }).withMessage('Experience is required & must be a non-negative integer'),
    body('type').notEmpty().withMessage('Type is required'),
  ], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {techStack, numResources, projectDesc, company, experience, type} = req.body;

    let response = {
        body: {
            name: 'Admin',
            intro: "You got a request for Hire Developer!",
            table: {
                data: [{
                    techStack: techStack,
                    numberOfResources: numResources,
                    projectDescription: projectDesc,
                    company: company,
                    experience: experience,
                    ShiftType: type
                }]
            },
            outro: "Please look into it."
        }
    };

    let mail = MailGenerator.generate(response);

    let MailMessage = {
        from: 'fa1319673@gmail.com',
        to: 'mdfaizan012001@gmail.com',
        subject: "HIRE DEVELOPER REQUEST",
        html: mail
    };

    transporter.sendMail(MailMessage).then(()=> {
        return res.status(201).json({
            message: "You should recieve an email in few minutes."
        })
    }).catch(error => {
        return res.status(500).json({error})
    });

});

//Real router for employee detail form
router.post('/employeeform', async (req,res) => {
    
    const { firstName, middleName, lastName, streetAddress, apartment, city, state, zipCode, homePhone, alternatePhone, email, maritalStatus, ssnGovtID, title, employeeId, supervisor, department, workLocation, workEmail, workPhone, cellPhone, startDate, salary, ECfirstName, ECmiddleName, EClastName, ECstreetAddress, ECapartment, ECcity, ECstate, ECzipCode, ECprimaryPhone, ECalternatePhone, ECrelationship } = req.body;

    let response = {
        body: {
            name: 'Admin',
            intro: "You got a New Employee Details Submission",
            table: [
                {
                    title: " Personal Information",
                    data: [{
                        firstName: firstName,
                        middleName: middleName,
                        lastName: lastName,
                        streetAddress: streetAddress,
                        apartment: apartment,
                        city:city,
                        state: state,
                        zipCode: zipCode,
                        homePhone: homePhone,
                        alternatePhone: alternatePhone,
                        email: email,
                        maritalStatus: maritalStatus,
                        ssnGovtID: ssnGovtID
                    }]
                },
                {
                    title: " Job Information",
                    data: [{
                        title: title,
                        employeeId: employeeId,
                        supervisor: supervisor,
                        department: department,
                        workLocation: workLocation,
                        workEmail: workEmail,
                        workPhone: workPhone,
                        cellPhone: cellPhone,
                        startDate: startDate,
                        salary: salary
                    }]
                },
                {
                    title: " Emergency Contact Information",
                    data: [{
                        firstName: ECfirstName,
                        middleName: ECmiddleName,
                        lastName: EClastName,
                        streetAddress: ECstreetAddress,
                        apartment: ECapartment,
                        city: ECcity,
                        zipCode: ECzipCode,
                        state: ECstate,
                        primaryPhone: ECprimaryPhone,
                        alternatePhone: ECalternatePhone,
                        relationship: ECrelationship
                    }]
                }
            ],
            outro: "Please proceed with onboarding of Employee."
        }
    }     

      let mail = MailGenerator.generate(response);

      let MailMessage = {
        from: 'fa1319673@gmail.com',
        to: 'mdfaizan012001@gmail.com',
        subject: "EMPLOYEE DETAILS",
        html: mail
        };

        transporter.sendMail(MailMessage).then(()=> {
            return res.status(201).json({
                message: "You should recieve an email in few minutes."
            })
        }).catch(error => {
            return res.status(500).json({error})
        });
})



module.exports = router

