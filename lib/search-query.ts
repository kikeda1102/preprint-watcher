

/** 検索クエリを規定するクラス */
export class SearchQuery {
    keywords: string[];
    sortBy: string;
    sortOrder: string;
    maxResults: number;

    constructor({ keywords, sortBy, sortOrder, maxResults }: { keywords: string[]; sortBy: string; sortOrder: string, maxResults: number }) {
        this.keywords = keywords;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.maxResults = maxResults;
    }

    /** クエリ変数からクエリURLを作成 */
    getQueryUrl(): string {
        const baseUrl = 'http://export.arxiv.org/api/query';
        const searchQuery = '?search_query=' + this.keywords.join('+OR+');
        const sortBy = `&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`;
        const maxResults = `&max_results=${this.maxResults}`;
        return baseUrl + searchQuery + sortBy + maxResults;
    }
}
