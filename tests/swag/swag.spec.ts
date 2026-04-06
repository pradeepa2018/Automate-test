import { test, expect } from '@playwright/test';


test.describe("Inventory Feature", async () => {
    test.beforeEach("Sort products by price (low to high)", async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

       await expect(page).toHaveURL(/inventory.html/);
        await page.selectOption(".product_sort_container", "Price (high to low)")
        let prices = await page.locator("div.inventory_item_price").allInnerTexts()
        for (let i = 0; i < prices.length - 1; i++) {
            prices[i] = prices[i].replace("$", "")
        }
        let sortedPrices = [...prices].sort((a, b) => parseFloat(b) - parseFloat(a))
        expect(prices).toEqual(sortedPrices)
    })
    test("Add a product to the cart", async ({ page }) => {
        let productList = ["Sauce Labs Backpack", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"];
    
        await page.goto("https://www.saucedemo.com/inventory.html")
        for (const product of productList) {
            await page.getByText(product).click()
            await page.getByRole("button", { name: "Add to cart" }).click()
            await page.getByRole("button", { name: "Go back Back to products" }).click()
        }
        await page.locator("[data-test='shopping-cart-badge']").click()
        let allProductNames = await page.locator("[data-test='inventory-item-name']").allInnerTexts()

        expect(allProductNames, "Count of products in cart is not correct").toHaveLength(productList.length)
        expect(allProductNames, "Products in cart are not correct").toEqual(productList)
    })
    test("Remove a product to the cart", async ({ page }) => {
        let AddProductList = ["Sauce Labs Backpack", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"];
        await page.goto("https://www.saucedemo.com/inventory.html")
        for (const product of AddProductList) {
            await page.getByText(product).click()
            await page.getByRole("button", { name: "Add to cart" }).click()
            await page.getByRole("button", { name: "Go back Back to products" }).click()
        }
        let removeProductList = ["Sauce Labs Backpack", "Sauce Labs Onesie"];
        let removeButton = ""
        for (const product of removeProductList) {
            removeButton = product.replaceAll(" ", "-")
            removeButton = removeButton.toLowerCase();
            console.log(removeButton);
            await page.locator(`[data-test="remove-${removeButton}"]`).click()
        }
        await page.locator("[data-test='shopping-cart-badge']").click()
        let allProductNames = await page.locator("[data-test='inventory-item-name']").allInnerTexts()
        expect(allProductNames, "Count of products in cart is not correct").toHaveLength(AddProductList.length - removeProductList.length)
        expect(allProductNames, "Products in cart are not correct").not.toEqual(removeProductList)
        expect(allProductNames, "Products in cart are not correct").not.toEqual(AddProductList)
    })
    test("Checkout the products", async ({ page }) => {
        let AddProductList = ["Sauce Labs Backpack", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"];
        await page.goto("https://www.saucedemo.com/inventory.html")
        for (const product of AddProductList) {
            await page.getByText(product).click()
            await page.getByRole("button", { name: "Add to cart" }).click()
            await page.getByRole("button", { name: "Go back Back to products" }).click()
        }
        await page.locator("[data-test='shopping-cart-badge']").click()
        await page.getByRole("button", { name: "Checkout" }).click()
        await page.getByRole("textbox", { name: "First Name" }).fill("Test")
        await page.getByRole("textbox", { name: "Last Name" }).fill("User")
        await page.getByRole("textbox", { name: "Zip/Postal Code" }).fill("12345")
        await page.getByRole("button", { name: "Continue" }).click()
        let allProductNames = await page.locator("[data-test='inventory-item-name']").allInnerTexts()
        expect(allProductNames, "Count of products in cart is not correct").toHaveLength(AddProductList.length)
        expect(allProductNames, "Products in cart are not correct").toEqual(AddProductList)
        await page.getByRole("button", { name: "Finish" }).click()
        await expect(page.getByText("Thank you for your order!")).toBeVisible()
        await page.getByRole("button", { name: "Back Home" }).click()
    })
    test("Logout", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
        let AddProductList = ["Sauce Labs Backpack", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"];
        await page.goto("https://www.saucedemo.com/inventory.html")
        for (const product of AddProductList) {
            await page.getByText(product).click()
            await page.getByRole("button", { name: "Add to cart" }).click()
            await page.getByRole("button", { name: "Go back Back to products" }).click()
        }
        await page.getByRole("button", { name: "Open Menu" }).click()
        await page.getByText("Logout").click()
        await expect(page.getByText("Swag Labs")).toBeVisible()
    })
})