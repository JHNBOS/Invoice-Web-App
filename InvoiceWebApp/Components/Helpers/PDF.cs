using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using InvoiceWebApp.Components.DataContext;
using InvoiceWebApp.Components.Entities;

using iTextSharp.text;
using iTextSharp.text.pdf;

using Microsoft.EntityFrameworkCore;

namespace InvoiceWebApp.Components.Helpers
{
    public class PDF
    {
        private Invoice invoice = null;
        private Debtor debtor = null;
        private List<InvoiceItem> invoiceItems = null;

        private InvoiceContext _context;
        private Settings settings;

        public PDF()
        {
            _context = new InvoiceContext();
            this.GetSettings();
        }

        private void GetSettings()
        {
            this.settings = this._context.Settings.FirstOrDefault();
        }

        private async Task GetData(string id)
        {
            try
            {
                invoice = await _context.Invoices.FirstOrDefaultAsync(s => s.InvoiceNumber == id);
                debtor = await _context.Debtors.Include(i => i.Addresses).FirstOrDefaultAsync(s => s.Id == invoice.CustomerId);
                invoiceItems = await _context.InvoiceItems.Where(s => s.InvoiceNumber == invoice.InvoiceNumber).ToListAsync();
                debtor.Addresses.First().Address = await _context.Addresses.FirstOrDefaultAsync(q => q.PostalCode == debtor.Addresses.First().PostalCode && q.Number == debtor.Addresses.First().Number);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
        }

        public async Task<byte[]> CreatePDF(string id)
        {
            await this.GetData(id);

            var invoiceNumber = invoice.InvoiceNumber.ToString();

            //Creating PDF document
            var doc = this.InitDocument();
            MemoryStream ms = new MemoryStream();
            PdfWriter writer = PdfWriter.GetInstance(doc, ms);

            doc.Open();
            PdfContentByte cb = writer.DirectContent;

            //--------------------- CONTENT -----------------------------// 595 x 842

            BaseFont helvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            BaseFont title = BaseFont.CreateFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

            // Company Name
            cb.BeginText();
            cb.SetFontAndSize(title, 26);

            cb.SetTextMatrix(30, 800);
            cb.ShowText(this.settings.CompanyName);

            cb.EndText();

            // Company Info Line 1
            cb.SetLineWidth(0.4f);
            cb.SetRgbColorStroke(0, 100, 240);
            cb.Rectangle(348, 810, 70, 0.4f);
            cb.Rectangle(435, 810, 120, 0.4f);
            cb.Stroke();

            // -------------- Company Info ---------------------
            // Address
            cb.BeginText();
            cb.SetFontAndSize(helvetica, 10f);

            cb.ShowTextAligned(Element.ALIGN_RIGHT, "Address:", 415, 795, 0);

            cb.SetTextMatrix(375, 780);
            cb.ShowText("");
            
            cb.SetTextMatrix(440, 795);
            cb.ShowText(settings.Address);
            cb.SetTextMatrix(440, 780);
            cb.ShowText(settings.PostalCode + ", " + settings.City);

            // VAT nr
            //cb.SetTextMatrix(375, 760);
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "VAT nr:", 415, 760, 0);

            cb.SetTextMatrix(440, 760);
            cb.ShowText(settings.VAT);

            // Business nr
            //cb.SetTextMatrix(358, 750);
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "Business nr:", 415, 745, 0);

            cb.SetTextMatrix(440, 745);
            cb.ShowText(settings.BusinessNumber);

            cb.EndText();
            //--------------------- CONTENT -----------------------------//

            doc.Close();

            return ms.ToArray();
        }

        private Document InitDocument()
        {
            Document doc = new Document(PageSize.A4, 30, 30, 42, 42);
            doc.AddSubject(String.Format("This invoice belongs to {0}. {1}", debtor.FirstName[0], debtor.LastName));
            doc.AddKeywords("Invoice, Payment");
            doc.AddCreator(this.settings.CompanyName);

            return doc;
        }
    }
}