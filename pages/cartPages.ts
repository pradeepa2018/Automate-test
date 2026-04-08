import { Locator, Page } from "@playwright/test";

export class Cart {
    readonly page: Page;
    readonly btnAddToCart : Locator;
    readonly btnGoBackToProducts : Locator;
    readonly btnRemove : Locator;
    readonly productsName : Locator;
    readonly CheckoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnAddToCart = page.getByRole("button", { name: "Add to cart" })
        this.btnGoBackToProducts = page.getByRole("button", { name: "Go back Back to products" })
        this.btnRemove = page.locator("[data-test='remove-sauce-labs-backpack']")
        this.productsName = page.locator("[data-test='inventory-item-name']")
        this.CheckoutBtn = page.getByRole('button', { name: 'Checkout' });
    }
    async AddToCart() {
        await this.btnAddToCart.click()
        return this
    }
    async GoBackToProducts() {
        await this.btnGoBackToProducts.click()
        return this
    }
    async Remove() {
        await this.btnRemove.click()
        return this
    }
    async getproducts() {
        return await this.productsName.allInnerTexts();


    }
    async clickCheckout() {
    await this.CheckoutBtn.click();
  }
}