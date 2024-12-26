import { Campaigns } from "../models/campaign.model.js";
import { NotFoundError } from "../errors/index.js";
import { ApiResponce } from "../utils/apiResponce.util.js";
import { Emails } from "../models/emails.model.js";

import { emailAutomation } from "../utils/emailAutomation.util.js";
import { Accounts } from "../models/accounts.model.js";
import bcrypt from "bcrypt";
import { Spintax } from "../models/spintax.model.js";
import { CampaignTracking } from "../models/campaignTracking.js";

/** __________ SAVE CAMPAIGN __________ */
export const saveCampaign = async (req, res) => {
  if (!req?.body?.Name || req?.body?.Name === "") {
    throw new NotFoundError("Please provide campaign name");
  }
  const newCampaign = new Campaigns(req.body);
  await newCampaign.save();
  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Campaign created successfully.",
      data: newCampaign,
    })
  );
};

/** __________ GET ALL CAMPAIGNS __________ */
export const getAllCampaigns = async (req, res) => {
  const allCampaigns = await Campaigns.find();
  if (allCampaigns.length === 0) {
    return res.status(200).json(
      new ApiResponce({
        statusCode: 200,
        message: "Campaign collection is empty.",
        data: [],
      })
    );
  }
  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Campaign collection fetched successfully.",
      data: allCampaigns,
    })
  );
};

/** __________ GET CAMPAIGN BY ID __________ */
export const getCampaignById = async (req, res) => {
  const campaign = await Campaigns.findById(req.params.id);
  if (!campaign) {
    throw new NotFoundError("Campaign not found.");
  }
  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Campaign fetched successfully.",
      data: campaign,
    })
  );
};

/** __________ UPDATE CAMPAIGN BY ID __________ */
export const updateCampaignById = async (req, res) => {
  if (!req?.body?.Name || req?.body?.Name === "") {
    throw new NotFoundError("Please provide campaign name");
  }

  const updatedCampaign = await Campaigns.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedCampaign) {
    throw new NotFoundError("Campaign not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Campaign updated successfully.",
      data: updatedCampaign,
    })
  );
};

/** __________ DELETE CAMPAIGN BY ID __________ */
export const deleteCampaignById = async (req, res) => {
  const deletedCampaign = await Campaigns.findByIdAndDelete(req.params.id);

  if (!deletedCampaign) {
    throw new NotFoundError("Campaign not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Campaign deleted successfully.",
    })
  );
};

// /** __________ START CAMPAIGN __________ */
// export const startCampaign = async (req, res) => {
//   const campaign = await Campaigns.findOne(req.body.id);

//   if (!campaign) {
//     throw new NotFoundError("Campaign not found.");
//   }

//   const accounts = await Accounts.find({
//     _id: { $in: campaign.CampaignAccounts },
//     Enable: 1,
//   });

//   const emails = await Emails.find({
//     EmailListId: { $in: campaign.CampaignEmailIds },
//     isEmailSended: false,
//   });

//   let totalEmailsAssigned = 0;

//   const accountsArrayWithEmails = [];

//   // debugger
//   // for (let i = 0; i < accounts.length && emails?.length ; i++) {
//   //   accountsArrayWithEmails[i] = {
//   //     Account: accounts[i],
//   //     Emails: [],
//   //   }
//   //   const { MaxEmailPerDay } = accounts[i];
//   //   const account = accounts[i];
//   //   account["emails"] = [];
//   //   if(MaxEmailPerDay < emails.length) {

//   //   }
//   //   for (let j = 0; j < emails?.length; j++) {
//   //     const email = emails.splice(j, 1);
//   //     accountsArrayWithEmails[i]["Emails"].push(email);
//   //   }
//   // }

//   // console.log(accountsArrayWithEmails);

//   // return res.send(accountsArrayWithEmails);

//   // Initialize distribution
//   const distribution = {};
//   accounts.forEach((account) => {
//     distribution[account._id] = { account, emails: [] }; // Each account gets an empty array initially
//   });

//   // Distribute emails while respecting limits
//   let emailIndex = 0;
//   while (emailIndex < emails.length) {
//     let assigned = false;

//     for (let account of accounts) {
//       if (distribution[account._id].emails.length < account.MaxEmailPerDay) {
//         distribution[account._id].emails.push(emails[emailIndex]);
//         emailIndex++;
//         assigned = true;

//         // Break the loop if all emails are assigned
//         if (emailIndex >= emails.length) break;
//       }
//     }

//     // If no accounts can accept more emails, break to prevent infinite loop
//     if (!assigned) break;
//   }

