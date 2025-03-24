using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class BrandListSpicification : BaseSpecification<Product, string>
    {
        public BrandListSpicification()
        {
            AddSelect(x => x.ProductBrand);
            ApplyDistinct();
        }
    }
}
