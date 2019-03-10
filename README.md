# Invoice-Web-App
ASP.NET Core + Angular 6 Project


This project makes use of a backend API created with ASP.NET Core, and a website based in Angular 6.

Things to change before use:

<ul>
  <li>Change database connection details in 'Components/DataContext/InvoiceContext.cs'</li>
  <li>Change port in 'Program.cs', and in '/src/environments/environment.ts' and '/src/environments/environment.prod.ts'</li>
</ul>

How to use:

<ul>
  <li>Run the command 'npm install' in a command prompt</li>
  <li>Make sure that all NuGet packages are installed.</li>
  <li>Run the SQL script in 'docs/sql/invoice_app.sql'</li>
  <li>*this project makes use of .NET Core SDK 2.2</li>
</ul>

Extra:

<ul>
  <li>For the CSV import functionality, inside 'docs' there are two .CSV files for both debtors and users.</li>
  <li>For an entity relationship diagram, there is one created with Astah located in 'docs/uml/Invoice ERD.asta'</li>
  <li>Run the SQL script in 'docs/sql/invoice_app.sql'</li>
</ul>
