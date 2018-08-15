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

            // Fonts
            BaseFont helvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            BaseFont helveticaBold = BaseFont.CreateFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

            // Company logo
            if (settings.ShowLogoInPDF)
            {
                string imagepath = @"~/Images/" + settings.Logo;
                Image logo = Image.GetInstance(imagepath + "/mikesdotnetting.gif");

                cb.AddImage(logo, logo.Width, 0, 0, logo.Height, 30, 800);
            }
            
            // Company info
            cb.BeginText();
            cb.SetFontAndSize(helveticaBold, 12f);
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.CompanyName, 430, 795, 0);                               //795
            cb.SetFontAndSize(helvetica, 9.5f);
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.Address, 430, 780, 0);                                  //780
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.PostalCode + ", " + settings.City, 430, 765, 0);        //765
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.Email, 430, 745, 0);                                    //745
            cb.ShowTextAligned(Element.ALIGN_LEFT, settings.Phone, 430, 730, 0);                                    //730
            cb.ShowTextAligned(Element.ALIGN_LEFT, "COC: " + settings.BusinessNumber, 430, 710, 0);                 //710
            cb.ShowTextAligned(Element.ALIGN_LEFT, "VAT: " + settings.VAT, 430, 695, 0);                            //695
            cb.ShowTextAligned(Element.ALIGN_LEFT, "IBAN: " + settings.BankAccount, 430, 680, 0);                   //680
            cb.EndText();

            // Debtor name and address
            var debtorAddress = debtor.Addresses.First().Address;

            cb.BeginText();
            cb.SetFontAndSize(helvetica, 10f);
            cb.ShowTextAligned(Element.ALIGN_LEFT, debtor.FirstName + " " + debtor.LastName, 70, 635, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, debtorAddress.Street + " " + debtorAddress.Number + debtorAddress.Suffix, 70, 620, 0);
            cb.ShowTextAligned(Element.ALIGN_LEFT, debtorAddress.PostalCode + " " + debtorAddress.City, 70, 605, 0);
            cb.EndText();

            // Invoice number
            cb.BeginText();
            cb.SetFontAndSize(helveticaBold, 15f);
            cb.ShowTextAligned(Element.ALIGN_LEFT, "Invoice " + invoice.InvoiceNumber, 55, 500, 0);
            cb.EndText();

            // Invoice dates
            cb.BeginText();
            cb.SetFontAndSize(helvetica, 10f);
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "Invoice date:       " + invoice.CreatedOn.ToString("dd-MM-yyyy"), 550, 500, 0);
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "Expiration date:       " + invoice.ExpiredOn.ToString("dd-MM-yyyy"), 550, 485, 0);
            cb.EndText();

            // Invoice items
            cb.BeginText();
            cb.SetFontAndSize(helvetica, 9f);
            cb.ShowTextAligned(Element.ALIGN_RIGHT, "Description", 195, 452, 0);
            cb.EndText();

            cb.Rectangle(50, 445, 500, 1);
            cb.SetRgbColorStroke(75, 75, 75);
            cb.Stroke();

            // Close and return pdf
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