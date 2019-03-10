# Invoice Web App


This project makes use of a backend API created with ASP.NET Core, and a website based in Angular 6.

<b>Things to change before use</b>

<ul>
  <li>Change database connection details in <b><i>'Components/DataContext/InvoiceContext.cs'</b></i></li>
  <li>Change port in <b><i>'Program.cs'</b></i>, <b><i>'proxy.config.json'</b></i> and in <b><i>'/src/environments/environment.ts'</b></i> and <b><i>'/src/environments/environment.prod.ts'</b></i></li>
</ul>

<b>How to use</b>

<ul>
  <li>Run the command <b><i>'npm install'</b></i> in a command prompt</li>
  <li>Make sure that all NuGet packages are installed.</li>
  <li>Run the SQL script in <b><i>'docs/sql/invoice_app.sql'</b></i></li>
  <li>Change the database connection details as described earlier.</li>
  <li>In two seperate command prompts, run the following commands, in this order:
    <ul>
      <li><b><i>ng build</b></i></li>
      <li><b><i>dotnet run</b></i></li>
    </ul>
  </li>
</ul>
<small>*this project makes use of .NET Core SDK 2.2</small>

<b>Extra</b>

<ul>
  <li>For the CSV import functionality, inside 'docs' there are two .CSV files for both debtors and users.</li>
  <li>For an entity relationship diagram, there is one created with Astah located in 'docs/uml/Invoice ERD.asta'</li>
</ul>
