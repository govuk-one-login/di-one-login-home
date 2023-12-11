//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

const generatePagination = (dataLength, page) => {
  const pagination = {
      currentPage: 1,
  };
  const totalPages = Math.ceil(dataLength / 10);
  const pageParam = page && Number(page);
  let currentPage = 1;
  // currentPage will default to 1 unless
  // - the number of events exceeds the maximum number allowed per page
  // - a valid "page" query string parameter is detected
  if (dataLength > 10) {
      const lastPage = Math.ceil(dataLength / 10);
      if (pageParam &&
          Number.isInteger(pageParam) &&
          pageParam <= lastPage &&
          pageParam >= 1) {
          currentPage = pageParam;
      }
  }
  // don't display pagination unless there are at least 2 pages worth of activity
  if (totalPages == 1)
      return pagination;
  pagination.lastPage = totalPages;
  pagination.currentPage = currentPage;
  pagination.items = Array.from({ length: pagination.lastPage }, (value, index) => index + 1);
  switch (pagination.currentPage) {
      // a min of 2, max of 3 numbered links are always visible in the pagination component
      case 1:
          // if the current page is 1, display the "active" page link first
          //  e.g 1️⃣ 2 3 Next page ➡️
          pagination.firstThree = [
              pagination.currentPage,
              pagination.currentPage + 1,
              pagination.currentPage + 2,
          ];
          pagination.items = pagination.items.filter((value) => pagination.firstThree.includes(value));
          // don't display a "previous" link as there would be no previous page
          pagination.nextPage = pagination.currentPage + 1;
          break;
      case pagination.lastPage:
          // if the current page is the last page, display the "active" page link last
          // e.g ⬅️ Previous page 1️ 2️ 3️⃣
          pagination.lastThree = [
              pagination.currentPage - 2,
              pagination.currentPage - 1,
              pagination.currentPage,
          ];
          pagination.items = pagination.items.filter((value) => pagination.lastThree.includes(value));
          // there wouldn't be a "next" page link as this is the last page
          pagination.previousPage = pagination.currentPage - 1;
          break;
      default:
          // e.g. ⬅️ Previous page 1️ 2️⃣ 3 Next page ➡️
          pagination.items = [
              pagination.currentPage - 1,
              pagination.currentPage,
              pagination.currentPage + 1,
          ];
          pagination.previousPage = pagination.currentPage - 1;
          pagination.nextPage = pagination.currentPage + 1;
          break;
  }
  return pagination;
};

const formatData = (data, currentPage) => {
  const curr = currentPage || 1;
  const formattedData = [];
  const indexStart = (curr - 1) * 10;
  const indexEnd = indexStart + 10;
  // only format and return activity data for the current page
  for (let i = indexStart; i < indexEnd; i++) {
      const newRow = {};
      const row = data[i];
      if (!row)
          break;
      newRow.name = row.name
      newRow.href = row.href
      formattedData.push(newRow);
  }
  return formattedData;
};

