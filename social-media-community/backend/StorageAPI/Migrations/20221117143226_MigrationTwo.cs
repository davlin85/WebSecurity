using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StorageAPI.Migrations
{
    public partial class MigrationTwo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "Images",
                newName: "ImageName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageName",
                table: "Images",
                newName: "ImageURL");
        }
    }
}
