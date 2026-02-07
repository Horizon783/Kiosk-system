import categories from '../data/categories.json';

function CategoryList({onSelectCategory , selectedCategory}){

    return (
        <ul>
            {categories.map(cat => (
                <li key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    style={{cursor: 'pointer',
                        fontWeight: selectedCategory === cat.id ? "bold" : "normal",
                        color: selectedCategory === cat.id ? "#d32f2f" : "#000"
                    }}
                    >
                    {cat.name}
                </li>
            ))}
        </ul>
    );
}

export default CategoryList;