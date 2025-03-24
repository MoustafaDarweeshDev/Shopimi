using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructer.Data
{
    public class ProductRepository(StoreContext context) : IProductRepository
    {
        public void AddProduct(Product product)
        {
            context.Products.Add(product);
        }

        public void DeleteProduct(Product product)
        {
            context.Products.Remove(product);
        }

        public async Task<IReadOnlyList<string>> GetBrandsAsync()
        {
            return await context.Products.Select(x => x.ProductBrand).
                            Distinct().
                            ToListAsync();
        }

        public async Task<Product?> GetProductAsync(int id)
        {
            return await context.FindAsync<Product>(id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync(string? brand, string? type)
        {
            var query = context.Products.AsQueryable();

            if (!String.IsNullOrWhiteSpace(brand))
                query = query.Where(x => x.ProductBrand == brand);

            if (!String.IsNullOrWhiteSpace(type))
                query = query.Where(x => x.ProductType == type);

            return await query.ToListAsync();
        }

        public async Task<IReadOnlyList<string>> GetTypesAsync()
        {
            return await context.Products.Select(x => x.ProductType).
                Distinct().
                ToListAsync();
        }

        public bool ProductExcists(int id)
        {
            return context.Products.Any(x => x.Id == id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void UpdateProduct(Product product)
        {
            context.Entry(product).State = EntityState.Modified;
        }
    }
}
