// "export" hace esta clase disponible para que otros archivos
//  la importen.
import { Page } from '@playwright/test';
// Una clase agrupa datos + funciones relacionadas. Esta agrupa todo lo que sabemos hacer en la pantalla de login.
export class LoginPage {
page: Page; // aquí guardamos la página que vamos a usar en los métodos de abajo - atributo de la clase
// El constructor se ejecuta UNA vez, cuando escribes `new LoginPage(page)`.
constructor(page: Page) {
this.page = page; // "this" = esta instancia en particular de LoginPage
}
// Cada función dentro de la clase es un "método".
async goto() {
await this.page.goto('https://www.saucedemo.com');
}
// username: "string y password: "string" - son "tipos": le dicen a TypeScript qué dato se espera en cada parámetro, y te avisa si te equivocas.
async login(username: string, password: string) {
await this.page.getByPlaceholder('Username').fill(username);
await this.page.getByPlaceholder('Password').fill(password);
await this.page.getByRole('button', { name: 'Login' }).click();
}
}