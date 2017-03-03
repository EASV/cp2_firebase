import { Courseplanner2Page } from './app.po';

describe('courseplanner2 App', function() {
  let page: Courseplanner2Page;

  beforeEach(() => {
    page = new Courseplanner2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
