using InvoiceWebApp.Components.Entities;

using Microsoft.EntityFrameworkCore;

namespace InvoiceWebApp.Components.DataContext {
	public partial class InvoiceContext : DbContext
    {
		public InvoiceContext(DbContextOptions<InvoiceContext> options)
            : base(options)
        {
        }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
		{
			if (!optionsBuilder.IsConfigured) { }
		}

		public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Debtor> Debtors { get; set; }
        public virtual DbSet<DebtorHasAddress> DebtorHasAddresses { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoiceItem> InvoiceItems { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Settings> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => new { e.Number, e.PostalCode });

                entity.ToTable("addresses");

                entity.Property(e => e.Number)
                    .HasColumnName("number")
                    .HasColumnType("int(11)");

                entity.Property(e => e.PostalCode)
                    .HasColumnName("postal_code")
                    .HasMaxLength(40);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasColumnName("city")
                    .HasMaxLength(150);

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasColumnName("country")
                    .HasMaxLength(150);

                entity.Property(e => e.Street)
                    .IsRequired()
                    .HasColumnName("street")
                    .HasMaxLength(150);

                entity.Property(e => e.Suffix)
                    .HasColumnName("suffix")
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Debtor>(entity =>
            {
                entity.ToTable("debtors");

                entity.HasIndex(e => e.Id)
                    .HasName("id")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(200);

                entity.Property(e => e.BankAccount)
                    .IsRequired()
                    .HasColumnName("bank_account")
                    .HasMaxLength(50);

                entity.Property(e => e.CompanyName)
                    .HasColumnName("company_name")
                    .HasMaxLength(250);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .HasColumnName("first_name")
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .HasColumnName("last_name")
                    .HasMaxLength(100);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasMaxLength(40);
            });

            modelBuilder.Entity<DebtorHasAddress>(entity =>
            {
                entity.HasKey(e => new { e.DebtorId, e.PostalCode, e.Number });

                entity.ToTable("debtor_has_addresses");

                entity.Property(e => e.DebtorId)
                    .HasColumnName("debtor_id")
                    .HasMaxLength(200);

                entity.HasOne(e => e.Debtor)
                    .WithMany(e => e.Addresses)
                    .HasConstraintName("dha_debtor_fk")
                    .HasForeignKey(e => e.DebtorId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Address)
                    .WithMany(e => e.Debtors)
                    .HasConstraintName("dha_address_fk")
                    .HasForeignKey(e => new { e.Number, e.PostalCode })
                    .OnDelete(DeleteBehavior.Cascade);

                entity.Property(e => e.PostalCode)
                    .HasColumnName("postal_code")
                    .HasMaxLength(40);

                entity.Property(e => e.Number)
                    .HasColumnName("number")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasKey(e => e.InvoiceNumber);

                entity.ToTable("invoices");

                entity.Property(e => e.InvoiceNumber)
                    .HasColumnName("invoice_number")
                    .HasMaxLength(200);

                entity.Property(e => e.Comment)
                    .HasColumnName("comment")
                    .HasMaxLength(250);

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("created_on")
                    .HasColumnType("datetime");

                entity.Property(e => e.CustomerId)
                    .IsRequired()
                    .HasColumnName("customer_id")
                    .HasMaxLength(200);

                entity.HasOne(e => e.Debtor)
                    .WithMany(e => e.Invoices)
                    .HasForeignKey(e => e.CustomerId)
                    .HasConstraintName("invoices_debtors_fk");

                entity.Property(e => e.ExpiredOn)
                    .HasColumnName("expired_on")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsPaid)
                    .HasColumnName("is_paid")
                    .HasColumnType("boolean");

                entity.Property(e => e.Concept)
                    .HasColumnName("concept")
                    .HasColumnType("boolean");

                entity.Property(e => e.Discount).HasColumnName("discount");

                entity.Property(e => e.Total).HasColumnName("total");
            });

            modelBuilder.Entity<InvoiceItem>(entity =>
            {
                entity.HasKey(e => new { e.ItemNumber, e.InvoiceNumber });

                entity.ToTable("invoice_items");

                entity.Property(e => e.ItemNumber)
                    .HasColumnName("item_number")
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.HasOne(e => e.Invoice)
                    .WithMany(e => e.Items)
                    .HasForeignKey(e => e.InvoiceNumber)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("items_invoice_fk");

                entity.Property(e => e.InvoiceNumber)
                    .HasColumnName("invoice_number")
                    .HasMaxLength(200);

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(250);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(200);

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Quantity)
                    .HasColumnName("quantity")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Tax)
                    .HasColumnName("tax")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("roles");

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Type)
                    .HasColumnName("type")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Email);

                entity.ToTable("users");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(255);

                entity.Property(e => e.FirstName)
                    .HasColumnName("first_name")
                    .HasMaxLength(150);

                entity.Property(e => e.LastName)
                    .HasColumnName("last_name")
                    .HasMaxLength(175);

                entity.Property(e => e.CompanyName)
                    .HasColumnName("company_name")
                    .HasMaxLength(250);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(255);

                entity.Property(e => e.Picture)
                    .HasColumnName("picture");

                entity.Property(e => e.Role)
                    .HasColumnName("role")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Settings>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("settings");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasColumnName("company_name")
                    .HasMaxLength(300);

                entity.Property(e => e.Website)
                    .HasColumnName("website")
                    .HasMaxLength(300);

                entity.Property(e => e.Phone)
                    .HasColumnName("phone")
                    .HasMaxLength(40);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(150);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(80);

                entity.Property(e => e.SMTP)
                    .IsRequired()
                    .HasColumnName("smtp")
                    .HasMaxLength(80);

                entity.Property(e => e.Port)
                .IsRequired()
                    .HasColumnName("port")
                    .HasColumnType("int(11)");

                entity.Property(e => e.BankAccount)
                    .IsRequired()
                    .HasColumnName("bank_account")
                    .HasMaxLength(150);

                entity.Property(e => e.Bank)
                    .IsRequired()
                    .HasColumnName("bank")
                    .HasMaxLength(150);

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(200);

                entity.Property(e => e.PostalCode)
                    .IsRequired()
                    .HasColumnName("postal_code")
                    .HasMaxLength(20);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasColumnName("city")
                    .HasMaxLength(250);

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasColumnName("country")
                    .HasMaxLength(250);

                entity.Property(e => e.BusinessNumber)
                    .IsRequired()
                    .HasColumnName("business_number")
                    .HasMaxLength(250);

                entity.Property(e => e.VAT)
                    .IsRequired()
                    .HasColumnName("vat_number")
                    .HasMaxLength(250);

                entity.Property(e => e.InvoicePrefix)
                    .HasColumnName("invoice_prefix")
                    .HasMaxLength(20);

                entity.Property(e => e.Logo)
                    .HasColumnName("logo");

                entity.Property(e => e.Color)
                    .HasColumnName("color");

                entity.Property(e => e.ShowLogo)
                    .IsRequired()
                    .HasColumnName("show_logo")
                    .HasColumnType("boolean");

                entity.Property(e => e.ShowLogoInPDF)
                    .IsRequired()
                    .HasColumnName("show_logo_in_pdf")
                    .HasColumnType("boolean");
            });
        }
    }
}