using System.Collections.Generic;

namespace InvoiceWebApp.Components.Entities
{
    public class PaginationResult<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public List<T> Data { get; set; }

        public PaginationResult()
        {

        }

        public PaginationResult(int page, int totalPages, List<T> data)
        {
            this.CurrentPage = page;
            this.TotalPages = totalPages;
            this.Data = data;
        }
    }
}