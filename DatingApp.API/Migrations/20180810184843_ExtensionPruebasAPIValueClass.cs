using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class ExtensionPruebasAPIValueClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Avance",
                table: "Values",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Avances",
                table: "Values",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Ejecutado",
                table: "Values",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Estatus",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Estimado",
                table: "Values",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Fraccionamiento",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Inmuebles",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PorEjecutar",
                table: "Values",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Presupuesto",
                table: "Values",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Ubicacion",
                table: "Values",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avance",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Avances",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Ejecutado",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Estatus",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Estimado",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Fraccionamiento",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Inmuebles",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "PorEjecutar",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Presupuesto",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Ubicacion",
                table: "Values");
        }
    }
}
