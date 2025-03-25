﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{ 
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;
        private int _pageSize = 6;
        public int PageIndex = 1;
        public int PageSize 
        {
            get => _pageSize;
            set => _pageSize = (MaxPageSize < value) ? MaxPageSize : value; 
        }

        private List<string> _brands = [];

        public List<string> Brands 
        {
            get => _brands;
            set
            {
                _brands = value.SelectMany(x=>x.Split(",", StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }

        public List<string> _types = [];
        public List<string> Types
        {
            get => _types;
            set
            {
                _types = value.SelectMany(x => x.Split(",", StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }

        public string? Sort { get; set; }

        private string? _search;

        public string Search
        {
            get => _search ?? "";
            set => _search = value.ToLower();
        }

    }
}