//   const browsers = (await Settings.find()[0]) || 2;
//   console.log(browsers);
//   const NumberOfBrowsers = browsers;
//   // const NumberOfBrowsers =
//   //   accounts.length < parseInt(browsers.NumberOfBrowsers)
//   //     ? accounts.length
//   //     : parseInt(browsers.NumberOfBrowsers);

//   const distributionArray = Object.values(distribution);
//   debugger;
//   const recursion = async () => {
//     if (distributionArray.length === 0) return res.send("done");
//     for (let i = 0; i < NumberOfBrowsers; i++) {
//       const { account, emails } = distributionArray[i];
//       const { Email, Password, Proxy } = account;
//       const googleUsername = Email;
//       const googlePassword = Password;
//       const emailSubject = campaign.EmailSubject;
//       const emailBody = campaign.EmailBody;
//       for (let j = 0; j < emails.length; j++) {
//         const recipientEmail = emails[j]["Email"];
//         await emailAutomation({
//           googleUsername,
//           googlePassword,
//           recipientEmail,
//           emailSubject,
//           emailBody,
//           Proxy,
//         });
//         await Emails.updateOne({ _id: emails[i]._id }, { isEmailSended: true });
//         await Accounts.updateOne({ _id: account._id }, { Limit: { $inc: 1 } });
//       }
//       // setTimeout(async () => {
//       //   for (let j = 0; j < emails.length; j++) {
//       //     const recipientEmail = emails[j]["Email"];
//       //     await emailAutomation({
//       //       googleUsername,
//       //       googlePassword,
//       //       recipientEmail,
//       //       emailSubject,
//       //       emailBody,
//       //       Proxy,
//       //     });
//       //     await Emails.updateOne({ _id: email._id }, { isEmailSended: true });
//       //     await Accounts.updateOne(
//       //       { _id: account._id },
//       //       { Limit: { $inc: 1 } }
//       //     );
//       //   }
//       // }, +account.DelayInMinutes);
//     }

//     distributionArray.splice(0, NumberOfBrowsers);
//     recursion();
//   };
//   recursion();

//   // for (let i = 0; i < NumberOfBrowsers; i++) {
//   //   emailAutomation({
//   //     googleUsername,
//   //     googlePassword,
//   //     recipientEmail,
//   //     emailSubject,
//   //     emailBody,
//   //     campaign,
//   //   });
//   // }

//   // const recipientEmail = emails[0].Email;
//   // const emailSubject = campaign.Subject;
//   // const emailBody = updatedBody;

//   // console.log("Emais: ", emails);
//   // console.log("Email Subject", emailSubject);
//   // console.log("Email Body", emailBody);
//   // return;

//   // return res.send(updatedBody);

//   // const emailSubject = campaign.Subject;
//   // const emailBody = campaign.Body;
//   // const recipientEmail = "hassanmurtaza.moshlay123@gmail.com";

//   // const spintaxName = req?.body?.Spintax || "Hi";

//   // Fetch spintax values from the database
//   // const spintaxes = await Spintax.findOne({ Name: spintaxName }).select(
//   //   "Values"
//   // );
//   // await Promise.all(
//   //   campaign.CampaignAccounts.map(async (account) => {
//   //     const { Email: googleUsername, Password: googlePassword } =
//   //       await Accounts.findOne({ _id: account });

//   //     const randomSpintaxValue =
//   //       spintaxes.Values[Math.floor(Math.random() * spintaxes.Values.length)];

//   //     // return res.send(randomSpintaxValue);
//   //     // Replace placeholders in the campaign body
//   //     const updatedBody = campaign.Body.replace(/#Hi#/g, randomSpintaxValue);

//   //     const emailsList = campaign.CampaignEmailIds;
//   //     // const emails = await Emails.find({ EmailListId: { $in: emailsList } });
//   //     await emailAutomation({
//   //       googleUsername,
//   //       googlePassword,
//   //       recipientEmail,
//   //       emailSubject,
//   //       emailBody,
//   //       campaign,
//   //     });
//   //   })
//   // );
// };

/** __________ Workable Code _______________ */
// export const startCampaign = async (req, res) => {
//   const campaign = await Campaigns.findOne({ _id: req.params.id });

//   if (!campaign) {
//     throw new NotFoundError("Campaign not found.");
//   }

//   const accounts = await Accounts.find({
//     _id: { $in: campaign.CampaignAccounts },
//     Enable: 1,
//   });

//   const emails = await Emails.find({
//     EmailListId: { $in: campaign.CampaignEmailIds },
//     isEmailSended: false,
//   });

