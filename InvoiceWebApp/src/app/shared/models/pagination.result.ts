export interface PaginationResult<T> {
    current_page: number;
    total_pages: number;
    data: T[];
}
