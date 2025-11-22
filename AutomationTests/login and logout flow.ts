import {test, expect} from '@playwright/test';

test.describe("Login / Logout Flow", () => {
    
    test.beforeEach (async ({page}) => {
        await page.goto ('http://www.saucedemo.com')

    })
    //negative scenario
test ("negative scenario for login", async ({page}) => {
    await page.click ('#login-button')
    await page.fill ('#user-name', 'invalid username')
    await page.fill ('#password', 'invalid password')
    await page.click ('text=Login')

    const errorMessage = await page.locator ('.error-message-container')
    await expect (errorMessage).toContainText ('Epic sadface: Username and password do not match any user in this service');
    //positive scenario
})
test.only ("positive scenario for login + logout", async ({page}) => {
    await page.click ('#login-button')
    await page.fill ('#user-name', 'standard_user')
    await page.fill ('#password', 'secret_sauce')
    await page.click ('text=Login')


    const addToCart= await page.locator ('#add-to-cart-sauce-labs-backpack')
    await expect(addToCart).toBeVisible()
await page.click ('#add-to-cart-sauce-labs-backpack')
    const removeFromCart=await page.locator('#remove-sauce-labs-backpack')
    await expect(removeFromCart).toBeVisible()

    await page.click ('#react-burger-menu-btn')
    await page.click ('#logout_sidebar_link')
await page.pause();
       
})

}) 
