export class Article {
  id: string;
  title: string;
  link: string;
  votes: number;

  constructor(title: string, link: string, id?: string, votes?: number) {
    this.id = id || "";
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  }

  voteUp(): void {
    this.votes++;
  }

  voteDown(): void {
    this.votes--;
  }

  // domain() is a utility function that extracts
  // the domain from a URL, which we'll explain shortly
  domain(): string {
    try {
      const domainAndPath: string = this.link.split('//')[1];
      return domainAndPath.split('/')[0];
    } catch (err) {
      return null;
    }
  }
}
