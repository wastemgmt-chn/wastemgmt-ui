import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { AdminService } from "./admin.service";

export class AdminGuard extends KeycloakAuthGuard {
  constructor(private adminService: AdminService, protected readonly router: Router,protected readonly keycloak: KeycloakService){
    super(router, keycloak);
  }
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    return this.authenticated;
  }

}
