import Test from "@playwright/test";

async function testmu(page, product) {
  await page.goto("https://www.amazon.in");

  await page.fill("#twotabsearchtextbox", product);

  await page.press("#twotabsearchtextbox", "Enter");


  

  await page.waitForSelector('[data-component-type="s-search-result"]');


const products = page.locator('[data-component-type="s-search-result"]');


let first;

const count = await products.count();

for (let i = 0; i < count; i++) {

  const item = products.nth(i);

  const hasPrice = await item.locator('.a-price .a-offscreen').count();

  if (hasPrice > 0) {
    first = item;
    break;
  }
}
  
const price = await first.locator(".a-price .a-offscreen").first().textContent();

  console.log(`${product} Price:`, price);

  await first.click();

  await page.waitForLoadState("domcontentloaded");

  try {
    await page.click("#add-to-cart-button", { timeout: 5000 });
    console.log("Added to cart");
  } catch {
    console.log("Add to cart skipped");
  }
}

Test("Search iPhone and add to cart", async ({ page }) => {
  await testmu(page, "iPhone");
});

Test("Search Galaxy and add to cart", async ({ page }) => {
  await testmu(page, "Samsung Galaxy");
});
