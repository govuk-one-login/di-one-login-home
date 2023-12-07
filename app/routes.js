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
      //     ? "signedIn"
      //     : null;
      // if (!newRow.eventType)
      //     continue;
      // newRow.sessionId = row.session_id;
      // newRow.time = (0, prettifyDate_1.prettifyDate)(Number(row["timestamp"]), {
      //     month: "long",
      //     day: "numeric",
      //     year: "numeric",
      //     hour: "numeric",
      //     minute: "numeric",
      //     hourCycle: "h12",
      //     timeZone: "GB",
      // });
      // newRow.visitedServices =
      //     row.activities?.length &&
      //         row.activities.filter((activity) => types_1.allowedTxmaEvents.includes(activity.type));
      // newRow.visitedServicesIds = newRow.visitedServices?.map((obj) => obj["client_id"]);
      // newRow.visitedServicesEventIds = newRow.visitedServices?.map((obj) => obj["event_id"]);
      formattedData.push(newRow);
  }
  return formattedData;
};

router.get('/identity/one-login-home/v10/services-search', function(req, res) {
  const servicesPerPage = 10;
  const data = [
    { name:"Advance Tariff Registration", href: "#"},
    { name:"Aggregates Levy", href: "#"},
    { name:"Alcohol Wholesaler Registration Scheme (AWRS)", href: "#"},
    { name:"Annual Tax Summary (ATS)", href: "#"},
    { name:"Anti-Money Laundering Supervision (AMLS)", href: "#"},
    { name:"Bingo Duty", href: "#"},
    { name:"Breathing Space", href: "#"},
    { name:"Business Tax Account (BTA)", href: "#"},
    { name:"Calculating Public Pension Adjustment (McCloud)", href: "#"},
    { name:"Capital Gains Tax Property Disposal", href: "#"},
    { name:"Change VAT registration details", href: "#"},
    { name:"Charities Registration Service", href: "#"},
    { name:"Check Your State Pension (CYSP/NISP)", href: "#"},
    { name:"Child Benefit", href: "#"},
    { name:"Child Trust Fund", href: "#"},
    { name:"Childcare Services (CSS)", href: "#"},
    { name:"Claim a Tax Refund (CTR)", href: "#"},
    { name:"Class 2 National Insurance (C2NI)", href: "#"},
    { name:"Company Car", href: "#"},
    { name:"Customs Declaration Service", href: "#"},
    { name:"Digital Disclosure Service (DDS)", href: "#"},
    { name:"Economic Operators Registraion and Identification (EORI)", href: "#"},
    { name:"Employee Expenses (EE)", href: "#"},
    { name:"FHDDS (Fulfilment Houses Due Dilligence Service) ", href: "#"},
    { name:"Gaming Duty", href: "#"},
    { name:"Gas for use as Road Fuel", href: "#"},
    { name:"Goods Vehicle Movement System", href: "#"},
    { name:"Help to Save (HtS) NS&I", href: "#"},
    { name:"Insurance Premium Tax", href: "#"},
    { name:"Lottery Duty", href: "#"},
    { name:"Making Tax Digital - VAT", href: "#"},
    { name:"Making Tax Digital Income Tax", href: "#"},
    { name:"Marriage Allowance (MA)", href: "#"},
    { name:"Modernising Stamp Duty (Org) - File Stamp Duty Land Tax returns ", href: "#"},
    { name:"Notification of Vehicle Arrivals", href: "#"},
    { name:"Pension Annual Allowance Calculator (PAAC)", href: "#"},
    { name:"Pension Online Digital Service", href: "#"},
    { name:"Personal Tax Account", href: "#"},
    { name:"Protect your Pensions Lifetime Allowance", href: "#"},
    { name:"Refund of VAT", href: "#"},
    { name:"Report a DAC6 cross border arrangement", href: "#"},
    { name:"Self Employment Income Support Scheme (SEISS)", href: "#"},
    { name:"Self-Assessment (SA)", href: "#"},
    { name:"Soft Drinks Industry Levy", href: "#"},
    { name:"Submit VAT Returns", href: "#"},
    { name:"Tax Account for Individuals (TAI)", href: "#"},
    { name:"Tax Conditionality Standard Offering (HEC)", href: "#"},
    { name:"Tax Credits Services (TCS)", href: "#"},
    { name:"Tax Enrolment National Insurance Number (TEN)", href: "#"},
    { name:"Tell us about your imports from Ireland", href: "#"},
    { name:"Trade Credit", href: "#"},
    { name:"Trader Services customs trader service ", href: "#"},
    { name:"Transferable Allowance for Married Couples (TAMC)", href: "#"},
    { name:"VAT 126 reclaim", href: "#"},
    { name:"EC Sales List (ECSL)", href: "#"},
    { name:"VAT EU Refunds", href: "#"},
    { name:"VAT One Stop Shop Union Scheme", href: "#"},
    { name:"VAT Reverse Charge Sales List (RCSL)", href: "#"},
    { name:"VAT VAR", href: "#"},
    { name:"VOA Check and Challenge & Appeal Your Business Rates Valuation", href: "#"},
    { name:"MTD VAT", href: "#"}
  ]
  let finalData = data;
  const searchQuery = req.query.search;
  const currentPage = req.query.page;
  const dataLength = finalData.length;

  if (dataLength > servicesPerPage) {
    pagination = generatePagination(dataLength, currentPage);
    finalData = formatData(data, pagination.currentPage);
  } 

  res.render("/identity/one-login-home/v10/services-search.html", {
    test: "testing",
    page: req.query.page,
    data: finalData,
    pagination: pagination
  });
})