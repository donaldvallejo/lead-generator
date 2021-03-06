var key = require("../keys/keys.js");
var clearbit = require("clearbit")(key.apiKey);

//Clearbit Search Function
var clearbitSearch = (emailsToSearch, callback) => {
  clearbit.Enrichment.find({ email: emailsToSearch, stream: true })
    .then(response => {
      const data = {
        target: {},
        company: {}
      };
      let target = response.person;
      let company = response.company;

      let person = data.target;
      let workingFor = data.company;

      //Target's information
      person.name = target.name.fullName;
      person.email = target.email;
      person.employmentCompany = target.employment.name;
      person.employmentTitle = target.employment.title;
      person.linkedInURL = "https:www.linkedin.com/" + target.linkedin.handle;

      person.twitterHandle = "@" + target.twitter.handle;
      person.location = target.location;
      person.biography = target.bio;

      //Company Information
      workingFor.companyName = company.name;
      workingFor.companyFounded = company.foundedYear;
      workingFor.companyURL = "http://www." + company.domain;
      workingFor.companyBio = company.site.metaDescription;
      workingFor.companyEmails = company.site.emailAddresses;
      workingFor.companyPhone = company.phone;
      workingFor.companyCrunchbase =
        "https://www.crunchbase.com/" + company.crunchbase.handle;
      workingFor.amountRaised = company.metrics.raised;
      workingFor.revenue = company.metrics.estimatedAnnualRevenue;
      workingFor.logo = company.logo;

      callback(data);
    })
    .catch(err => {
      if (err.name === "TypeError") {
        console.log("Error for " + email);
      }
      throw err;
    });
};

module.exports = clearbitSearch;
