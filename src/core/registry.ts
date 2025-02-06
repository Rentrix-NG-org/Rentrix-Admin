// import { LogsModule } from "@src/modules/logs";
import { PropertyManagementModule } from "@src/modules/property";
import { UserManagementModule } from "@src/modules/user";
import { RouteObject } from "react-router";

export interface Module {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}
export class ModuleRegistry {
  private static modules: Module[] = [];

  static register(module: Module) {
    if (module.enabled) {
      this.modules.push(module);
    }
  }
  static getModules(name?: string) {
    if (name) {
      const modules = this.modules.filter((module) => module.name === name);
      return modules;
    } else {
      return this.modules;
    }
  }

  static getRoutes(name?: string) {
    if (name) {
      const modules = this.getModules(name);
      return modules.flatMap((module) => module.routes);
    } else {
      return this.modules.flatMap((module) => module.routes);
    }
  }
}

ModuleRegistry.register(UserManagementModule);
ModuleRegistry.register(PropertyManagementModule);
// ModuleRegistry.register(LogsModule);
