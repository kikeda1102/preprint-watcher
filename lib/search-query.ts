

/** 検索クエリを規定するクラス */
export class SearchQuery {
    keywords: string[];
    sortBy: string;
    sortOrder: string;

    constructor({ keywords, sortBy, sortOrder }: { keywords: string[]; sortBy: string; sortOrder: string }) {
        this.keywords = keywords;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }

    /** クエリ変数からクエリURLを作成 */
    getQueryUrl(): string {
        const baseUrl = 'http://export.arxiv.org/api/query';
        const searchQuery = '?search_query=' + this.keywords.join('+OR+');
        const sortBy = `&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`;
        return baseUrl + searchQuery + sortBy;
    }
}
