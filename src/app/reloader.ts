export class Reloader {
  private readonly waitMessage = 'Sorry - something went wrong, trying again... please wait';
  private readonly failMessage = 'Sorry - something went wrong, please contact support';
  private attemptsCount = 0;

  constructor(private messageSetter: (msg: string) => void,
              private loadAction: () => void,
              private attemptsLimit: number = 5) {
  }

  public tryToReloadOrLog(error?: any): void {
    this.attemptsCount++;
    if (this.attemptsCount <= this.attemptsLimit) {
      this.messageSetter(this.waitMessage);
      this.loadAction();
    } else {
      this.messageSetter(this.failMessage);
      if (error) {
        console.log('Error:', error);
      }
    }
  }
}
