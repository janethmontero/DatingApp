export interface Pagination {
    currentPage:number;
    itemsPerPage: number;
    totalItems: number;
    totalPager: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
