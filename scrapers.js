const puppeteer = require("puppeteer");

const scrapeProperty = async (page, xcode, propertyName = "textContent") => {
  const [el] = await page.$x(xcode);
  const prop = await el.getProperty(propertyName);
  const rawProp = await prop.jsonValue();

  return rawProp;
};

const scrapeJob = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  for (let index = 4; index < 20; index++) {
    const rawProp = await scrapeProperty(
      page,
      `/html/body/div[4]/div/div/div/div[11]/main/div/div[1]/div[2]/article/div[4]/div[1]/div[1]/div[${index}]/div[1]/div/div[2]/p[1]/a
		`,
      "href"
    );
    console.log(rawProp);
  }

  //   const Salary = await scrapeProperty(
  //     page,
  //     "/html/body/div[4]/div/div/div/div/div/div/div/div[1]/article[2]/div[9]/main/div/div/div[1]/div[4]/div/div[1]/div/div[2]"
  //   );

  //   const additionalPay = await scrapeProperty(
  //     page,
  //     "/html/body/div[4]/div/div/div/div/div/div/div/div[1]/article[2]/div[9]/main/div/div/div[1]/div[4]/div/div[3]/div/div[2]"
  //   );

  //   const range = await scrapeProperty(
  //     page,
  //     "/html/body/div[4]/div/div/div/div/div/div/div/div[1]/article[2]/div[9]/main/div/div/div[1]/div[4]/div/div[1]/div/div[3]/div[2]"
  //   );
  //   const range2 = range.split("₹").join("-").slice(1);

  //   console.log({ rawSalary, rawBasePay });
  //   console.log({ Salary, additionalPay, range2 });
  browser.close();
};

scrapeJob(
  "https://www.glassdoor.co.in/Salaries/india-web-developer-salary-SRCH_IL.0,5_IN115_KO6,19.htm"
);

//

// /html/body/div[4]/div/div/div/div[11]/main/div/div[1]/div[2]/article/div[4]/div[1]/div[1]/div[i]/div[1]/div/div[2]/p[1]/a
// /html/body/div[4]/div/div/div/div[11]/main/div/div[1]/div[2]/article/div[4]/div[1]/div[1]/div[5]/div[1]/div/div[2]/p[1]/a
// /html/body/div[4]/div/div/div/div[11]/main/div/div[1]/div[2]/article/div[4]/div[1]/div[1]/div[6]/div[1]/div/div[2]/p[1]/a
