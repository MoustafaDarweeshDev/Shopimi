using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductSpecParams specParamas) : base(x =>
            (string.IsNullOrWhiteSpace(specParamas.Search) || x.Name.ToLower().Contains(specParamas.Search))&&
            (!specParamas.Brands.Any() || specParamas.Brands.Contains(x.ProductBrand)) &&
            (!specParamas.Types.Any() || specParamas.Types.Contains(x.ProductType))
        )
        {
            ApplyPaging(specParamas.PageSize * (specParamas.PageIndex -1) , specParamas.PageSize);

            switch (specParamas.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDesc(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }
        }
    }
}
