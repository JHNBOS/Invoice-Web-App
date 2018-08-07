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

            cb.SetTextMatrix(30, 785);
            cb.ShowText(this.settings.CompanyName);

            cb.EndText();

            // Company Info Line 1
            //cb.SetLineWidth(0.4f);
            //cb.SetRgbColorStroke(0, 100, 240);

            //cb.Rectangle(385, 810, 40, 0.4f);
            //cb.Rectangle(437, 810, 118, 0.4f);

            //cb.Rectangle(385, 680, 40, 0.4f);
            //cb.Rectangle(437, 680, 118, 0.4f);

            //cb.Stroke();

            cb.BeginText();
            cb.SetFontAndSize(helvetica, 10f);

            // -------------- Company Info ---------------------

            // Address
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "", 420, 795, 0);
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "", 420, 780, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.Address, 430, 795, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.PostalCode + ", " + settings.City, 430, 780, 0);

            // E-mail
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "", 430, 760, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.Email, 430, 760, 0);

            // Phone
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "", 430, 745, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.Phone, 430, 745, 0);

            // Business nr
            //cb.ShowTextAligned(Element.ALIGN_RIGHT, "COC:", 420, 725, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, "COC: " + settings.BusinessNumber, 430, 725, 0);

            // VAT nr
            //cb.ShowTextAligned(Element.ALIGN_RIGHT, "VAT:", 420, 710, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, "VAT: " + settings.VAT, 430, 710, 0);

            // Bank account
            //cb.ShowTextAligned(Element.ALIGN_RIGHT, "IBAN:", 420, 695, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, "IBAN: " + settings.BankAccount, 430, 695, 0);

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