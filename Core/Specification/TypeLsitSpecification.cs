using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class TypeLsitSpecification : BaseSpecification<Product, string>
    {
        public TypeLsitSpecification()
        {
            AddSelect(x => x.ProductType);
            ApplyDistinct();
        }
    }
}