//   const browsersSetting = (await Settings.findOne())?.NumberOfBrowsers || 2;
//   const NumberOfBrowsers =
//     accounts.length < browsersSetting ? accounts.length : browsersSetting;

//   const distribution = {};
//   accounts.forEach((account) => {
//     distribution[account._id] = { account, emails: [] };
//   });

//   // Distribute emails
//   let emailIndex = 0;
//   while (emailIndex < emails.length) {
//     let assigned = false;
//     for (let account of accounts) {
//       if (distribution[account._id].emails.length < account.MaxEmailPerDay) {
//         distribution[account._id].emails.push(emails[emailIndex]);
//         emailIndex++;
//         assigned = true;
//         if (emailIndex >= emails.length) break;
//       }
//     }
//     if (!assigned) break;
//   }

//   const distributionArray = Object.values(distribution);

//   // Email automation with concurrent browser handling
//   const processEmails = async (accountData) => {
//     const { account, emails } = accountData;
//     const { Email: googleUsername, Password: googlePassword, Proxy } = account;

//     // Initialize GoLogin browser session
//     // const goLogin = new GoLogin({
//     //   profile_id: account.GoLoginProfileId, // Ensure each account has a unique GoLogin profile ID
//     //   proxy: Proxy,
//     // });

//     // const browser = await goLogin.start(); // Start the browser
//     try {
//       for (const email of emails) {
//         const recipientEmail = email.Email;
//         console.log(recipientEmail);

//         // Call your email automation function
//         await emailAutomation({
//           googleUsername,
//           googlePassword,
//           recipientEmail,
//           emailSubject: campaign.Subject,
//           emailBody: campaign.Body,
//           Proxy,
//           // browser,
//         });

//         // Update email and account stats in the database
//         // await Emails.updateOne({ _id: email._id }, { isEmailSended: true });
//         // await Accounts.updateOne({ _id: account._id }, { $inc: { Limit: 1 } });
//       }
//     } finally {
//       // await goLogin.stop(); // Ensure the browser session is closed
//     }
//   };

//   const runCampaign = async () => {
//     while (distributionArray.length > 0) {
//       // Process up to NumberOfBrowsers accounts concurrently
//       const batch = distributionArray.splice(0, NumberOfBrowsers);
//       await Promise.all(batch.map(processEmails));
//     }

//     res.send("Campaign completed.");
//   };

//   runCampaign().catch((err) => {
//     console.error("Error during campaign:", err);
//     res.status(500).send("An error occurred during the campaign.");
//   });
// };

// ____ chat gpt
// import { Campaigns } from "../models/campaign.model.js";
// import { Accounts } from "../models/accounts.model.js";
// import { Emails } from "../models/emails.model.js";
// import { CampaignTracking } from "../models/campaignTracking.model.js";
// import { Settings } from "../models/settings.model.js";
// import { emailAutomation } from "../utils/emailAutomation.util.js";
// test 1
// export const startCampaign = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const campaign = await Campaigns.findById(id)
//       .populate("CampaignEmailIds")
//       .populate("CampaignAccounts");

//     if (!campaign) {
//       return res.status(404).json({ message: "Campaign not found" });
//     }

//     if (campaign.State === "Start") {
//       return res.status(400).json({ message: "Campaign is already running" });
//     }

//     // Update campaign state to Start
//     campaign.State = "Start";
//     await campaign.save();

//     // Fetch settings for number of browsers
//     // const settings = await Settings.findOne({ UserId: req.user._id });
//     const settings = 10;
//     const numberOfBrowsers = settings?.NumberOfBrowsers || 1;

//     // Keep track of emails already assigned to accounts
//     const assignedEmails = new Set();

//     // Split accounts into batches based on the number of browsers
//     const accountBatches = [];
//     for (
//       let i = 0;
//       i < campaign.CampaignAccounts.length;
//       i += numberOfBrowsers
//     ) {
//       accountBatches.push(
//         campaign.CampaignAccounts.slice(i, i + numberOfBrowsers)
//       );
//     }

//     // Process each batch sequentially
//     for (const batch of accountBatches) {
//       await Promise.all(
//         batch.map(async (account) => {
//           let emailsSentToday = await CampaignTracking.countDocuments({
//             AccountId: account._id,
//             createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
//           });

//           const accountEmails = campaign.CampaignEmailIds.filter(
//             (email) => !assignedEmails.has(email._id.toString())
//           );

//           console.log("accountEmailssssssssssssss: ", accountEmails);