const data = [
  { name: "Apply for an advance tariff ruling", href: "#" },
  { name: "Register for Aggregates Levy", href: "#" },
  { name: "Register as an alcohol wholesaler or producer: Alcohol Wholesaler Registration Scheme (AWRS)", href: "#" },
  { name: "View your annual tax summary", href: "#" },
  { name: "Register or update your money laundering supervision with HMRC", href: "#" },
  { name: "Register as a bingo promotor", href: "#" },
  { name: "Send your Bingo Duty return online", href: "#" },
  { name: "Breathing Space: Debt Respite scheme", href: "#" },
  { name: "Sign in to your HMRC business tax account", href: "#" },
  { name: "Calculate your public service pension adjustment", href: "#" },
  { name: "Report and pay your Capital Gains Tax", href: "#" },
  { name: "Change your VAT registration details", href: "#" },
  { name: "Register for VAT", href: "#" },
  { name: "Register your charity", href: "#" },
  { name: "Check your State Pension forecast ", href: "#" },
  { name: "Claim Child Benefit", href: "#" },
  { name: "Child Benefit when your child turns 16", href: "#" },
  { name: "Report changes to family circumstances affecting Child Benefit", href: "#" },
  { name: "Report changes to your child's circumstances that may affect Child Benefit", href: "#" },
  { name: "Find a Child Trust Fund", href: "#" },
  { name: "Sign in to your childcare account", href: "#" },
  { name: "Apply for 30 hours free childcare", href: "#" },
  { name: "Apply for Tax-Free Childcare", href: "#" },
  { name: "Get a refund on tax overpayments", href: "#" },
  { name: "Pay Class 2 National Insurance", href: "#" },
  { name: "Check or update your company car tax", href: "#" },
  { name: "Subscribe to the Customs Declaration Service", href: "#" },
  { name: "Pay for imports declared using the Custom Declaration Service", href: "#" },
  { name: "Tell HMRC about underpaid tax from previous years", href: "#" },
  { name: "Get an EORI number", href: "#" },
  { name: "Using PAYE online", href: "#" },
  { name: "Apply for the Fulfilment House Due Diligence Scheme", href: "#" },
  { name: "Register for Gaming Duty", href: "#" },
  { name: "Pay Gaming or Bingo Duty", href: "#" },
  { name: "Register to pay for road fuel gas duty", href: "#" },
  { name: "Report the excise duty due on gas for use as fuel in a road vehicle", href: "#" },
  { name: "Register for the Goods Vehicle Movement Service", href: "#" },
  { name: "Sign in to your Help to Save account", href: "#" },
  { name: "Register for Insurance Premium Tax", href: "#" },
  { name: "Register as a lottery promoter", href: "#" },
  { name: "Send your Lottery Duty return", href: "#" },
  { name: "Apply for an exemption from Making Tax Digital for VAT", href: "#" },
  { name: "Sign up as an individual for Making Tax Digital for Income Tax ", href: "#" },
  { name: "Apply for Marriage Allowance online", href: "#" },
  { name: "Log in and file your Stamp Duty Land Tax return", href: "#" },
  { name: "Check if you have to pay tax on your pension savings", href: "#" },
  { name: "Check your State Pension forecast ", href: "#" },
  { name: "Personal tax account", href: "https://www.gov.uk/personal-tax-account" },
  { name: "Protect your pension lifetime allowance", href: "#" },
  { name: "Apply for EU VAT refunds if you trade from Northern Ireland", href: "#" },
  { name: "Register to report a cross-border arrangement (MDR)", href: "#" },
  { name: "Return to your claim for the Self Employment Income Support Scheme", href: "#" },
  { name: "Tell HMRC and pay back a Self Employment Income Support Scheme grant", href: "#" },
  { name: "File your Self Assessment tax return online", href: "https://www.gov.uk/log-in-file-self-assessment-tax-return" },
  { name: "Check how to register for Self Assessment", href: "https://www.gov.uk/register-for-self-assessment" },
  { name: "Pay your Self Assessment tax bill", href: "https://www.gov.uk/pay-self-assessment-tax-bill" },
  { name: "Register for the Soft Drinks Industry Levy", href: "#" },
  { name: "VAT online account", href: "#" },
  { name: "Business tax account", href: "#" },
  { name: "Manage your tax credits", href: "#" },
  { name: "Report changes that affect your tax credits", href: "#" },
  { name: "Apply for a National Insurance number", href: "#" },
  { name: "Find a lost National Insurance number", href: "#" },
  { name: "Get your National Insurance number", href: "#" },
  { name: "Check your National Insurance record", href: "#" },
  { name: "Pay voluntary Class 3 National Insurance", href: "#" },
  { name: "Apply for Marriage Allowance online", href: "#" },
  { name: "Claim a VAT refund as an organisation not registered for VAT", href: "#" },
  { name: "Submit your One Stop Shop VAT Return", href: "#" },
  { name: "Check and challenge your business rates valuation", href: "#" },
]

router.get('/identity/one-login-home/v10/services-search-task-1', function(req, res) {
  const servicesPerPage = 10;

  let finalData = data;
  const searchQuery = req.query.search;
  const currentPage = req.query.page;
  const dataLength = finalData.length;

  if (dataLength > servicesPerPage) {
    pagination = generatePagination(dataLength, currentPage);
    finalData = formatData(data, pagination.currentPage);
  } 

  res.render("/identity/one-login-home/v10/services-search-task-1.html", {
    test: "testing",
    page: req.query.page,
    data: finalData,
    pagination: pagination
  });
})

router.post('/identity/one-login-home/v10/services-search-task-1', function(req, res){
  const searchQuery = req.body.search;
  const finalData = data.filter((item) => {
    return item.name.toUpperCase().match(searchQuery.toUpperCase());
  });

  res.render("/identity/one-login-home/v10/services-search-task-1.html", {
    searchQuery: searchQuery,
    data: finalData
  });
});