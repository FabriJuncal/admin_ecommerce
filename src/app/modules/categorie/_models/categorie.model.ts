export class ListCategoriesModel {
    total: number;
    categories: {
        data: CategorieModel[],
    }
}

export class CategorieModel {
    id: number;
    name: string;
    image: string;
    icon: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