//           for (const email of accountEmails) {
//             if (emailsSentToday >= account.MaxEmailPerDay) {
//               console.log(
//                 `Account ${account.Email} has reached its daily limit.`
//               );
//               break;
//             }

//             if (!email.isEmailSended) {
//               await emailAutomation({
//                 googleUsername: account.Email,
//                 googlePassword: account.Password,
//                 recipientEmail: email.Email,
//                 emailSubject: campaign.Subject,
//                 emailBody: campaign.Body,
//                 campaign,
//               });

//               // Delay before sending the next email as per DelayInMinutes
//               await new Promise((resolve) =>
//                 setTimeout(resolve, account.DelayInMinutes * 60 * 1000)
//               );

//               // Update email status
//               email.isEmailSended = true;
//               await email.save();

//               // Track the sent email
//               await CampaignTracking.create({
//                 CampaignId: campaign._id,
//                 AccountId: account._id,
//                 EmailId: email._id,
//               });

//               emailsSentToday++;
//               assignedEmails.add(email._id.toString());
//             }
//           }
//         })
//       );
//     }

//     res.status(200).json({ message: "Campaign started successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while starting the campaign" });
//   }
// };

// export const pauseCampaign = async (req, res) => {
//   try {
//     const { campaignId } = req.params;

//     const campaign = await Campaigns.findById(campaignId);

//     if (!campaign) {
//       return res.status(404).json({ message: "Campaign not found" });
//     }

//     if (campaign.State !== "Start") {
//       return res.status(400).json({ message: "Campaign is not running" });
//     }

//     // Update campaign state to Pause
//     campaign.State = "Pause";
//     await campaign.save();

//     res.status(200).json({ message: "Campaign paused successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while pausing the campaign" });
//   }
// };

// export const stopCampaign = async (req, res) => {
//   try {
//     const { campaignId } = req.params;

//     const campaign = await Campaigns.findById(campaignId);

//     if (!campaign) {
//       return res.status(404).json({ message: "Campaign not found" });
//     }

//     if (campaign.State === "Stop") {
//       return res.status(400).json({ message: "Campaign is already stopped" });
//     }

//     // Update campaign state to Stop
//     campaign.State = "Stop";
//     await campaign.save();

//     res.status(200).json({ message: "Campaign stopped successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while stopping the campaign" });
//   }
// };

// test 2
// import { Campaigns } from "../models/campaign.model.js";
// import { Accounts } from "../models/accounts.model.js";
// import { Emails } from "../models/emails.model.js";
// import { CampaignTracking } from "../models/campaignTracking.model.js";
// import { Settings } from "../models/settings.model.js";
// import { emailAutomation } from "../utils/emailAutomation.util.js";

// export const startCampaign = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const campaign = await Campaigns.findById(id)
//       .populate("CampaignEmailIds")
//       .populate("CampaignAccounts");

//     if (!campaign) {
//       return res.status(404).json({ message: "Campaign not found" });
//     }

//     if (campaign.State === "Start") {
//       return res.status(400).json({ message: "Campaign is already running" });
//     }

//     // Update campaign state to Start
//     campaign.State = "Start";
//     await campaign.save();

//     // Fetch settings for number of browsers
//     // const settings = await Settings.findOne({ UserId: req.user._id });
//     const settings = 10;
//     const numberOfBrowsers = settings?.NumberOfBrowsers || 10;

//     // Find emails corresponding to the EmailList IDs in CampaignEmailIds
//     const emailsToProcess = await Emails.find({
//       EmailListId: { $in: campaign.CampaignEmailIds },
//       isEmailSended: false,
//     });

//     // Distribute emails equally among accounts
//     const accounts = campaign.CampaignAccounts.slice(0, numberOfBrowsers);
//     const emailBatches = Array.from({ length: accounts.length }, () => []);
//     emailsToProcess.forEach((email, index) => {
//       emailBatches[index % accounts.length].push(email);
//     });

//     // Process accounts concurrently based on the number of browsers
//     await Promise.all(
//       accounts.map(async (account, accountIndex) => {
//         let emailsSentToday = await CampaignTracking.countDocuments({
//           AccountId: account._id,
//           createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
//         });

//         const accountEmails = emailBatches[accountIndex];

//         for (const email of accountEmails) {
//           if (emailsSentToday >= account.MaxEmailPerDay) {
//             console.log(
//               `Account ${account.Email} has reached its daily limit.`
//             );
//             break;
//           }

//           await emailAutomation({
//             googleUsername: account.Email,
//             googlePassword: account.Password,
//             recipientEmail: email.Email,
//             emailSubject: campaign.Subject,
//             emailBody: campaign.Body,
//             campaign,
//           });

