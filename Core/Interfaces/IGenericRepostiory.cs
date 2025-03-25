using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericRepostiory<T> where T : BaseEntity
    {
        Task<T?> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T?> GetEntitiyWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAllWithSpec(ISpecification<T> spec);
        Task<TResault?> GetEntitiyWithSpec<TResault>(ISpecification<T, TResault> spec);
        Task<IReadOnlyList<TResault>> ListAllWithSpec<TResault>(ISpecification<T, TResault> spec);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task<bool> SaveAllAsync();
        bool Exists(int id);
        Task<int> GetCountAsync(ISpecification<T> spec);
    }
}
