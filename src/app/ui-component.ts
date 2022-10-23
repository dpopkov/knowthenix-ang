export class UiComponent {
  isAdminUser: boolean;
  isEditorUser: boolean;

  setRole(role: string): void {
    if ('ADMIN' === role) {
      this.isAdminUser = true;
      this.isEditorUser = true;
    } else if ('EDITOR' === role) {
      this.isEditorUser = true;
    }
  }
}