//           // Delay before sending the next email as per DelayInMinutes
//           await new Promise((resolve) =>
//             setTimeout(resolve, account.DelayInMinutes * 60 * 1000)
//           );

//           // Update email status
//           email.isEmailSended = true;
//           await email.save();

//           // Track the sent email
//           await CampaignTracking.create({
//             CampaignId: campaign._id,
//             AccountId: account._id,
//             EmailId: email._id,
//           });

//           emailsSentToday++;
//         }
//       })
//     );

//     res.status(200).json({ message: "Campaign started successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while starting the campaign" });
//   }
// };

// export const pauseCampaign = async (req, res) => {
//   try {
//     const { campaignId } = req.params;

//     const campaign = await Campaigns.findById(campaignId);

//     if (!campaign) {
//       return res.status(404).json({ message: "Campaign not found" });
//     }

//     if (campaign.State !== "Start") {
//       return res.status(400).json({ message: "Campaign is not running" });
//     }

//     // Update campaign state to Pause
//     campaign.State = "Pause";
//     await campaign.save();

//     res.status(200).json({ message: "Campaign paused successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while pausing the campaign" });
//   }
// };

// export const stopCampaign = async (req, res) => {
//   try {
//     const { campaignId } = req.params;

//     const campaign = await Campaigns.findById(campaignId);

//     if (!campaign) {
//       return res.status(404).json({ message: "Campaign not found" });
//     }

//     if (campaign.State === "Stop") {
//       return res.status(400).json({ message: "Campaign is already stopped" });
//     }

//     // Update campaign state to Stop
//     campaign.State = "Stop";
//     await campaign.save();

//     res.status(200).json({ message: "Campaign stopped successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while stopping the campaign" });
//   }
// };

/// ==========================test
export const startCampaign = async (req, res) => {
  try {
    debugger
    const { id } = req.params;

    const campaign = await Campaigns.findById(id)
      .populate("CampaignEmailIds")
      .populate("CampaignAccounts");

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (campaign.State === "Start") {
      return res.status(400).json({ message: "Campaign is already running" });
    }

    // Update campaign state to Start
    // campaign.State = "Start";
    // await campaign.save();

    // Fetch settings for number of browsers
    // const settings = await Settings.findOne({ UserId: req.user._id });
    const settings = 10;
    const numberOfBrowsers = settings?.NumberOfBrowsers || 10;

    // Find emails corresponding to the EmailList IDs in CampaignEmailIds
    const emailsToProcess = await Emails.find({
      EmailListId: { $in: campaign.CampaignEmailIds },
      isEmailSended: false,
    });

    // Distribute emails equally among accounts
    const accounts = campaign.CampaignAccounts.slice(0, numberOfBrowsers);
    const emailBatches = Array.from({ length: accounts.length }, () => []);
    emailsToProcess.forEach((email, index) => {
      emailBatches[index % accounts.length].push(email);
    });

    // Process accounts concurrently based on the number of browsers
    await Promise.all(
      accounts.map(async (account, accountIndex) => {
        const accountEmails = emailBatches[accountIndex];
        if (accountEmails.length === 0) return;

        let emailsSentToday = await CampaignTracking.countDocuments({
          AccountId: account._id,
          createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        });

        if (emailsSentToday >= account.MaxEmailPerDay) {
          console.log(`Account ${account.Email} has reached its daily limit.`);
          return;
        }

        // Start email automation session for the account
        const automationSession = await emailAutomation.startSession({
          googleUsername: account.Email,
          googlePassword: account.Password,
        });

        for (const email of accountEmails) {
          if (emailsSentToday >= account.MaxEmailPerDay) {
            console.log(
              `Account ${account.Email} has reached its daily limit.`
            );
            break;
          }

          await emailAutomation.sendEmail({
            session: automationSession,
            recipientEmail: email.Email,
            emailSubject: campaign.Subject,
            emailBody: campaign.Body,
          });

          // Delay before sending the next email as per DelayInMinutes
          await new Promise((resolve) =>
            setTimeout(resolve, account.DelayInMinutes * 60 * 1000)
          );

          // Update email status
          email.isEmailSended = true;
          await email.save();

          // Track the sent email
          await CampaignTracking.create({
            CampaignId: campaign._id,
            AccountId: account._id,
            EmailId: email._id,
          });

          emailsSentToday++;
        }

        // Close the automation session after processing all emails
        await emailAutomation.closeSession(automationSession);
      })
    );

    res.status(200).json({ message: "Campaign started successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while starting the campaign" });
  }
};
